import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    router.navigate({ to: "/order/$orderId", params: { orderId: query } });
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
