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
  const [selectedWithdraw, setSelectedWithdraw] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
    couponsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
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

  const openPaymentModal = (withdraw) => {
    setSelectedWithdraw(withdraw);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedWithdraw(null);
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // You can add a success message here if needed
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
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
      case 'bank_transfer':
        return {
          color: '#38A169',
          bgColor: '#F0FFF4',
          icon: 'fa-solid fa-building-columns',
          text: 'Bank Transfer'
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
    } else if (withdraw.paymentMethod === 'bank_transfer' && withdraw.paymentDetails?.bank) {
      const bank = withdraw.paymentDetails.bank;
      return `${bank.bankName} • ${bank.accountNumber}`;
    }
    return '-';
  };

  return (
    <div className="withdraw-list-container">
      <div className="table-responsive">
        <table className="withdraw-list-table">
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
              <th className="sortable-header" onClick={() => doChangeSort('user')}>
                {i18n('entities.withdraw.fields.user')}
                {sorter.field === 'user' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('paymentMethod')}>
                Payment Method
                {sorter.field === 'paymentMethod' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('amount')}>
                {i18n('entities.withdraw.fields.amount')}
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
                {i18n('entities.withdraw.fields.status')}
                {sorter.field === 'status' && (
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
                <td colSpan={7} className="loading-cell">
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
                <td colSpan={7} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading && rows.map((row) => {
              const paymentMethodInfo = getPaymentMethodInfo(row.paymentMethod);
              const statusInfo = getStatusInfo(row.status);
              const isPending = row.status === 'pending';
              const hasDetails = row.paymentDetails && 
                ((row.paymentMethod === 'crypto' && row.paymentDetails.crypto) ||
                 (row.paymentMethod === 'mobile_money' && row.paymentDetails.mobileMoney) ||
                 (row.paymentMethod === 'bank_transfer' && row.paymentDetails.bank));

              return (
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
                    <UserListItem value={row.user} />
                  </td>
                  <td className="table-cell">
                    <div className="payment-info">
                      <div
                        className="payment-badge"
                        style={{
                          color: paymentMethodInfo.color,
                          backgroundColor: paymentMethodInfo.bgColor,
                          borderColor: paymentMethodInfo.color
                        }}
                      >
                        <i className={paymentMethodInfo.icon}></i>
                        <span>{paymentMethodInfo.text}</span>
                      </div>
                      
                    </div>
                  </td>
                  <td className="table-cell numeric">
                    <span className="amount-withdraw">
                      {formatCurrency(row.amount, row.currency)}
                    </span>
                  </td>
                  <td className="table-cell">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="table-cell">
                    {isPending ? (
                      <div className="status-buttons">
                        <button
                          className="btn-action success"
                          onClick={() => handleStatusChange(row.id, 'completed')}
                        >
                          <i className="fa-solid fa-check"></i>
                          Complete
                        </button>
                        <button
                          className="btn-action danger"
                          onClick={() => handleStatusChange(row.id, 'canceled')}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Cancel
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
                  <td className="actions-cell">
                    <div className='actions-container' style={{ cursor: 'pointer' }}>
                      {hasDetails && (
                        <div 
                          className={`view-details`} 
                          onClick={() => hasDetails && openPaymentModal(row)}
                        >
                          <i className="fa-solid fa-eye"></i>
                          View Details
                        </div>
                      )}
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

      {/* Payment Details Modal */}
      {showPaymentModal && selectedWithdraw && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">
                <i className="fa-solid fa-money-bill-transfer"></i>
                Withdrawal Details
              </h3>
              <button className="modal-close" onClick={closePaymentModal}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="payment-details-grid">
                {/* Status and Amount */}
                <div className="detail-section">
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <div className="detail-value">
                      <div
                        className="status-badge"
                        style={{
                          color: getStatusInfo(selectedWithdraw?.status).color,
                          backgroundColor: getStatusInfo(selectedWithdraw?.status).bgColor,
                          borderColor: getStatusInfo(selectedWithdraw?.status).color
                        }}
                      >
                        <i className={getStatusInfo(selectedWithdraw?.status).icon}></i>
                        {getStatusInfo(selectedWithdraw?.status).text}
                      </div>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value amount">
                      {formatCurrency(selectedWithdraw.amount, selectedWithdraw.currency)}
                    </span>
                  </div>
                </div>

                {/* Crypto Details */}
                {selectedWithdraw.paymentMethod === 'crypto' && selectedWithdraw.paymentDetails?.crypto && (
                  <div className="detail-section">
                    <h4 className="section-title">Crypto Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Network:</span>
                      <span className="detail-value">{selectedWithdraw.paymentDetails.crypto.network}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Currency:</span>
                      <span className="detail-value">{selectedWithdraw.paymentDetails.crypto.currency}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Wallet Address:</span>
                      <div className="detail-value with-copy">
                        <span className="crypto-address">
                          {selectedWithdraw.paymentDetails.crypto.walletAddress}
                        </span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(selectedWithdraw.paymentDetails.crypto.walletAddress)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    {selectedWithdraw.paymentDetails.crypto.txid && (
                      <div className="detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <div className="detail-value with-copy">
                          <span className="txid">
                            {selectedWithdraw.paymentDetails.crypto.txid}
                          </span>
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(selectedWithdraw.paymentDetails.crypto.txid)}
                          >
                            <i className="fa-solid fa-copy"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Money Details */}
                {selectedWithdraw.paymentMethod === 'mobile_money' && selectedWithdraw.paymentDetails?.mobileMoney && (
                  <div className="detail-section">
                    <h4 className="section-title">Mobile Money Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Provider:</span>
                      <span className="detail-value">{selectedWithdraw.paymentDetails.mobileMoney.provider}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone Number:</span>
                      <div className="detail-value with-copy">
                        <span className="phone-number">
                          {selectedWithdraw.paymentDetails.mobileMoney.phoneNumber}
                        </span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(selectedWithdraw.paymentDetails.mobileMoney.phoneNumber)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    {selectedWithdraw.paymentDetails.mobileMoney.transactionId && (
                      <div className="detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <div className="detail-value with-copy">
                          <span className="txid">
                            {selectedWithdraw.paymentDetails.mobileMoney.transactionId}
                          </span>
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(selectedWithdraw.paymentDetails.mobileMoney.transactionId)}
                          >
                            <i className="fa-solid fa-copy"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bank Transfer Details */}
                {selectedWithdraw.paymentMethod === 'bank_transfer' && selectedWithdraw.paymentDetails?.bank && (
                  <div className="detail-section">
                    <h4 className="section-title">Bank Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Bank Name:</span>
                      <span className="detail-value">{selectedWithdraw.paymentDetails.bank.bankName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Account Number:</span>
                      <div className="detail-value with-copy">
                        <span className="account-number">
                          {selectedWithdraw.paymentDetails.bank.accountNumber}
                        </span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(selectedWithdraw.paymentDetails.bank.accountNumber)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Account Holder:</span>
                      <span className="detail-value">{selectedWithdraw.paymentDetails.bank.accountHolder}</span>
                    </div>
                    {selectedWithdraw.paymentDetails.bank.swiftCode && (
                      <div className="detail-row">
                        <span className="detail-label">SWIFT Code:</span>
                        <span className="detail-value">{selectedWithdraw.paymentDetails.bank.swiftCode}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Transaction Info */}
                <div className="detail-section">
                  <h4 className="section-title">Transaction Information</h4>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {selectedWithdraw.createdAt ? new Date(selectedWithdraw.createdAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span className="detail-value">
                      <div
                        className="payment-badge"
                        style={{
                          color: getPaymentMethodInfo(selectedWithdraw.paymentMethod).color,
                          backgroundColor: getPaymentMethodInfo(selectedWithdraw.paymentMethod).bgColor,
                          borderColor: getPaymentMethodInfo(selectedWithdraw.paymentMethod).color
                        }}
                      >
                        <i className={getPaymentMethodInfo(selectedWithdraw.paymentMethod).icon}></i>
                        {getPaymentMethodInfo(selectedWithdraw.paymentMethod).text}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-action primary" onClick={closePaymentModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
        .withdraw-list-container {
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

        .actions-header {
          width: 120px;
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

        .actions-cell {
          position: sticky;
          right: 0;
          background: inherit;
          z-index: 2;
        }

        .actions-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 40px;
        }

        .numeric {
          text-align: right;
        }

        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 600;
          width: fit-content;
        }

        .payment-badge i {
          font-size: 10px;
        }

        .payment-details {
          font-size: 12px;
          color: #6c757d;
        }

        .view-details {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #4299E1;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .view-details:hover {
          background: #EBF8FF;
        }

        .view-details i {
          font-size: 10px;
        }

        .amount-withdraw {
          color: #dc3545;
          font-weight: 600;
        }

        .status-buttons {
          display: flex;
          gap: 8px;
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

        .btn-action.primary {
          background: #007bff;
          color: white;
        }

        .btn-action.primary:hover {
          background: #0056b3;
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-container {
          background: white;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #495057;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: #6c757d;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .modal-close:hover {
          background-color: #f8f9fa;
        }

        .modal-content {
          padding: 20px;
        }

        .payment-details-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #495057;
          padding-bottom: 8px;
          border-bottom: 1px solid #e9ecef;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
        }

        .detail-label {
          color: #6c757d;
          font-size: 14px;
          font-weight: 500;
          min-width: 120px;
        }

        .detail-value {
          color: #495057;
          font-size: 14px;
          font-weight: 500;
          text-align: right;
          flex: 1;
        }

        .detail-value.amount {
          font-size: 16px;
          font-weight: 700;
          color: #dc3545;
        }

        .detail-value.with-copy {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }

        .crypto-address,
        .txid,
        .phone-number,
        .account-number {
          font-family: monospace;
          font-size: 12px;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 4px;
          word-break: break-all;
        }

        .copy-btn {
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }

        .copy-btn:hover {
          background: #495057;
        }

        .modal-actions {
          padding: 20px;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
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
          
          .payment-badge,
          .status-badge {
            padding: 4px 8px;
            font-size: 11px;
          }
          
          .modal-container {
            margin: 10px;
            max-width: calc(100vw - 20px);
          }
          
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .detail-value {
            text-align: left;
          }
          
          .detail-value.with-copy {
            justify-content: flex-start;
          }

          .actions-cell {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}

export default WithdrawListTable;