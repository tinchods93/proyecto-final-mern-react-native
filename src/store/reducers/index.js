import { combineReducers } from 'redux';
import { placesReducer } from './places';
import { appointmentReducer } from './appointment';

const rootReducer = (state = {}, action) => {
  return state;
};

export default combineReducers({
  rootReducer,
  appointmentReducer,
  placesReducer,
});
