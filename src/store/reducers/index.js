import { combineReducers } from 'redux';
import { placesReducer } from './places';

const rootReducer = (state = {}, action) => {
  return state;
};

export default combineReducers({
  rootReducer,
  placesReducer,
});
