import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import selectors from 'src/modules/notification/list/notificationListSelectors'
import notificationService from "src/modules/notification/notificationService";
import Header from "src/view/layout/Header";
import SubHeader from "src/view/shared/Header/SubHeader";

function Notification() {
  const dispatch = useDispatch();
  const records = useSelector(selectors.selectRows) as any[];
  const loading = useSelector(selectors.selectLoading);
  
  const [statusFilter, setStatusFilter] = useState("all"); // all, unread, read

  useEffect(() => {
    dispatch(notificationListActions.doFetch());


  }, [dispatch]);

  // Filter notifications based on status
  const filteredNotifications = records.filter(notification => {
    if (statusFilter === "all") return true;
    if (statusFilter === "unread") return notification.status === "unread";
    if (statusFilter === "read") return notification.status === "read";
    return true;
  });

  // Get notification type info based on your data
const getNotificationInfo = (type) => {
  switch (type) {
    case "withdraw_success":
      return {
        icon: "fas fa-check-circle",
        color: "#27ae60",
        bgColor: "#e8f5e9",
        title: "Withdrawal Successful",
        description: (amount) => `Your withdrawal of $${amount} has been processed successfully`
      };
    case "withdraw_canceled":
      return {
        icon: "fas fa-times-circle",
        color: "#e74c3c",
        bgColor: "#ffebee",
        title: "Withdrawal Canceled",
        description: (amount) => `Your withdrawal of $${amount} has been canceled`
      };
    case "deposit_success":
      return {
        icon: "fas fa-arrow-down",
        color: "#2e86de",
        bgColor: "#e3f2fd",
        title: "Deposit Successful",
        description: (amount) => `Your deposit of $${amount} has been received successfully`
      };
    case "deposit_canceled":
      return {
        icon: "fas fa-ban",
        color: "#e67e22",
        bgColor: "#fff3e0",
        title: "Deposit Canceled",
        description: (amount) => `Your deposit of $${amount} has been canceled`
      };
    case "system":
      return {
        icon: "fas fa-cog",
        color: "#9b59b6",
        bgColor: "#f3e5f5",
        title: "System Update",
        description: () => "System maintenance or update notification"
      };
    case "alert":
      return {
        icon: "fas fa-exclamation-triangle",
        color: "#f39c12",
        bgColor: "#fff8e1",
        title: "Important Alert",
        description: () => "Important security or account alert"
      };
    default:
      return {
        icon: "fas fa-bell",
        color: "#7b8796",
        bgColor: "#f5f6f7",
        title: "Notification",
        description: () => "You have a new notification"
      };
  }
};

  // Format date to relative time
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes < 1) return "Just now";
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group notifications by date
  const groupNotificationsByDate = (notifications: any[] = []): Record<string, any[]> => {
    const groups: Record<string, any[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    notifications.forEach(notification => {
      const notificationDate = new Date(notification.createdAt).toDateString();
      let groupKey;
      
      if (notificationDate === today) {
        groupKey = "Today";
      } else if (notificationDate === yesterday) {
        groupKey = "Yesterday";
      } else {
        groupKey = new Date(notification.createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notification);
    });
    
    return groups;
  };

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  return (
    <>
      {/* Header Section */}
        <Header
        title="Notifications"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      {/* Filter Tabs */}
      <div className="filter-tabs">
        <div 
          className={`filter-tab ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </div>
        <div 
          className={`filter-tab ${statusFilter === "unread" ? "active" : ""}`}
          onClick={() => setStatusFilter("unread")}
        >
          Unread
        </div>
        <div 
          className={`filter-tab ${statusFilter === "read" ? "active" : ""}`}
          onClick={() => setStatusFilter("read")}
        >
          Read
        </div>
      </div>

      {/* Notifications Container */}
      <div className="notifications-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin" />
            </div>
            <p>Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-bell-slash" />
            </div>
            <p>No notifications found</p>
            <span>When you have new notifications, they'll appear here</span>
          </div>
        ) : (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date}>
              <div className="notification-date">{date}</div>
              {notifications.map((notification) => {
                const notificationInfo = getNotificationInfo(notification.type);
                
                return (
                  <div 
                    key={notification._id || notification.id} 
                    className={`notification-item ${notification.status === "unread" ? "unread" : ""}`}
                  >
                    <div 
                      className="notification-icon"
                      style={{ 
                        backgroundColor: notificationInfo.bgColor, 
                        color: notificationInfo.color 
                      }}
                    >
                      <i className={notificationInfo.icon} />
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">
                        {notificationInfo.title}
                      </div>
                      <div className="notification-desc">
                        {notificationInfo.description(notification.amount)}
                      </div>
                      <div className="notification-time">
                        {formatDate(notification.createdAt)}
                      </div>
                    </div>
                    {notification.status === "unread" && (
                      <div className="notification-badge" />
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      <style>{`
        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          background: white;
          padding: 15px;
          border-bottom: 1px solid #f0f4ff;
          gap: 0;
        }
        
        .filter-tab {
          flex: 1;
          text-align: center;
          padding: 12px;
          font-weight: 600;
          color: #7b8796;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }
        
        .filter-tab.active {
          color: #0f2161;
          border-bottom: 3px solid #0f2161;
          background: #f8f9ff;
        }
        
        .filter-tab:active {
          transform: scale(0.98);
        }
        
        /* Notifications Container */
        .notifications-container {
          padding: 0;
          min-height: 60vh;
        }
        
        .notification-date {
          color: #7b8796;
          font-size: 14px;
          font-weight: 600;
          margin: 20px 15px 10px;
          padding: 8px 0;
          border-bottom: 1px solid #f0f4ff;
        }
        
        /* Notification Item */
        .notification-item {
          background: white;
          border-radius: 0;
          padding: 18px 15px;
          margin-bottom: 0;
          display: flex;
          align-items: flex-start;
          position: relative;
          border-bottom: 1px solid #f5f6f7;
          transition: all 0.2s ease;
        }
        
        .notification-item:active {
          background: #f9f9f9;
        }
        
        .notification-item.unread {
          background: #f8fbff;
          border-left: 4px solid #0f2161;
        }
        
        .notification-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 18px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        
        .notification-item:active .notification-icon {
          transform: scale(0.95);
        }
        
        .notification-content {
          flex: 1;
          min-width: 0;
        }
        
        .notification-title {
          font-weight: 700;
          color: #0f2161;
          margin-bottom: 6px;
          font-size: 16px;
          line-height: 1.3;
        }
        
        .notification-desc {
          font-size: 14px;
          color: #7b8796;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .notification-time {
          font-size: 12px;
          color: #a0a4ab;
          font-weight: 500;
        }
        
        .notification-badge {
          position: absolute;
          top: 20px;
          right: 15px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0f2161;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(15, 33, 97, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(15, 33, 97, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(15, 33, 97, 0);
          }
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
          color: #0f2161;
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
          color: #7b8796;
        }
        
        /* Enhanced animations */
        .notification-item {
          animation: slideInUp 0.4s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
          .notification-item {
            padding: 15px 12px;
          }
          
          .notification-icon {
            width: 42px;
            height: 42px;
            font-size: 16px;
            margin-right: 12px;
          }
          
          .notification-title {
            font-size: 15px;
          }
          
          .notification-desc {
            font-size: 13px;
          }
          
          .filter-tab {
            padding: 10px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

export default Notification;