import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/vip/vipSelectors';
import destroyActions from 'src/modules/vip/destroy/vipDestroyActions';
import destroySelectors from 'src/modules/vip/destroy/vipDestroySelectors';
import actions from 'src/modules/vip/list/vipListActions';
import selectors from 'src/modules/vip/list/vipListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function CouponsListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  const hasPermissionToEdit = useSelector(couponsSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(couponsSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  // Format numbers with proper styling
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  // Format percentage
  const formatPercentage = (number) => {
    return `${number}%`;
  };

  return (
    <div className="coupons-list-container">
      <div className="table-responsive">
        <table className="coupons-list-table">
          <thead className="table-header">
            <tr>
              <th className="checkbox-column">
                {hasRows && (
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={doToggleAllSelected}
                    />
                  </div>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('title')}>
                {i18n('entities.vip.fields.title')}
                {sorter.field === 'title' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('type')}>
                {i18n('entities.vip.fields.dailyorder')}
                {sorter.field === 'type' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('noOfTimes')}>
                {i18n('entities.vip.fields.commissionrate')}
                {sorter.field === 'noOfTimes' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('levelLimit')}>
                {i18n('entities.vip.fields.levelLimit')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={6} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={6} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="checkbox-column">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="vip-title">{row.title}</span>
                  </td>
                  <td className="table-cell numeric">
                    <span className="daily-orders">
                      {formatNumber(row.dailyorder)}
                    </span>
                  </td>
                  <td className="table-cell numeric">
                    <span className="commission-rate">
                      {formatPercentage(row.comisionrate)}
                    </span>
                  </td>
                  <td className="table-cell numeric">
                    <span className="level-limit">
                      {formatNumber(row.levellimit)}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className='actions-container'>
                      <Link
                        className="btn-action info"
                        to={`/vip/${row.id}`}
                      >
                        <i className="fas fa-eye"></i>
                        View
                      </Link>
                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action primary"
                          to={`/vip/${row.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                          Edit
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button
                          className="btn-action danger"
                          type="button"
                          onClick={() => doOpenDestroyConfirmModal(row.id)}
                        >
                          <i className="fas fa-trash"></i>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .coupons-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
        }

        .checkbox-column {
          width: 40px;
          padding: 16px 8px !important;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .table-header {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .table-header th {
          padding: 16px 12px;
          font-weight: 600;
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }

        .sortable-header {
          cursor: pointer;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .sortable-header:hover {
          background: #f1f5f9;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-cell {
          padding: 16px 12px;
          font-size: 14px;
          color: #475569;
          vertical-align: middle;
        }

        .numeric {
          text-align: right;
        }

        .vip-title {
          font-weight: 600;
          color: #2d3748;
        }

        .daily-orders {
          color: #3182ce;
          font-weight: 600;
        }

        .commission-rate {
          color: #38a169;
          font-weight: 600;
        }

        .level-limit {
          color: #d69e2e;
          font-weight: 600;
        }

        .loading-cell {
          text-align: center;
          padding: 40px !important;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loading-text {
          color: #6c757d;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #6c757d;
        }

        .no-data-icon {
          font-size: 48px;
          color: #adb5bd;
        }

        .no-data-content p {
          margin: 0;
          font-size: 14px;
        }

        .actions-header {
          width: 180px;
        }

        .actions-cell {
          padding: 8px 12px !important;
        }

        .actions-container {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-action.primary {
          background: #007bff;
          color: white;
        }

        .btn-action.primary:hover {
          background: #0056b3;
        }

        .btn-action.info {
          background: #17a2b8;
          color: white;
        }

        .btn-action.info:hover {
          background: #138496;
        }

        .btn-action.danger {
          background: #dc3545;
          color: white;
        }

        .btn-action.danger:hover {
          background: #c82333;
        }

        .btn-action i {
          font-size: 10px;
        }

        /* Pagination Styles */
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .actions-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn-action {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .table-cell.numeric {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

export default CouponsListTable;