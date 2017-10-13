import { combineReducers } from 'redux';
import { currentUserReducer, userProfileReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';

const reducers = combineReducers({
  currentUser: currentUserReducer,
  userProfile: userProfileReducer,
  modalState: modalStateReducer,
  modalPage: modalPageReducer
});

export default reducers;