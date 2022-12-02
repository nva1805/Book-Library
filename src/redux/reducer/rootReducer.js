import { combineReducers } from 'redux'
import myBookReducer from './myBookReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    //state
  userReducer: userReducer,
  myBook: myBookReducer
});

export default rootReducer