import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from "src/modules/transaction/list/transactionListActions";
import selectors from "src/modules/transaction/list/transactionListSelectors";

function TransactionHistory() {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("all"); // all, deposit, withdraw
  const [statusFilter, setStatusFilter] = useState("all"); // all, success, pending, canceled
  
  const records = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  // Filter transactions based on selected filters
  const filteredTransactions = records.filter(transaction => {
    const typeMatch = typeFilter === "all" || transaction.type === typeFilter;
    const statusMatch = statusFilter === "all" || transaction.status === statusFilter;
    return typeMatch && statusMatch;
  });

  // Get payment method icon and color
  const getPaymentMethodInfo = (method) => {
    switch (method) {
      case "trc20":
        return { icon: "fas fa-coins", color: "#f7931a", label: "USDT TRC20" };
      case "mtn":
        return { icon: "fas fa-sim-card", color: "#ffcc00", label: "MTN Mobile Money" };
      case "airtel":
        return { icon: "fas fa-wifi", color: "#e60000", label: "Airtel Money" };
      case "telecel":
        return { icon: "fas fa-broadcast-tower", color: "#00aaff", label: "Telecel Money" };
      case "orange":
        return { icon: "fas fa-bolt", color: "#ff6600", label: "Orange Money" };
      default:
        return { icon: "fas fa-money-bill", color: "#7b8796", label: "Payment" };
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "#27ae60";
      case "pending": return "#f39c12";
      case "canceled": return "#e74c3c";
      default: return "#7b8796";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "success": return "fas fa-check-circle";
      case "pending": return "fas fa-clock";
      case "canceled": return "fas fa-times-circle";
      default: return "fas fa-info-circle";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Calculate summary data
  const summaryData = {
    deposit: filteredTransactions
      .filter(t => t.type === "deposit" && t.status === "success")
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0),
    withdraw: filteredTransactions
      .filter(t => t.type === "withdraw" && t.status === "success")
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
  };

  return (
    <>
      <SubHeader title="Transaction History" />

   
 

      {/* Transactions List */}
      <div className="transactions-section">
        <div className="section-header">
          <div className="section-title">
            <i className="fas fa-history" />
            Recent Transactions
          </div>
          <div className="transaction-count">
            {filteredTransactions.length} transactions
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin" />
            <p>Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-receipt" />
            <p>No transactions found</p>
            <span>Try adjusting your filters</span>
          </div>
        ) : (
          <div className="transactions-list">
            {filteredTransactions.map((transaction) => {
              const methodInfo = getPaymentMethodInfo(transaction.paymentMethod);
              return (
                <div key={transaction._id || transaction.id} className="transaction-item">
                  <div
                    className="transaction-icon"
                    style={{ 
                      backgroundColor: `${methodInfo.color}20`, 
                      color: methodInfo.color 
                    }}
                  >
                    <i className={methodInfo.icon} />
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-main">
                      <div className="transaction-info">
                        <div className="transaction-description">
                          {methodInfo.label}
                        </div>
                        <div className="transaction-type">
                          {transaction.type} • {transaction.referenceNumber}
                        </div>
                      </div>
                      <div className={`transaction-amount ${transaction.type}`}>
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                      </div>
                    </div>

                    <div className="transaction-meta">
                      <div className="transaction-date">
                        {formatDate(transaction.datetransaction || transaction.createdAt)}
                      </div>
                      <div
                        className="transaction-status"
                        style={{ color: getStatusColor(transaction.status) }}
                      >
                        <i className={getStatusIcon(transaction.status)} />
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        /* Summary Cards */
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 20px 15px;
        }
        
        .summary-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .summary-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .summary-icon.deposit {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .summary-icon.withdraw {
          background: #ffebee;
          color: #c62828;
        }
        
        .summary-label {
          font-size: 12px;
          color: #7b8796;
          margin-bottom: 5px;
        }
        
        .summary-amount {
          font-size: 18px;
          font-weight: 700;
          color: #0f2161;
        }
        
        /* Filter Section */
        .filter-section {
          background: white;
          margin: 0 15px 20px;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .filter-group {
          margin-bottom: 20px;
        }
        
        .filter-group:last-child {
          margin-bottom: 0;
        }
        
        .filter-label {
          font-size: 14px;
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 12px;
        }
        
        .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 10px 16px;
          border: 2px solid #f0f4ff;
          background: white;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: #7b8796;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .filter-btn.active {
          background: #0f2161;
          color: white;
          border-color: #0f2161;
        }
        
        .filter-btn:active {
          transform: scale(0.95);
        }
        
        /* Transactions Section */
        .transactions-section {
          background: white;
          margin: 25px 0px 80px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 15px;
          border-bottom: 1px solid #f5f6f7;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f2161;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section-title i {
          color: #7b8796;
          font-size: 16px;
        }
        
        .transaction-count {
          font-size: 12px;
          color: #7b8796;
          background: #f8f9fa;
          padding: 4px 10px;
          border-radius: 12px;
        }
        
        .transactions-list {
          overflow-y: auto;
        }
        
        .transaction-item {
          display: flex;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #f5f6f7;
          transition: all 0.2s ease;
        }
        
        .transaction-item:active {
          background: #f9f9f9;
        }
        
        .transaction-item:last-child {
          border-bottom: none;
        }
        
        .transaction-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .transaction-details {
          flex: 1;
        }
        
        .transaction-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .transaction-info {
          flex: 1;
        }
        
        .transaction-description {
          font-weight: 600;
          color: #0f2161;
          font-size: 15px;
          margin-bottom: 4px;
        }
        
        .transaction-type {
          font-size: 12px;
          color: #7b8796;
          text-transform: capitalize;
        }
        
        .transaction-amount {
          font-weight: 700;
          font-size: 16px;
          margin-left: 10px;
        }
        
        .transaction-amount.deposit {
          color: #2e7d32;
        }
        
        .transaction-amount.withdraw {
          color: #c62828;
        }
        
        .transaction-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .transaction-date {
          font-size: 12px;
          color: #7b8796;
        }
        
        .transaction-status {
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        /* Loading State */
        .loading-state {
          padding: 60px 20px;
          text-align: center;
          color: #7b8796;
        }
        
        .loading-state i {
          font-size: 30px;
          margin-bottom: 15px;
          color: #0f2161;
        }
        
        .loading-state p {
          font-size: 14px;
          color: #7b8796;
        }
        
        /* Empty State */
        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: #7b8796;
        }
        
        .empty-state i {
          font-size: 50px;
          margin-bottom: 15px;
          opacity: 0.5;
        }
        
        .empty-state p {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0f2161;
        }
        
        .empty-state span {
          font-size: 14px;
        }
        
        /* Responsive Design */
        @media (max-width: 340px) {
          .summary-cards {
            grid-template-columns: 1fr;
          }
          
          .filter-buttons {
            gap: 8px;
          }
          
          .filter-btn {
            padding: 8px 12px;
            font-size: 12px;
          }
          
          .transaction-icon {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default TransactionHistory;