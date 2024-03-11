//Reducers store the data
const authReducer = (
  state = {
    data: null,
    otpSent: false,
    verificationData: null,
    generatedOTP: null,
    isOTPVerified: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    case "OTP_SENT_SUCCESS":
      return { ...state, otpSent: true };
    case "OTP_SENT_FAILURE":
      return { ...state, otpSent: false };
    case "OTP_VERIFICATION_SUCCESS":
      return { ...state, verificationData: action.payload, error: null };

    case "OTP_VERIFICATION_FAILURE":
      return { ...state, verificationData: null, error: action.payload };
    case "SET_OTP_VERIFICATION_STATUS":
      return {
        ...state,
        isOTPVerified: action.payload,
      };
    case "SET_GENERATED_OTP":
      return { ...state, generatedOTP: action.payload };
    default:
      return state;
  }
};

export default authReducer;
