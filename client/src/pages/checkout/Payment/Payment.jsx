import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { IoCardOutline } from "react-icons/io5";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
      fontFamily: "Inter, sans-serif",
    },
    invalid: { color: "#9e2146" },
  },
};

const Payment = ({ totalBill, onPay, isProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe not loaded yet.");
      return;
    }

    if (!cardComplete) {
      setError("Please fill in all card details.");
      return;
    }

    setProcessing(true);
    setError(null);

    // Check if we're using a real publishable key or the placeholder
    // Access the stripe instance's _apiKey (not public API, but works for this check)
    const isMockKey = stripe._apiKey && stripe._apiKey.includes("YOUR_PUBLISHABLE_KEY");

    if (isMockKey) {
      // Simulate payment without calling Stripe API
      setTimeout(() => {
        setProcessing(false);
        onPay(); // advance to confirmation
      }, 1500);
    } else {
      // Real key – try to create a payment method
      try {
        const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (stripeError) {
          setError(stripeError.message);
          setProcessing(false);
          return;
        }

        // Success – simulate final step
        setTimeout(() => {
          setProcessing(false);
          onPay();
        }, 1000);
      } catch (err) {
        setError("Payment failed. Please try again.");
        setProcessing(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-2">
        <div className="flex items-center gap-2">
          <IoCardOutline className="text-PrimaryBlue text-xl" />
          <span className="text-sm font-medium">🔐 Secure checkout – powered by Stripe</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Test mode: use <span className="font-mono">4242 4242 4242 4242</span>, any future expiry, any CVC.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="card" className="text-sm font-medium text-gray-700">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-PrimaryBlue focus-within:border-transparent">
            <CardElement
              id="card"
              options={CARD_ELEMENT_OPTIONS}
              onChange={(e) => {
                setCardComplete(e.complete);
                setError(e.error ? e.error.message : null);
              }}
            />
          </div>
        </div>

        {error && <div className="text-red-600 text-sm mt-1">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || processing || isProcessing || !cardComplete}
          className="mt-4 py-3 text-base text-white font-medium bg-PrimaryBlue rounded-lg border border-PrimaryBlue hover:bg-blue-700 transition duration-200 font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing || isProcessing ? "Processing..." : `Pay ₹${totalBill}0`}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-2">
        This is a mock – no real payment will be processed.
      </p>
    </div>
  );
};

export default Payment;