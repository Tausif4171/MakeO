import cartIcon from "../images/cart.svg";

export function ProductTable({
  products,
  quantities,
  selectedProducts,
  handleQuantityChange,
  handleCheckboxChange,
  addToCart,
}) {
  const headers = ["Image", "Name", "Color", "Stock", "Price", "Buy"];
  return (
    <div
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="py-2 px-4 text-left">{product.name}</td>
                <td className="py-2 px-4 text-left">{product.color}</td>
                <td className="py-2 px-4 text-left">
                  {product.inStock
                    ? `In Stock (${product.availableQuantity})`
                    : "Out of Stock"}
                </td>
                <td className="py-2 px-4 text-left">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 text-left">
                  <div className="flex items-center gap-2 justify-start">
                    <input
                      type="number"
                      min="1"
                      max={product.availableQuantity}
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      className="input input-bordered w-16 text-center"
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(product)}
                      disabled={
                        !product.inStock || !selectedProducts[product.id]
                      }
                    >
                      <img alt="cart" src={cartIcon} className="h-4 w-4" />
                    </button>
                    <input
                      type="checkbox"
                      checked={selectedProducts[product.id] || false}
                      onChange={() => handleCheckboxChange(product.id)}
                      disabled={!product.inStock}
                      className="checkbox checkbox-primary"
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
