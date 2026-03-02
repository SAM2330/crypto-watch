import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PriceChart from "../Components/PriceChart";

const fetchCoinDetails = async (id) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`,
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch coin details");

  return res.json();
};

function CoinDetails() {
  const { id } = useParams();

  const { data: coin, isLoading, error } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading coin</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>

      <p>Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>

      <PriceChart coinId={id} />
    </div>
  );
}

export default CoinDetails;