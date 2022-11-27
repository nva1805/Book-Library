import { combineReducers } from 'redux'
import userReducer from './userReducer';

const rootReducer = combineReducers({
    //state
  userReducer: userReducer
});

export default rootReducer