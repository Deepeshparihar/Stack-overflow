import * as api from "../api";

export const initiatePayment =
  (adjustedAmount, userName, userId) => async (dispatch) => {
    try {
      const response = await api.initiatePayment({
        adjustedAmount,
        userName,
        userId,
      });
      const orderId = response && response.data.order_id;

      if (orderId) {
        const options = {
          key: "rzp_test_vP9XgMpTDWdTS4",
          amount: adjustedAmount * 100,
          currency: "INR",
          name: "StackOverflow Membership",
          description: "Subscription Payment",
          order_id: orderId,
          callback_url: `https://stack-ovelflow-clone.onrender.com/payment/paymentverification?amount=${adjustedAmount}&userName=${userName}&userId=${userId}`,

          prefill: {
            name: userName,
            email: "john@example.com",
            contact: "9999999999",
          },
        };
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();

        dispatch({
          type: "INITIATE_PAYMENT_SUCCESS",
          payload: response,
        });
        return response;
      } else {
        console.error("Failed to get orderId");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      dispatch({
        type: "INITIATE_PAYMENT_FAIL",
      });
      console.log(error);
    }
  };
