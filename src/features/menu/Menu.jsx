import { getMenu } from '../../services/apiMenu';
import MenuItem from './MenuItem';
import { useQuery } from '@tanstack/react-query';

function Menu() {
  const {
    isLoading,
    data: menu,
    error,
  } = useQuery({
    queryKey: ['cheese'],
    queryFn: getMenu,
  });

  if (isLoading) return 'Loading....';

  if (error) throw new Error(error.message);

  return (
    <ul className="grid grid-cols-1 gap-15 divide-y divide-stone-200 px-2 md:grid-cols-3">
      {menu.map((cheese) => (
        <MenuItem cheese={cheese} key={cheese.id} />
      ))}
    </ul>
  );
}

export default Menu;
