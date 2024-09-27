import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import minusIcon from "../images/minus.svg";
import plusIcon from "../images/plus.svg";
import cancelIcon from "../images/cancel.svg";

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
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-4">
                      <button
                        className="p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <img
                          className="h-4 w-4"
                          alt="Remove"
                          src={cancelIcon}
                        />
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">£{item.price.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 border rounded-md"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <img
                          className="h-4 w-4"
                          alt="Decrease"
                          src={minusIcon}
                        />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="p-1 border rounded-md"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <img
                          className="h-4 w-4"
                          alt="Increase"
                          src={plusIcon}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-right">
                    £{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
