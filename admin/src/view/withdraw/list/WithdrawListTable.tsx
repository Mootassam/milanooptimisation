import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/withdraw/withdrawSelectors';
import destroyActions from 'src/modules/withdraw/destroy/withdrawDestroyActions';
import destroySelectors from 'src/modules/withdraw/destroy/withdrawDestroySelectors';
import actions from 'src/modules/withdraw/list/withdrawListActions';
import selectors from 'src/modules/withdraw/list/withdrawListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/withdraw/form/withdrawFormActions';
import UserListItem from 'src/view/user/list/UserListItem';

function WithdrawListTable(props) {
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

  // Get status color and display text - Updated for Withdraw model
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

  // Get payment method info - Updated for Withdraw model
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
  const getPaymentDetails = (withdraw) => {
    if (withdraw.paymentMethod === 'crypto' && withdraw.paymentDetails?.crypto) {
      const crypto = withdraw.paymentDetails.crypto;
      return `${crypto.currency} • ${crypto.network}`;
    } else if (withdraw.paymentMethod === 'mobile_money' && withdraw.paymentDetails?.mobileMoney) {
      const mobile = withdraw.paymentDetails.mobileMoney;
      return `${mobile.provider} • ${mobile.phoneNumber}`;
    }
    return '-';
  };

  // Format reference number
  const formatReference = (referenceNumber) => {
    if (!referenceNumber) return '-';
    return `#${referenceNumber}`;
  };

  return (
    <TableWrapper>
      <div className="withdraw-table-container">
        <table className="withdraw-table">
          <thead className="withdraw-table-header">
            <tr>
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'referenceNumber'}
                label="Reference"
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'user'}
                label={i18n('entities.withdraw.fields.user')}
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
                label={i18n('entities.withdraw.fields.amount')}
                align="right"
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'status'}
                label={i18n('entities.withdraw.fields.status')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'createdAt'}
                label="Date"
              />
            </tr>
          </thead>
          <tbody className="withdraw-table-body">
            {loading && (
              <tr>
                <td colSpan={6}>
                  <div className="withdraw-loading-container">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={6}>
                  <div className="withdraw-empty-state">
                    <i className="fa-solid fa-money-bill-transfer"></i>
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
                <tr key={row.id} className="withdraw-table-row">
                  <td className="withdraw-reference-cell">
                    <span className="withdraw-reference">
                      {formatReference(row.referenceNumber)}
                    </span>
                  </td>
                  <td className="withdraw-user-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="withdraw-payment-cell">
                    <div className="withdraw-payment-info">
                      <div
                        className="withdraw-payment-badge"
                        style={{
                          color: paymentMethodInfo.color,
                          backgroundColor: paymentMethodInfo.bgColor,
                          borderColor: paymentMethodInfo.color
                        }}
                      >
                        <i className={paymentMethodInfo.icon}></i>
                        <span>{paymentMethodInfo.text}</span>
                      </div>
                      <div className="withdraw-payment-details">
                        {getPaymentDetails(row)}
                      </div>
                    </div>
                  </td>
                  <td className="withdraw-amount-cell">
                    <span className="withdraw-amount">
                      {formatCurrency(row.amount, row.currency)}
                    </span>
                  </td>
                  <td className="withdraw-status-cell">
                    {isPending ? (
                      // Show buttons for pending status
                      <div className="withdraw-status-buttons">
                        <button
                          className="withdraw-btn-complete"
                          onClick={() => handleStatusChange(row.id, 'completed')}
                        >
                          <i className="fa-solid fa-check"></i>
                          Complete
                        </button>
                        <button
                          className="withdraw-btn-cancel"
                          onClick={() => handleStatusChange(row.id, 'canceled')}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      // Show status badge for non-pending status
                      <div
                        className="withdraw-status-badge"
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
                  <td className="withdraw-date-cell">
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
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .withdraw-table-container {
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .withdraw-table {
          width: 100%;
          border-collapse: collapse;
        }

        .withdraw-table-header {
          background: #F7FAFC;
          border-bottom: 1px solid #E2E8F0;
        }

        .withdraw-table-header th {
          padding: 16px 20px;
          font-size: 12px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
        }

        .withdraw-table-body {
          background: #FFFFFF;
        }

        .withdraw-table-row {
          border-bottom: 1px solid #F1F5F9;
          transition: all 0.2s ease;
        }

        .withdraw-table-row:hover {
          background: #F8FAFC;
        }

        .withdraw-table-row:last-child {
          border-bottom: none;
        }

        .withdraw-table-row td {
          padding: 16px 20px;
          font-size: 14px;
          color: #2D3748;
        }

        .withdraw-reference-cell {
          font-weight: 600;
          color: #4A5568;
        }

        .withdraw-reference {
          font-family: 'Courier New', monospace;
          font-size: 13px;
        }

        .withdraw-user-cell {
          font-weight: 500;
        }

        .withdraw-payment-info {
          display: flex;
          align-items:center;
          gap: 4px;
        }

        .withdraw-payment-badge {
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

        .withdraw-payment-badge i {
          font-size: 10px;
        }

        .withdraw-payment-details {
          font-size: 12px;
          color: #718096;
          margin-top: 2px;
        }

        .withdraw-amount-cell {
          text-align: right;
          font-weight: 600;
        }

        .withdraw-amount {
          color: #F56565; /* Red for withdrawals */
        }

        .withdraw-status-cell {
          min-width: 140px;
        }

        .withdraw-status-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .withdraw-btn-complete,
        .withdraw-btn-cancel {
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

        .withdraw-btn-complete {
          background: #48BB78;
          color: white;
        }

        .withdraw-btn-complete:hover {
          background: #38A169;
          transform: translateY(-1px);
        }

        .withdraw-btn-cancel {
          background: #F56565;
          color: white;
        }

        .withdraw-btn-cancel:hover {
          background: #E53E3E;
          transform: translateY(-1px);
        }

        .withdraw-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
        }

        .withdraw-status-badge i {
          font-size: 10px;
        }

        .withdraw-date-cell {
          color: #718096;
          font-size: 13px;
        }

        .withdraw-loading-container {
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .withdraw-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
          color: #718096;
        }

        .withdraw-empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #CBD5E0;
        }

        .withdraw-empty-state span {
          font-size: 14px;
          font-weight: 500;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .withdraw-table-container {
            border-radius: 8px;
          }
          
          .withdraw-table-header th,
          .withdraw-table-row td {
            padding: 12px 16px;
          }
          
          .withdraw-payment-badge {
            padding: 3px 6px;
            font-size: 10px;
          }
          
          .withdraw-status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .withdraw-btn-complete,
          .withdraw-btn-cancel {
            padding: 4px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </TableWrapper>
  );
}

export default WithdrawListTable;