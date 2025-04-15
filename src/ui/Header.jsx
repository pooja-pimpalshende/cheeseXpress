import { Link } from '@tanstack/react-router';
import SearchOrder from '../features/order/searchOrder';
import Username from '../features/user/UserName';

function Header() {
  return (
    <header className="border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase">
      <Link to="/" className="tracking-wide capitalize">
        CheeseXpress
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
