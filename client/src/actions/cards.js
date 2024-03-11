import axios from "axios";

export const fetchCardsLoading = () => ({
  type: "FETCH_CARDS_LOADING",
});

export const fetchCards = () => async (dispatch) => {
  try {
    dispatch(fetchCardsLoading());
    const { data } = await axios.get("http://localhost:5000/api/uploads");
    dispatch({ type: "FETCH_CARDS_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_CARDS_FAILURE", payload: error.message });
  }
};
