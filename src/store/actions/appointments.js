import { getAppointmentByDni, newAppointment } from '../../api/appointments';
import * as CONSTANTS from '../constants/appointments';

export const postAppointment = () => ({ type: CONSTANTS.POST_APPOINTMENT });
export const postAppointmentOk = (appointment) => ({
  type: CONSTANTS.POST_APPOINTMENT_OK,
  payload: appointment,
});
export const postAppointmentError = (err) => ({
  type: CONSTANTS.POST_APPOINTMENT_ERROR,
  payload: err,
});

export const getAppointment = () => ({ type: CONSTANTS.GET_APPOINTMENT });
export const getAppointmentOk = (appointment) => ({
  type: CONSTANTS.GET_APPOINTMENT_OK,
  payload: appointment,
});
export const getAppointmentError = (err) => ({
  type: CONSTANTS.GET_APPOINTMENT_ERROR,
  payload: err,
});

export const getAppointmentAction = (data) => {
  return async (dispatch) => {
    try {
      const appointment = await getAppointmentByDni(data.dni);
      dispatch(getAppointmentOk(appointment));
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(getAppointmentError(message));
    }
  };
};

export const postAppointmentAction = (data) => {
  return async (dispatch) => {
    dispatch(postAppointment());
    try {
      const appointment = await newAppointment(data);
      dispatch(postAppointmentOk(appointment));
      dispatch(getAppointmentOk(appointment));
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(postPlaceError(message));
    }
  };
};
