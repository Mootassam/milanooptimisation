import React from "react";

function GrapModal({ show, onClose, items, number, submit }) {
  // Calculate commission and estimated return
  const calculateCommission = () => {
    if (!items) return { commission: 0, estimatedReturn: 0 };

    const commissionRate = items.commission || 0.25;
    const price = items.amount || 154;
    const estimatedReturn = (commissionRate / 100) * price;

    return {
      commission: commissionRate,
      estimatedReturn: estimatedReturn.toFixed(3)
    };
  };

  const { commission, estimatedReturn } = calculateCommission();

  // Format current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Generate order number based on timestamp
  const generateOrderNumber = () => {
    return number || Math.floor(1000 + Math.random() * 9000);
  };

  const handleSubmit = async () => {
    try {
      await submit();
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (!show) return null;

  return (
    <div className={`modal-overlay ${show ? 'active' : ''}`} id="productModal">
      <div className="modal-content">
        {/* Header Section */}
        <div className="modal-header">
          <div className="status-tag">
            {items?.combo ? "Pending" : "Completed"}
          </div>
          <h2 className="modal-title">
            {items?.level || "Level 1"}
          </h2>
        </div>

        {/* Order Information */}
        <div className="order-info">
          <div className="order-time">Order Time: {getCurrentTime()}</div>
          <div className="order-number">Order #: {generateOrderNumber()}</div>
        </div>

        {/* Product Section */}
        <div className="product-section">
          <img
            src={items.image || items?.product?.photo[0]?.downloadUrl || items?.product?.image || 'https://via.placeholder.com/70x70/3b82f6/ffffff?text=Product'}
            alt={items.title || items?.product?.title}
            className="order-image"
          />
          <div className="product-details">
            <div className="product-name">
              {items?.title || "Blue T Shirt"}
            </div>
            <div className="product-price">
              {items?.amount || 154} USD
            </div>
          </div>
          <div className="product-quantity">X {items?.quantity || 1}</div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>
          <div className="summary-row">
            <div className="summary-label">Total order amount</div>
            <div className="summary-value">{items?.amount || 154} USD</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Commission</div>
            <div className="summary-value">{items.commission}%</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Estimated return</div>
            <div className="summary-value">{estimatedReturn} USD</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-footer">
          <button
            className="modal-btn btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="modal-btn btn-submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <style>{`   
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 380px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          transform: translateY(20px);
          transition: transform 0.5s ease;
          position: relative;
        }
        
        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }
        
        /* Header Section */
        .modal-header {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          padding: 25px 20px 15px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .status-tag {
          position: absolute;
          top: 15px;
          right: -30px;
          background: #ffde59;
          color: #0f2161;
          padding: 8px 30px;
          font-weight: 700;
          transform: rotate(45deg);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          font-size: 14px;
        }
        
        /* Order Information */
        .order-info {
          display: flex;
          justify-content: space-between;
          padding: 15px 20px;
          background: #f0f4ff;
          font-size: 14px;
          color: #7b8796;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        /* Product Section */
        .product-section {
          padding: 20px;
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #f0f4ff;
          align-items: center;
        }
        
        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          background: #f9f9f9;
          padding: 5px;
          flex-shrink: 0;
        }
        
        .product-details {
          flex: 1;
          min-width: 0;
        }
        
        .product-name {
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 5px;
          font-size: 16px;
          word-wrap: break-word;
        }
        
        .product-price {
          color: #0f2161;
          font-weight: 700;
          font-size: 18px;
        }
        
        .product-quantity {
          color: #7b8796;
          font-size: 14px;
          text-align: right;
          flex-shrink: 0;
        }
        
        /* Order Summary */
        .order-summary {
          padding: 20px;
        }
        
        .summary-title {
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #f0f4ff;
        }
        
        .summary-label {
          color: #7b8796;
        }
        
        .summary-value {
          color: #0f2161;
          font-weight: 600;
        }
        
        /* Buttons */
        .modal-footer {
          padding: 20px;
          display: flex;
          gap: 15px;
        }
        
        .modal-btn {
          flex: 1;
          padding: 16px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
          border: none;
          font-size: 16px;
        }
        
        .btn-cancel {
          background: #f5f5f5;
          color: #7b8796;
        }
        
        .btn-cancel:hover {
          background: #e0e0e0;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(15, 33, 97, 0.25);
        }
        
        .btn-submit:hover {
          background: linear-gradient(135deg, #1a3a8f 0%, #2a4ab0 100%);
          box-shadow: 0 6px 15px rgba(15, 33, 97, 0.35);
        }
        
        .modal-btn:active {
          transform: scale(0.97);
        }
        
        .modal-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          .modal-content {
            max-width: 100%;
            margin: 10px;
          }
          
          .order-info {
            flex-direction: column;
            text-align: center;
          }
          
          .product-section {
            flex-direction: column;
            text-align: center;
          }
          
          .product-details {
            text-align: center;
          }
          
          .product-quantity {
            text-align: center;
          }
          
          .modal-footer {
            flex-direction: column;
          }
        }
        
        @media (max-width: 340px) {
          .modal-header {
            padding: 20px 15px 10px;
          }
          
          .modal-title {
            font-size: 20px;
          }
          
          .product-section {
            padding: 15px;
          }
          
          .order-summary {
            padding: 15px;
          }
          
          .modal-footer {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default GrapModal;