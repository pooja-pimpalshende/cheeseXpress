export default function NotFoundRoute() {
  return (
    <div>
      <h1>Oops! This page doesn’t exist 😔</h1>
      <p>Try navigating to a different page.</p>
      <button onClick={() => window.history.back()}>&larr; Go back</button>
    </div>
  );
}
