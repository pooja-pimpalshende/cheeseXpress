import { Link } from '@tanstack/react-router';

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type }) {
  const base =
    'inline-block rounded-full bg-yellow-500  font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-400 focus:bg-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-3 py-2 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-sm',
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
