import supabase from "./supabase";

export async function createOrder(newOrder) {
  console.log("newOrder", newOrder);
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        custom_id: newOrder.custom_id,
        customer_name: newOrder.customer_name,
        phone: newOrder.phone,
        address: newOrder.address,
        cart: newOrder.cart,
        priority: newOrder.priority,
        order_price: newOrder.order_price,
        priority_price: newOrder.priority_price,
        estimated_delivery: new Date().toISOString(),
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("Failed creating your order!");
  }
  console.log("data", data);
  return data;
}
