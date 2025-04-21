import supabase from './supabase';

export async function getOrder(id) {
  console.log('Fetching order with ID:', id);
  const { data: orderData, orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (orderError || !orderData) {
    throw new Error(`Couldn't find order #${id}`);
  }
  const orderId = orderData.id;

  console.log('----------------- order data', orderData);

  const { data: orderItem, orderItemError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (orderItemError || !orderItem) {
    throw new Error(`Couldn't find orderItem #${orderItem.id}`);
  }
  console.log('----------------- orderItem data', orderItem);

  let orderPrice = 0;
  const detailedItems = await Promise.all(
    orderItem.map(async (item) => {
      const { data: cheeseData, cheeseDataError } = await supabase
        .from('cheese')
        .select('*')
        .eq('id', item.cheese_id)
        .single();

      if (cheeseDataError || !cheeseData) {
        throw new Error(
          `Couldn't find cheeseData for cheese Id #${item.cheese_id}`,
        );
      }

      const totalPrice = item.quantity * cheeseData.price;
      orderPrice += totalPrice;

      return {
        name: cheeseData.name,
        quantity: item.quantity,
        totalPrice,
      };
    }),
  );

  const response = {
    ...orderData,
    cart: detailedItems,
    orderPrice,
  };

  console.log('Constructed order data:', response);
  return response;
}
