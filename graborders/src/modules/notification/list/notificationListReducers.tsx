import types from 'src/modules/notification/list/notificationListActionTypes';

const INITIAL_PAGE_SIZE = 10;

interface NotificationState {
  rows: Array<any>;
  count: number;
  loading: boolean;
  countUnread: number;
  loadingCount: boolean;
  filter: any;
  rawFilter: any;
  pagination: {
    current: number;
    pageSize: number;
  };
  sorter: any;
  selectedKeys: Array<string>;
  exportLoading: boolean;
}

const initialData: NotificationState = {
  rows: [],
  count: 0,
  loading: false,
  countUnread: 0,
  loadingCount: false,
  filter: {},
  rawFilter: {},
  pagination: { current: 1, pageSize: INITIAL_PAGE_SIZE },
  sorter: {},
  selectedKeys: [],
  exportLoading: false,
};

interface Action {
  type: string;
  payload?: any;
}

export default function notificationListReducer(
  state: NotificationState = initialData,
  { type, payload }: Action,
): NotificationState {
  switch (type) {
    case types.RESETED:
      return { ...initialData };

    case types.TOGGLE_ONE_SELECTED: {
      const exists = state.selectedKeys.includes(payload);
      const selectedKeys = exists
        ? state.selectedKeys.filter((key) => key !== payload)
        : [payload, ...state.selectedKeys];
      return { ...state, selectedKeys };
    }

    case types.TOGGLE_ALL_SELECTED: {
      const isAllSelected =
        (state.rows || []).length === (state.selectedKeys || []).length;
      return {
        ...state,
        selectedKeys: isAllSelected
          ? []
          : state.rows.map((row) => row.id),
      };
    }

    case types.CLEAR_ALL_SELECTED:
      return { ...state, selectedKeys: [] };

    case types.PAGINATION_CHANGED:
      return {
        ...state,
        pagination: payload || { current: 1, pageSize: INITIAL_PAGE_SIZE },
      };

    case types.SORTER_CHANGED:
      return { ...state, sorter: payload || {} };

    case types.FETCH_STARTED:
      return {
        ...state,
        loading: true,
        selectedKeys: [],
        filter: payload?.filter || {},
        rawFilter: payload?.rawFilter || {},
        pagination: payload?.keepPagination
          ? state.pagination
          : { current: 1, pageSize: INITIAL_PAGE_SIZE },
      };

    case types.FETCH_SUCCESS:
      return { ...state, loading: false, rows: payload.rows, count: payload.count };

    case types.FETCH_ERROR:
      return { ...state, loading: false, rows: [], count: 0 };

    case types.EXPORT_STARTED:
      return { ...state, exportLoading: true };

    case types.EXPORT_SUCCESS:
    case types.EXPORT_ERROR:
      return { ...state, exportLoading: false };

    case types.COUNT_STARTED:
      return { ...state, loadingCount: true };

    case types.COUNT_SUCCESS:
      return { ...state, loadingCount: false, countUnread: payload.unread };

    case types.COUNT_ERROR:
      return { ...state, loadingCount: false };

    default:
      return state;
  }
}
