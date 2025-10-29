import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/record/recordSelectors';
import destroyActions from 'src/modules/record/destroy/recordDestroyActions';
import destroySelectors from 'src/modules/record/destroy/recordDestroySelectors';
import actions from 'src/modules/record/list/recordListActions';
import selectors from 'src/modules/record/list/recordListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/record/form/recordFormActions';
import UserListItem from 'src/view/user/list/UserListItem';
import ProductListItem from 'src/view/product/list/ProductListItem';

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

  const formSubmit = (id, e) => {
    let data = { status: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

  // Get status color and display info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: '#48BB78',
          bgColor: '#F0FFF4',
          text: 'Completed',
          icon: 'fa-solid fa-circle-check'
        };
      case 'pending':
        return {
          color: '#ED8936',
          bgColor: '#FEF5E7',
          text: 'Pending',
          icon: 'fa-solid fa-clock'
        };
      case 'canceled':
        return {
          color: '#F56565',
          bgColor: '#FED7D7',
          text: 'Canceled',
          icon: 'fa-solid fa-circle-xmark'
        };
      default:
        return {
          color: '#A0AEC0',
          bgColor: '#F7FAFC',
          text: status,
          icon: 'fa-solid fa-circle'
        };
    }
  };

  return (
    <div className="record-list-container">
      <div className="table-responsive">
        <table className="record-list-table">
          <thead className="table-header">
            <tr>
              <th className="sortable-header" onClick={() => doChangeSort('title')}>
                {i18n('entities.record.fields.user')}
                {sorter.field === 'title' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('type')}>
                {i18n('entities.record.fields.product')}
                {sorter.field === 'type' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('noOfTimes')}>
                {i18n('entities.record.fields.number')}
                {sorter.field === 'noOfTimes' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('discount')}>
                {i18n('entities.record.fields.status')}
                {sorter.field === 'discount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={5} className="loading-cell">
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
                <td colSpan={5} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => {
                const statusInfo = getStatusInfo(row.status);
                return (
                  <tr key={row.id} className="table-row">
                 
                    <td className="table-cell text-center">
                      <UserListItem value={row.user} />
                    </td>
                    <td className="table-cell text-center">
                      <ProductListItem value={row.product} />
                    </td>
                    <td className="table-cell numeric">
                      <span className="record-number">
                        {row.number}
                      </span>
                    </td>
                    <td className="table-cell text-center">
                      <div
                        className="status-badge"
                        style={{
                          color: statusInfo.color,
                          backgroundColor: statusInfo.bgColor,
                          borderColor: statusInfo.color
                        }}
                      >
                        <i className={statusInfo.icon}></i>
                        <span>{statusInfo.text}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        .record-list-container {
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

        .text-center {
          text-align: center;
        }

        .numeric {
          text-align: right;
        }

        .record-number {
          color: #3182ce;
          font-weight: 600;
          font-size: 16px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;

 
        }

        .status-badge i {
          font-size: 10px;
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

        /* Pagination Styles */
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .table-cell.numeric {
            text-align: left;
          }
          
          .status-badge {
            padding: 4px 8px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default CouponsListTable;