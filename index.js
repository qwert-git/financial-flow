// ===== Mock Data =====
const mockData = {
    portfolio: {
        totalValue: 847392.54,
        changes: {
            '24h': { amount: 2734.21, percent: 0.32 },
            '7d': { amount: 12847.32, percent: 1.54 },
            '30d': { amount: 34182.47, percent: 4.21 },
            'ytd': { amount: -18927.33, percent: -2.18 },
            'all': { amount: 247392.54, percent: 41.23 }
        }
    },
    allocation: [
        { name: 'Crypto', value: 312456, percent: 36.9, color: '#F7931A' },
        { name: 'ETFs', value: 298721.54, percent: 35.2, color: '#8B5CF6' },
        { name: 'Stocks', value: 186215, percent: 22.0, color: '#10B981' },
        { name: 'Cash', value: 50000, percent: 5.9, color: '#06B6D4' }
    ],
    assets: [
        { 
            name: 'Bitcoin', 
            symbol: 'BTC', 
            category: 'crypto',
            holdings: 2.847,
            price: 68432.50,
            change24h: 2.34,
            value: 194875.33,
            allocation: 23.0,
            color: '#F7931A',
            icon: '₿'
        },
        { 
            name: 'Ethereum', 
            symbol: 'ETH', 
            category: 'crypto',
            holdings: 24.5,
            price: 3892.15,
            change24h: 1.87,
            value: 95357.68,
            allocation: 11.2,
            color: '#627EEA',
            icon: 'Ξ'
        },
        { 
            name: 'Vanguard S&P 500', 
            symbol: 'VOO', 
            category: 'etf',
            holdings: 245,
            price: 486.32,
            change24h: 0.45,
            value: 119148.40,
            allocation: 14.1,
            color: '#8B5CF6',
            icon: 'V'
        },
        { 
            name: 'Invesco QQQ', 
            symbol: 'QQQ', 
            category: 'etf',
            holdings: 180,
            price: 512.87,
            change24h: 0.67,
            value: 92316.60,
            allocation: 10.9,
            color: '#A855F7',
            icon: 'Q'
        },
        { 
            name: 'Apple Inc.', 
            symbol: 'AAPL', 
            category: 'stocks',
            holdings: 320,
            price: 198.45,
            change24h: -0.23,
            value: 63504.00,
            allocation: 7.5,
            color: '#10B981',
            icon: ''
        },
        { 
            name: 'NVIDIA Corp.', 
            symbol: 'NVDA', 
            category: 'stocks',
            holdings: 85,
            price: 892.34,
            change24h: 1.92,
            value: 75848.90,
            allocation: 8.9,
            color: '#22C55E',
            icon: 'N'
        },
        { 
            name: 'Microsoft Corp.', 
            symbol: 'MSFT', 
            category: 'stocks',
            holdings: 110,
            price: 425.11,
            change24h: -0.54,
            value: 46762.10,
            allocation: 5.5,
            color: '#34D399',
            icon: 'M'
        },
        { 
            name: 'Solana', 
            symbol: 'SOL', 
            category: 'crypto',
            holdings: 156,
            price: 142.45,
            change24h: 4.21,
            value: 22222.20,
            allocation: 2.6,
            color: '#9945FF',
            icon: 'S'
        },
        { 
            name: 'iShares Bonds', 
            symbol: 'BND', 
            category: 'etf',
            holdings: 520,
            price: 71.23,
            change24h: 0.12,
            value: 37039.60,
            allocation: 4.4,
            color: '#C084FC',
            icon: 'B'
        },
        { 
            name: 'High Yield Savings', 
            symbol: 'CASH', 
            category: 'cash',
            holdings: 50000,
            price: 1.00,
            change24h: 0.00,
            value: 50000.00,
            allocation: 5.9,
            color: '#06B6D4',
            icon: '$'
        }
    ],
    expenses: {
        months: {
            'December 2025': {
                total: 4827.50,
                budget: 6700,
                categories: [
                    { name: 'Housing', amount: 1850, icon: '🏠', color: '#8B5CF6' },
                    { name: 'Food & Dining', amount: 892, icon: '🍔', color: '#EC4899' },
                    { name: 'Transportation', amount: 445, icon: '🚗', color: '#F59E0B' },
                    { name: 'Shopping', amount: 623, icon: '🛍️', color: '#10B981' },
                    { name: 'Entertainment', amount: 287, icon: '🎬', color: '#06B6D4' },
                    { name: 'Utilities', amount: 320, icon: '⚡', color: '#EF4444' },
                    { name: 'Healthcare', amount: 185, icon: '🏥', color: '#3B82F6' },
                    { name: 'Other', amount: 225.50, icon: '📦', color: '#71717A' }
                ]
            },
            'November 2025': {
                total: 5234.80,
                budget: 6700,
                categories: [
                    { name: 'Housing', amount: 1850, icon: '🏠', color: '#8B5CF6' },
                    { name: 'Food & Dining', amount: 1024, icon: '🍔', color: '#EC4899' },
                    { name: 'Transportation', amount: 512, icon: '🚗', color: '#F59E0B' },
                    { name: 'Shopping', amount: 845, icon: '🛍️', color: '#10B981' },
                    { name: 'Entertainment', amount: 423, icon: '🎬', color: '#06B6D4' },
                    { name: 'Utilities', amount: 298, icon: '⚡', color: '#EF4444' },
                    { name: 'Healthcare', amount: 145, icon: '🏥', color: '#3B82F6' },
                    { name: 'Other', amount: 137.80, icon: '📦', color: '#71717A' }
                ]
            },
            'October 2025': {
                total: 4952.30,
                budget: 6700,
                categories: [
                    { name: 'Housing', amount: 1850, icon: '🏠', color: '#8B5CF6' },
                    { name: 'Food & Dining', amount: 978, icon: '🍔', color: '#EC4899' },
                    { name: 'Transportation', amount: 623, icon: '🚗', color: '#F59E0B' },
                    { name: 'Shopping', amount: 512, icon: '🛍️', color: '#10B981' },
                    { name: 'Entertainment', amount: 389, icon: '🎬', color: '#06B6D4' },
                    { name: 'Utilities', amount: 342, icon: '⚡', color: '#EF4444' },
                    { name: 'Healthcare', amount: 98, icon: '🏥', color: '#3B82F6' },
                    { name: 'Other', amount: 160.30, icon: '📦', color: '#71717A' }
                ]
            }
        }
    },
    news: [
        {
            title: 'Bitcoin Surges Past $68K as Institutional Demand Grows',
            source: 'CoinDesk',
            time: '2h ago',
            tag: 'BTC',
            icon: '₿',
            iconBg: 'rgba(247, 147, 26, 0.2)',
            iconColor: '#F7931A'
        },
        {
            title: 'S&P 500 Hits New All-Time High in Early 2026 Trading',
            source: 'Bloomberg',
            time: '4h ago',
            tag: 'VOO',
            icon: '📈',
            iconBg: 'rgba(139, 92, 246, 0.2)',
            iconColor: '#8B5CF6'
        },
        {
            title: 'NVIDIA Reports Record Quarterly Revenue from AI Chip Sales',
            source: 'Reuters',
            time: '6h ago',
            tag: 'NVDA',
            icon: 'N',
            iconBg: 'rgba(16, 185, 129, 0.2)',
            iconColor: '#10B981'
        },
        {
            title: 'Ethereum ETF Sees Massive Inflows, Breaks Weekly Record',
            source: 'The Block',
            time: '8h ago',
            tag: 'ETH',
            icon: 'Ξ',
            iconBg: 'rgba(98, 126, 234, 0.2)',
            iconColor: '#627EEA'
        },
        {
            title: 'Fed Signals Potential Rate Cuts in Q2 2026',
            source: 'CNBC',
            time: '12h ago',
            tag: 'MACRO',
            icon: '🏦',
            iconBg: 'rgba(6, 182, 212, 0.2)',
            iconColor: '#06B6D4'
        }
    ],
    portfolioHistory: {
        '1m': generateHistoricalData(30, 800000, 847392.54),
        '3m': generateHistoricalData(90, 750000, 847392.54),
        '6m': generateHistoricalData(180, 700000, 847392.54),
        '1y': generateHistoricalData(365, 600000, 847392.54),
        'all': generateHistoricalData(730, 400000, 847392.54)
    }
};

// Generate historical portfolio data
function generateHistoricalData(days, startValue, endValue) {
    const data = [];
    const labels = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Generate a realistic looking chart with some volatility
        const progress = (days - i) / days;
        const trend = startValue + (endValue - startValue) * progress;
        const volatility = (endValue - startValue) * 0.1;
        const noise = (Math.random() - 0.5) * volatility;
        const value = trend + noise;
        
        data.push(value);
        
        if (days <= 30) {
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        } else if (days <= 90) {
            if (i % 7 === 0) labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            else labels.push('');
        } else {
            if (i % 30 === 0) labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
            else labels.push('');
        }
    }
    
    return { data, labels };
}

// ===== Chart Configurations =====
let performanceChart, allocationChart, expensesChart, miniChart;

// Chart.js default configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#A1A1AA';

function initCharts() {
    initMiniChart();
    initAllocationChart();
    initPerformanceChart();
    initExpensesChart();
}

function initMiniChart() {
    const ctx = document.getElementById('portfolioMiniChart').getContext('2d');
    const data = mockData.portfolioHistory['6m'];
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
    miniChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                borderColor: '#8B5CF6',
                borderWidth: 2,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#8B5CF6',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(22, 22, 32, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#A1A1AA',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `$${context.raw.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                    }
                }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initAllocationChart() {
    const ctx = document.getElementById('allocationChart').getContext('2d');
    
    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: mockData.allocation.map(a => a.name),
            datasets: [{
                data: mockData.allocation.map(a => a.value),
                backgroundColor: mockData.allocation.map(a => a.color),
                borderColor: 'rgba(22, 22, 32, 1)',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 22, 32, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#A1A1AA',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            const percent = mockData.allocation[context.dataIndex].percent;
                            return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Generate legend
    const legendContainer = document.getElementById('allocationLegend');
    legendContainer.innerHTML = mockData.allocation.map(a => `
        <div class="legend-item">
            <div class="legend-left">
                <div class="legend-color" style="background: ${a.color}"></div>
                <span class="legend-name">${a.name}</span>
            </div>
            <span class="legend-value">${a.percent}%</span>
        </div>
    `).join('');
}

function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const data = mockData.portfolioHistory['6m'];
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
    gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.1)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Portfolio Value',
                data: data.data,
                borderColor: '#8B5CF6',
                borderWidth: 2.5,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#8B5CF6',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(22, 22, 32, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#A1A1AA',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `Portfolio: $${context.raw.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 8,
                        font: { size: 11 }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: (value) => '$' + (value / 1000).toFixed(0) + 'K',
                        font: { size: 11 },
                        maxTicksLimit: 5
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initExpensesChart() {
    const ctx = document.getElementById('expensesChart').getContext('2d');
    const monthData = mockData.expenses.months['December 2025'];
    
    expensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthData.categories.map(c => c.name),
            datasets: [{
                data: monthData.categories.map(c => c.amount),
                backgroundColor: monthData.categories.map(c => c.color),
                borderRadius: 6,
                maxBarThickness: 32
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 22, 32, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#A1A1AA',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: (context) => `$${context.raw.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        }
    });
    
    // Generate expense categories list
    renderExpenseCategories('December 2025');
}

function renderExpenseCategories(month) {
    const monthData = mockData.expenses.months[month];
    const container = document.getElementById('expenseCategories');
    
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

// ===== Render Assets Table =====
function renderAssetsTable(filter = 'all') {
    const tbody = document.getElementById('assetsTableBody');
    let assets = mockData.assets;
    
    if (filter !== 'all') {
        assets = assets.filter(a => a.category === filter);
    }
    
    tbody.innerHTML = assets.map(asset => `
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

// ===== Render News =====
function renderNews() {
    const container = document.getElementById('newsList');
    container.innerHTML = mockData.news.map(news => `
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

// ===== Event Listeners =====
function setupEventListeners() {
    // Period selector for total assets
    document.querySelectorAll('.period-selector .period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.period-selector .period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const period = e.target.dataset.period;
            updatePortfolioChange(period);
        });
    });
    
    // View toggle for assets
    document.querySelectorAll('.view-toggle .view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.view-toggle .view-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const view = e.target.dataset.view;
            renderAssetsTable(view);
        });
    });
    
    // Chart period selector
    document.querySelectorAll('.chart-period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const period = e.target.dataset.period;
            updatePerformanceChart(period);
        });
    });
    
    // Month navigation for expenses
    let currentMonthIndex = 0;
    const months = Object.keys(mockData.expenses.months);
    
    document.querySelector('.month-nav.prev').addEventListener('click', () => {
        currentMonthIndex = Math.min(currentMonthIndex + 1, months.length - 1);
        updateExpenses(months[currentMonthIndex]);
    });
    
    document.querySelector('.month-nav.next').addEventListener('click', () => {
        currentMonthIndex = Math.max(currentMonthIndex - 1, 0);
        updateExpenses(months[currentMonthIndex]);
    });
}

function updatePortfolioChange(period) {
    const change = mockData.portfolio.changes[period];
    const changeContainer = document.getElementById('valueChange');
    const isPositive = change.percent >= 0;
    
    changeContainer.className = `value-change ${isPositive ? 'positive' : 'negative'}`;
    changeContainer.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
        <span class="change-amount">${isPositive ? '+' : ''}$${Math.abs(change.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        <span class="change-percent">(${isPositive ? '+' : ''}${change.percent.toFixed(2)}%)</span>
    `;
}

function updatePerformanceChart(period) {
    const data = mockData.portfolioHistory[period];
    
    performanceChart.data.labels = data.labels;
    performanceChart.data.datasets[0].data = data.data;
    performanceChart.update('none');
}

function updateExpenses(month) {
    const monthData = mockData.expenses.months[month];
    
    document.getElementById('currentMonth').textContent = month;
    document.getElementById('totalExpenses').textContent = `$${monthData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    const budgetPercent = Math.round((monthData.total / monthData.budget) * 100);
    document.querySelector('.budget-fill').style.width = `${budgetPercent}%`;
    document.querySelector('.budget-text').textContent = `${budgetPercent}% of $${monthData.budget.toLocaleString()} budget`;
    
    // Update chart
    expensesChart.data.labels = monthData.categories.map(c => c.name);
    expensesChart.data.datasets[0].data = monthData.categories.map(c => c.amount);
    expensesChart.data.datasets[0].backgroundColor = monthData.categories.map(c => c.color);
    expensesChart.update('none');
    
    renderExpenseCategories(month);
}

// ===== Number Animation =====
function animateNumber(element, targetValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
        
        element.textContent = currentValue.toLocaleString('en-US');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue.toLocaleString('en-US');
        }
    }
    
    requestAnimationFrame(update);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Initialize charts
    initCharts();
    
    // Render assets table
    renderAssetsTable();
    
    // Render news
    renderNews();
    
    // Setup event listeners
    setupEventListeners();
    
    // Animate the total amount
    const amountElement = document.getElementById('totalAmount');
    animateNumber(amountElement, 847392, 1500);
});
