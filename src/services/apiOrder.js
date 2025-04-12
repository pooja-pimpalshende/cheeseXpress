import supabase from "./supabase";

export async function getOrder(id) {
  console.log("Fetching order with ID:", id);
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  console.log(data);
  if (error || !data) {
    throw new Error(`Couldn't find order #${id}`);
  }
  return data;
}
