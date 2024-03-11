const questionReducer = (
  state = { data: null, questionCountToday: null, currentUserAmount: null },
  action
) => {
  switch (action.type) {
    case "POST_QUESTION":
      return { ...state };
    case "POST_ANSWER":
      return { ...state };
    case "FETCH_ALL_QUESTIONS":
      return { ...state, data: action.payload };
    case "GET_QUESTION_COUNT_TODAY":
      return { ...state, questionCountToday: action.payload };
    case "GET_CURRENT_USER_AMOUNT":
      return { ...state, currentUserAmount: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
