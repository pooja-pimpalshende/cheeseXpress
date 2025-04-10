import { getMenu } from "../../services/apiMenu";
import MenuItem from "./MenuItem";
import { useQuery } from "@tanstack/react-query";

function Menu() {
  const {
    isLoading,
    data: menu,
    error,
  } = useQuery({
    queryKey: ["cheese"],
    queryFn: getMenu,
  });

  if (isLoading) return "Loading....";
  console.log("Menu loader data:", menu);

  return (
    <>
      <ul>
        {menu.map((cheese) => (
          <MenuItem cheese={cheese} key={cheese.id} />
        ))}
      </ul>
    </>
  );
}

export default Menu;
