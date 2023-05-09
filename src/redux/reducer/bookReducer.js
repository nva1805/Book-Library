import { CURRENT_API_URL } from "../action/types";

const INITIAL_STATE = {
  currentApiUrl: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENT_API_URL:
      console.log(action);
      return {
        ...state,
        currentApiUrl: action.payload.split(".json")[0],
      };
    default:
      return state;
  }
};

export default userReducer;
