/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { addItem } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import { getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/updateItemQuantity';

function MenuItem({ cheese }) {
  const dispatch = useDispatch();
  const { id, name, description, price, image_url } = cheese;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      cheese_id: id,
      name,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img src={image_url} alt={name} className="h-28 w-28" />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p className="text-sm italic">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">${price}</p>
          {/* {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>} */}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                cheeseId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem cheeseId={id} />
            </div>
          )}
          {!isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
