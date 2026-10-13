import { useState } from "react";
import "./OrderPage.css";

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    qty: 1,
  });

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};

    if (v.name.trim().length < 2) {
      e.name = "Name too short";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) {
      e.email = "Enter a valid email";
    }

    if (Number(v.qty) < 1) {
      e.qty = "Qty must be ≥ 1";
    }

    return e;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const found = validate(form);

    setErrors(found);

    if (Object.keys(found).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="success-message">
        Thanks, {form.name}! <br />
        Your order has been received.
      </div>
    );
  }

  return (
    <div className="order-page">
      <h2>Place Your Order</h2>

      <form className="order-form" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Quantity</label>
          <input
            name="qty"
            type="number"
            value={form.qty}
            onChange={handleChange}
          />
          {errors.qty && <span className="error">{errors.qty}</span>}
        </div>

        <button className="order-btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
