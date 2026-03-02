import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fetchChartData = async (id, days) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  if (!res.ok) throw new Error("Failed to fetch chart data");

  return res.json();
};

function PriceChart({ coinId }) {
  const [days, setDays] = useState(7);

  const { data, isLoading, error } = useQuery({
    queryKey: ["chart", coinId, days],
    queryFn: () => fetchChartData(coinId, days),
  });

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart</p>;

  const formattedData = data.prices.map((item) => ({
    time: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }));

  return (
    <div style={{ marginTop: "30px" }}>
      <div className="chart-controls">
        <button 
          className={days === 7 ? "active" : ""}
          onClick={() => setDays(7)}
        >
          7D
        </button>
        <button 
          className={days === 30 ? "active" : ""}
          onClick={() => setDays(30)}
        >
          30D
        </button>
        <button 
          className={days === 90 ? "active" : ""}
          onClick={() => setDays(90)}
        >
          90D
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="time"  />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceChart;