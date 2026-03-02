# 🚀 CryptoWatch

A modern, real-time cryptocurrency tracking dashboard built with React and powered by the CoinGecko API.

🔗 **Live Demo:** [https://crypto-watch-phi.vercel.app/](https://crypto-watch-phi.vercel.app/)

## ✨ Features

- 📊 **Real-time Market Data** - Live prices, market cap, and 24h changes for top cryptocurrencies
- 🔥 **Trending Coins** - See what's hot in the crypto market
- 📈 **Interactive Price Charts** - View historical price data (7D, 30D, 90D)
- 🔍 **Global Search** - Search through thousands of cryptocurrencies
- ⭐ **Favorites/Watchlist** - Save your favorite coins (stored locally)
- 🏦 **Exchange Rankings** - Top crypto exchanges by volume and trust score
- 🎨 **NFT Collections** - Browse popular NFT collections
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Theme** - Easy on the eyes

## 🛠️ Tech Stack

- **React** - UI library
- **React Router** - Navigation
- **TanStack Query** - Data fetching and caching
- **Recharts** - Chart visualization
- **CoinGecko API** - Cryptocurrency data
- **Vite** - Build tool
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- CoinGecko API key (free tier)

### Installation

1. Clone the repository
```bash
git clone https://github.com/SAM2330/crypto-watch.git
cd crypto-watch
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
VITE_COINGECKO_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔑 Getting a CoinGecko API Key

1. Visit [CoinGecko API](https://www.coingecko.com/en/api)
2. Sign up for a free account
3. Get your demo API key from the dashboard
4. Add it to your `.env` file

## 📁 Project Structure

```
crypto-tracker/
├── src/
│   ├── Components/
│   │   ├── CoinList.jsx
│   │   ├── MarketStats.jsx
│   │   ├── TrendingCoins.jsx
│   │   ├── PriceChart.jsx
│   │   ├── NavBar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CoinDetails.jsx
│   │   ├── Exchanges.jsx
│   │   ├── NFTs.jsx
│   │   └── Favorites.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
└── package.json
```

## 🌐 Deployment

This project is deployed on Vercel. To deploy your own:

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add `VITE_COINGECKO_API_KEY` as an environment variable
4. Deploy!

## 📝 Features Breakdown

### Home Page
- Global market statistics (total market cap, 24h volume, BTC/ETH dominance)
- Trending cryptocurrencies
- Sortable coin list with search functionality
- Pagination for browsing more coins

### Coin Details
- Detailed information about individual cryptocurrencies
- Interactive price charts with multiple timeframes
- Current price, market cap, and other metrics

### Exchanges
- Top cryptocurrency exchanges ranked by trust score
- 24h trading volume in BTC
- Year established information

### NFTs
- Browse popular NFT collections
- Collection names and symbols

### Favorites
- Personal watchlist of favorite coins
- Persistent storage using localStorage
- Quick access to tracked cryptocurrencies

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/en/api)
- Built with React and modern web technologies

## 📧 Contact

For questions or feedback, feel free to reach out!

---

⭐ If you found this project helpful, please give it a star!
