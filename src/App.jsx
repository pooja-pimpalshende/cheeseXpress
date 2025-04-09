import { Outlet } from "@tanstack/react-router";
import Header from "./ui/Header";
import CartOverview from "./features/cart/CartOverview";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default App;
