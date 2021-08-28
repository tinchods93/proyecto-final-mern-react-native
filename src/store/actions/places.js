import { getPlaces } from '../../api/index';
import { REFRESH_PLACES, SELECT_PLACE } from '../constants';

//Actions Sync
export const selectPlace = (payload) => ({
  type: SELECT_PLACE,
  payload,
});

//Actions Async
export const refreshPlaces = () => {
  return async (dispatch) => {
    const places = await getPlaces();
    dispatch({
      type: REFRESH_PLACES,
      payload: places,
    });
  };
};
