/* eslint-disable react/prop-types */
import LinkButton from './LinkButton';

function Error({ error }) {
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error?.message || error.data}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
