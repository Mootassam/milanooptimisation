import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function notification() {
  return (
    <>
      {/* Header Section */}
 <SubHeader title="Notification" detail="Your activity alerts" />
      {/* Filter Tabs */}
      <div className="filter-tabs">
        <div className="filter-tab active" data-filter="all">
          All
        </div>
        <div className="filter-tab" data-filter="unread">
          Unread
        </div>
        <div className="filter-tab" data-filter="read">
          Read
        </div>
      </div>
      {/* Notifications Container */}
      <div className="notifications-container">
        <div className="notification-date">Today</div>
        {/* Notification Items */}
        <div className="notification-item " data-type="deposit">
          <div className="notification-icon icon-deposit">
            <i className="fas fa-money-bill-wave" />
          </div>
          <div className="notification-content">
            <div className="notification-title">Deposit Successful</div>
            <div className="notification-desc">
              Your deposit of $500 has been processed successfully
            </div>
            <div className="notification-time">10:30 AM</div>
          </div>
          <div className="notification-badge" />
        </div>
        <div className="notification-item " data-type="usdt">
          <div className="notification-icon icon-usdt">
            <i className="fab fa-usdt" />
          </div>
          <div className="notification-content">
            <div className="notification-title">USDT Received</div>
            <div className="notification-desc">
              You've received 50 USDT from user @crypto_trader
            </div>
            <div className="notification-time">9:45 AM</div>
          </div>
          <div className="notification-badge" />
        </div>
        <div className="notification-item" data-type="verification">
          <div className="notification-icon icon-verification">
            <i className="fas fa-check-circle" />
          </div>
          <div className="notification-content">
            <div className="notification-title">Account Verified</div>
            <div className="notification-desc">
              Your account verification has been completed successfully
            </div>
            <div className="notification-time">Yesterday</div>
          </div>
        </div>
      </div>
  
   

      <style>{`    /* Header Styles */
     
        
        /* Filter Tabs */
        .filter-tabs {
            display: flex;
            background: white;
            padding: 15px;
            border-bottom: 1px solid #f0f4ff;
        }
        
        .filter-tab {
            flex: 1;
            text-align: center;
            padding: 10px;
            font-weight: 600;
            color: #7b8796;
            border-bottom: 2px solid transparent;
            cursor: pointer;
        }
        
        .filter-tab.active {
            color: #0f2161;
            border-bottom: 2px solid #0f2161;
        }
        
        /* Notifications Container */
        .notifications-container {
            padding: 15px;
        }
        
        .notification-date {
            color: #7b8796;
            font-size: 14px;
            font-weight: 600;
            margin: 15px 0 10px;
            padding-left: 10px;
        }
        
        /* Notification Item */
        .notification-item {
            background: white;
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: flex-start;
            position: relative;
        }
        
        .notification-item.unread {
            border-left: 4px solid #0f2161;
        }
        
        .notification-icon {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 18px;
            flex-shrink: 0;
        }
        
        .icon-deposit {
            background: #e8f5e9;
            color: #2e7d32;
        }
        
        .icon-withdraw {
            background: #ffebee;
            color: #c62828;
        }
        
        .icon-usdt {
            background: #e3f2fd;
            color: #1565c0;
        }
        
        .icon-verification {
            background: #fff8e1;
            color: #e65100;
        }
        
        .icon-bonus {
            background: #f3e5f5;
            color: #7b1fa2;
        }
        
        .icon-security {
            background: #e8eaf6;
            color: #283593;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-title {
            font-weight: 600;
            color: #0f2161;
            margin-bottom: 5px;
            font-size: 15px;
        }
        
        .notification-desc {
            font-size: 14px;
            color: #7b8796;
            margin-bottom: 5px;
        }
        
        .notification-time {
            font-size: 12px;
            color: #7b8796;
        }
        
        .notification-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #0f2161;
        }
        
        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 40px 20px;
        }
        
        .empty-icon {
            font-size: 60px;
            color: #f0f4ff;
            margin-bottom: 15px;
        }
        
        .empty-title {
            color: #0f2161;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .empty-desc {
            color: #7b8796;
            font-size: 14px;
        }
        
        /* Action Buttons */
        .action-buttons {
            position: fixed;
            bottom: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .action-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 10px rgba(15, 33, 97, 0.3);
            border: none;
            cursor: pointer;
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
        
        .nav-item.active {
            color: #0f2161;
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        .nav-item.active i {
            color: #0f2161;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .notification-item {
                padding: 12px;
            }
            
            .notification-icon {
                width: 40px;
                height: 40px;
                font-size: 16px;
                margin-right: 12px;
            }
        }`}</style>
  </>
  );
}

export default notification;
