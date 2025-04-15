import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { createOrder } from '../../services/api.CreateOrder';
import { generateTimestampId } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    cheese_id: 12,
    name: 'Cheddar',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    cheese_id: 6,
    name: 'Brie',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    cheese_id: 11,
    name: 'Gouda',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const cart = fakeCart;

  const { mutate, isPending, error } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      navigate({ to: `/order/${data.custom_id}` });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(formData);

    const customId = generateTimestampId();

    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === 'on',
      custom_id: customId,
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
    <div>
      <h2>Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="customer_name" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isPending}
            className="inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-400 focus:bg-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
          >
            {isPending ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
