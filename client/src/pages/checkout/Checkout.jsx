import NavBar from "../../components/NavBar";
import Shipping from "./Shipping";
import Payment from "./Payment/Payment";
import Confirm from "./Payment/Confirm";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { AiOutlineLine } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useState } from "react";
import ShippingImage from "./shipping.png";
import { useNavigate } from "react-router-dom";
import { useCheckoutContext } from "../../contexts/checkoutContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual test publishable key
const stripePromise = loadStripe("pk_test_51T8fHA2Hyxr683CLuXelwwfkKB0g3ZyLFN6Lciq9bGYNBBk1yXJqyEeSly2MBUR8qgHottRym199bfUcnW9NcXnB00Sv2jBbU9");

const CheckoutPage = () => {
  const [shipping, setShipping] = useState(true);
  const [payment, setPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { totalBill } = useCheckoutContext();
  const navigate = useNavigate();
console.log(totalBill)
  const handleMockPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus(true);
      setConfirmation(true);
      setPayment(false);
    }, 1500);
  };

  const handleBack = () => {
    if (payment) {
      setPayment(false);
      setPaymentStatus(false);
      setShipping(true);
    } else if (confirmation) {
      setConfirmation(false);
      setPayment(true);
    } else if (shipping) {
      navigate(-1);
    }
  };

  return (
    <>
      <NavBar />
      <div className="checkOut lg:flex lg:mb-10 lg:mt-4">
        <div className="left lg:w-2/3 xl:w-1/2">
          {/* Back button */}
          <div
            className="flex items-center gap-0.5 mx-4 md:ml-3 xl:ml-6 w-fit xl:text-xl hover:underline cursor-pointer transition duration-200"
            onClick={handleBack}
          >
            <IoChevronBackOutline />
            <span className="font-Volkho">Back</span>
          </div>

          {/* Status indicator */}
          <div className="status md:ml-6 xl:ml-10 xl:text-xl flex flex-wrap gap-2 items-center mx-4 mt-4">
            <span className="text-md font-['Inter'] text-lightBlue">
              Shipping
            </span>
            <div className="break flex gap-1 text-lg pt-1">
              <AiOutlineLine
                className={paymentStatus ? "text-lightBlue" : "text-zinc-400"}
              />
              <IoCheckmarkDoneCircleSharp
                className={paymentStatus ? "text-lightBlue" : "text-zinc-400"}
              />
              <AiOutlineLine
                className={paymentStatus ? "text-lightBlue" : "text-zinc-400"}
              />
            </div>
            <span
              className={`text-md font-['Inter'] ${
                paymentStatus ? "text-lightBlue" : "text-zinc-400"
              }`}
            >
              Payment
            </span>
            <div className="break flex gap-1 text-lg pt-1">
              <AiOutlineLine
                className={confirmation ? "text-lightBlue" : "text-zinc-400"}
              />
              <IoCheckmarkDoneCircleSharp
                className={confirmation ? "text-lightBlue" : "text-zinc-400"}
              />
              <AiOutlineLine
                className={confirmation ? "text-lightBlue" : "text-zinc-400"}
              />
            </div>
            <span className="text-md font-['Inter'] text-slate-600">
              Confirmation
            </span>
          </div>

          {/* Form container */}
          <div className="form md:mx-10 w-fit md:px-10 md:py-10 mt-8 mb-6 rounded-xl shadow-lg border border-slate-200 bg-white flex flex-col mx-5 py-8 px-4 gap-4">
            {shipping && <Shipping />}
            {shipping && (
              <button
                className="py-3 mt-3 text-base text-white font-medium bg-PrimaryBlue rounded-lg border border-PrimaryBlue hover:bg-blue-700 transition duration-200 font-['Inter']"
                onClick={() => {
                  setShipping(false);
                  setPayment(true);
                  setPaymentStatus(true);
                }}
              >
                Continue to Payments
              </button>
            )}

            {payment && (
              <Elements stripe={stripePromise}>
                <Payment
                  totalBill={totalBill}
                  onPay={handleMockPayment}
                  isProcessing={isProcessing}
                />
              </Elements>
            )}

            {confirmation && <Confirm />}
          </div>
        </div>

        {/* Image */}
        <div className="right hidden lg:flex pt-3 pr-5">
          <img
            src={ShippingImage}
            alt="Checkout"
            className="w-full object-cover rounded-md px-10"
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;