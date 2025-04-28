import { Link } from '@tanstack/react-router';
import SearchOrder from '../features/order/searchOrder';
import Username from '../features/user/UserName';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="text-xl font-semibold tracking-wide capitalize">
        CheeseXpress
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
