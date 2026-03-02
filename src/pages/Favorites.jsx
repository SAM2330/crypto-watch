import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchWatchlistCoins = async (ids) => {
  if (!ids.length) return [];
  
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(",")}`,
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch watchlist");

  return res.json();
};

function Favorites() {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const { data, isLoading } = useQuery({
    queryKey: ["watchlist", watchlist],
    queryFn: () => fetchWatchlistCoins(watchlist),
    enabled: watchlist.length > 0,
  });

  const removeFromWatchlist = (e, coinId) => {
    e.stopPropagation();
    const updated = watchlist.filter(id => id !== coinId);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  if (watchlist.length === 0) {
    return (
      <div className="container">
        <h1>⭐ Favorites</h1>
        <p>No favorites yet. Star some coins to add them here!</p>
      </div>
    );
  }

  if (isLoading) return <p>Loading favorites...</p>;

  return (
    <div className="container">
      <h1>⭐ Favorites</h1>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin) => (
              <tr
                key={coin.id}
                className="clickable"
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <td>{coin.market_cap_rank}</td>

                <td className="coin-cell">
                  <img src={coin.image} alt={coin.name} width="25" />
                  {coin.name}
                </td>

                <td>${coin.current_price.toLocaleString()}</td>

                <td className={coin.price_change_percentage_24h > 0 ? "price-positive" : "price-negative"}>
                  {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
                </td>

                <td>${coin.market_cap.toLocaleString()}</td>
                
                <td>
                  <button 
                    className="watchlist-btn"
                    onClick={(e) => removeFromWatchlist(e, coin.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Favorites;
