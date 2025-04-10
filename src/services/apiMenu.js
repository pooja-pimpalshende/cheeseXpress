import supabase from "./supabase";

export async function getMenu() {
  const { data, error } = await supabase.from("cheese").select("*");

  if (error) {
    throw new Error("Menu could not be loaded!");
  }

  return data;
}
