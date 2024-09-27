import React from "react";

export default function ThankYouPage() {
  return (
    <div className=" mx-auto p-6 text-center bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Thank You! 🎉</h1>
      <p className="text-xl mb-4">Your order has been placed successfully.</p>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        onClick={() => (window.location.href = "/")}
      >
        Back to Shop
      </button>
    </div>
  );
}
