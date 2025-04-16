/* eslint-disable react/prop-types */
import { Link, useRouter } from '@tanstack/react-router';

function LinkButton({ children, to }) {
  const router = useRouter();
  const className = 'text-sm text-blue-500 hover:text-blue-600 cursor-pointer';

  if (to === '-1')
    return (
      <button className={className} onClick={() => router.history.back()}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
