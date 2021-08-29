const initialState = {
  selected: null,
  places: [],
};

export const placesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const myReducer = {
    REFRESH_PLACES: { ...state, places: payload },
    SELECT_PLACE: { ...state, selected: payload },
    DELETE_PLACE: state,
    POST_PLACE: state,
    UPDATE_PLACE: state
  };

  return myReducer[type] || state;
};
