import { GOOGLE_SHEETS_CONFIG } from '../config/config.js';
import { EXPENSE_CATEGORY_MAP } from '../config/constants.js';
import { parseExpenseData, parseAssetAllocationData, parseAssetsListData } from './parser.js';

// ===== Fetch Expenses from Google Sheets =====
export async function fetchExpensesFromGoogleSheets() {
    // Try multiple approaches to fetch the sheet data
    // Note: The gviz/tq endpoint supports CORS when accessed from a proper origin (not file://)
    const approaches = [
        // Approach 1: By specific GID (from published URL)
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&gid=${GOOGLE_SHEETS_CONFIG.expensesSheetGid}`,
        // Approach 2: By sheet name
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(GOOGLE_SHEETS_CONFIG.expensesSheetName)}`,
        // Approach 3: Default first visible sheet
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json`
    ];

    for (const url of approaches) {
        try {
            console.log('Trying to fetch from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                console.log('HTTP error, trying next approach...');
                continue;
            }

            const text = await response.text();

            // Google returns JSONP-like response, need to extract the JSON
            const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
            if (!jsonMatch) {
                console.log('Could not parse response format, trying next approach...');
                continue;
            }

            const data = JSON.parse(jsonMatch[1]);

            if (data.status !== 'ok') {
                console.log('Query status not ok:', data.errors);
                continue;
            }

            // Check if this looks like expense data (has the expected columns)
            const columns = data.table.cols.map(col => col.label);
            const hasExpenseColumns = columns.some(c =>
                c === 'Total' ||
                c === 'Month' ||
                Object.keys(EXPENSE_CATEGORY_MAP).includes(c)
            );

            if (!hasExpenseColumns) {
                console.log('Sheet does not appear to contain expense data, trying next approach...');
                continue;
            }

            const result = parseExpenseData(data.table);
            if (result && Object.keys(result).length > 0) {
                console.log('Successfully parsed expense data');
                return result;
            }
        } catch (error) {
            console.log('Error with this approach:', error.message);
            continue;
        }
    }

    console.error('All approaches to fetch Google Sheets data failed');
    return null;
}

// ===== Fetch Asset Allocation from Google Sheets =====
export async function fetchAssetAllocationFromGoogleSheets() {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&gid=${GOOGLE_SHEETS_CONFIG.assetAllocationSheetGid}`;

    try {
        console.log('Fetching asset allocation from:', url);
        const response = await fetch(url);

        if (!response.ok) {
            console.log('HTTP error fetching asset allocation');
            return null;
        }

        const text = await response.text();

        // Google returns JSONP-like response, need to extract the JSON
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
        if (!jsonMatch) {
            console.log('Could not parse asset allocation response format');
            return null;
        }

        const data = JSON.parse(jsonMatch[1]);

        if (data.status !== 'ok') {
            console.log('Asset allocation query status not ok:', data.errors);
            return null;
        }

        return parseAssetAllocationData(data.table);
    } catch (error) {
        console.error('Error fetching asset allocation:', error.message);
        return null;
    }
}

// ===== Fetch Assets List from Google Sheets =====
export async function fetchAssetsListFromGoogleSheets() {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(GOOGLE_SHEETS_CONFIG.assetsSheetName)}`;

    try {
        console.log('Fetching assets list from:', url);
        const response = await fetch(url);

        if (!response.ok) {
            console.log('HTTP error fetching assets list');
            return null;
        }

        const text = await response.text();
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
        if (!jsonMatch) {
            console.log('Could not parse assets list response format');
            return null;
        }

        const data = JSON.parse(jsonMatch[1]);
        if (data.status !== 'ok') {
            console.log('Assets list query status not ok:', data.errors);
            return null;
        }

        return parseAssetsListData(data.table);
    } catch (error) {
        console.error('Error fetching assets list:', error.message);
        return null;
    }
}
