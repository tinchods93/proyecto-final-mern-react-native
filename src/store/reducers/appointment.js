const initialState = {
  appointment: {},
};

export const appointmentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const myReducer = {
    GET_APPOINTMENT_OK: { ...state, appointment: payload },
    POST_APPOINTMENT: { ...state, appointment: payload },
  };

  return myReducer[type] || state;
};
