import supabase from './supabase';

export async function updateOrder(id, updateObj) {
  console.log('*********************', id, updateObj);

  const { data, error } = await supabase
    .from('orders')
    .update(updateObj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed updating your order`);
  }
  console.log('********************* data', data);

  return data;
}
