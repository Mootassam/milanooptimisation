import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "src/view/layout/Header";
import Message from "src/view/shared/message";

function MobileMoneyDeposit() {
    const [selectedProvider, setSelectedProvider] = useState("mtn");
    const [showSupportModal, setShowSupportModal] = useState(false);

    // Mobile Money Providers
    const providers = [
        {
            id: "mtn",
            name: "MTN Mobile Money",
            icon: "fas fa-sim-card",
            color: "#ffcc00",
            description: "Deposit using your MTN mobile money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "airtel",
            name: "Airtel Money",
            icon: "fas fa-wifi",
            color: "#e60000",
            description: "Deposit using your Airtel money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "telecel",
            name: "Telecel Money",
            icon: "fas fa-broadcast-tower",
            color: "#00aaff",
            description: "Deposit using your Telecel money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "orange",
            name: "Orange Money",
            icon: "fas fa-bolt",
            color: "#ff6600",
            description: "Deposit using your Orange money",
            minDeposit: 5,
            maxDeposit: 5000
        }
    ];

    const currentProvider = providers.find(provider => provider.id === selectedProvider);

    const handleProviderSelect = (providerId) => {
        setSelectedProvider(providerId);
        setShowSupportModal(true);
    };

    const closeModal = () => {
        setShowSupportModal(false);
    };

    return (
        <>
            <Header
                title="Mobile Money Deposit"
                showBackButton={true}
                showLogo={false}
                showNotification={true}
            />

            {/* Provider Selection */}
            <div className="provider-section">
                <div className="section-title">
                    <i className="fas fa-mobile-alt" />
                    Select Mobile Money Provider
                </div>
                <div className="provider-options">
                    {providers.map((provider) => (
                        <div
                            key={provider.id}
                            className={`provider-option ${selectedProvider === provider.id ? 'active' : ''}`}
                            onClick={() => handleProviderSelect(provider.id)}
                        >
                            <div
                                className="provider-icon"
                                style={{ backgroundColor: `${provider.color}20`, color: provider.color }}
                            >
                                <i className={provider.icon} />
                            </div>
                            <div className="provider-info">
                                <div className="provider-name">{provider.name}</div>
                                <div className="provider-desc">{provider.description}</div>
                            </div>
                            <div className="provider-check">
                                {selectedProvider === provider.id && (
                                    <i className="fas fa-check-circle" style={{ color: provider.color }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Support Modal */}
            {showSupportModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Contact Customer Support</h3>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>To deposit with <strong>{currentProvider?.name}</strong>, please contact our customer support team for assistance.</p>
                        </div>
                        <div className="modal-footer">
                            <Link to="/Online" className="btn-primary" onClick={closeModal}>
                                Contact Customer Support
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Important Notices */}
            <div className="notices-section">
                <div className="notice-item">
                    <i className="fas fa-shield-alt" />
                    <div className="notice-text">
                        <strong>Security:</strong> Your transaction is secured with SSL encryption
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-bolt" />
                    <div className="notice-text">
                        <strong>Instant Processing:</strong> Deposits are processed instantly after confirmation
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-phone" />
                    <div className="notice-text">
                        <strong>Requirements:</strong> Ensure your mobile money account is active and has sufficient funds
                    </div>
                </div>
            </div>

            <style>{`
                /* Provider Selection */
                .provider-section {
                    background: white;
                    border-radius: 20px;
                    margin: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                
                .section-title {
                    padding: 20px 20px 15px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f2161;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #f5f6f7;
                }
                
                .section-title i {
                    color: #7b8796;
                    font-size: 16px;
                }
                
                .provider-options {
                    padding: 15px 0;
                }
                
                .provider-option {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid #f5f6f7;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .provider-option:active {
                    background: #f9f9f9;
                }
                
                .provider-option:last-child {
                    border-bottom: none;
                }
                
                .provider-option.active {
                    background: #f0f4ff;
                }
                
                .provider-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    margin-right: 15px;
                }
                
                .provider-info {
                    flex: 1;
                }
                
                .provider-name {
                    font-weight: 700;
                    color: #0f2161;
                    margin-bottom: 4px;
                    font-size: 16px;
                }
                
                .provider-desc {
                    font-size: 13px;
                    color: #7b8796;
                }
                
                .provider-check {
                    color: #26a17b;
                    font-size: 20px;
                }

                /* Notices Section */
                .notices-section {
                    background: white;
                    border-radius: 20px;
                    margin: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    padding: 20px;
                }
                
                .notice-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 15px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 12px;
                }
                
                .notice-item:last-child {
                    margin-bottom: 0;
                }
                
                .notice-item i {
                    color: #0f2161;
                    margin-top: 2px;
                    font-size: 16px;
                }
                
                .notice-text {
                    flex: 1;
                    font-size: 13px;
                    color: #7b8796;
                    line-height: 1.4;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                }
                
                .modal-header {
                    background: #007bff;
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 20px;
                }
                
                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-body {
                    padding: 24px;
                    text-align: center;
                }
                
                .modal-body p {
                    margin-bottom: 0;
                    line-height: 1.5;
                    font-size: 16px;
                }
                
                .modal-footer {
                    padding: 0 24px 24px;
                    text-align: center;
                }
                
                .btn-primary {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                }
                
                .btn-primary:hover {
                    background: #0056b3;
                }

                /* Responsive Design */
                @media (max-width: 340px) {
                    .provider-icon {
                        width: 45px;
                        height: 45px;
                        font-size: 20px;
                    }
                    
                    .provider-name {
                        font-size: 15px;
                    }
                }
            `}</style>
        </>
    );
}

export default MobileMoneyDeposit;