import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchTrending = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch trending");

  return res.json();
};

function TrendingCoins() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  if (isLoading) return <p>Loading trending...</p>;

  return (
    <div className="trending-section">
      <h2>🔥 Trending</h2>
      <div className="trending-grid">
        {data.coins.slice(0, 6).map((item) => (
          <div
            key={item.item.id}
            className="trending-card"
            onClick={() => navigate(`/coin/${item.item.id}`)}
          >
            <img src={item.item.large} alt={item.item.name} width="40" />
            <div>
              <h3>{item.item.name}</h3>
              <p>#{item.item.market_cap_rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingCoins;
