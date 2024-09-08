# Project Documentation

##
**Demo video**: https://youtu.be/qa6kOZNOd-0

## Overview
This project is a web application that provides real-time updates on token balances and transaction history for a Solana wallet. It includes features such as a balance table, transaction table, and asset breakdown chart.

## Languages and Frameworks Used

### Frontend
- **React**: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components.
- **JavaScript (ES6+)**: The primary programming language used for the frontend logic.
- **HTML5**: The standard markup language for creating web pages.
- **CSS3**: Used for styling the web application.

### Libraries and Tools
- **ApexCharts**: A modern charting library used to create the asset breakdown chart.
- **Solana Web3.js**: A JavaScript API for interacting with the Solana blockchain. It provides methods for fetching token balances, transaction history, and more.
- **Solana Wallet Adapter**: A set of tools and components for integrating Solana wallets into the application.
- **CoinGecko API**: Used to fetch real-time price changes for tokens.

### Backend
- **Solana Blockchain**: The decentralized blockchain platform used for managing and interacting with tokens and transactions.

### Development Tools
- **Visual Studio Code**: A popular code editor used for writing and managing the project code.
- **Git**: A version control system used for tracking changes in the codebase.
- **GitHub**: A platform for hosting and collaborating on the project repository.

## Installation and Setup
1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/your-repo/project-name.git
    cd project-name
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    npm start
    ```

## Features
- **Real-Time Balance Updates**: Displays the current token balances in the wallet.
- **Transaction History**: Shows the latest transactions with details such as date, TXID, platform, type, outgoing, and incoming amounts.
- **Asset Breakdown Chart**: Visual representation of the token distribution in the wallet.

## Usage
- **Balance Table**: Displays the token balances and their 24-hour price changes.
- **Transaction Table**: Lists recent transactions with details.
- **Asset Breakdown Chart**: Provides a visual breakdown of the assets in the wallet.