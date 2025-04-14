import supabase from "./supabase";

export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    throw new Error("Failed creating your order!");
  }
  console.log("data", data);
  return data;
}
