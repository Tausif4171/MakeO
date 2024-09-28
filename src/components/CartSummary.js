import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CartTotals } from "./CartTotals";
import { CartTable } from "./CartTable";

export default function CartSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cart || []);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/thank-you");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Cart Summary</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <CartTable
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>
        <div className="lg:w-1/3">
          <CartTotals subtotal={subtotal} handleCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
