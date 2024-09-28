import { CartItem } from "./CartItem";

export const CartTable = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 text-left text-[14px]">Product</th>
          <th className="py-2 px-4 text-[14px]">Price</th>
          <th className="py-2 px-4 text-left text-[14px]">Quantity</th>
          <th className="py-2 px-4 text-right text-[14px]">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        ) : (
          <tr>
            <td colSpan="4" className="py-4 text-center text-gray-500">
              Your cart is empty
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
