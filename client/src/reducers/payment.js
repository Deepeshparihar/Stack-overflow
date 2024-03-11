const initialState = {
  orderId: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIATE_PAYMENT_SUCCESS":
      return {
        ...state,
        orderId: action.payload.orderId,
      };
    case "INITIATE_PAYMENT_FAIL":
      return {
        ...state,
        orderId: null,
      };
    default:
      return state;
  }
};

export default paymentReducer;
