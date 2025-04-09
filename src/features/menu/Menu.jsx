import { getMenu } from "../../services/apiMenu";
import MenuItem from "./MenuItem";
import { useQuery } from "@tanstack/react-query";

function Menu() {
  const {
    isPending,
    data: menu,
    error,
  } = useQuery({
    queryKey: ["cheese"],
    queryFn: getMenu,
  });

  if (isPending) return "Loading....";
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
