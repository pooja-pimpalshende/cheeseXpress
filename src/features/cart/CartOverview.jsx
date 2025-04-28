import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-center gap-20 bg-yellow-500 bg-gradient-to-bl px-4 py-4 text-sm font-bold text-stone-900 uppercase sm:px-6 md:gap-150 md:text-base">
      <p className="space-x-4 font-semibold text-stone-900 sm:space-x-6">
        <span>{totalCartQuantity} cheese</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
