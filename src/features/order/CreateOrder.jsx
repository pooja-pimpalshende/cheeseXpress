import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { createOrder } from '../../services/api.CreateOrder';
import { generateTimestampId } from '../../utils/helpers';
import Button from '../../ui/Button';

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
          <input type="text" name="customer_name" className="input" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" className="input" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" className="input" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
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
          <Button disabled={isPending}>
            {isPending ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
