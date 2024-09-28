export const CartTotals = ({ subtotal, handleCheckout }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-2 font-bold">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};
