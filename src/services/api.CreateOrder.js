import supabase from './supabase';

export async function createOrder(newOrder) {
  console.log('newOrder', newOrder);

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('name', newOrder.customer_name)
    .single();

  let userId;

  if (userError) {
    const { data: newUser, error: newUserError } = await supabase
      .from('users')
      .insert([
        {
          name: newOrder.customer_name,
          phone_number: newOrder.phone,
          address: newOrder.address,
        },
      ])
      .select('id')
      .single();

    if (newUserError) {
      throw new Error('Failed to create or fetch user!');
    }

    userId = newUser.id;
  } else {
    userId = userData.id;
  }

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        priority: newOrder.priority,
        estimated_delivery: new Date().toISOString(),
        priority_price: 25,
        status: 'preparing',
      },
    ])
    .select()
    .single();

  if (orderError) {
    throw new Error('Failed creating your order!');
  }

  const orderId = orderData.id;

  const orderItems = newOrder.cart.map((item) => ({
    order_id: orderId,
    cheese_id: item.cheese_id,
    quantity: item.quantity,
  }));

  const { error: orderItemError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (orderItemError) {
    throw new Error('Failed to create order items!');
  }

  console.log('orderData', orderData);
  console.log('orderItems', orderItems);
  return orderData;
  // return { order: orderData, orderItems };
}
