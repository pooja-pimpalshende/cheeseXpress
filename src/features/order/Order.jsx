// Test ID: IIDSAT

import { useParams } from '@tanstack/react-router';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiOrder';
import { useQuery } from '@tanstack/react-query';
import OrderItem from './OrderItem';

function Order() {
  const { orderId } = useParams({ strict: false });

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  if (isLoading) return 'Loading....';
  if (error) throw new Error(error.message);

  const {
    id,
    status,
    priority,
    // priority_price,
    orderPrice,
    estimated_delivery,
    cart,
  } = order;

  let priority_price = order.priority_price;
  priority_price = priority ? 0.2 * orderPrice : 0;

  const deliveryIn = calcMinutesLeft(estimated_delivery);
  console.log('--------------------------order------------------', order);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimated_delivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Order Placed: {formatDate(estimated_delivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} key={item.name} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price cheese: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priority_price)}
          </p>
        )}
        <p className="text-sm font-bold text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priority_price)}
        </p>
      </div>
    </div>
  );
}

export default Order;
