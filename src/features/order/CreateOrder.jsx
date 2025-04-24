import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { createOrder } from '../../services/api.CreateOrder';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const userName = useSelector((state) => state.user.userName);

  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      router.navigate({ to: `/order/${data.id}` });
      dispatch(clearCart());
    },
  });

  if (!cart.length) return <EmptyCart />;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === 'on',
    };
    console.log(order);

    const errors = {};
    if (!isValidPhone(order.phone))
      errors.phone =
        'Please give your correct phone number. We might need to contact you!';

    if (Object.keys(errors).length > 0) setFormErrors(errors);
    mutate(order);
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer_name"
            defaultValue={userName}
            className="input grow"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isPending} type="primary">
            {isPending ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
