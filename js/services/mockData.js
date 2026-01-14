// Generate historical portfolio data
export function generateHistoricalData(days, startValue, endValue) {
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

// ===== Mock Data =====
export const mockData = {
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
