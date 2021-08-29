import { getPlaces, deletePlacesById, newPlace, updatePlace } from '../../api/index';
import * as CONSTANTS from '../constants/places';

//Actions Dispatchs
export const selectPlace = (payload) => ({
  type: CONSTANTS.SELECT_PLACE,
  payload,
});

export const postPlace = () => ({ type: CONSTANTS.DELETE_PLACE });
export const postPlaceOk = (postedPlace) => ({
  type: CONSTANTS.POST_PLACE_OK,
  payload: postedPlace,
});
export const postPlaceError = (err) => ({
  type: CONSTANTS.POST_PLACE_ERROR,
  payload: err,
});

export const patchPlace = () => ({ type: CONSTANTS.PATCH_PLACE });
export const patchPlaceOk = (patchedPlace) => ({
  type: CONSTANTS.PATCH_PLACE_OK,
  payload: patchedPlace,
});
export const patchPlaceError = (err) => ({
  type: CONSTANTS.PATCH_PLACE_ERROR,
  payload: err,
});

export const deletePlace = () => ({ type: CONSTANTS.DELETE_PLACE });
export const deletePlaceOk = (deletedPlace) => ({
  type: CONSTANTS.DELETE_PLACE_OK,
  payload: deletedPlace,
});
export const deletePlaceError = (err) => ({
  type: CONSTANTS.DELETE_PLACE_ERROR,
  payload: err,
});

//Actions Sync
export const selectPlaceAction = (payload) => ({
  type: CONSTANTS.SELECT_PLACE,
  payload,
});

//Actions Async
export const refreshPlaces = () => {
  return async (dispatch) => {
    const places = await getPlaces();
    dispatch({
      type: CONSTANTS.REFRESH_PLACES,
      payload: places,
    });
  };
};

export const deletePlaceAction = (id) => {
  return async (dispatch) => {
    dispatch(deletePlace());
    try {
      const deletedPlace = await deletePlacesById(id);
      dispatch(deletePlaceOk(deletedPlace));
      dispatch(refreshPlaces());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(deletePlaceError(message));
    }
  };
};

export const postPlaceAction = (data) => {
  return async (dispatch) => {
    dispatch(postPlace());
    try {
      const createdPlace = await newPlace(data);
      dispatch(postPlaceOk(createdPlace));
      dispatch(refreshPlaces());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(postPlaceError(message));
    }
  };
};

export const patchPlaceAction = (data) => {
  return async (dispatch) => {
    dispatch(patchPlace());
    try {
      console.log('DATA UPDATE=>', data);
      const updatedPlace = await updatePlace(data);
      dispatch(patchPlaceOk(updatedPlace));
      dispatch(refreshPlaces());
    } catch (e) {
      console.log(e);
      const { message } = e;
      dispatch(patchPlaceError(message));
    }
  };
};
