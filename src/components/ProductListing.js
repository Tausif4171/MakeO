import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../json/products.json";
import { Filters } from "./Filters";
import { ProductTable } from "./ProductTable";
import { SearchAndCart } from "./SearchAndCart";

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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
        <Filters
          categoryFilter={categoryFilter}
          sizeFilter={sizeFilter}
          setCategoryFilter={setCategoryFilter}
          setSizeFilter={setSizeFilter}
          resetFilters={resetFilters}
        />
        <SearchAndCart
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cart={cart}
          handleViewCart={handleViewCart}
        />
      </div>
      <ProductTable
        products={filteredProducts}
        quantities={quantities}
        selectedProducts={selectedProducts}
        handleQuantityChange={handleQuantityChange}
        handleCheckboxChange={handleCheckboxChange}
        addToCart={addToCart}
      />
    </div>
  );
}
