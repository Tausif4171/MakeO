import { CartItem } from "./CartItem";

export const CartTable = ({ cartItems, updateQuantity, removeItem }) => {
  const headers = ["Product", "Price", "Quantity", "Subtotal"];
  return (
    <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      <table className="w-max sm:min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-header">
                {header}
              </th>
            ))}
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
    </div>
  );
};
