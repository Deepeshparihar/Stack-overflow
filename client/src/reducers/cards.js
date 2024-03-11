const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CARDS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_CARDS_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_CARDS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cardReducer;
