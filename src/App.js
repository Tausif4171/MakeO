import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductListingPage from "./components/ProductListing";
import CartSummary from "./components/CartSummary";
import ThankYou from "./components/Thankyou";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/cart-summary" element={<CartSummary />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
