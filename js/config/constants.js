// Asset category mapping with colors and icons
export const ASSET_CATEGORY_MAP = {
    'ETF': { name: 'ETFs', color: '#8B5CF6', icon: '📈' },
    'CRYPTO': { name: 'Crypto', color: '#F7931A', icon: '₿' },
    'CASH TO INVEST (MONO)': { name: 'Cash', color: '#06B6D4', icon: '$', group: 'cash' },
    'CASH TO INVEST (IB)': { name: 'Cash', color: '#06B6D4', icon: '$', group: 'cash' },
    'CASH TO INVEST (WISE)': { name: 'Cash', color: '#06B6D4', icon: '$', group: 'cash' },
    'CASH (REVOLUTE)': { name: 'Cash', color: '#06B6D4', icon: '$', group: 'cash' },
};

// Category mapping from Ukrainian to English with icons and colors
export const EXPENSE_CATEGORY_MAP = {
    'Оренда та житло': { name: 'Housing', icon: '🏠', color: '#8B5CF6' },
    'Кафе та ресторани': { name: 'Food & Dining', icon: '🍔', color: '#EC4899' },
    'Краса та здоров\'я': { name: 'Healthcare', icon: '🏥', color: '#3B82F6' },
    'Транспорт': { name: 'Transportation', icon: '🚗', color: '#F59E0B' },
    'Продукти та супермаркети': { name: 'Groceries', icon: '🛒', color: '#10B981' },
    'Одяг та взуття': { name: 'Shopping', icon: '🛍️', color: '#06B6D4' },
    'Подорожі': { name: 'Travel', icon: '✈️', color: '#6366F1' },
    'Благодійність': { name: 'Charity', icon: '❤️', color: '#EF4444' },
    'Готівка': { name: 'Cash', icon: '💵', color: '#22C55E' },
    'Розваги та спорт': { name: 'Entertainment', icon: '🎬', color: '#A855F7' },
    'Поповнення мобільного': { name: 'Mobile', icon: '📱', color: '#14B8A6' },
    'Інше': { name: 'Other', icon: '📦', color: '#71717A' }
};

// Default budget
export const DEFAULT_BUDGET = 5800;
