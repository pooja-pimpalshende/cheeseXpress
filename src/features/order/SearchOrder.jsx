import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    router.navigate({ to: '/order/$orderId', params: { orderId: query } });
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="transition:all focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-600 focus:outline-none sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
