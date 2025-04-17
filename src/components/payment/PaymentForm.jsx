// PaymentForm.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
// import { addPaymentRec } from "../../redux/services";
const stripe_public_key = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
import PropTypes from "prop-types";
import { createPaymentApi } from "../../redux/services/subscription";
const stripePromise = loadStripe(stripe_public_key);
const PaymentForm = ({ clientSecret, afterPayment }) => {
  console.log("🚀 ~ PaymentForm ~ afterPayment:", afterPayment);
  const { token, user, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setMessage(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        afterPayment && (await afterPayment());
        dispatch(
          await createPaymentApi(token, {
            userId: user?.ownerId ? user?.ownerId : user_id,
            amount: paymentResult?.paymentIntent?.amount,
            currency: paymentResult?.paymentIntent?.currency,
            status: "succeeded",
            paymentMethod:
              paymentResult?.paymentIntent?.payment_method_types[0],
            stripePaymentId: paymentResult?.paymentIntent?.id,
          })
        );
        setMessage("Payment successful!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-100 p-3 ">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
            className="outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && (
          <div
            className={`text-center mt-2 text-${
              message.includes("successful") ? "green" : "red"
            }-600`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};
PaymentForm.propTypes = {
  clientSecret: PropTypes.string,
  afterPayment: PropTypes.func,
};
const StripePayment = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripePayment;
