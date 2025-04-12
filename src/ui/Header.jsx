import { Link } from "@tanstack/react-router";
import SearchOrder from "../features/order/searchOrder";

function Header() {
  return (
    <div>
      <Link to="/">CheeseXpress</Link>
      <SearchOrder />
      <p>Pooja</p>
    </div>
  );
}

export default Header;
