import NotificationService from 'src/modules/notification/notificationService';
import selectors from 'src/modules/notification/list/notificationListSelectors';
import Errors from 'src/modules/shared/error/errors';
import types from 'src/modules/notification/list/notificationListActionTypes';
import { Dispatch } from 'redux';

const notificationListActions = {
  doReset: () => async (dispatch: Dispatch) => {
    dispatch({ type: types.RESETED });
    dispatch<any>(notificationListActions.doFetch());
  },

  doChangePagination:
    (pagination: any) => async (dispatch: Dispatch) => {
      dispatch({
        type: types.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch<any>(notificationListActions.doFetchCurrentFilter());
    },

  doRead: (values) => async (dispatch) => {
    try {
      dispatch({
        type: types.CREATE_STARTED,
      });

      // Execute the creation first
      await NotificationService.makeAsRead(values);

      dispatch({
        type: types.CREATE_SUCCESS,
      });
      await Promise.all([
        dispatch(notificationListActions.doFetch()),
        dispatch(notificationListActions.doCountUnread())

      ])

      // Execute all independent dispatches in parallel



    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: types.CREATE_ERROR,
      });
    }
  },



  doChangeSort:
    (sorter: any) => async (dispatch: Dispatch) => {
      dispatch({
        type: types.SORTER_CHANGED,
        payload: sorter,
      });
      dispatch<any>(notificationListActions.doFetchCurrentFilter());
    },

  doFetchCurrentFilter: () => async (dispatch: Dispatch, getState: any) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch<any>(notificationListActions.doFetch(filter, rawFilter, true));
  },

  doFetch:
    (filter?: any, rawFilter?: any, keepPagination = false) =>
      async (dispatch: Dispatch, getState: any) => {
        try {
          dispatch({
            type: types.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });

          const response = await NotificationService.list(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

          dispatch({
            type: types.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);
          dispatch({ type: types.FETCH_ERROR });
        }
      },

  doCountUnread: () => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.COUNT_STARTED });

      const response = await NotificationService.countUnreadByUser();

      dispatch({
        type: types.COUNT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: types.COUNT_ERROR });
    }
  },
};

export default notificationListActions;
