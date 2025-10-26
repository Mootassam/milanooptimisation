import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/transaction/transactionSelectors';
import destroyActions from 'src/modules/transaction/destroy/transactionDestroyActions';
import destroySelectors from 'src/modules/transaction/destroy/transactionDestroySelectors';
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/transaction/form/transactionFormActions';
import UserListItem from 'src/view/user/list/UserListItem';

function TransactionListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const sorter = useSelector(selectors.selectSorter);
  const hasRows = useSelector(selectors.selectHasRows);

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const handleStatusChange = (id, newStatus) => {
    let data = {
      status: newStatus,
      id: id
    };
    dispatch(actionsForm.doUpdateStatus(data));
  };

  // Get status color and display text
  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
        return { 
          color: '#48BB78',
          bgColor: '#F0FFF4',
          text: 'Success',
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

  // Get type color and icon
  const getTypeInfo = (type) => {
    switch (type) {
      case 'deposit':
        return { 
          color: '#4299E1', 
          bgColor: '#EBF8FF',
          icon: 'fa-solid fa-arrow-down',
          text: 'Deposit'
        };
      case 'withdraw':
        return { 
          color: '#ED8936', 
          bgColor: '#FEF5E7',
          icon: 'fa-solid fa-arrow-up',
          text: 'Withdraw'
        };
      default:
        return { 
          color: '#A0AEC0', 
          bgColor: '#F7FAFC',
          icon: 'fa-solid fa-exchange',
          text: type
        };
    }
  };

  // Format amount with type indicator
  const formatAmount = (amount, type) => {
    const symbol = type === 'deposit' ? '+' : '-';
    return (
      <span className={`amount-value ${type === 'deposit' ? 'amount-deposit' : 'amount-withdraw'}`}>
        {symbol}${amount}
      </span>
    );
  };

  return (
    <div className="transaction-list-container">
      <div className="table-responsive">
        <table className="transaction-list-table">
          <thead className="table-header">
            <tr>
              <th className="sortable-header" onClick={() => doChangeSort('user')}>
                {i18n('entities.transaction.fields.user')}
                {sorter.field === 'user' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('type')}>
                {i18n('entities.transaction.fields.type')}
                {sorter.field === 'type' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('amount')}>
                {i18n('entities.transaction.fields.amount')}
                {sorter.field === 'amount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            
              <th className="sortable-header" onClick={() => doChangeSort('createdAt')}>
                Date
                {sorter.field === 'createdAt' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
                <th className="sortable-header" onClick={() => doChangeSort('status')}>
                {i18n('entities.transaction.fields.status')}
                {sorter.field === 'status' && (
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
            {!loading && rows.map((row) => {
              const typeInfo = getTypeInfo(row.type);
              const statusInfo = getStatusInfo(row.status);
              const isPending = row.status === 'pending';
              
              return (
                <tr key={row.id} className="table-row">
                  <td className="table-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="table-cell">
                    <div 
                      className="type-badge"
                      style={{ 
                        color: typeInfo.color,
                        backgroundColor: typeInfo.bgColor,
                        borderColor: typeInfo.color
                      }}
                    >
                      <i className={typeInfo.icon}></i>
                      <span>{typeInfo.text}</span>
                    </div>
                  </td>
                  <td className="table-cell numeric">
                    {formatAmount(row.amount, row.type)}
                  </td>
               
                  <td className="table-cell">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                  </td>
                     <td className="table-cell">
                    {isPending ? (
                      <div className="status-buttons">
                        <button
                          className="btn-action success"
                          onClick={() => handleStatusChange(row.id, 'success')}
                        >
                          <i className="fa-solid fa-check"></i>
                          Accept
                        </button>
                        <button
                          className="btn-action danger"
                          onClick={() => handleStatusChange(row.id, 'canceled')}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Reject
                        </button>
                      </div>
                    ) : (
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
                    )}
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
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .transaction-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
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

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
    
        }

        .type-badge i {
          font-size: 10px;
        }

        .amount-value {
          font-weight: 600;
          font-size: 14px;
        }

        .amount-deposit {
          color: #28a745;
        }

        .amount-withdraw {
          color: #dc3545;
        }

        .status-buttons {
          display: flex;
          gap: 8px;
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
          white-space: nowrap;
        }

        .btn-action.success {
          background: #28a745;
          color: white;
        }

        .btn-action.success:hover {
          background: #218838;
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
          .status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .btn-action {
            padding: 4px 8px;
            font-size: 10px;
          }
          
          .type-badge,
          .status-badge {
            padding: 4px 8px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default TransactionListTable;