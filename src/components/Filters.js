import { useState } from "react";
import dropdownIcon from "../images/dropdown.svg";

export function Filters({
  categoryFilter,
  sizeFilter,
  setCategoryFilter,
  setSizeFilter,
  resetFilters,
}) {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isSizeOpen, setSizeOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setCategoryOpen(false);
  };

  const handleSizeSelect = (size) => {
    setSizeFilter(size);
    setSizeOpen(false);
  };

  return (
    <div className="flex flex-row gap-3 sm:gap-4">
      <div className="dropdown">
        <div className="flex flex-col items-start">
          <label
            tabIndex={0}
            className="btn px-3 sm:px-5 w-28 sm:w-32"
            onClick={() => setCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center w-full capitalize justify-between">
              <span>{categoryFilter || "Category"}</span>
              <img src={dropdownIcon} alt="dropdown icon" className="w-4 h-4" />
            </div>
          </label>
        </div>
        {isCategoryOpen && (
          <ul className="dropdown-content mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li>
              <button onClick={() => handleCategorySelect("hoodie")}>
                Hoodie
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect("t-shirt")}>
                T-Shirt
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect("jacket")}>
                Jacket
              </button>
            </li>
          </ul>
        )}
      </div>

      <div className="dropdown">
        <div className="flex flex-col items-start">
          <label
            tabIndex={0}
            className="btn p-3 sm:px-5 w-20 sm:w-24"
            onClick={() => setSizeOpen(!isSizeOpen)}
          >
            <div className="flex w-full items-center justify-between">
              <span>{sizeFilter || "Size"}</span>
              <img src={dropdownIcon} alt="dropdown icon" className="w-4 h-4" />
            </div>
          </label>
        </div>
        {isSizeOpen && (
          <ul className="dropdown-content mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li>
              <button onClick={() => handleSizeSelect("S")}>S</button>
            </li>
            <li>
              <button onClick={() => handleSizeSelect("M")}>M</button>
            </li>
            <li>
              <button onClick={() => handleSizeSelect("L")}>L</button>
            </li>
            <li>
              <button onClick={() => handleSizeSelect("XL")}>XL</button>
            </li>
          </ul>
        )}
      </div>

      <button className="btn btn-primary" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}
