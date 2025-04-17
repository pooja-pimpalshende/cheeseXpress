/* eslint-disable react/prop-types */
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ cheese }) {
  const { id, name, description, price, image_url } = cheese;

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img src={image_url} alt={name} className="h-28 w-28" />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p className="text-sm italic">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">${price}</p>
          {/* {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>} */}
          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
