//Action is used to disptch any update or modifying data i.e. stores by reducers
import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const sendOTP = (email, generatedOTP) => async (dispatch) => {
  try {
    await api.sendOTP(email, generatedOTP);
    dispatch({ type: "OTP_SENT_SUCCESS" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    dispatch({ type: "OTP_SENT_FAILURE" });
  }
};

export const setOTPVerificationStatus = (isOTPVerified) => ({
  type: "SET_OTP_VERIFICATION_STATUS",
  payload: isOTPVerified,
});

export const verifyOTP = (email, enteredOTP) => async (dispatch, getState) => {
  try {
    const response = await api.verifyOTP({ email, enteredOTP });
    if (response.status === 200) {
      dispatch({ type: "OTP_VERIFICATION_SUCCESS" });
      dispatch(setOTPVerificationStatus(true));
      alert("Verification Successful");
    } else {
      dispatch({ type: "OTP_VERIFICATION_FAILURE" });
      alert("Invalid OTP, please try again");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    dispatch({ type: "OTP_VERIFICATION_FAILURE" });
    alert("Error verifying OTP, please try again");
  }
};
