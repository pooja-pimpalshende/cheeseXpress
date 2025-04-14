// Test ID: IIDSAT

import { useParams } from "@tanstack/react-router";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiOrder";
import { useQuery } from "@tanstack/react-query";

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
