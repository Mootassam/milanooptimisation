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
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
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

  const openPaymentModal = (deposit) => {
    setSelectedDeposit(deposit);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedDeposit(null);
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
      case 'success':
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
    <div className="spot-list-container">
      <div className="table-responsive">
        <table className="spot-list-table">
          <thead className="table-header">
            <tr>
         
              <th
                className="sortable-header"
                onClick={() => doChangeSort('user')}
              >
                {i18n('entities.deposit.fields.user')}
                {sorter.field === 'user' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('paymentMethod')}
              >
                Payment Method
                {sorter.field === 'paymentMethod' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('amount')}
              >
                {i18n('entities.deposit.fields.amount')}
                {sorter.field === 'amount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('status')}
              >
                {i18n('entities.deposit.fields.status')}
                {sorter.field === 'status' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('createdAt')}
              >
                Date
                {sorter.field === 'createdAt' && (
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
            {!loading &&
              rows.map((row) => {
                const paymentMethodInfo = getPaymentMethodInfo(row.paymentMethod);
                const statusInfo = getStatusInfo(row.status);
                const isPending = row.status === 'pending';
                const isCrypto = row.paymentMethod === 'crypto';

                return (
                  <tr key={row.id} className="table-row">
                   
                    <td className="table-cell">
                      <UserListItem value={row.user} />
                    </td>
                    <td className="table-cell">
                      <div
                        className={`payment-info`}

                      >
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
                      <span className="amount-deposit">
                        {formatCurrency(row.amount, row.currency)}
                      </span>
                    </td>
                    <td className="table-cell">
                      {isPending ? (
                        <div className="status-buttons">
                          <button
                            className="btn-action edit"
                            onClick={() => handleStatusChange(row.id, 'success')}
                          >
                            <i className="fa-solid fa-check"></i>
                            Complete
                          </button>
                          <button
                            className="btn-action delete"
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
                    <td className="table-cell">
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="actions-cell">
                      <div className='actions-container' style={{ cursor: 'pointer' }}>

                        {isCrypto && (
                          <div className={`view-details  `} onClick={() => isCrypto && openPaymentModal(row)}>
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
      {showPaymentModal && selectedDeposit && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">
                <i className="fa-solid fa-coins"></i>
                Crypto Payment Details
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
                          color: getStatusInfo(selectedDeposit?.status).color,
                          backgroundColor: getStatusInfo(selectedDeposit?.status).bgColor,
                          borderColor: getStatusInfo(selectedDeposit?.status).color
                        }}
                      >
                        <i className={getStatusInfo(selectedDeposit?.status).icon}></i>
                        {getStatusInfo(selectedDeposit?.status).text}
                      </div>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value amount">
                      {formatCurrency(selectedDeposit.amount, selectedDeposit.currency)}
                    </span>
                  </div>
                </div>

                {/* Crypto Details */}
                {selectedDeposit.paymentDetails?.crypto && (
                  <div className="detail-section">
                    <h4 className="section-title">Crypto Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Network:</span>
                      <span className="detail-value">{selectedDeposit.paymentDetails.crypto.network}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Currency:</span>
                      <span className="detail-value">{selectedDeposit.paymentDetails.crypto.currency}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Wallet Address:</span>
                      <div className="detail-value with-copy">
                        <span className="crypto-address">
                          {selectedDeposit.paymentDetails.crypto.walletAddress}
                        </span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(selectedDeposit.paymentDetails.crypto.walletAddress)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Transaction ID:</span>
                      <div className="detail-value with-copy">
                        <span className="txid">
                          {selectedDeposit.paymentDetails.crypto.txid}
                        </span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(selectedDeposit.paymentDetails.crypto.txid)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Transaction Info */}
                <div className="detail-section">
                  <h4 className="section-title">Transaction Information</h4>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {selectedDeposit.createdAt ? new Date(selectedDeposit.createdAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span className="detail-value">
                      <div
                        className="payment-badge"
                        style={{
                          color: getPaymentMethodInfo(selectedDeposit.paymentMethod).color,
                          backgroundColor: getPaymentMethodInfo(selectedDeposit.paymentMethod).bgColor,
                          borderColor: getPaymentMethodInfo(selectedDeposit.paymentMethod).color
                        }}
                      >
                        <i className={getPaymentMethodInfo(selectedDeposit.paymentMethod).icon}></i>
                        {getPaymentMethodInfo(selectedDeposit.paymentMethod).text}
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
        .spot-list-container {
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

   

        .numeric {
          text-align: right;
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
          width: 120px;
        }

        /* Payment Info Styles */
        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-info.clickable {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .payment-info.clickable:hover {
          background: #f8f9ff;
          border-radius: 6px;
          padding: 8px;
          margin: -8px;
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
          margin-top: 2px;
          font-weight: 500;
        }

        .view-details i {
          font-size: 10px;
        }

        /* Amount Styles */
        .amount-deposit {
          color: #28a745;
          font-weight: 600;
        }

        /* Status Styles */
        .status-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-action {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-action.edit {
          background: #28a745;
          color: white;
        }

        .btn-action.edit:hover {
          background: #218838;
        }

        .btn-action.delete {
          background: #dc3545;
          color: white;
        }

        .btn-action.delete:hover {
          background: #c82333;
        }

        .btn-action.primary {
          background: #007bff;
          color: white;
        }

        .btn-action.primary:hover {
          background: #0056b3;
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
          color: #28a745;
        }

        .detail-value.with-copy {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }

        .crypto-address,
        .txid {
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
        }

        /* Responsive */
        @media (max-width: 768px) {
      
          .status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .btn-action {
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
        }
      `}</style>
    </div>
  );
}

export default DepositListTable;