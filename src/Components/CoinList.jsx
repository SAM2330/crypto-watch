import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchCoins = async (page) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}`,
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch coins");
  }

  return res.json();
};

const searchCoins = async (query) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${query}`,
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to search");

  return res.json();
};

function CoinList() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["coins", page],
    queryFn: () => fetchCoins(page),
    keepPreviousData: true,
    enabled: !search,
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    if (!search) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const result = await searchCoins(search);
        setSearchResults(result.coins);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const toggleWatchlist = (e, coinId) => {
    e.stopPropagation();
    setWatchlist(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  if (isLoading) return <p>Loading coins...</p>;
  if (error) return <p>Error loading coins</p>;

  const displayCoins = searchResults || data;

  const sortedCoins = searchResults ? displayCoins : [...displayCoins].sort((a, b) => {
    if (sortBy === "price") return b.current_price - a.current_price;
    if (sortBy === "change")
      return (
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
      );
    return b.market_cap - a.market_cap;
  });

  return (
    <div className="container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="market_cap">Market Cap</option>
          <option value="price">Price</option>
          <option value="change">24h Change</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
              <th>⭐</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin) => (
              <tr
                key={coin.id}
                className="clickable"
                onClick={() => navigate(`/coin/${coin.id}`)}
              >
                <td>{searchResults ? "-" : coin.market_cap_rank}</td>

                <td className="coin-cell">
                  <img src={searchResults ? coin.large : coin.image} alt={coin.name} width="25" />
                  {coin.name}
                </td>

                <td>{searchResults ? "-" : `$${coin.current_price.toLocaleString()}`}</td>

                <td className={searchResults ? "" : (coin.price_change_percentage_24h > 0 ? "price-positive" : "price-negative")}>
                  {searchResults ? "-" : `${coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%`}
                </td>

                <td>{searchResults ? "-" : `$${coin.market_cap.toLocaleString()}`}</td>
                
                <td>
                  <button 
                    className="watchlist-btn"
                    onClick={(e) => toggleWatchlist(e, coin.id)}
                  >
                    {watchlist.includes(coin.id) ? "⭐" : "☆"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={searchResults}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={searchResults}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinList;
