import LinkButton from './LinkButton';

export default function NotFoundRoute() {
  return (
    <div>
      <h1>Oops! This page doesn’t exist 😔</h1>
      <p>Try navigating to a different page.</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}
