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

  // Extract data from the new backend structure
  const userMetrics = dashboardData?.userMetrics || {};
  const transactionMetrics = dashboardData?.transactionMetrics || {};
  const dailyMetrics = dashboardData?.dailyMetrics || {};

  // User metrics
  const totalUsers = userMetrics.totalUsers || 0;
  const activeAccounts = userMetrics.activeAccounts || 0;
  const newUsersToday = userMetrics.newUsersToday || 0;
  const completedTasks = userMetrics.completedTasks || { count: 0, users: [] };
  const topPerformers = completedTasks.users || [];

  // Transaction metrics
  const totalTransactions = transactionMetrics.totalTransactions || 0;
  const totalVolume = transactionMetrics.totalVolume || 0;
  const lastTransactions = transactionMetrics.lastTransactions || [];
  
  // Deposit and withdrawal stats
  const depositStats = transactionMetrics.depositStats || { completedCount: 0, totalAmount: 0 };
  const withdrawalStats = transactionMetrics.withdrawalStats || { pendingCount: 0, totalAmount: 0 };

  // Daily metrics - UPDATED to match new backend structure
  const totalDeposits = dailyMetrics.totalDeposits || { amount: 0, count: 0, dailyBreakdown: [] };
  const totalWithdrawals = dailyMetrics.totalWithdrawals || { amount: 0, count: 0, dailyBreakdown: [] };
  const totalNewUsers = dailyMetrics.totalNewUsers || { count: 0, dailyBreakdown: [] };
  const todayDeposits = dailyMetrics.todayDeposits || { amount: 0, count: 0 };
  const todayWithdrawals = dailyMetrics.todayWithdrawals || { amount: 0, count: 0 };
  const pendingWithdrawals = dailyMetrics.pendingWithdrawals || 0;

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
      case 'canceled':
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
    dispatch(userListActions.resetAllTasks());
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

      {/* Key Metrics Grid - UPDATED with new data structure */}
      <div className="metrics-grid">
        {/* Total Volume - Using totalVolume from new structure */}
        <div className="metric-card revenue">
          <div className="metric-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{formatCurrency(totalDeposits.amount)}</h3>
            <p className="metric-label">Total Deposits</p>
            <span className="metric-subtitle">{totalDeposits.count} deposits</span>
          </div>
        </div>

        {/* Total Withdraw - Using withdrawalStats totalAmount */}
        <div className="metric-card withdraw">
          <div className="metric-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{formatCurrency(totalWithdrawals.amount)}</h3>
            <p className="metric-label">Total Withdraw</p>
            <span className="metric-subtitle">{totalWithdrawals.count} completed</span>
          </div>
        </div>

        {/* Total Users - Using actual userMetrics */}
        <div className="metric-card users">
          <div className="metric-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{totalUsers}</h3>
            <p className="metric-label">Total Users</p>
            <span className="metric-subtitle">Active: {activeAccounts.toLocaleString()}</span>
          </div>
        </div>

        {/* Total Transactions - Using actual transactionMetrics */}
        <div className="metric-card transactions">
          <div className="metric-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{totalTransactions}</h3>
            <p className="metric-label">Total Transactions</p>
            <span className="metric-subtitle">All transactions</span>
          </div>
        </div>
      </div>

      {/* Daily Overview - UPDATED with new data structure */}
      <div className="today-overview">
        <h2 className="section-title">Daily Overview</h2>
        <div className="today-grid">
          <div className="today-card">
            <div className="today-icon success">
              <i className="fas fa-download"></i>
            </div>
            <div className="today-content">
              <h4>{formatCurrency(todayDeposits.amount)}</h4>
              <p>Today's Deposits</p>
              <span className="today-count">{todayDeposits.count} deposits</span>
            </div>
          </div>
          
          <div className="today-card">
            <div className="today-icon warning">
              <i className="fas fa-upload"></i>
            </div>
            <div className="today-content">
              <h4>{formatCurrency(todayWithdrawals.amount)}</h4>
              <p>Today's Withdrawals</p>
              <span className="today-count">{todayWithdrawals.count} completed</span>
            </div>
          </div>
          
          <div className="today-card">
            <div className="today-icon primary">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="today-content">
              <h4>{newUsersToday}</h4>
              <p>New Users Today</p>
              <span className="today-count">Registered today</span>
            </div>
          </div>
          
          <div className="today-card">
            <div className="today-icon info">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="today-content">
              <h4>{pendingWithdrawals}</h4>
              <p>Pending Withdrawals</p>
              <span className="today-count">Awaiting approval</span>
            </div>
          </div>
        </div>
      </div>

   



      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Recent Transactions - Using ACTUAL transactions */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <button className="view-all-btn">
              <Link to="/transaction">View All</Link>
            </button>
          </div>
          <div className="transactions-list">
            {lastTransactions.map(transaction => {
              const statusInfo = getStatusInfo(transaction.status);
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-main">
                    <div className="user-avatar">
                      {transaction.user?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="transaction-details">
                      <span className="user-name">{transaction.user || 'Unknown User'}</span>
                      <span className="transaction-type">
                        {transaction.type || 'Transaction'} • {formatCurrency(parseFloat(transaction.amount || 0))}
                      </span>
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
              Reset All Tasks <span className="badge-count">{topPerformers.length}</span>
            </button>
          </div>
          <div className="users-list">
            {topPerformers.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <div className="user-main">
                    <span className="username">{user.email || 'Unknown User'}</span>
                  </div>
                  <div className="user-meta">
                    <span className="user-status success">
                      {user.tasksDone || 0} tasks completed
                    </span>
                    {user.dailyOrder && (
                      <span className="user-status info">
                        Daily: {user.dailyOrder}
                      </span>
                    )}
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

      {/* Updated CSS Styles */}
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

        .dashboard-subtitle {
          color: #64748b;
          margin: 4px 0 0 0;
          font-size: 14px;
        }

        /* Metrics Grid Updates */
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

        .metric-card.withdraw {
          border-left-color: #F59E0B;
        }

        .metric-card.users {
          border-left-color: #3B82F6;
        }

        .metric-card.transactions {
          border-left-color: #8B5CF6;
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

        .metric-card.withdraw .metric-icon {
          background: #F59E0B;
        }

        .metric-card.users .metric-icon {
          background: #3B82F6;
        }

        .metric-card.transactions .metric-icon {
          background: #8B5CF6;
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
          margin: 0 0 4px 0;
        }

        .metric-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        /* Today Overview Updates */
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
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .today-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .today-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          margin-bottom: 12px;
        }

        .today-icon.success {
          background: #ECFDF5;
          color: #10B981;
        }

        .today-icon.warning {
          background: #FFFBEB;
          color: #F59E0B;
        }

        .today-icon.primary {
          background: #EFF6FF;
          color: #3B82F6;
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
          margin: 4px 0;
          font-size: 14px;
          color: #64748b;
        }

        .today-count {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        /* Daily Breakdown Styles */
        .daily-breakdown {
          margin-bottom: 30px;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .breakdown-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .breakdown-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .breakdown-icon {
          font-size: 14px;
        }

        .breakdown-icon.deposit {
          color: #10B981;
        }

        .breakdown-icon.withdraw {
          color: #F59E0B;
        }

        .breakdown-total {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f8fafc;
        }

        .breakdown-item:last-child {
          border-bottom: none;
        }

        .breakdown-date {
          font-size: 13px;
          color: #64748b;
        }

        .breakdown-amount {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
        }

        .breakdown-count {
          font-size: 11px;
          color: #94a3b8;
          margin-left: 4px;
          font-weight: normal;
        }

        /* User status styles */
        .user-status.info {
          background: #F0F9FF !important;
          color: #0EA5E9 !important;
        }

        /* Rest of existing styles remain the same */
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
          text-decoration: none;
        }

        .view-all-btn a {
          color: #3b82f6;
          text-decoration: none;
        }

        .btn-reset-all {
          padding: 8px 16px;
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

        .badge-count {
          background: #ef4444;
          color: white;
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 11px;
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
          font-size: 14px;
        }

        .transaction-type {
          font-size: 12px;
          color: #64748b;
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

        .user-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .user-status {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .user-status.success {
          background: #ECFDF5 !important;
          color: #10B981 !important;
        }

        .no-data {
          text-align: center;
          padding: 20px;
          color: #64748b;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .content-grid,
          .breakdown-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content {
            flex-direction: column;
            gap: 16px;
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
        }
      `}</style>
    </div>
  );
}

export default Dashboard;