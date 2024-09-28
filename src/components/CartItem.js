import minusIcon from "../images/minus.svg";
import plusIcon from "../images/plus.svg";
import cancelIcon from "../images/cancel.svg";

export const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <tr key={item.id} className="hover:bg-gray-100">
      <td className="py-2 px-4">
        <div className="flex items-center space-x-4">
          <button className="p-0" onClick={() => removeItem(item.id)}>
            <img className="h-4 w-4" alt="Remove" src={cancelIcon} />
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
      <td className="py-2 px-4">${item.price.toFixed(2)}</td>
      <td className="py-2 px-4">
        <div className="flex items-center space-x-2">
          <button
            className="p-1 border rounded-md"
            onClick={() => updateQuantity(item.id, -1)}
          >
            <img className="h-4 w-4" alt="Decrease" src={minusIcon} />
          </button>
          <span>{item.quantity}</span>
          <button
            className="p-1 border rounded-md"
            onClick={() => updateQuantity(item.id, 1)}
          >
            <img className="h-4 w-4" alt="Increase" src={plusIcon} />
          </button>
        </div>
      </td>
      <td className="py-2 px-4 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
};
