
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails";
import Exchanges from "./pages/Exchanges";
import NFTs from "./pages/NFTs";
import Favorites from "./pages/Favorites";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/nfts" element={<NFTs />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
