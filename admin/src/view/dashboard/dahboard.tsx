import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userListActions from 'src/modules/user/list/userListActions';
import userListSelectors from 'src/modules/user/list/userListSelectors';
import { Link } from 'react-router-dom';
function Dashboard() {
  const [timeFrame, setTimeFrame] = useState('today');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  // Redux selectors for actual data
  const loadingDashboard = useSelector(userListSelectors.dashboardLoading);
  const dashboardData = useSelector(userListSelectors.dataDashboard);

  // Individual data selectors
  const userMetrics = useSelector(userListSelectors.selectUserMetrics);
  const transactionMetrics = useSelector(userListSelectors.selectTransactionMetrics);
  const totalUsers = useSelector(userListSelectors.selectTotalUsers);
  const activeAccounts = useSelector(userListSelectors.selectActiveAccounts);
  const newUsersLast7Days = useSelector(userListSelectors.selectNewUsersLast7Days);
  const completedTasksCount = useSelector(userListSelectors.selectCompletedTasksCount);
  const topPerformers = useSelector(userListSelectors.selectTopPerformers);
  const totalTransactions = useSelector(userListSelectors.selectTotalTransactions);
  const totalVolume = useSelector(userListSelectors.selectTotalVolume);
  const lastTransactions = useSelector(userListSelectors.selectLastTransactions);
  const depositCompletedCount = useSelector(userListSelectors.selectDepositCompletedCount);
  const depositTotalAmount = useSelector(userListSelectors.selectDepositTotalAmount);
  const withdrawalPendingCount = useSelector(userListSelectors.selectWithdrawalPendingCount);
  const withdrawalTotalAmount = useSelector(userListSelectors.selectWithdrawalTotalAmount);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
      case 'completed':
        return { color: '#10B981', bgColor: '#ECFDF5', icon: '✓' };
      case 'pending':
        return { color: '#F59E0B', bgColor: '#FFFBEB', icon: '⏱' };
      case 'failed':
        return { color: '#EF4444', bgColor: '#FEF2F2', icon: '✗' };
      default:
        return { color: '#6B7280', bgColor: '#F9FAFB', icon: '●' };
    }
  };

  useEffect(() => {
    dispatch(userListActions.dashboard());
  }, [dispatch]);

  // Reset tasks for all users
  const handleResetAllTasks = () => {
    dispatch
      (userListActions.resetAllTasks());

  };



  // Loading state
  if (loadingDashboard) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
        <style>{`
          .dashboard-container {
            padding: 20px;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading-state {
            text-align: center;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (!dashboardData) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <h3>No Data Available</h3>
          <p>Unable to load dashboard data. Please try again.</p>
          <button
            onClick={() => dispatch(userListActions.dashboard())}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
        <style>{`
          .dashboard-container {
            padding: 20px;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .error-state {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .retry-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 16px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Section with Reset Buttons */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <p className="dashboard-subtitle">Real-time analytics and performance metrics</p>
          </div>

        </div>
      </div>

      {/* Key Metrics Grid - Using ACTUAL DATA */}
      <div className="metrics-grid">
        {/* Total Revenue - Using totalVolume from transactions */}
        <div className="metric-card revenue">
          <div className="metric-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{formatCurrency(depositTotalAmount)}</h3>
            <p className="metric-label">Total Deposit</p>
          </div>
        </div>

        {/* Total Users - Using actual userMetrics */}
        <div className="metric-card users">
          <div className="metric-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{totalUsers.toLocaleString()}</h3>
            <p className="metric-label">Total Users</p>
          </div>
        </div>

        {/* Total Transactions - Using actual transactionMetrics */}
        <div className="metric-card transactions">
          <div className="metric-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{totalTransactions.toLocaleString()}</h3>
            <p className="metric-label">Total Transactions</p>
          </div>
        </div>

        {/* Active Accounts - Using actual userMetrics */}
        <div className="metric-card accounts">
          <div className="metric-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{activeAccounts.toLocaleString()}</h3>
            <p className="metric-label">Active Accounts</p>
          </div>
        </div>
      </div>

      {/* Today's Overview - Using actual data where available */}
      <div className="today-overview">
        <h2 className="section-title">Overview</h2>
        <div className="today-grid">
          <div className="today-card">
            <div className="today-icon success">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="today-content">
              <h4>{formatCurrency(totalVolume)}</h4>
              <p>Total Volume</p>
            </div>
          </div>
          <div className="today-card">
            <div className="today-info">
              <div className="today-icon primary">
                <i className="fas fa-arrow-down"></i>
              </div>
              <div className="today-content">
                <h4>{depositCompletedCount}</h4>
                <p>Completed Deposits</p>
              </div>
            </div>
            <div className="today-badge success">Completed</div>
          </div>
          <div className="today-card">
            <div className="today-info">
              <div className="today-icon warning">
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className="today-content">
                <h4>{withdrawalPendingCount}</h4>
                <p>Pending Withdrawals</p>
              </div>
            </div>
            <div className="today-badge warning">Pending</div>
          </div>
          <div className="today-card">
            <div className="today-info">
              <div className="today-icon info">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="today-content">
                <h4>{newUsersLast7Days}</h4>
                <p>New Users (7 days)</p>
              </div>
            </div>
            <div className="today-badge success">New</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Recent Transactions - Using ACTUAL transactions */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <button className="view-all-btn"> <Link to="/transaction"> View All</Link></button>
          </div>
          <div className="transactions-list">
            {lastTransactions.map(transaction => {
              const statusInfo = getStatusInfo(transaction.status);
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-main">
                    <div className="user-avatar">
                      {transaction.user.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <div className="transaction-details">
                      <span className="user-name">{transaction.user}</span>
                      <span className="transaction-type">Transaction</span>
                    </div>
                    <div className="transaction-amount">
                      {formatCurrency(parseFloat(transaction.amount))}
                    </div>
                  </div>
                  <div className="transaction-meta">
                    <span
                      className="status-badge"
                      style={{
                        color: statusInfo.color,
                        backgroundColor: statusInfo.bgColor
                      }}
                    >
                      {statusInfo.icon} {transaction.status}
                    </span>
                    <span className="transaction-date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
            {lastTransactions.length === 0 && (
              <div className="no-data">
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>

        {/* User Performance - Using actual completed tasks data */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Top Performers</h3>

            <button
              className="btn-reset-all"
              onClick={handleResetAllTasks}
              disabled={loading}
            >
              <i className="fas fa-bomb"></i>
              Reset All Tasks  <span className="badge-count">{topPerformers.length}</span>
            </button>

          </div>
          <div className="users-list">
            {topPerformers.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <div className="user-main">
                    <span className="username">{user.email}</span>
                  </div>
                  <div className="user-meta">
                    <span className="user-status success">
                      {user.tasksDone} tasks completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {topPerformers.length === 0 && (
              <div className="no-data">
                <p>No performance data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add no-data styles */}
      <style>{`
        .no-data {
          text-align: center;
          padding: 20px;
          color: #64748b;
        }
        
        .user-status.success {
          background: #ECFDF5 !important;
          color: #10B981 !important;
        }

        /* Header Actions Styles */
        .header-left {
          flex: 1;
        }

        .dashboard-subtitle {
          color: #64748b;
          margin: 4px 0 0 0;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-reset-top {
          padding: 10px 16px;
          border: 1px solid #f59e0b;
          background: white;
          color: #f59e0b;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-reset-top:hover:not(:disabled) {
          background: #f59e0b;
          color: white;
        }

        .btn-reset-top:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-reset-all {
          padding: 3px 16px;
          border: 1px solid #ef4444;
          background: white;
          color: #ef4444;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-reset-all:hover:not(:disabled) {
          background: #ef4444;
          color: white;
        }

        .btn-reset-all:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Rest of your existing styles */}
      <style>{`
        .dashboard-container {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .dashboard-header {
          margin-bottom: 30px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .metric-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 16px;
          border-left: 4px solid;
        }

        .metric-card.revenue {
          border-left-color: #10B981;
        }

        .metric-card.users {
          border-left-color: #3B82F6;
        }

        .metric-card.transactions {
          border-left-color: #8B5CF6;
        }

        .metric-card.accounts {
          border-left-color: #F59E0B;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }

        .metric-card.revenue .metric-icon {
          background: #10B981;
        }

        .metric-card.users .metric-icon {
          background: #3B82F6;
        }

        .metric-card.transactions .metric-icon {
          background: #8B5CF6;
        }

        .metric-card.accounts .metric-icon {
          background: #F59E0B;
        }

        .metric-content {
          flex: 1;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .metric-label {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 8px 0;
        }

        .today-overview {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .today-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .today-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .today-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .today-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .today-icon.success {
          background: #ECFDF5;
          color: #10B981;
        }

        .today-icon.primary {
          background: #EFF6FF;
          color: #3B82F6;
        }

        .today-icon.warning {
          background: #FFFBEB;
          color: #F59E0B;
        }

        .today-icon.info {
          background: #F0F9FF;
          color: #0EA5E9;
        }

        .today-content h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .today-content p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .today-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .today-badge.success {
          background: #ECFDF5;
          color: #10B981;
        }

        .today-badge.warning {
          background: #FFFBEB;
          color: #F59E0B;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .content-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #3b82f6;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .badge-count {
          background: #ef4444;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .transaction-item {
          padding: 16px;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
        }

        .transaction-main {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .transaction-details {
          flex: 1;
        }

        .user-name {
          display: block;
          font-weight: 500;
          color: #1e293b;
        }

        .transaction-type {
          font-size: 12px;
          color: #64748b;
          text-transform: capitalize;
        }

        .transaction-amount {
          font-weight: 600;
          color: #1e293b;
        }

        .transaction-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .transaction-date {
          font-size: 11px;
          color: #94a3b8;
        }

        .users-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-main {
          display: flex;
          flex-direction: column;
        }

        .username {
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .user-email {
          font-size: 12px;
          color: #64748b;
        }

        .user-meta {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .user-status {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .last-login {
          font-size: 11px;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content {
            flex-direction: column;
            gap: 16px;
          }
          
          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .today-grid {
            grid-template-columns: 1fr;
          }
          
          .header-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;