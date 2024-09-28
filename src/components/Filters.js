import dropdownIcon from "../images/dropdown.svg";

export function Filters({
  categoryFilter,
  sizeFilter,
  setCategoryFilter,
  setSizeFilter,
  resetFilters,
}) {
  return (
    <div className="flex flex-row gap-4">
      <div className="dropdown">
        <div className="flex flex-col items-start">
          <label tabIndex={0} className="btn w-32">
            <div className="flex items-center w-full capitalize justify-between">
              <span>{categoryFilter || "Category"}</span>
              <img src={dropdownIcon} alt="dropdown icon" className="w-4 h-4" />
            </div>
          </label>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
        >
          <li>
            <button onClick={() => setCategoryFilter("hoodie")}>Hoodie</button>
          </li>
          <li>
            <button onClick={() => setCategoryFilter("t-shirt")}>
              T-Shirt
            </button>
          </li>
          <li>
            <button onClick={() => setCategoryFilter("jacket")}>Jacket</button>
          </li>
        </ul>
      </div>

      <div className="dropdown">
        <div className="flex flex-col items-start">
          <label tabIndex={0} className="btn w-24">
            <div className="flex w-full items-center justify-between">
              <span>{sizeFilter || "Size"}</span>
              <img src={dropdownIcon} alt="dropdown icon" className="w-4 h-4" />
            </div>
          </label>
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

      <button className="btn btn-primary" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}
