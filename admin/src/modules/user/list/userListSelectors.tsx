import { createSelector } from 'reselect';

const selectRaw = (state) => state.user.list;

// Existing selectors...
const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const dashboardLoading = createSelector(
  [selectRaw],
  (raw) => raw.loadingdashboard,
);

const dataDashboard = createSelector(
  [selectRaw],
  (raw) => raw.dashboard,
);

// NEW: Individual Dashboard Selectors
const selectUserMetrics = createSelector(
  [dataDashboard],
  (dashboard) => dashboard?.userMetrics || null,
);

const selectTransactionMetrics = createSelector(
  [dataDashboard],
  (dashboard) => dashboard?.transactionMetrics || null,
);

// User Metrics Specific Selectors
const selectTotalUsers = createSelector(
  [selectUserMetrics],
  (userMetrics) => userMetrics?.totalUsers || 0,
);

const selectActiveAccounts = createSelector(
  [selectUserMetrics],
  (userMetrics) => userMetrics?.activeAccounts || 0,
);

// UPDATED: Changed from selectNewUsersLast7Days to selectNewUsersPerDay
const selectNewUsersPerDay = createSelector(
  [selectUserMetrics],
  (userMetrics) => userMetrics?.newUsersPerDay || [],
);

// Keep the old selector for backward compatibility
const selectNewUsersLast7Days = createSelector(
  [selectNewUsersPerDay],
  (newUsersPerDay) => {
    if (!Array.isArray(newUsersPerDay)) return 0;
    return newUsersPerDay.reduce((total, day) => total + (day.count || 0), 0);
  },
);

const selectCompletedTasks = createSelector(
  [selectUserMetrics],
  (userMetrics) => userMetrics?.completedTasks || null,
);

const selectCompletedTasksCount = createSelector(
  [selectCompletedTasks],
  (completedTasks) => completedTasks?.count || 0,
);

const selectTopPerformers = createSelector(
  [selectCompletedTasks],
  (completedTasks) => completedTasks?.users || [],
);

// Transaction Metrics Specific Selectors
const selectTotalTransactions = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.totalTransactions || 0,
);

const selectTotalVolume = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.totalVolume || 0,
);

// NEW: Total Withdraw selector
const selectTotalWithdraw = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.totalWithdraw || 0,
);

const selectLastTransactions = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.lastTransactions || [],
);

const selectDepositStats = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.depositStats || null,
);

const selectWithdrawalStats = createSelector(
  [selectTransactionMetrics],
  (transactionMetrics) => transactionMetrics?.withdrawalStats || null,
);

// Deposit Stats Specific Selectors
const selectDepositCompletedCount = createSelector(
  [selectDepositStats],
  (depositStats) => depositStats?.completedCount || 0,
);

const selectDepositTotalAmount = createSelector(
  [selectDepositStats],
  (depositStats) => depositStats?.totalAmount || 0,
);

// Withdrawal Stats Specific Selectors
const selectWithdrawalPendingCount = createSelector(
  [selectWithdrawalStats],
  (withdrawalStats) => withdrawalStats?.pendingCount || 0,
);

const selectWithdrawalTotalAmount = createSelector(
  [selectWithdrawalStats],
  (withdrawalStats) => withdrawalStats?.totalAmount || 0,
);

// Existing selectors...
const selectExportLoading = createSelector(
  [selectRaw],
  (raw) => raw.exportLoading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectSorter = createSelector(
  [selectRaw],
  (raw) => raw.sorter || {},
);

const selectOrderBy = createSelector([selectRaw], (raw) => {
  const sorter = raw.sorter;

  if (!sorter) {
    return null;
  }

  if (!sorter.field) {
    return null;
  }

  let direction =
    sorter.order === 'descend' ? 'DESC' : 'ASC';

  return `${sorter.field}_${direction}`;
});

const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectRawFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.rawFilter;
  },
);

const selectLimit = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;
  return pagination.pageSize;
});

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;

  if (!pagination || !pagination.pageSize) {
    return 0;
  }

  const current = pagination.current || 1;

  return (current - 1) * pagination.pageSize;
});

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pagination,
      total: count,
    };
  },
);

const selectSelectedKeys = createSelector(
  [selectRaw],
  (raw) => {
    return raw.selectedKeys;
  },
);

const selectSelectedRows = createSelector(
  [selectRaw, selectRows],
  (raw, rows) => {
    return rows.filter((row) =>
      raw.selectedKeys.includes(row.id),
    );
  },
);

const selectIsAllSelected = createSelector(
  [selectRows, selectSelectedKeys],
  (rows, selectedKeys) => {
    return rows.length === selectedKeys.length;
  },
);

const userListSelectors = {
  // Existing selectors
  selectLoading,
  selectRows,
  selectCount,
  selectOrderBy,
  selectLimit,
  selectFilter,
  selectOffset,
  selectPagination,
  selectSelectedKeys,
  selectSelectedRows,
  selectHasRows,
  selectExportLoading,
  selectRawFilter,
  selectSorter,
  selectIsAllSelected,
  
  // Dashboard selectors
  dashboardLoading,
  dataDashboard,
  
  // NEW: Individual dashboard selectors
  selectUserMetrics,
  selectTransactionMetrics,
  selectTotalUsers,
  selectActiveAccounts,
  selectNewUsersPerDay, // NEW: Added this selector
  selectNewUsersLast7Days, // Keep for backward compatibility
  selectCompletedTasks,
  selectCompletedTasksCount,
  selectTopPerformers,
  selectTotalTransactions,
  selectTotalVolume,
  selectTotalWithdraw, // NEW: Added this selector
  selectLastTransactions,
  selectDepositStats,
  selectWithdrawalStats,
  selectDepositCompletedCount,
  selectDepositTotalAmount,
  selectWithdrawalPendingCount,
  selectWithdrawalTotalAmount,
};

export default userListSelectors;