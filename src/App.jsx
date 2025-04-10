import { Outlet } from "@tanstack/react-router";
import Header from "./ui/Header";
import CartOverview from "./features/cart/CartOverview";
import { useIsFetching } from "@tanstack/react-query";
import Loader from "./ui/Loader";

function App() {
  const isFectching = useIsFetching();
  return (
    <div className="layout">
      {isFectching > 0 && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default App;
