import selectors from 'src/modules/withdraw/list/withdrawListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/withdraw/list/withdrawListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import WithdrawService from 'src/modules/withdraw/withdrawService';

const prefix = 'WITHDRAW_LIST';

const withdrawListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,


  COUNT_STARTED: `${prefix}_COUNT_STARTED`,
  COUNT_SUCCESS: `${prefix}_COUNT_SUCCESS`,
  COUNT_ERROR: `${prefix}_COUNT_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: withdrawListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: withdrawListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: withdrawListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: withdrawListActions.RESETED,
    });

    dispatch(withdrawListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: withdrawListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await WithdrawService.list(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.withdraw.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: withdrawListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: withdrawListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: withdrawListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        withdrawListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: withdrawListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(withdrawListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        withdrawListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
      async (dispatch, getState) => {
        try {
          dispatch({
            type: withdrawListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });

          const response = await WithdrawService.list(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

          dispatch({
            type: withdrawListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: withdrawListActions.FETCH_ERROR,
          });
        }
      },

  doCountPending:
    () =>
      async (dispatch) => {
        try {
          dispatch({
            type: withdrawListActions.COUNT_STARTED,
          });

          const response = await WithdrawService.withdrawPending();
          dispatch({
            type: withdrawListActions.COUNT_SUCCESS,
            payload: response
          });
        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: withdrawListActions.COUNT_ERROR,
          });
        }
      },
};

export default withdrawListActions;
