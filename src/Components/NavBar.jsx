import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CryptoDash</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>

        <Link to="/exchanges" className={location.pathname === "/exchanges" ? "active" : ""}>
          Exchanges
        </Link>

        <Link to="/nfts" className={location.pathname === "/nfts" ? "active" : ""}>
          NFTs
        </Link>

        <Link to="/favorites" className={location.pathname === "/favorites" ? "active" : ""}>
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;