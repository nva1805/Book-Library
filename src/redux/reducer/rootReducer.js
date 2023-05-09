import { combineReducers } from 'redux'
import myBookReducer from './myBookReducer';
import userReducer from './userReducer';
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
    //state
  userReducer: userReducer,
  myBook: myBookReducer,
  bookReducer
});

export default rootReducer
