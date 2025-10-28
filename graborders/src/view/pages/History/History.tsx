import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from "src/modules/transaction/list/transactionListActions";
import selectors from "src/modules/transaction/list/transactionListSelectors";
import Header from "src/view/layout/Header";

function TransactionHistory() {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("all");
  
  const records = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  // Filter transactions based on selected type
  const filteredTransactions = records.filter(transaction => {
    return typeFilter === "all" || transaction.type === typeFilter;
  });

  // Get transaction type icon and color
  const getTransactionTypeInfo = (type) => {
    switch (type) {
      case "deposit":
        return { 
          icon: "fas fa-arrow-down", 
          color: "#27ae60", 
          bgColor: "#e8f5e9",
          label: "Deposit"
        };
      case "withdraw":
        return { 
          icon: "fas fa-arrow-up", 
          color: "#e74c3c", 
          bgColor: "#ffebee",
          label: "Withdraw"
        };
      default:
        return { 
          icon: "fas fa-exchange-alt", 
          color: "#7b8796", 
          bgColor: "#f5f6f7",
          label: "Transaction"
        };
    }
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "trc20":
        return "fab fa-bitcoin";
      case "mtn":
        return "fas fa-sim-card";
      case "airtel":
        return "fas fa-wifi";
      case "telecel":
        return "fas fa-broadcast-tower";
      case "orange":
        return "fas fa-bolt";
      default:
        return "fas fa-money-bill";
    }
  };

  // Get status badge color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "success": 
        return { 
          color: "#27ae60", 
          icon: "fas fa-check-circle",
          label: "Completed"
        };
      case "pending": 
        return { 
          color: "#f39c12", 
          icon: "fas fa-clock",
          label: "Processing"
        };
      case "canceled": 
        return { 
          color: "#e74c3c", 
          icon: "fas fa-times-circle",
          label: "Canceled"
        };
      default: 
        return { 
          color: "#7b8796", 
          icon: "fas fa-info-circle",
          label: "Unknown"
        };
    }
  };

  // Format date to relative time or absolute
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Format amount with proper sign
  const formatAmount = (type, amount) => {
    const sign = type === "deposit" ? "+" : "-";
    return `${sign}$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <>
  <Header
        title="Transaction History"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      {/* Quick Type Filter */}
      <div className="quick-filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${typeFilter === "all" ? "active" : ""}`}
            onClick={() => setTypeFilter("all")}
          >
            <i className="fas fa-list" />
            All
          </button>
          <button
            className={`filter-btn ${typeFilter === "deposit" ? "active" : ""}`}
            onClick={() => setTypeFilter("deposit")}
          >
            <i className="fas fa-arrow-down" />
            Deposits
          </button>
          <button
            className={`filter-btn ${typeFilter === "withdraw" ? "active" : ""}`}
            onClick={() => setTypeFilter("withdraw")}
          >
            <i className="fas fa-arrow-up" />
            Withdrawals
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-section">
        <div className="section-header">
          <div className="section-title">
            <i className="fas fa-receipt" />
            Recent Transactions
          </div>
          <div className="transaction-count">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin" />
            </div>
            <p>Loading your transactions...</p>
            <span>Please wait a moment</span>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-receipt" />
            </div>
            <p>No transactions found</p>
            <span>When you make transactions, they'll appear here</span>
          </div>
        ) : (
          <div className="transactions-list">
            {filteredTransactions.map((transaction) => {
              const typeInfo = getTransactionTypeInfo(transaction.type);
              const statusInfo = getStatusInfo(transaction.status);
              
              return (
                <div key={transaction._id || transaction.id} className="transaction-item">
                  <div
                    className="transaction-type-icon"
                    style={{ 
                      backgroundColor: typeInfo.bgColor, 
                      color: typeInfo.color 
                    }}
                  >
                    <i className={typeInfo.icon} />
                  </div>

                  <div className="transaction-content">
                    <div className="transaction-header">
                      <div className="transaction-info">
                        <div className="transaction-title">
                          {typeInfo.label}
                        </div>
                        <div className="transaction-meta">
                          <div className="payment-method">
                            <i className={getPaymentMethodIcon(transaction.paymentMethod)} />
                            {transaction.paymentMethod}
                          </div>
                          <div className="transaction-date">
                            {formatDate(transaction.datetransaction || transaction.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className={`transaction-amount ${transaction.type}`}>
                        {formatAmount(transaction.type, transaction.amount)}
                      </div>
                    </div>

                    <div className="transaction-footer">
                      <div className="transaction-reference">
                        Ref: {transaction.referenceNumber}
                      </div>
                      <div
                        className="transaction-status"
                        style={{ color: statusInfo.color }}
                      >
                        <i className={statusInfo.icon} />
                        {statusInfo.label}
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
        /* Quick Filter Section */
        .quick-filter-section {
          padding: 20px 0px 0;
        }
        
        .filter-buttons {
          display: flex;
          gap: 8px;
          background: #f8f9fa;
          padding: 6px;
          border-radius: 16px;
        }
        
        .filter-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #7b8796;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .filter-btn.active {
          background: white;
          color: #0f2161;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .filter-btn i {
          font-size: 12px;
        }
        
        /* Transactions Section */
        .transactions-section {
          background: white;
          margin: 15px 0px 80px;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
          min-height: 60vh;
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
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 600;
        }
        
        .transactions-list {
          overflow-y: auto;
        }
        
        .transaction-item {
          display: flex;
          align-items: flex-start;
          padding: 20px;
          border-bottom: 1px solid #f5f6f7;
          transition: all 0.2s ease;
          gap: 15px;
        }
        
        .transaction-item:active {
          background: #f9f9f9;
        }
        
        .transaction-item:last-child {
          border-bottom: none;
        }
        
        .transaction-type-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        
        .transaction-item:active .transaction-type-icon {
          transform: scale(0.95);
        }
        
        .transaction-content {
          flex: 1;
          min-width: 0;
        }
        
        .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 10px;
        }
        
        .transaction-info {
          flex: 1;
          min-width: 0;
        }
        
        .transaction-title {
          font-weight: 700;
          color: #0f2161;
          font-size: 16px;
          margin-bottom: 6px;
        }
        
        .transaction-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: #7b8796;
        }
        
        .payment-method {
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: capitalize;
        }
        
        .payment-method i {
          font-size: 10px;
        }
        
        .transaction-amount {
          font-weight: 800;
          font-size: 17px;
          flex-shrink: 0;
        }
        
        .transaction-amount.deposit {
          color: #27ae60;
        }
        
        .transaction-amount.withdraw {
          color: #e74c3c;
        }
        
        .transaction-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .transaction-reference {
          font-size: 11px;
          color: #a0a4ab;
          font-family: monospace;
        }
        
        .transaction-status {
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .transaction-status i {
          font-size: 10px;
        }
        
        /* Loading State */
        .loading-state {
          padding: 80px 20px;
          text-align: center;
          color: #7b8796;
        }
        
        .loading-spinner {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          background: #f0f4ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loading-spinner i {
          font-size: 24px;
          color: #0f2161;
        }
        
        .loading-state p {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0f2161;
        }
        
        .loading-state span {
          font-size: 14px;
          color: #7b8796;
        }
        
        /* Empty State */
        .empty-state {
          padding: 80px 20px;
          text-align: center;
          color: #7b8796;
        }
        
        .empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .empty-icon i {
          font-size: 32px;
          color: #a0a4ab;
        }
        
        .empty-state p {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0f2161;
        }
        
        .empty-state span {
          font-size: 14px;
          line-height: 1.4;
        }
        
        /* Enhanced animations */
        .transaction-item {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 340px) {
          .transaction-item {
            padding: 15px;
            gap: 12px;
          }
          
          .transaction-type-icon {
            width: 44px;
            height: 44px;
            font-size: 16px;
          }
          
          .transaction-title {
            font-size: 15px;
          }
          
          .transaction-amount {
            font-size: 16px;
          }
          
          .filter-btn {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

export default TransactionHistory;