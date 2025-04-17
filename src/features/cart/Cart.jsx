// import { Link } from "react-router-dom";

import { Link } from '@tanstack/react-router';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

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
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Button to="/order/new" type="primary">
          Order cheese
        </Button>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
