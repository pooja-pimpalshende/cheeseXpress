/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ cheese }) {
  const { id, name, description, image_url } = cheese;

  return (
    <li>
      <img src={image_url} alt={name} />
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <div>
          {/* {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>} */}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
