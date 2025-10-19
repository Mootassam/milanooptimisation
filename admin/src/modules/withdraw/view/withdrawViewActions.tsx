import CouponsService from 'src/modules/withdraw/withdrawService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'WITHDRAW_VIEW';

const couponsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: couponsViewActions.FIND_STARTED,
      });

      const record = await CouponsService.find(id);

      dispatch({
        type: couponsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: couponsViewActions.FIND_ERROR,
      });

      getHistory().push('/withdraw');
    }
  },
};

export default couponsViewActions;
