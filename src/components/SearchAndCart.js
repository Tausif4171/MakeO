import React from "react";
import cartIcon from "../images/cart.svg";
import searchIcon from "../images/search.svg";

export function SearchAndCart({
  searchQuery,
  setSearchQuery,
  cart,
  handleViewCart,
}) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <img
          src={searchIcon}
          alt="search"
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
        <img alt="cart" src={cartIcon} />
        <span>
          View Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </span>
      </button>
    </div>
  );
}
