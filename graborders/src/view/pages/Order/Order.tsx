import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Calcule from "src/view/shared/utils/Calcule";
import Dates from "src/view/shared/utils/Dates";
import Nodata from "src/view/shared/Nodata";

function Order() {
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();
  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const total = useSelector(selectors.selectTotal);
  const selectHasRows = useSelector(selectors.selectHasRows);

  useEffect(() => {
    // Fetch all records initially, then filter in UI
    dispatch(actions.doFetch());
  }, [dispatch]);

  // Filter records based on active filter
  const filteredRecords = activeFilter === "all" 
    ? record 
    : record.filter(item => item.status === activeFilter);

  // Handle filter button clicks
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Sample data as fallback (you can remove this once your Redux data is working)
  const sampleOrders = [
    {
      id: 'ORD-7842',
      status: 'pending',
      title: 'Blue T Shirt',
      price: '154 USD',
      image: 'https://chriscross.in/cdn/shop/files/ChrisCrossNavyBlueCottonT-Shirt.jpg?v=1740994598&width=2048',
      amount: '154 USD',
      commission: '0.25%',
      estimatedReturn: '0.385 USD',
      date: 'Today, 15:42'
    },
    {
      id: 'ORD-7841',
      status: 'completed',
      title: 'Black Jeans',
      price: '89 USD',
      image: 'https://found.store/cdn/shop/files/Lacy-Baggy-Jeans-in-Vintage-Black-by-Found-FW-23-15_ebbd619b-0a2c-4d07-8c19-d2606a5189f1.jpg?v=1714676239&width=2880',
      amount: '89 USD',
      commission: '0.30%',
      estimatedReturn: '0.267 USD',
      date: 'Yesterday'
    },
    {
      id: 'ORD-7840',
      status: 'completed',
      title: 'Red Sneakers',
      price: '120 USD',
      image: 'https://media.istockphoto.com/id/691616136/photo/red-sneakers.jpg?s=612x612&w=0&k=20&c=BBMNOxRnNNdaeEZmMooA1Xu9Exq-olwrP9n3B-iaJCU=',
      amount: '120 USD',
      commission: '0.28%',
      estimatedReturn: '0.336 USD',
      date: 'Oct 12'
    },
    {
      id: 'ORD-7839',
      status: 'canceled',
      title: 'Green Backpack',
      price: '75 USD',
      image: 'https://www.madlug.com/cdn/shop/files/Classic_KellyGreen_3qtr_3ac56a6f-727e-46b5-bf27-bff3da37d328_large.jpg?v=1742422232',
      amount: '75 USD',
      commission: '0.22%',
      estimatedReturn: '0.165 USD',
      date: 'Oct 11'
    }
  ];

  // Use Redux data if available, otherwise use sample data
  const displayOrders = record && record.length > 0 ? filteredRecords : sampleOrders;

  return (
    <>
      {/* Page Title */}
      <div className="page-title">Order History</div>
      
      {/* Filter Section */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
        >
          All Orders
        </button>
        <button 
          className={`filter-btn ${activeFilter === "pending" ? "active" : ""}`}
          onClick={() => handleFilterClick("pending")}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterClick("completed")}
        >
          Completed
        </button>
        <button 
          className={`filter-btn ${activeFilter === "canceled" ? "active" : ""}`}
          onClick={() => handleFilterClick("canceled")}
        >
          Canceled
        </button>
      </div>
      
      {/* Orders Container */}
      <div className="orders-container">
        {displayOrders.length > 0 ? (
          displayOrders.map((item, index) => (
            <div className="order-card" key={index}>
              <div className="order-image-container">
                <img 
                  src={item.image || item?.product?.photo[0]?.downloadUrl || 'https://via.placeholder.com/70x70/3b82f6/ffffff?text=Product'} 
                  alt={item.title || item?.product?.title}
                  className="order-image"
                />
              </div>
              <div className="order-content">
                <div className="order-header">
                  <div>
                    <div className="order-title">{item.title || item?.product?.title}</div>
                    <div className="order-price">{item.price || item?.product?.amount}</div>
                  </div>
                  <div className={`order-status status-${item.status}`}>
                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-meta">
                    <div className="order-meta-item">
                      <span className="meta-label">ID:</span>
                      <span className="meta-value">{item.id || item.number}</span>
                    </div>
                    <div className="order-meta-item">
                      <span className="meta-label">Commission:</span>
                      <span className="meta-value">{item.commission || item?.product?.commission}%</span>
                    </div>
                    <div className="order-meta-item">
                      <span className="meta-label">Return:</span>
                      <span className="meta-value">
                        {item.estimatedReturn || 
                         (item?.product?.amount && item?.product?.commission 
                          ? Calcule.calcule__total(item?.product?.amount, item?.product?.commission) + " USDT"
                          : "N/A")}
                      </span>
                    </div>
                  </div>
                  <div className="order-date">{item.date || Dates.currentDate(item?.date)}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <h3>No orders found</h3>
            <p>You don't have any orders with this status yet.</p>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <a href="#" className="nav-btn">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#" className="nav-btn">
          <i className="fas fa-wallet"></i>
          <span>Recharge</span>
        </a>
        <a href="#" className="nav-btn">
          <i className="fas fa-hand-holding-usd"></i>
          <span>Grap</span>
        </a>
        <a href="#" className="nav-btn active">
          <i className="fas fa-shopping-cart"></i>
          <span>Orders</span>
        </a>
        <a href="#" className="nav-btn">
          <i className="fas fa-user"></i>
          <span>Account</span>
        </a>
      </div>

      <style>{`        
        /* Page Title */
        .page-title {
            padding: 15px 20px 10px;
            color: #0f2161;
            font-size: 20px;
            font-weight: 700;
        }
        
        /* Filter Section */
        .filter-section {
            padding: 0 15px 10px;
            display: flex;
            overflow-x: auto;
            gap: 8px;
            scrollbar-width: none;
        }
        
        .filter-section::-webkit-scrollbar {
            display: none;
        }
        
        .filter-btn {
            padding: 8px 16px;
            border-radius: 16px;
            background: white;
            border: 1px solid #e0e0e0;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.3s ease;
        }
        
        .filter-btn.active {
            background: #0f2161;
            color: white;
            border-color: #0f2161;
        }
        
        /* Orders Container */
        .orders-container {
            padding: 0 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 80px;
        }
        
        /* Order Card - Compact Version */
        .order-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
            display: flex;
            // height: 100px;
        }
        
        .order-image-container {
            width: 90px;
            flex-shrink: 0;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
        }
        
        .order-image {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            object-fit: cover;
        }
        
        .order-content {
            flex: 1;
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .order-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        
        .order-title {
            font-weight: 600;
            color: #0f2161;
            font-size: 14px;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 150px;
        }
        
        .order-price {
            color: #0f2161;
            font-weight: 700;
            font-size: 14px;
        }
        
        .order-status {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .status-pending {
            background: #fff8e1;
            color: #ffab00;
        }
        
        .status-completed {
            background: #e8f5e9;
            color: #4caf50;
        }
        
        .status-canceled {
            background: #ffebee;
            color: #f44336;
        }
        
        .order-details {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .order-meta {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .order-meta-item {
            display: flex;
            font-size: 11px;
            gap: 4px;
        }
        
        .meta-label {
            color: #7b8796;
        }
        
        .meta-value {
            color: #0f2161;
            font-weight: 600;
        }
        
        .order-date {
            color: #7b8796;
            font-size: 11px;
            text-align: right;
        }
        
        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 30px 0px;
            color: #7b8796;
        }
        
        .empty-icon {
            font-size: 40px;
            margin-bottom: 10px;
            color: #e0e0e0;
        }
        
        .empty-state h3 {
            font-size: 16px;
            margin-bottom: 8px;
            color: #0f2161;
        }
        
        .empty-state p {
            font-size: 13px;
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
            padding: 10px 0;
            box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
            z-index: 100;
            max-width: 400px;
            margin: 0 auto;
            border-radius: 20px 20px 0 0;
        }
        
        .nav-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #7b8796;
            font-size: 11px;
            width: 20%;
        }
        
        .nav-btn.active {
            color: #0f2161;
        }
        
        .nav-btn i {
            font-size: 18px;
            margin-bottom: 3px;
        }
        
        .nav-btn.active i {
            color: #0f2161;
        }
      `}</style>
    </>
  );
}

export default Order;