// Test ID: IIDSAT

import { useParams } from "@tanstack/react-router";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiOrder";
import { useQuery } from "@tanstack/react-query";

// const order = {
//   id: "ABCDEF",
//   customer: "Pooja",
//   phone: "123456789",
//   address: "Hofmos st , Oslo",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       cheese_id: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       cheese_id: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       cheese_id: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const { orderId } = useParams({ strict: false });

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  if (isLoading) return "Loading....";
  if (error) throw new Error(error.message);

  const {
    id,
    status,
    priority,
    priority_price,
    order_price,
    estimated_delivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimated_delivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimated_delivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimated_delivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(order_price)}</p>
        {priority && <p>Price priority: {formatCurrency(priority_price)}</p>}
        <p>
          To pay on delivery: {formatCurrency(order_price + priority_price)}
        </p>
      </div>
    </div>
  );
}

export default Order;
