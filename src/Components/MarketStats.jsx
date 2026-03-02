import { useQuery } from "@tanstack/react-query";

const fetchGlobalData = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/global",
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch global data");

  return res.json();
};

function MarketStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["global"],
    queryFn: fetchGlobalData,
  });

  if (isLoading || !data) return null;

  const { total_market_cap, total_volume, market_cap_percentage } = data.data;

  return (
    <div className="market-stats">
      <div className="stat">
        <span className="stat-label">Market Cap</span>
        <span className="stat-value">${(total_market_cap.usd / 1e12).toFixed(2)}T</span>
      </div>
      <div className="stat">
        <span className="stat-label">24h Volume</span>
        <span className="stat-value">${(total_volume.usd / 1e9).toFixed(2)}B</span>
      </div>
      <div className="stat">
        <span className="stat-label">BTC Dominance</span>
        <span className="stat-value">{market_cap_percentage.btc.toFixed(1)}%</span>
      </div>
      <div className="stat">
        <span className="stat-label">ETH Dominance</span>
        <span className="stat-value">{market_cap_percentage.eth.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default MarketStats;
