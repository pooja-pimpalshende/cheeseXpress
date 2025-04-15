import { Link } from '@tanstack/react-router';
import SearchOrder from '../features/order/searchOrder';

function Header() {
  return (
    <div className="bg-yellow-500">
      <Link to="/">CheeseXpress</Link>
      <SearchOrder />
      <p>Pooja</p>
    </div>
  );
}

export default Header;
