import { useQuery } from "@tanstack/react-query";

const fetchNFTs = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/nfts/list?per_page=50",
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch NFTs");

  return res.json();
};

function NFTs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nfts"],
    queryFn: fetchNFTs,
  });

  if (isLoading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error loading NFTs</p>;

  return (
    <div className="container">
      <h1>NFT Collections</h1>
      
      <div className="nft-grid">
        {data.map((nft) => (
          <div key={nft.id} className="nft-card">
            <h3>{nft.name}</h3>
            <p>{nft.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTs;
