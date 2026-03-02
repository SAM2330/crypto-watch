import { useQuery } from "@tanstack/react-query";

const fetchExchanges = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/exchanges?per_page=20",
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch exchanges");

  return res.json();
};

function Exchanges() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchanges,
  });

  if (isLoading) return <p>Loading exchanges...</p>;
  if (error) return <p>Error loading exchanges</p>;

  return (
    <div className="container">
      <h1>Top Exchanges</h1>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Exchange</th>
              <th>Trust Score</th>
              <th>24h Volume (BTC)</th>
              <th>Year Established</th>
            </tr>
          </thead>
          <tbody>
            {data.map((exchange, index) => (
              <tr key={exchange.id}>
                <td>{index + 1}</td>
                
                <td className="coin-cell">
                  <img src={exchange.image} alt={exchange.name} width="25" />
                  {exchange.name}
                </td>
                
                <td>{exchange.trust_score}/10</td>
                
                <td>{exchange.trade_volume_24h_btc?.toFixed(2) ?? "N/A"}</td>
                
                <td>{exchange.year_established ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exchanges;
