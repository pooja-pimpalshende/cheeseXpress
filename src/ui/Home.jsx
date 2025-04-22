import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className="my-10 px-4 text-center sm:py-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The Best Cheese.
        <br />
        <p className="text-yellow-500">From our shelves, straight to you.</p>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
