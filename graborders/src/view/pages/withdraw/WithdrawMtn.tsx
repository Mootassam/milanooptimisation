import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "src/view/layout/Header";
import InputFormItem from "src/shared/form/InputFormItem";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/transaction/form/transactionFormActions";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";

function MobileMoneyDeposit() {
    const dispatch = useDispatch();
    const currentUser = useSelector(authSelectors.selectCurrentUser);

    const [selectedProvider, setSelectedProvider] = useState("mtn");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({
        amount: 0,
        fee: 0,
        netAmount: 0,
        phoneNumber: ""
    });

    // Fee configuration
    const WITHDRAWAL_FEE_RATE = 5; // 5% fee

    // Validation schema
    const schema = yup.object().shape({
        amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is required')
            .min(20, 'Minimum withdrawal is $20'),
        phoneNumber: yup
            .string()
            .required('Phone number is required')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be exactly 10 digits')
            .max(10, 'Phone number must be exactly 10 digits'),
        withdrawPassword: yup
            .string()
            .required('Withdrawal password is required')
            .min(1, 'Withdrawal password is required')
    });

    const form = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        defaultValues: {
            amount: "",
            phoneNumber: "",
            withdrawPassword: ""
        }
    });

    // Mobile Money Providers
    const providers = [
        {
            id: "mtn",
            name: "MTN Mobile Money",
            icon: "fas fa-sim-card",
            color: "#ffcc00",
            description: "Withdraw to your MTN mobile money",
            minWithdrawal: 20
        },
        {
            id: "airtel",
            name: "Airtel Money",
            icon: "fas fa-wifi",
            color: "#e60000",
            description: "Withdraw to your Airtel money",
            minWithdrawal: 20
        },
        {
            id: "telecel",
            name: "Telecel Money",
            icon: "fas fa-broadcast-tower",
            color: "#00aaff",
            description: "Withdraw to your Telecel money",
            minWithdrawal: 20
        },
        {
            id: "orange",
            name: "Orange Money",
            icon: "fas fa-bolt",
            color: "#ff6600",
            description: "Withdraw to your Orange money",
            minWithdrawal: 20
        }
    ];

    const currentProvider = providers.find(provider => provider.id === selectedProvider);

    // Calculate net amount after fee
    const calculateNetAmount = (amount) => {
        const amountNum = parseFloat(amount) || 0;
        const fee = (amountNum * WITHDRAWAL_FEE_RATE) / 100;
        const net = amountNum - fee;
        return { amountNum, fee, net };
    };

    // Watch form values for real-time calculation
    const watchedAmount = form.watch('amount');
    const watchedPhoneNumber = form.watch('phoneNumber');

    const handleProviderSelect = (providerId) => {
        setSelectedProvider(providerId);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { amountNum, fee, net } = calculateNetAmount(data.amount);

            // Set modal data BEFORE showing modal
            setModalData({
                amount: amountNum,
                fee: fee,
                netAmount: net,
                phoneNumber: data.phoneNumber
            });

            const transactionData = {
                status: "pending",
                date: new Date(),
                user: currentUser?.id,
                type: "withdraw",
                amount: net, // Net amount after fee
                originalAmount: amountNum, // Original amount before fee
                chargeAmount: fee, // Fee amount
                chargeRate: WITHDRAWAL_FEE_RATE, // Fee rate
                vip: currentUser?.vip,
                withdrawPassword: data.withdrawPassword,
                paymentMethod: 'mobile_money',
                paymentDetails: {
                    mobileMoney: {
                        provider: selectedProvider,
                        phoneNumber: data.phoneNumber
                    }
                }
            };

            await dispatch(actions.doCreate(transactionData));

            // Show success modal
            setShowSuccessModal(true);
            form.reset();

        } catch (error) {
            console.error('Withdrawal failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        dispatch(transactionFormActions.doClose());

        // Reset modal data when modal closes
        setModalData({
            amount: 0,
            fee: 0,
            netAmount: 0,
            phoneNumber: ""
        });
    };

    // Calculate current values for display
    const { amountNum: currentAmount, fee: currentFee, net: currentNet } = calculateNetAmount(watchedAmount);

    return (
        <>
            <Header
                title="Mobile Money Withdrawal"
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
                                <div className="provider-limits">
                                    Min: ${provider.minWithdrawal}
                                </div>
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

            {/* Withdrawal Form */}
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="withdrawal-form">
                    <div className="form-section">
                        <div className="section-title">
                            <i className="fas fa-credit-card" />
                            Withdrawal Information
                        </div>

                        <div className="form-content">
                            {/* Amount Input */}
                            <InputFormItem
                                label="Withdrawal Amount *"
                                name="amount"
                                placeholder="Enter amount (minimum $20)"
                                iname="fas fa-coins"
                                type="number"
                                externalErrorMessage={null}
                                disabled={loading}
                            />

                            {/* Phone Number Input */}
                            <InputFormItem
                                label="Phone Number *"
                                name="phoneNumber"
                                placeholder="Enter your 10-digit phone number"
                                iname="fas fa-phone"
                                type="tel"
                                externalErrorMessage={null}
                                disabled={loading}
                                maxLength={10}
                            />

                            {/* Withdrawal Password */}
                            <InputFormItem
                                label="Withdrawal Password *"
                                name="withdrawPassword"
                                placeholder="Enter your withdrawal password"
                                iname="fas fa-lock"
                                type="password"
                                externalErrorMessage={null}
                                disabled={loading}
                            />

                            {/* Amount Calculation Display */}
                            {watchedAmount && parseFloat(watchedAmount) >= 20 && (
                                <div className="amount-calculation-section">
                                    <div className="calculation-row">
                                        <span className="calculation-label">Withdrawal Amount:</span>
                                        <span className="calculation-value original">${currentAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="calculation-row">
                                        <span className="calculation-label">Withdrawal Fee ({WITHDRAWAL_FEE_RATE}%):</span>
                                        <span className="calculation-value fee">- ${currentFee.toFixed(2)}</span>
                                    </div>
                                    <div className="calculation-row total">
                                        <span className="calculation-label">Amount You Will Receive:</span>
                                        <span className="calculation-value net-amount">${currentNet.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="form-actions">
                                {currentUser?.withdraw ? (
                                    <button
                                        className={`withdrawal-confirm-btn ${loading ? 'loading' : ''}`}
                                        type="submit"
                                        disabled={loading || !watchedAmount || parseFloat(watchedAmount) < 20 || currentAmount > currentUser?.balance}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin btn-icon" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane btn-icon" />
                                                Confirm Withdrawal
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button className="withdrawal-disabled-btn" disabled={true}>
                                        <i className="fas fa-lock btn-icon" />
                                        Withdrawals Disabled
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header success">
                            <h3>Withdrawal Successful!</h3>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="success-icon">
                                <i className="fas fa-check-circle" />
                            </div>
                            <p>Your withdrawal request has been submitted successfully.</p>

                            <div className="transaction-details">
                                <div className="detail-row">
                                    <span>Provider:</span>
                                    <span>{currentProvider?.name}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Phone Number:</span>
                                    <span>{modalData.phoneNumber}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Withdrawal Amount:</span>
                                    <span>${modalData.amount.toFixed(2)}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Withdrawal Fee ({WITHDRAWAL_FEE_RATE}%):</span>
                                    <span className="fee">- ${modalData.fee.toFixed(2)}</span>
                                </div>
                                <div className="detail-row total">
                                    <span>Amount You Will Receive:</span>
                                    <span className="net-amount">${modalData.netAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-primary" onClick={closeModal}>
                                <i className="fas fa-check btn-icon" />
                                Done
                            </button>
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
                    <i className="fas fa-clock" />
                    <div className="notice-text">
                        <strong>Processing Time:</strong> Withdrawals are processed within 24-48 hours
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-phone" />
                    <div className="notice-text">
                        <strong>Requirements:</strong> Ensure your mobile money account is active and registered
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-info-circle" />
                    <div className="notice-text">
                        <strong>Fee Notice:</strong> All withdrawals include a {WITHDRAWAL_FEE_RATE}% processing fee
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-wallet" />
                    <div className="notice-text">
                        <strong>Available Balance:</strong> ${currentUser?.balance?.toFixed(2) || '0.00'}
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
                    margin-bottom: 4px;
                }
                
                .provider-limits {
                    font-size: 12px;
                    color: #26a17b;
                    font-weight: 600;
                }
                
                .provider-check {
                    color: #26a17b;
                    font-size: 20px;
                }

                /* Form Section */
                .form-section {
                    background: white;
                    border-radius: 20px;
                    margin: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    overflow: hidden;
                }
                
                .form-content {
                    padding: 20px;
                }

                /* Amount Calculation Section */
                .amount-calculation-section {
                    background: #f8f9ff;
                    border-radius: 12px;
                    padding: 16px;
                    margin: 15px 0;
                    border: 1px solid #e8ecff;
                }
                
                .calculation-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                }
                
                .calculation-row.total {
                    border-top: 2px solid #e8ecff;
                    margin-top: 8px;
                    padding-top: 12px;
                }
                
                .calculation-label {
                    color: #7b8796;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .calculation-value {
                    font-size: 14px;
                    font-weight: 600;
                }
                
                .calculation-value.original {
                    color: #0f2161;
                }
                
                .calculation-value.fee {
                    color: #e74c3c;
                }
                
                .calculation-value.net-amount {
                    color: #27ae60;
                    font-size: 16px;
                }

                /* Button Styles */
                .form-actions {
                    margin-top: 20px;
                }
                
                .withdrawal-confirm-btn {
                    background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
                    color: white;
                    border: none;
                    border-radius: 16px;
                    padding: 16px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    box-shadow: 0 4px 15px rgba(15, 33, 97, 0.2);
                }
                
                .withdrawal-confirm-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
                }
                
                .withdrawal-confirm-btn:active {
                    transform: translateY(0);
                }
                
                .withdrawal-confirm-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .withdrawal-confirm-btn.loading {
                    background: linear-gradient(135deg, #7b8796 0%, #9aa5b1 100%);
                }
                
                .withdrawal-disabled-btn {
                    background: #7b8796;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    padding: 16px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: not-allowed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    opacity: 0.7;
                }
                
                .btn-icon {
                    font-size: 16px;
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
                    padding: 20px;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    animation: modalSlideIn 0.3s ease-out;
                }
                
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-30px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .modal-header {
                    background: #007bff;
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header.success {
                    background: #27ae60;
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
                    margin-bottom: 20px;
                    line-height: 1.5;
                    font-size: 16px;
                    color: #7b8796;
                }
                
                .success-icon {
                    font-size: 60px;
                    color: #27ae60;
                    margin-bottom: 20px;
                    animation: successBounce 0.6s ease-out;
                }
                
                @keyframes successBounce {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                
                .transaction-details {
                    background: #f8f9ff;
                    border-radius: 12px;
                    padding: 16px;
                    margin: 20px 0;
                    text-align: left;
                }
                
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #e8ecff;
                }
                
                .detail-row:last-child {
                    border-bottom: none;
                }
                
                .detail-row.total {
                    border-top: 2px solid #e8ecff;
                    margin-top: 8px;
                    padding-top: 12px;
                    font-weight: 700;
                }
                
                .detail-row span:first-child {
                    color: #7b8796;
                    font-size: 14px;
                }
                
                .detail-row span:last-child {
                    color: #0f2161;
                    font-size: 14px;
                    font-weight: 600;
                }
                
                .detail-row .fee {
                    color: #e74c3c;
                }
                
                .detail-row .net-amount {
                    color: #27ae60;
                    font-size: 16px;
                }
                
                .modal-footer {
                    padding: 0 24px 24px;
                    text-align: center;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
                    transition: all 0.2s ease;
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
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
                    
                    .form-content {
                        padding: 15px;
                    }
                    
                    .modal-content {
                        padding: 0;
                    }
                }
            `}</style>
        </>
    );
}

export default MobileMoneyDeposit;