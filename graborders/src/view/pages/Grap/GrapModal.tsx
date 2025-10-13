import React from "react";

function GrapModal({ show, onClose }) {
  return (
     <div className={`modal-overlay ${show ? 'active' : ''}`} id="productModal">
      <div className="modal-content">
        {/* Header Section */}
        <div className="modal-header">
          <div className="status-tag">Pending</div>
          <h2 className="modal-title">Level 1</h2>
        </div>
        {/* Order Information */}
        <div className="order-info">
          <div className="order-time">Order Time: 15:42 PM</div>
          <div className="order-number">Order #: 7842</div>
        </div>
        {/* Product Section */}
        <div className="product-section">
          <img
            src="https://chriscross.in/cdn/shop/files/ChrisCrossNavyBlueCottonT-Shirt.jpg?v=1740994598&width=2048"
            alt="Blue T Shirt"
            className="product-image"
          />
          <div className="product-details">
            <div className="product-name">Blue T Shirt</div>
            <div className="product-price">154 USD</div>
          </div>
          <div className="product-quantity">X 1</div>
        </div>
        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>
          <div className="summary-row">
            <div className="summary-label">Total order amount</div>
            <div className="summary-value">154 USD</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Commission</div>
            <div className="summary-value">0.25%</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Estimated return</div>
            <div className="summary-value">0.385 USD</div>
          </div>
        </div>
        {/* Buttons */}
        <div className="modal-footer">
          <button
            className="modal-btn btn-cancel"
            id="cancelButton"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="modal-btn btn-submit" id="submitButton">
            Submit
          </button>
        </div>
      </div>
      <style>{`   

      
        /* Modal Styles */

        .modal-overlay {
  opacity: 0;
  visibility: hidden;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}
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
        }
        
        /* Product Section */
        .product-section {
            padding: 20px;
            display: flex;
            gap: 15px;
            border-bottom: 1px solid #f0f4ff;
        }
        
        .product-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 10px;
            background: #f9f9f9;
            padding: 5px;
        }
        
        .product-details {
            flex: 1;
        }
        
        .product-name {
            font-weight: 600;
            color: #0f2161;
            margin-bottom: 5px;
            font-size: 16px;
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
        
        .btn-submit {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(15, 33, 97, 0.25);
        }
        
        .modal-btn:active {
            transform: scale(0.97);
        }
        
        /* Demo Button */
        .demo-button {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 16px 40px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(15, 33, 97, 0.3);
            margin-top: 20px;
        }
        
        .demo-button:active {
            transform: scale(0.97);
        }`}</style>
    </div>
  );
}

export default GrapModal;
