import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import destroySelectors from 'src/modules/deposit/destroy/depositDestroySelectors';
import actions from 'src/modules/deposit/list/depositListActions';
import selectors from 'src/modules/deposit/list/depositListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/deposit/form/depositFormActions';
import UserListItem from 'src/view/user/list/UserListItem';
import depositSelectors from 'src/modules/deposit/depositSelectors';
import depositDestroyActions from 'src/modules/deposit/destroy/depositDestroyActions';

function DepositListTable(props) {
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
  const hasPermissionToEdit = useSelector(
    depositSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    depositSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(depositDestroyActions.doDestroy(id));
  };

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

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
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
      case 'failed':
        return {
          color: '#9B2C2C',
          bgColor: '#FED7D7',
          text: 'Failed',
          icon: 'fa-solid fa-triangle-exclamation'
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

  // Get payment method info
  const getPaymentMethodInfo = (paymentMethod) => {
    switch (paymentMethod) {
      case 'crypto':
        return {
          color: '#805AD5',
          bgColor: '#FAF5FF',
          icon: 'fa-solid fa-coins',
          text: 'Crypto'
        };
      case 'mobile_money':
        return {
          color: '#3182CE',
          bgColor: '#EBF8FF',
          icon: 'fa-solid fa-mobile-screen',
          text: 'Mobile Money'
        };
      default:
        return {
          color: '#A0AEC0',
          bgColor: '#F7FAFC',
          icon: 'fa-solid fa-wallet',
          text: paymentMethod
        };
    }
  };

  // Format currency display
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Get payment details summary
  const getPaymentDetails = (deposit) => {
    if (deposit.paymentMethod === 'crypto' && deposit.paymentDetails?.crypto) {
      const crypto = deposit.paymentDetails.crypto;
      return `${crypto.currency} • ${crypto.network}`;
    } else if (deposit.paymentMethod === 'mobile_money' && deposit.paymentDetails?.mobileMoney) {
      const mobile = deposit.paymentDetails.mobileMoney;
      return `${mobile.provider} • ${mobile.phoneNumber}`;
    }
    return '-';
  };

  return (
    <TableWrapper>
      <div className="txn-table-container">
        <table className="txn-table">
          <thead className="txn-table-header">
            <tr>
              <TableColumnHeader className="th-checkbox">
                {hasRows && (
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-checkbox-input"
                      id="table-header-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={() => doToggleAllSelected()}
                    />
                    <label
                      htmlFor="table-header-checkbox"
                      className="custom-checkbox-label"
                    >
                      &#160;
                    </label>
                  </div>
                )}
              </TableColumnHeader>
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'user'}
                label={i18n('entities.deposit.fields.user')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'paymentMethod'}
                label="Payment Method"
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'amount'}
                label={i18n('entities.deposit.fields.amount')}
                align="right"
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'status'}
                label={i18n('entities.deposit.fields.status')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'createdAt'}
                label="Date"
              />
              <TableColumnHeader className="th-actions" />
            </tr>
          </thead>
          <tbody className="txn-table-body">
            {loading && (
              <tr>
                <td colSpan={7}>
                  <div className="txn-loading-container">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={7}>
                  <div className="txn-empty-state">
                    <i className="fa-solid fa-coins"></i>
                    <span>{i18n('table.noData')}</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && rows.map((row) => {
              const paymentMethodInfo = getPaymentMethodInfo(row.paymentMethod);
              const statusInfo = getStatusInfo(row.status);
              const isPending = row.status === 'pending';

              return (
                <tr key={row.id} className="txn-table-row">
                  <td className="th-checkbox">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-checkbox-input"
                        id={`table-header-checkbox-${row.id}`}
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                      <label
                        htmlFor={`table-header-checkbox-${row.id}`}
                        className="custom-checkbox-label"
                      >
                        &#160;
                      </label>
                    </div>
                  </td>
                  <td className="txn-user-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="txn-payment-cell">
                    <div className="txn-payment-info">
                      <div
                        className="txn-payment-badge"
                        style={{
                          color: paymentMethodInfo.color,
                          backgroundColor: paymentMethodInfo.bgColor,
                          borderColor: paymentMethodInfo.color
                        }}
                      >
                        <i className={paymentMethodInfo.icon}></i>
                        <span>{paymentMethodInfo.text}</span>
                      </div>
                      <div className="txn-payment-details">
                        {getPaymentDetails(row)}
                      </div>
                    </div>
                  </td>
                  <td className="txn-amount-cell">
                    <span className="txn-amount-deposit">
                      {formatCurrency(row.amount, row.currency)}
                    </span>
                  </td>
                  <td className="txn-status-cell">
                    {isPending ? (
                      <div className="txn-status-buttons">
                        <button
                          className="txn-btn-accept"
                          onClick={() => handleStatusChange(row.id, 'completed')}
                        >
                          <i className="fa-solid fa-check"></i>
                          Complete
                        </button>
                        <button
                          className="txn-btn-reject"
                          onClick={() => handleStatusChange(row.id, 'canceled')}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        className="txn-status-badge"
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
                  <td className="txn-date-cell">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

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
        .txn-table-container {
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .txn-table {
          width: 100%;
          border-collapse: collapse;
        }

        .txn-table-header {
          background: #F7FAFC;
          border-bottom: 1px solid #E2E8F0;
        }

        .txn-table-header th {
          padding: 16px 20px;
          font-size: 12px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
        }

        .txn-table-body {
          background: #FFFFFF;
        }

        .txn-table-row {
          border-bottom: 1px solid #F1F5F9;
          transition: all 0.2s ease;
        }

        .txn-table-row:hover {
          background: #F8FAFC;
        }

        .txn-table-row:last-child {
          border-bottom: none;
        }

        .txn-table-row td {
          padding: 16px 20px;
          font-size: 14px;
          color: #2D3748;
        }

        /* Checkbox Styles */
        .th-checkbox {
          width: 40px;
          padding: 16px 10px !important;
        }

        .custom-checkbox {
          position: relative;
          display: inline-block;
        }

        .custom-checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .custom-checkbox-label {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: #FFFFFF;
          border: 2px solid #CBD5E0;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .custom-checkbox-input:checked + .custom-checkbox-label {
          background: #4299E1;
          border-color: #4299E1;
        }

        .custom-checkbox-input:checked + .custom-checkbox-label::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .custom-checkbox-input:focus + .custom-checkbox-label {
          border-color: #4299E1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        .custom-checkbox-label:hover {
          border-color: #4299E1;
        }

        .txn-user-cell {
          font-weight: 500;
        }

        .txn-payment-info {
          display: flex;
          flex-direction: column;
          align-items:center;
          gap: 4px;
        }

        .txn-payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
          width: fit-content;
        }

        .txn-payment-badge i {
          font-size: 10px;
        }

        .txn-payment-details {
          font-size: 12px;
          color: #718096;
        }

        .txn-amount-cell {
          text-align: right;
          font-weight: 600;
        }

        .txn-amount-deposit {
          color: #48BB78;
        }

        .txn-status-cell {
          min-width: 140px;
        }

        .txn-status-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .txn-btn-accept,
        .txn-btn-reject {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .txn-btn-accept {
          background: #48BB78;
          color: white;
        }

        .txn-btn-accept:hover {
          background: #38A169;
          transform: translateY(-1px);
        }

        .txn-btn-reject {
          background: #F56565;
          color: white;
        }

        .txn-btn-reject:hover {
          background: #E53E3E;
          transform: translateY(-1px);
        }

        .txn-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
        }

        .txn-status-badge i {
          font-size: 10px;
        }

        .txn-date-cell {
          color: #718096;
          font-size: 13px;
        }

        .td-actions {
          white-space: nowrap;
        }

        .td-actions .btn-link {
          padding: 4px 8px;
          font-size: 12px;
          color: #4299E1;
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
        }

        .td-actions .btn-link:hover {
          color: #3182CE;
          text-decoration: underline;
        }

        .txn-loading-container {
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .txn-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
          color: #718096;
        }

        .txn-empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #CBD5E0;
        }

        .txn-empty-state span {
          font-size: 14px;
          font-weight: 500;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .txn-table-container {
            border-radius: 8px;
          }
          
          .txn-table-header th,
          .txn-table-row td {
            padding: 12px 16px;
          }
          
          .txn-payment-badge {
            padding: 3px 6px;
            font-size: 10px;
          }
          
          .txn-status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .txn-btn-accept,
          .txn-btn-reject {
            padding: 4px 8px;
            font-size: 10px;
          }

          .th-checkbox {
            padding: 12px 8px !important;
          }
        }
      `}</style>
    </TableWrapper>
  );
}

export default DepositListTable;