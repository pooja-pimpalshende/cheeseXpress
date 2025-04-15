import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold">
        The Best Cheese.
        <br />
        <p className="text-yellow-500">From our shelves, straight to you.</p>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
