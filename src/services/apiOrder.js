import supabase from "./supabase";

export async function getOrder(customId) {
  console.log("Fetching order with ID:", customId);
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("custom_id", customId)
    .single();

  console.log(data);
  if (error || !data) {
    throw new Error(`Couldn't find order #${customId}`);
  }
  return data;
}
