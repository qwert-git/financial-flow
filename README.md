# FinanceFlow - Personal Finance Dashboard

A modern, responsive personal finance dashboard that visualizes data directly from Google Sheets. It tracks assets, expenses, and portfolio performance in real-time.

## Features

-   **Google Sheets Integration**: Fetches real-time data for assets and expenses.
-   **Asset Allocation**: Visualizes portfolio distribution (Crypto, ETFs, Stocks, Cash).
-   **Expense Tracking**: Monthly expense breakdown by category.
-   **Responsive Design**: Works on desktop and mobile.
-   **Dark Mode**: Sleek UI with Chart.js visualizations.
-   **Privacy Focused**: Configuration is kept local; sensitive IDs are not committed to git.

## Setup Instructions

### 1. Prerequisites
-   A modern web browser.
-   Python 3 (for running a local server) or any other static file server (e.g., `http-server` via npm).

### 2. Configuration
1.  Navigate to `js/config/`.
2.  Copy the example config file:
    ```bash
    cp js/config/config.example.js js/config/config.js
    ```
3.  Open `js/config/config.js` and replace the placeholder values with your Google Sheets IDs and GIDs.
    *   **sheetId**: The long string in your Google Sheet URL.
    *   **GIDs**: The `gid` parameter for the specific tabs (found in the URL).

> **Important**: Ensure your Google Sheet is "Published to the Web" (File > Share > Publish to web) so the API can access it.

### 3. Running the Application
Due to browser security policies (CORS) regarding ES6 Modules, you cannot simply open `index.html` in your browser. You must serve the application via a local HTTP server.

**Using Python 3:**
Run the following command in the project root:
```bash
python3 -m http.server 8080
```

**Using Node.js (http-server):**
```bash
npx http-server .
```

### 4. Accessing the Dashboard
Open your browser and navigate to:
[http://localhost:8080](http://localhost:8080)

## Project Structure

```
├── index.html          # Main HTML entry point
├── index.css           # Global styles and design system
├── js/
│   ├── app.js          # Main application controller & state management
│   ├── config/         # Configuration files
│   │   ├── config.js   # (Ignored by Git) Secret configuration
│   │   └── constants.js # Static mappings and defaults
│   ├── modules/        # UI components and Chart logic
│   ├── services/       # Data fetching and parsing services
│   └── utils/          # Helper functions (e.g., animations)
└── README.md           # This file
```

## Technologies
-   HTML5, CSS3, JavaScript (ES6 Modules)
-   Chart.js (Data Visualization)
-   Google Sheets API (Data Source)
