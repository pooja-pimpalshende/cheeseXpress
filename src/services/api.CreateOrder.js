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

  console.log('orderData', orderData);
  return orderData;
}
