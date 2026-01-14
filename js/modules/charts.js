let performanceChart, allocationChart, expensesChart, miniChart;

// Chart.js default configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#A1A1AA';

export function initCharts(allocationData, historyData, expensesData) {
    initMiniChart(historyData);
    initAllocationChart(allocationData);
    initPerformanceChart(historyData);
    initExpensesChart(expensesData);
}

function initMiniChart(historyData) {
    const ctx = document.getElementById('portfolioMiniChart').getContext('2d');
    const data = historyData['6m']; // Default view

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

function initAllocationChart(allocationData) {
    if (!allocationData || allocationData.length === 0) return;
    const ctx = document.getElementById('allocationChart').getContext('2d');

    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: allocationData.map(a => a.name),
            datasets: [{
                data: allocationData.map(a => a.value),
                backgroundColor: allocationData.map(a => a.color),
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
                            // Safe access to data source
                            const dataset = context.chart.data.datasets[0];
                            // We need the original allocation data to get percents, or recompute
                            // Ideally, store it in dataset custom property, but simpler is to use the data passed in context if mapped correctly.
                            // The chart data index maps to allocationData index
                            const item = allocationData[context.dataIndex];
                            return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })} (${item.percent}%)`;
                        }
                    }
                }
            }
        }
    });

    const legendContainer = document.getElementById('allocationLegend');
    if (legendContainer) {
        legendContainer.innerHTML = allocationData.map(a => `
            <div class="legend-item">
                <div class="legend-left">
                    <div class="legend-color" style="background: ${a.color}"></div>
                    <span class="legend-name">${a.name}</span>
                </div>
                <span class="legend-value">${a.percent}%</span>
            </div>
        `).join('');
    }
}

function initPerformanceChart(historyData) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const data = historyData['6m']; // Default

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

function initExpensesChart(expensesData) {
    const ctx = document.getElementById('expensesChart').getContext('2d');
    // Default to first available month or whatever specified
    // Actually we should separate init from update.
    // Init with empty or first month.
    const monthKey = Object.keys(expensesData.months)[0];
    const monthData = expensesData.months[monthKey];

    if (!monthData) return;

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
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

export function updatePerformanceChart(historyData, period) {
    if (!performanceChart || !historyData) return;
    const data = historyData[period];
    if (data) {
        performanceChart.data.labels = data.labels;
        performanceChart.data.datasets[0].data = data.data;
        performanceChart.update('none');
    }
}

export function updateExpensesChartData(monthData) {
    if (!expensesChart) return;
    expensesChart.data.labels = monthData.categories.map(c => c.name);
    expensesChart.data.datasets[0].data = monthData.categories.map(c => c.amount);
    expensesChart.data.datasets[0].backgroundColor = monthData.categories.map(c => c.color);
    expensesChart.update('none');
}
