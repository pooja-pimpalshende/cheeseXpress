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
    <li className="flex flex-col gap-4 rounded-lg border border-stone-100 p-5 py-2 pt-0.5 shadow-lg">
      <div className="flex grow flex-col">
        <img src={image_url} alt={name} className="w-100% h-60 rounded-lg" />
        <p className="mt-2 mb-2 font-bold">{name}</p>
        <p className="mb-4 text-sm italic">{description}</p>
        <div className="mt-auto">
          <p className="text-sm">${price}</p>
          {/* {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>} */}
        </div>
      </div>
      <div className="flex flex-col content-end">
        {isInCart && (
          <div className="flex justify-between sm:gap-8">
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
    </li>
  );
}

export default MenuItem;
