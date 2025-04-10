/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";

function Error({ error }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        `${error?.message} || ${error.data} || failed to fetch`
      </p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
