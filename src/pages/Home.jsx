import MarketStats from "../Components/MarketStats";
import TrendingCoins from "../Components/TrendingCoins";
import CoinList from "../Components/CoinList";

function Home(){
 return (
    <div>
      <MarketStats />
      <div className="container">
        <TrendingCoins />
      </div>
      <CoinList />
    </div>
  );
}
export default Home;