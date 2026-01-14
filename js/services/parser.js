import { ASSET_CATEGORY_MAP, EXPENSE_CATEGORY_MAP, DEFAULT_BUDGET } from '../config/constants.js';

// Parse the Google Sheets asset allocation data
export function parseAssetAllocationData(table) {
    const columns = table.cols.map(col => col.label);
    const rows = table.rows;

    console.log('Asset allocation columns:', columns);

    // Find column indices
    const dateIndex = columns.findIndex(c => c.toLowerCase().includes('date'));
    const assetIndex = columns.findIndex(c => c.toLowerCase().includes('asset'));
    const valueIndex = columns.findIndex(c => c.toLowerCase().includes('value') || c.toLowerCase().includes('total'));

    if (dateIndex === -1 || assetIndex === -1 || valueIndex === -1) {
        console.log('Could not find required columns for asset allocation');
        return null;
    }

    // Parse rows and group by date
    const dataByDate = {};

    rows.forEach(row => {
        if (!row.c || !row.c[dateIndex]) return;

        const dateCell = row.c[dateIndex];
        let dateKey = dateCell.f || dateCell.v;

        // Parse Google Sheets date format
        if (typeof dateCell.v === 'string' && dateCell.v.includes('Date')) {
            const dateMatch = dateCell.v.match(/Date\((\d+),(\d+),(\d+)\)/);
            if (dateMatch) {
                const date = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]), parseInt(dateMatch[3]));
                dateKey = date.toISOString().split('T')[0];
            }
        }

        if (!dataByDate[dateKey]) {
            dataByDate[dateKey] = [];
        }

        const assetCell = row.c[assetIndex];
        const valueCell = row.c[valueIndex];

        const assetName = assetCell ? assetCell.v : null;
        const value = valueCell ? (parseFloat(valueCell.v) || 0) : 0;

        if (assetName && value > 0) {
            dataByDate[dateKey].push({
                asset: assetName,
                value: value
            });
        }
    });

    // Get the latest date
    const sortedDates = Object.keys(dataByDate).sort((a, b) => new Date(b) - new Date(a));
    if (sortedDates.length === 0) {
        console.log('No asset allocation data found');
        return null;
    }

    const latestDate = sortedDates[0];
    const latestData = dataByDate[latestDate];
    console.log('Using asset allocation data from:', latestDate, latestData);

    // Group and aggregate data by category
    const aggregated = {};
    let totalValue = 0;

    latestData.forEach(item => {
        const mapping = ASSET_CATEGORY_MAP[item.asset];
        if (!mapping) {
            console.log('Unknown asset type:', item.asset);
            return;
        }

        // Use group key if defined (for grouping cash accounts), otherwise use asset name
        const groupKey = mapping.group || item.asset;

        if (!aggregated[groupKey]) {
            aggregated[groupKey] = {
                name: mapping.name,
                value: 0,
                color: mapping.color
            };
        }

        aggregated[groupKey].value += item.value;
        totalValue += item.value;
    });

    // Calculate percentages and format for chart
    const allocation = Object.values(aggregated)
        .map(item => ({
            name: item.name,
            value: item.value,
            percent: Math.round((item.value / totalValue) * 1000) / 10, // One decimal place
            color: item.color
        }))
        .sort((a, b) => b.value - a.value); // Sort by value descending

    console.log('Parsed asset allocation:', allocation, 'Total:', totalValue);

    return {
        allocation: allocation,
        totalValue: totalValue,
        date: latestDate
    };
}

export function parseAssetsListData(table) {
    const columns = table.cols.map(col => col.label);
    const rows = table.rows;

    console.log('Assets list columns:', columns);

    // Find indices
    const assetIndex = columns.findIndex(c => c === 'Asset');
    const quantityIndex = columns.findIndex(c => c === 'Quantity');
    const priceIndex = columns.findIndex(c => c === 'Price');
    const valueIndex = columns.findIndex(c => c.trim() === 'Total Value');
    const typeIndex = columns.findIndex(c => c === 'Asset Type');

    if (assetIndex === -1 || valueIndex === -1) {
        console.log('Missing required columns for assets list');
        return null;
    }

    let totalPortfolioValue = 0;
    const parsedAssets = [];

    rows.forEach(row => {
        if (!row.c || !row.c[assetIndex]) return;

        const assetName = row.c[assetIndex].v;
        if (!assetName) return;

        const value = row.c[valueIndex] ? (parseFloat(row.c[valueIndex].v) || 0) : 0;
        const quantity = row.c[quantityIndex] ? (parseFloat(row.c[quantityIndex].v) || 0) : 0;
        let price = row.c[priceIndex] ? (parseFloat(row.c[priceIndex].v) || 0) : 0;
        const type = row.c[typeIndex] ? row.c[typeIndex].v : 'Other';

        // If price is missing but we have value and quantity, calculate it
        if (price === 0 && value > 0 && quantity > 0) {
            price = value / quantity;
        }

        totalPortfolioValue += value;

        // Determine category key for internal usage
        let categoryKey = 'other';
        if (type.toUpperCase() === 'ETF') categoryKey = 'etf';
        else if (type.toUpperCase() === 'CRYPTO') categoryKey = 'crypto';
        else if (type.toUpperCase().includes('CASH')) categoryKey = 'cash';
        else if (type.toUpperCase().includes('STOCK')) categoryKey = 'stocks';

        // Get styling
        const mappedStyle = ASSET_CATEGORY_MAP[assetName] || ASSET_CATEGORY_MAP[type.toUpperCase()] || { color: '#71717A', icon: '💰' };

        parsedAssets.push({
            name: assetName, // Using symbol as name for now, or map it if needed
            symbol: assetName,
            category: categoryKey,
            holdings: quantity,
            price: price,
            change24h: (Math.random() * 4) - 2, // Mocking change as it's not in the sheet
            value: value,
            allocation: 0, // Will calculate after total is known
            color: mappedStyle.color,
            icon: mappedStyle.icon
        });
    });

    // Calculate allocations
    parsedAssets.forEach(asset => {
        if (totalPortfolioValue > 0) {
            asset.allocation = Math.round((asset.value / totalPortfolioValue) * 1000) / 10;
        }
    });

    // Sort by value descending
    parsedAssets.sort((a, b) => b.value - a.value);

    console.log(`Parsed ${parsedAssets.length} assets, total value: ${totalPortfolioValue}`);
    return parsedAssets;
}

// Parse the Google Sheets data into our expense format
export function parseExpenseData(table) {
    const columns = table.cols.map(col => col.label);
    const rows = table.rows;

    console.log(columns);
    // Find column indices
    const monthIndex = columns.findIndex(c => c.toLowerCase().includes('month') || c === 'Month');
    const totalIndex = columns.findIndex(c => c.toLowerCase().includes('total') || c === 'Total');

    // Map Ukrainian column names to indices
    const categoryIndices = {};
    columns.forEach((col, index) => {
        console.log(`col: ${col}`);
        if (EXPENSE_CATEGORY_MAP[col]) {
            console.log(`Found ${index}`);
            categoryIndices[col] = index;
        }
    });

    const expensesByMonth = {};

    rows.forEach(row => {
        if (!row.c || !row.c[monthIndex]) return;

        const monthCell = row.c[monthIndex];
        let monthName = monthCell.v;

        // Handle date formatting
        if (monthCell.f) {
            monthName = monthCell.f;
        } else if (typeof monthCell.v === 'string') {
            monthName = monthCell.v;
        } else if (monthCell.v instanceof Date || (typeof monthCell.v === 'string' && monthCell.v.includes('Date'))) {
            // Parse Google Sheets date format
            const dateMatch = String(monthCell.v).match(/Date\((\d+),(\d+),(\d+)\)/);
            if (dateMatch) {
                const date = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]), parseInt(dateMatch[3]));
                monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            }
        }

        if (!monthName || monthName === 'Month') return; // Skip header row

        const totalCell = row.c[totalIndex];
        const total = totalCell ? (parseFloat(totalCell.v) || 0) : 0;

        const categories = [];
        Object.entries(categoryIndices).forEach(([ukName, index]) => {
            const cell = row.c[index];
            const amount = (cell ? (parseFloat(cell.v) || 0) : 0);

            if (amount > 0) {
                const mapping = EXPENSE_CATEGORY_MAP[ukName];
                categories.push({
                    name: mapping.name,
                    amount: amount,
                    icon: mapping.icon,
                    color: mapping.color,
                    originalName: ukName
                });
            }
        });

        // Sort categories by amount (highest first)
        categories.sort((a, b) => b.amount - a.amount);

        expensesByMonth[monthName] = {
            total: total || categories.reduce((sum, c) => sum + c.amount, 0),
            budget: DEFAULT_BUDGET,
            categories: categories
        };
    });

    return expensesByMonth;
}
