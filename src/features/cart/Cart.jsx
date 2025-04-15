// import { Link } from "react-router-dom";

import { Link } from '@tanstack/react-router';

const fakeCart = [
  {
    cheese_id: 12,
    name: 'Cheddar',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    cheese_id: 6,
    name: 'Brie',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    cheese_id: 11,
    name: 'Gouda',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div>
      <Link to="/menu" className="text-sm text-blue-500 hover:text-blue-600">
        &larr; Back to menu
      </Link>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Link to="/order/new">Order pizzas</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
