import { useParams, useSearchParams } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStripePaymentIntentAPI } from "../../apis/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";

const CheckoutForm = () => {
  //Get the payloads
  const params = useParams();

  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");
  const mutation = useMutation({
    mutationFn: createStripePaymentIntentAPI,
  });

  //Stripe configuration
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    try {
      //prepare our data for payment
      const data = {
        amount,
        plan,
      };
      //Make the http request
      const paymentIntent = await mutation.mutateAsync(data);

      const { error, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmCardPayment(paymentIntent?.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (error) {
        setErrorMessage(error?.message);
        return;
      }

      window.location.href = `/success?payment_intent=${confirmedPaymentIntent?.id}`;
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };
  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card details
          </label>
          <div className="rounded-md border border-gray-300 p-3">
            <CardElement
              options={{
                hidePostalCode: false,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#111827",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        {/* Display loading */}
        {mutation?.isPending && (
          <StatusMessage type="loading" message="Proccessing please wait..." />
        )}

        {/* Display success */}
        {mutation?.isError && (
          <StatusMessage
            type="error"
            message={mutation?.error?.response?.data?.error}
          />
        )}
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
