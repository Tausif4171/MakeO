import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import cartIcon from "../images/cart.svg";
import searchIcon from "../images/search.svg";
import { products } from "../data/products";

export default function ProductListing() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate("/cart-summary", { state: { cart } });
  };

  useEffect(() => {
    let filtered = products;
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }
    if (sizeFilter) {
      filtered = filtered.filter((product) => product.size === sizeFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [categoryFilter, sizeFilter, searchQuery]);

  const resetFilters = () => {
    setCategoryFilter("");
    setSizeFilter("");
    setSearchQuery("");
  };

  const addToCart = (product) => {
    if (selectedProducts[product.id]) {
      const quantity = quantities[product.id] || 1;
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity }]);
      }
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: Math.max(
        1,
        Math.min(
          value,
          products.find((p) => p.id === productId).availableQuantity
        )
      ),
    });
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts({
      ...selectedProducts,
      [productId]: !selectedProducts[productId],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="dropdown">
            <div className="flex flex-col items-start gap-y-2">
              <label className=" font-semibold text-[16px]">Category</label>
              <button tabIndex={0} className="btn w-28 capitalize">
                {categoryFilter || ""}
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <button onClick={() => setCategoryFilter("hoodie")}>
                  Hoodie
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter("t-shirt")}>
                  T-Shirt
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter("jacket")}>
                  Jacket
                </button>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div className="flex flex-col items-start gap-y-2">
              <label className=" font-semibold text-[16px]">Size</label>
              <button tabIndex={0} className="btn w-14">
                {sizeFilter || ""}
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <button onClick={() => setSizeFilter("S")}>S</button>
              </li>
              <li>
                <button onClick={() => setSizeFilter("M")}>M</button>
              </li>
              <li>
                <button onClick={() => setSizeFilter("L")}>L</button>
              </li>
              <li>
                <button onClick={() => setSizeFilter("XL")}>XL</button>
              </li>
            </ul>
          </div>
          <button className="btn btn-secondary md:mt-8" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="flex items-center gap-4 md:mt-8">
          <div className="relative">
            <img
              alt=""
              src={searchIcon}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
              style={{ outline: "none" }}
            />
          </div>
          <button
            className="btn gap-x-2 btn-primary"
            style={{ display: "flex" }}
            onClick={handleViewCart}
          >
            <img alt="" src={cartIcon} />
            <span>
              View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.color}</td>
                <td>
                  {product.inStock
                    ? `In Stock (${product.availableQuantity})`
                    : "Out of Stock"}
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center gap-2">
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
                      className="input input-bordered w-16"
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addToCart(product)}
                      disabled={
                        !product.inStock || !selectedProducts[product.id]
                      }
                    >
                      <img alt="" src={cartIcon} className="h-4 w-4" />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
