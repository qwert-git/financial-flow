import { fetchExpensesFromGoogleSheets, fetchAssetAllocationFromGoogleSheets, fetchAssetsListFromGoogleSheets } from './services/api.js';
import { mockData } from './services/mockData.js';
import { initCharts, updatePerformanceChart } from './modules/charts.js';
import { renderAssetsTable, renderNews, updateExpenses, setupEventListeners, setAvailableMonths, setExpensesData, setPortfolioChanges, updatePortfolioChange } from './modules/ui.js';
import { animateNumber } from './utils/animation.js';

// Global App State
const appState = {
    expenses: { ...mockData.expenses },
    allocation: [...mockData.allocation],
    assets: [...mockData.assets],
    portfolio: { ...mockData.portfolio },
    portfolioHistory: { ...mockData.portfolioHistory },
    news: [...mockData.news]
};

// ===== Initialize =====
async function initializeApp() {
    // Set current date
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Try to fetch expenses from Google Sheets
    console.log('Fetching expenses from Google Sheets...');
    const sheetsExpenses = await fetchExpensesFromGoogleSheets();
    let availableMonths = [];

    if (sheetsExpenses && Object.keys(sheetsExpenses).length > 0) {
        console.log('Successfully loaded expenses from Google Sheets:', sheetsExpenses);
        appState.expenses.months = sheetsExpenses;

        // Sort months by date (most recent first)
        availableMonths = Object.keys(sheetsExpenses).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateB - dateA;
        });
    } else {
        console.log('Using mock expense data (Google Sheets fetch failed or returned empty)');
        availableMonths = Object.keys(appState.expenses.months);
    }

    // Pass data to UI module
    setAvailableMonths(availableMonths);
    setExpensesData(appState.expenses.months);

    // Try to fetch asset allocation from Google Sheets
    console.log('Fetching asset allocation from Google Sheets...');
    const sheetsAllocation = await fetchAssetAllocationFromGoogleSheets();
    let allocationData = null;

    if (sheetsAllocation && sheetsAllocation.allocation && sheetsAllocation.allocation.length > 0) {
        console.log('Successfully loaded asset allocation from Google Sheets:', sheetsAllocation);
        allocationData = sheetsAllocation.allocation;
        // Update App State
        appState.allocation = sheetsAllocation.allocation;
        appState.portfolio.totalValue = sheetsAllocation.totalValue;
    } else {
        console.log('Using mock asset allocation data (Google Sheets fetch failed or returned empty)');
        allocationData = appState.allocation;
    }

    // Try to fetch assets list from Google Sheets
    console.log('Fetching assets list from Google Sheets...');
    const sheetsAssets = await fetchAssetsListFromGoogleSheets();

    if (sheetsAssets && sheetsAssets.length > 0) {
        console.log('Successfully loaded assets list from Google Sheets:', sheetsAssets.length, 'items');
        appState.assets = sheetsAssets;
    } else {
        console.log('Using mock assets list (Google Sheets fetch failed or returned empty)');
    }

    // Initialize charts with state data
    initCharts(appState.allocation, appState.portfolioHistory, appState.expenses);

    // Initialize expenses with first month
    if (availableMonths.length > 0) {
        updateExpenses(availableMonths[0]);
    }

    // Render assets table with state data
    renderAssetsTable(appState.assets);

    // Render news with state data
    renderNews(appState.news);

    // Setup event listeners
    setPortfolioChanges(appState.portfolio.changes);
    setupEventListeners((period) => {
        // Callback for chart period change
        updatePerformanceChart(appState.portfolioHistory, period);
    });

    // Initial portfolio change render (defaults to 7d or whatever is active in HTML)
    // We should find the active one or default to something
    const activePeriodBtn = document.querySelector('.period-selector .period-btn.active');
    const params = activePeriodBtn ? activePeriodBtn.dataset.period : '7d';
    updatePortfolioChange(appState.portfolio.changes[params]);

    // Animate the total amount (use real total if available)
    const amountElement = document.getElementById('totalAmount');
    // Prefer the total from asset allocation as it's the aggregate, but fallback to assets list total if needed
    let totalValue = 847392;
    if (sheetsAllocation) {
        totalValue = Math.floor(sheetsAllocation.totalValue);
    } else if (sheetsAssets) {
        totalValue = Math.floor(sheetsAssets.reduce((sum, a) => sum + a.value, 0));
    }

    animateNumber(amountElement, totalValue, 1500);

    // Update the cents display
    if (sheetsAllocation || sheetsAssets) {
        const value = sheetsAllocation ? sheetsAllocation.totalValue : totalValue;
        const cents = Math.round((value % 1) * 100);
        document.querySelector('.cents').textContent = `.${cents.toString().padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
