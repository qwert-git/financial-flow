import { updateExpensesChartData } from './charts.js';

let currentMonthIndex = 0;
let availableMonths = [];
// Internal state for assets to handle filtering without re-fetching
let currentAssets = [];

export function setAvailableMonths(months) {
    availableMonths = months;
}

export function renderAssetsTable(assets, filter = 'all') {
    const tbody = document.getElementById('assetsTableBody');
    if (!tbody) return;

    // specific business logic: update internal state if assets provided
    if (assets) {
        currentAssets = assets;
    } else {
        // Fallback to internal state if no assets passed (e.g. from filter click)
        assets = currentAssets;
    }

    let displayedAssets = assets;

    if (filter !== 'all') {
        displayedAssets = displayedAssets.filter(a => a.category === filter);
    }

    tbody.innerHTML = displayedAssets.map(asset => `
        <tr>
            <td>
                <div class="asset-info">
                    <div class="asset-icon" style="background: ${asset.color}20; color: ${asset.color};">
                        ${asset.icon}
                    </div>
                    <div class="asset-details">
                        <span class="asset-name">${asset.name}</span>
                        <span class="asset-symbol">${asset.symbol}</span>
                    </div>
                </div>
            </td>
            <td>
                <div class="asset-holdings">
                    <span class="holdings-amount">${asset.holdings.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                    <span class="holdings-value">${asset.symbol}</span>
                </div>
            </td>
            <td>$${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <span class="price-change ${asset.change24h >= 0 ? 'positive' : 'negative'}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="${asset.change24h < 0 ? 'transform: rotate(180deg)' : ''}">
                        <path d="M18 15l-6-6-6 6"/>
                    </svg>
                    ${Math.abs(asset.change24h).toFixed(2)}%
                </span>
            </td>
            <td>$${asset.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="allocation-bar">
                        <div class="allocation-fill" style="width: ${asset.allocation}%; background: ${asset.color};"></div>
                    </div>
                    <span style="font-size: 12px; color: #A1A1AA;">${asset.allocation}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

export function renderNews(newsItems) {
    const container = document.getElementById('newsList');
    if (!container) return;

    if (!newsItems) return;

    container.innerHTML = newsItems.map(news => `
        <div class="news-item">
            <div class="news-icon" style="background: ${news.iconBg}; color: ${news.iconColor};">
                ${news.icon}
            </div>
            <div class="news-content">
                <div class="news-title">${news.title}</div>
                <div class="news-meta">
                    <span class="news-tag">${news.tag}</span>
                    <span>${news.source} • ${news.time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

export function renderExpenseCategories(monthData) {
    if (!monthData) return;

    const container = document.getElementById('expenseCategories');
    if (!container) return;

    container.innerHTML = monthData.categories.slice(0, 5).map(c => `
        <div class="expense-category">
            <div class="category-left">
                <div class="category-icon" style="background: ${c.color}20;">
                    ${c.icon}
                </div>
                <span class="category-name">${c.name}</span>
            </div>
            <span class="category-amount">$${c.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
    `).join('');
}

// We need a way to look up month data by key when clicking prev/next
// Logic: UI module shouldn't fetch data. It should ask App to update, or hold all data.
// Simpler: Hold expense data map in the closure of the module or pass it in setup?
// Let's hold a reference to the simple "current data" or use a callback mechanism.
// For now, let's allow updating with the specific month object.
// But the event listeners need to know *which* month to ask for.
// We'll expose a callback registry or setter for the data source.
let allExpensesData = null;

export function setExpensesData(data) {
    allExpensesData = data;
}

export function updateExpenses(monthKey) {
    if (!allExpensesData || !allExpensesData[monthKey]) return;
    const monthData = allExpensesData[monthKey];

    const currentMonthEl = document.getElementById('currentMonth');
    if (currentMonthEl) currentMonthEl.textContent = monthKey;

    const totalExpensesEl = document.getElementById('totalExpenses');
    if (totalExpensesEl) totalExpensesEl.textContent = `$${monthData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    const budgetPercent = Math.round((monthData.total / monthData.budget) * 100);
    const budgetFill = document.querySelector('.budget-fill');
    if (budgetFill) budgetFill.style.width = `${budgetPercent}%`;

    const budgetText = document.querySelector('.budget-text');
    if (budgetText) budgetText.textContent = `${budgetPercent}% of $${monthData.budget.toLocaleString()} budget`;

    // Update chart
    updateExpensesChartData(monthData);

    renderExpenseCategories(monthData);
}

export function updatePortfolioChange(changeData) {
    if (!changeData) return;

    const changeContainer = document.getElementById('valueChange');
    if (!changeContainer) return;

    const isPositive = changeData.percent >= 0;

    changeContainer.className = `value-change ${isPositive ? 'positive' : 'negative'}`;
    changeContainer.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
        <span class="change-amount">${isPositive ? '+' : ''}$${Math.abs(changeData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        <span class="change-percent">(${isPositive ? '+' : ''}${changeData.percent.toFixed(2)}%)</span>
    `;
}

// Store the changes map for the event listener
let allPortfolioChanges = null;
export function setPortfolioChanges(changes) {
    allPortfolioChanges = changes;
}

export function setupEventListeners(onChartPeriodChange) {
    // Period selector for total assets
    document.querySelectorAll('.period-selector .period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.period-selector .period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const period = e.target.dataset.period;
            if (allPortfolioChanges) {
                updatePortfolioChange(allPortfolioChanges[period]);
            }
        });
    });

    // View toggle for assets
    document.querySelectorAll('.view-toggle .view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.view-toggle .view-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const view = e.target.dataset.view;
            renderAssetsTable(null, view); // Use internal assets
        });
    });

    // Chart period selector
    document.querySelectorAll('.chart-period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const period = e.target.dataset.period;
            if (onChartPeriodChange) onChartPeriodChange(period);
        });
    });

    // Month navigation for expenses
    const prevBtn = document.querySelector('.month-nav.prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonthIndex = Math.min(currentMonthIndex + 1, availableMonths.length - 1);
            if (availableMonths[currentMonthIndex]) {
                updateExpenses(availableMonths[currentMonthIndex]);
            }
        });
    }

    const nextBtn = document.querySelector('.month-nav.next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonthIndex = Math.max(currentMonthIndex - 1, 0);
            if (availableMonths[currentMonthIndex]) {
                updateExpenses(availableMonths[currentMonthIndex]);
            }
        });
    }
}
