import { Outlet } from '@tanstack/react-router';
import Header from './ui/Header';
import CartOverview from './features/cart/CartOverview';
import { useIsFetching } from '@tanstack/react-query';
import Loader from './ui/Loader';

function App() {
  const isFectching = useIsFetching();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isFectching > 0 && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default App;
