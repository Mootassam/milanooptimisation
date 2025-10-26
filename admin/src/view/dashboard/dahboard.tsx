import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const [timeFrame, setTimeFrame] = useState('today');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const dashboardData = {
    overview: {
      totalRevenue: 125430,
      totalUsers: 2845,
      totalTransactions: 12457,
      activeAccounts: 1842
    },
    todayStats: {
      revenue: 2540,
      deposits: 12,
      withdrawals: 5,
      newUsers: 23
    },
    recentTransactions: [
      { id: 1, user: 'John Doe', type: 'deposit', amount: 500, status: 'completed', date: '2024-01-15 14:30' },
      { id: 2, user: 'Jane Smith', type: 'withdrawal', amount: 300, status: 'pending', date: '2024-01-15 13:15' },
      { id: 3, user: 'Mike Johnson', type: 'deposit', amount: 1200, status: 'completed', date: '2024-01-15 12:45' },
      { id: 4, user: 'Sarah Wilson', type: 'withdrawal', amount: 750, status: 'completed', date: '2024-01-15 11:20' },
      { id: 5, user: 'Tom Brown', type: 'deposit', amount: 200, status: 'failed', date: '2024-01-15 10:05' }
    ],
    pendingActions: [
      { id: 1, type: 'withdrawal', count: 5, priority: 'high' },
      { id: 2, type: 'kyc_verification', count: 12, priority: 'medium' },
      { id: 3, type: 'deposit', count: 3, priority: 'low' }
    ],
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      revenue: [12000, 19000, 15000, 25000, 22000, 30000],
      users: [500, 800, 1200, 1500, 2000, 2500]
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusInfo = (status) => {
    switch (status) {
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

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'high':
        return { color: '#EF4444', label: 'High' };
      case 'medium':
        return { color: '#F59E0B', label: 'Medium' };
      case 'low':
        return { color: '#10B981', label: 'Low' };
      default:
        return { color: '#6B7280', label: 'Normal' };
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard Overview</h1>
         
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        {/* Total Revenue */}
        <div className="metric-card revenue">
          <div className="metric-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{formatCurrency(dashboardData.overview.totalRevenue)}</h3>
            <p className="metric-label">Total Revenue</p>
           
          </div>
        </div>

        {/* Total Users */}
        <div className="metric-card users">
          <div className="metric-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{dashboardData.overview.totalUsers.toLocaleString()}</h3>
            <p className="metric-label">Total Users</p>
          
          </div>
        </div>

        {/* Total Transactions */}
        <div className="metric-card transactions">
          <div className="metric-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{dashboardData.overview.totalTransactions.toLocaleString()}</h3>
            <p className="metric-label">Total Transactions</p>
          </div>
        </div>

        {/* Active Accounts */}
        <div className="metric-card accounts">
          <div className="metric-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="metric-content">
            <h3 className="metric-value">{dashboardData.overview.activeAccounts.toLocaleString()}</h3>
            <p className="metric-label">Active Accounts</p>
        
          </div>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="today-overview">
        <h2 className="section-title">Today's Overview</h2>
        <div className="today-grid">
          <div className="today-card">
            <div className="today-icon success">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="today-content">
              <h4>{formatCurrency(dashboardData.todayStats.revenue)}</h4>
              <p>Today's Revenue</p>
            </div>
          </div>
          <div className="today-card">
            <div className="today-info">
              <div className="today-icon primary">
                <i className="fas fa-arrow-down"></i>
              </div>
              <div className="today-content">
                <h4>{dashboardData.todayStats.deposits}</h4>
                <p>New Deposits</p>
              </div>
            </div>
            <div className="today-badge success">+12%</div>
          </div>
          <div className="today-card">
            <div className="today-info">
              <div className="today-icon warning">
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className="today-content">
                <h4>{dashboardData.todayStats.withdrawals}</h4>
                <p>Withdrawal Requests</p>
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
                <h4>{dashboardData.todayStats.newUsers}</h4>
                <p>New Users</p>
              </div>
            </div>
            <div className="today-badge success">+8%</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Recent Transactions */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="transactions-list">
            {dashboardData.recentTransactions.map(transaction => {
              const statusInfo = getStatusInfo(transaction.status);
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-main">
                    <div className="user-avatar">
                      {transaction.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="transaction-details">
                      <span className="user-name">{transaction.user}</span>
                      <span className="transaction-type">{transaction.type}</span>
                    </div>
                    <div className="transaction-amount">
                      {formatCurrency(transaction.amount)}
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
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Pending Actions</h3>
            <span className="badge-count">{dashboardData.pendingActions.reduce((sum, action) => sum + action.count, 0)}</span>
          </div>
          <div className="actions-list">
            {dashboardData.pendingActions.map(action => {
              const priorityInfo = getPriorityInfo(action.priority);
              return (
                <div key={action.id} className="action-item">
                  <div className="action-info">
                    <div className="action-icon">
                      {action.type === 'withdrawal' && <i className="fas fa-arrow-up"></i>}
                      {action.type === 'deposit' && <i className="fas fa-arrow-down"></i>}
                      {action.type === 'kyc_verification' && <i className="fas fa-id-card"></i>}
                    </div>
                    <div className="action-details">
                      <span className="action-type">
                        {action.type === 'withdrawal' && 'Withdrawal Requests'}
                        {action.type === 'deposit' && 'Deposit Approvals'}
                        {action.type === 'kyc_verification' && 'KYC Verifications'}
                      </span>
                      <span className="action-count">{action.count} pending</span>
                    </div>
                  </div>
                  <div 
                    className="priority-badge"
                    style={{ backgroundColor: priorityInfo.color }}
                  >
                    {priorityInfo.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-actions">
            <button className="btn-primary">Process All</button>
            <button className="btn-secondary">View Details</button>
          </div>
        </div>

     
      </div>

      <style >{`
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
          align-items: center;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .timeframe-selector {
          display: flex;
          gap: 8px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
        }

        .timeframe-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .timeframe-btn.active {
          background: white;
          color: #3b82f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

        .metric-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .metric-trend.positive {
          color: #10B981;
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

        .content-card.full-width {
          grid-column: 1 / -1;
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

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .action-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
        }

        .action-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .action-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .action-details {
          display: flex;
          flex-direction: column;
        }

        .action-type {
          font-weight: 500;
          color: #1e293b;
        }

        .action-count {
          font-size: 12px;
          color: #64748b;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          color: white;
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #64748b;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-color.revenue {
          background: #10B981;
        }

        .legend-color.users {
          background: #3B82F6;
        }

        .chart-placeholder {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }

        .chart-container {
          height: 200px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 100%;
        }

        .chart-bar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          height: 100%;
        }

        .chart-bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: all 0.3s ease;
        }

        .chart-bar.revenue-bar {
          background: #10B981;
        }

        .chart-bar.users-bar {
          background: #3B82F6;
          margin-top: 4px;
        }

        .chart-label {
          font-size: 12px;
          color: #64748b;
        }

        .chart-note {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        .quick-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-weight: 600;
          color: #1e293b;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
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