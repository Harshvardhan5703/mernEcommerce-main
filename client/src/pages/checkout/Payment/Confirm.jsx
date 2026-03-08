import React from "react";
import { useCheckoutContext } from "../../../contexts/checkoutContext";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const { address, totalBill } = useCheckoutContext();
  const navigate = useNavigate();

  // Generate a dummy order number (in a real app, this would come from the backend)
  const orderNumber = "ORD-" + Math.floor(Math.random() * 1000000);

  // Calculate a dummy delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4); // 4 days later
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col w-full gap-6">
      <h2 className="text-2xl xl:text-3xl font-semibold text-gray-800">
        Order Confirmed!
      </h2>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <p className="text-green-700 flex items-center gap-2">
          <IoCheckmarkDoneCircleSharp className="text-green-600 text-xl" />
          Payment successful via Stripe
        </p>
      </div>

      <div className="border-t border-b py-4 flex flex-col gap-3">
        <p className="text-sm text-gray-500">
          Order number: <span className="font-mono text-gray-800">{orderNumber}</span>
        </p>
        <p className="text-sm text-gray-500">
          Estimated delivery: <span className="font-medium text-gray-800">{formattedDate}</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <div className="text-gray-700 space-y-1">
          <p>{address.name}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.pincode}
          </p>
          <p>{address.country}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-lg">
          Total paid:{" "}
          <span className="font-bold text-PrimaryBlue">
            ₹{Number(totalBill)}0
          </span>
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-4 py-2 px-6 bg-PrimaryBlue text-white rounded-lg hover:bg-blue-700 transition self-start"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Confirm;