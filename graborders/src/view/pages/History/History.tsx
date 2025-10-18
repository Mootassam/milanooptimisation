import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";

function TransactionHistory() {
    const [filter, setFilter] = useState("all"); // all, deposit, withdraw
    const [statusFilter, setStatusFilter] = useState("all"); // all, completed, pending, failed

    // Sample transaction data
    const transactions = [
        {
            id: 1,
            type: "deposit",
            method: "crypto",
            amount: 250.75,
            currency: "USD",
            status: "completed",
            date: "2024-01-15 14:30:25",
            description: "USDT Deposit",
            icon: "fas fa-coins",
            color: "#f7931a"
        },
        {
            id: 2,
            type: "deposit",
            method: "mtn",
            amount: 100.00,
            currency: "USD",
            status: "completed",
            date: "2024-01-14 10:15:42",
            description: "MTN Mobile Money",
            icon: "fas fa-sim-card",
            color: "#ffcc00"
        },
        {
            id: 3,
            type: "withdraw",
            method: "bank",
            amount: 150.50,
            currency: "USD",
            status: "pending",
            date: "2024-01-14 09:20:15",
            description: "Bank Transfer",
            icon: "fas fa-university",
            color: "#0f2161"
        },
        {
            id: 4,
            type: "deposit",
            method: "orange",
            amount: 75.25,
            currency: "USD",
            status: "completed",
            date: "2024-01-13 16:45:30",
            description: "Orange Money",
            icon: "fas fa-bolt",
            color: "#ff6600"
        },
        {
            id: 5,
            type: "withdraw",
            method: "crypto",
            amount: 200.00,
            currency: "USD",
            status: "completed",
            date: "2024-01-12 11:30:18",
            description: "USDT Withdrawal",
            icon: "fas fa-coins",
            color: "#f7931a"
        },
        {
            id: 6,
            type: "deposit",
            method: "airtel",
            amount: 50.00,
            currency: "USD",
            status: "failed",
            date: "2024-01-12 08:15:55",
            description: "Airtel Money",
            icon: "fas fa-wifi",
            color: "#e60000"
        },
        {
            id: 7,
            type: "deposit",
            method: "telecel",
            amount: 125.80,
            currency: "USD",
            status: "completed",
            date: "2024-01-11 13:20:33",
            description: "Telecel Money",
            icon: "fas fa-broadcast-tower",
            color: "#00aaff"
        },
        {
            id: 8,
            type: "withdraw",
            method: "mtn",
            amount: 80.00,
            currency: "USD",
            status: "completed",
            date: "2024-01-10 15:40:12",
            description: "MTN Mobile Money",
            icon: "fas fa-sim-card",
            color: "#ffcc00"
        }
    ];

    // Filter transactions based on selected filters
    const filteredTransactions = transactions.filter(transaction => {
        const typeMatch = filter === "all" || transaction.type === filter;
        const statusMatch = statusFilter === "all" || transaction.status === statusFilter;
        return typeMatch && statusMatch;
    });

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "#27ae60";
            case "pending": return "#f39c12";
            case "failed": return "#e74c3c";
            default: return "#7b8796";
        }
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed": return "fas fa-check-circle";
            case "pending": return "fas fa-clock";
            case "failed": return "fas fa-times-circle";
            default: return "fas fa-info-circle";
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };



    return (
        <>

            <SubHeader title="Transaction History" />

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-icon deposit">
                        <i className="fas fa-arrow-down" />
                    </div>
                    <div className="summary-info">
                        <div className="summary-label">Total Deposits</div>
                        <div className="summary-amount">$501.80</div>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon withdraw">
                        <i className="fas fa-arrow-up" />
                    </div>
                    <div className="summary-info">
                        <div className="summary-label">Total Withdrawals</div>
                        <div className="summary-amount">$430.50</div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-group">
                    <div className="filter-label">Transaction Type</div>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === "all" ? "active" : ""}`}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${filter === "deposit" ? "active" : ""}`}
                            onClick={() => setFilter("deposit")}
                        >
                            <i className="fas fa-arrow-down" />
                            Deposits
                        </button>
                        <button
                            className={`filter-btn ${filter === "withdraw" ? "active" : ""}`}
                            onClick={() => setFilter("withdraw")}
                        >
                            <i className="fas fa-arrow-up" />
                            Withdrawals
                        </button>
                    </div>
                </div>

                <div className="filter-group">
                    <div className="filter-label">Status</div>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
                            onClick={() => setStatusFilter("all")}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === "completed" ? "active" : ""}`}
                            onClick={() => setStatusFilter("completed")}
                        >
                            <i className="fas fa-check-circle" />
                            Completed
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === "pending" ? "active" : ""}`}
                            onClick={() => setStatusFilter("pending")}
                        >
                            <i className="fas fa-clock" />
                            Pending
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === "failed" ? "active" : ""}`}
                            onClick={() => setStatusFilter("failed")}
                        >
                            <i className="fas fa-times-circle" />
                            Failed
                        </button>
                    </div>
                </div>
            </div>

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

                {filteredTransactions.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-receipt" />
                        <p>No transactions found</p>
                        <span>Try adjusting your filters</span>
                    </div>
                ) : (
                    <div className="transactions-list">
                        {filteredTransactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-item">
                                <div
                                    className="transaction-icon"
                                    style={{ backgroundColor: `${transaction.color}20`, color: transaction.color }}
                                >
                                    <i className={transaction.icon} />
                                </div>

                                <div className="transaction-details">
                                    <div className="transaction-main">
                                        <div className="transaction-description">
                                            {transaction.description}
                                        </div>
                                        <div className={`transaction-amount ${transaction.type}`}>
                                            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                                        </div>
                                    </div>

                                    <div className="transaction-meta">
                                        <div className="transaction-date">
                                            {formatDate(transaction.date)}
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
                        ))}
                    </div>
                )}
            </div>



            <style>{`
        /* Header Styles */
        .history-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 15px 10px;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .back-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2161;
          text-decoration: none;
          font-size: 18px;
        }
        
        .history-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f2161;
          margin: 0;
        }
        
        .header-placeholder {
          width: 40px;
        }
        
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
          margin: 0 15px 80px;
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
          max-height: 500px;
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
        
        .transaction-description {
          font-weight: 600;
          color: #0f2161;
          font-size: 15px;
        }
        
        .transaction-amount {
          font-weight: 700;
          font-size: 16px;
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
        
        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          display: flex;
          justify-content: space-around;
          padding: 12px 0;
          box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          max-width: 400px;
          margin: 0 auto;
          border-radius: 20px 20px 0 0;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #7b8796;
          font-size: 12px;
          width: 20%;
        }
        
        .nav-item i {
          font-size: 20px;
          margin-bottom: 4px;
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