import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import withdrawEnumerators from 'src/modules/withdraw/withdrawEnumerators';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';

const schema = yup.object().shape({
  status: yupFormSchemas.enumerator(
    i18n('entities.withdraw.fields.status'),
    {
      options: withdrawEnumerators.status,
    },
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.withdraw.fields.amount'),
    {
      required: true,
      min: 0.01,
    },
  ),
  currency: yupFormSchemas.string(
    i18n('entities.withdraw.fields.currency'),
    {
      required: true,
    },
  ),
  paymentMethod: yupFormSchemas.enumerator(
    i18n('entities.withdraw.fields.paymentMethod'),
    {
      options: withdrawEnumerators.paymentMethod,
      required: true,
    },
  ),
  user: yupFormSchemas.relationToOne(
    i18n('entities.withdraw.fields.user'),
    {
      required: true,
    },
  ),
});

function WithdrawForm(props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    props.record?.paymentMethod || '',
  );

  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      status: record.status || 'pending',
      amount: record.amount || 0,
      currency: record.currency || 'USD',
      paymentMethod: record.paymentMethod || '',
      user: record.user,
      // Crypto fields
      cryptoCurrency: record.paymentDetails?.crypto?.currency || '',
      walletAddress: record.paymentDetails?.crypto?.walletAddress || '',
      txid: record.paymentDetails?.crypto?.txid || '',
      network: record.paymentDetails?.crypto?.network || 'TRC20',
      // Mobile Money fields
      mobileProvider: record.paymentDetails?.mobileMoney?.provider || '',
      phoneNumber: record.paymentDetails?.mobileMoney?.phoneNumber || '',
      withdrawId: record.paymentDetails?.mobileMoney?.withdrawId || '',
      referenceNumber: record.referenceNumber || '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  // Watch paymentMethod field changes
  const paymentMethodValue = form.watch('paymentMethod');
  
  useEffect(() => {
    if (paymentMethodValue) {
      setSelectedPaymentMethod(paymentMethodValue);
      
      // Reset payment details when changing payment method
      if (paymentMethodValue === 'crypto') {
        form.setValue('mobileProvider', '');
        form.setValue('phoneNumber', '');
        form.setValue('withdrawId', '');
      } else if (paymentMethodValue === 'mobile_money') {
        form.setValue('cryptoCurrency', '');
        form.setValue('walletAddress', '');
        form.setValue('txid', '');
        form.setValue('network', 'TRC20');
      }
    }
  }, [paymentMethodValue, form]);

  const onSubmit = (values) => {
    // Structure the data according to the Withdraw model
    const formattedValues = {
      status: values.status,
      amount: values.amount,
      currency: values.currency,
      paymentMethod: values.paymentMethod,
      user: values.user,
      referenceNumber: values.referenceNumber,
      paymentDetails: {
        ...(values.paymentMethod === 'crypto' && {
          crypto: {
            currency: values.cryptoCurrency,
            walletAddress: values.walletAddress,
            txid: values.txid,
            network: values.network,
          },
        }),
        ...(values.paymentMethod === 'mobile_money' && {
          mobileMoney: {
            provider: values.mobileProvider,
            phoneNumber: values.phoneNumber,
            withdrawId: values.withdrawId,
          },
        }),
      },
    };

    props.onSubmit(props.record?.id, formattedValues);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    setSelectedPaymentMethod(initialValues.paymentMethod);
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            {/* Basic Withdraw Information */}
            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.withdraw.fields.status')}
                options={withdrawEnumerators.status.map((value) => ({
                  value,
                  label: i18n(`entities.withdraw.enumerators.status.${value}`),
                }))}
                required={true}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <UserAutocompleteFormItem
                name="user"
                label={i18n('entities.withdraw.fields.user')}
                required={true}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.withdraw.fields.amount')}
                required={true}
                type="number"
           
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="currency"
                label={i18n('entities.withdraw.fields.currency')}
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' },
                  { value: 'GBP', label: 'GBP' },
                ]}
                required={true}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="paymentMethod"
                label={i18n('entities.withdraw.fields.paymentMethod')}
                options={withdrawEnumerators.paymentMethod.map((value) => ({
                  value,
                  label: i18n(`entities.withdraw.enumerators.paymentMethod.${value}`),
                }))}
                required={true}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="referenceNumber"
                label="Reference Number"
                placeholder="Auto-generated if left empty"
              />
            </div>

            {/* Crypto Payment Details */}
            {selectedPaymentMethod === 'crypto' && (
              <>
                <div className="col-12">
                  <h5 className="section-title">Crypto Withdrawal Details</h5>
                </div>
                
                <div className="col-lg-6 col-md-8 col-12">
                  <SelectFormItem
                    name="cryptoCurrency"
                    label="Cryptocurrency"
                    options={withdrawEnumerators.cryptoCurrency.map((value) => ({
                      value,
                      label: value,
                    }))}
                    required={true}
                  />
                </div>

                <div className="col-lg-6 col-md-8 col-12">
                  <SelectFormItem
                    name="network"
                    label="Network"
                    options={withdrawEnumerators.network.map((value) => ({
                      value,
                      label: value,
                    }))}
                    required={true}
                  />
                </div>

                <div className="col-lg-6 col-md-8 col-12">
                  <InputFormItem
                    name="walletAddress"
                    label="Destination Wallet Address"
                    required={true}
                    placeholder="Enter recipient wallet address"
                  />
                </div>

                <div className="col-lg-6 col-md-8 col-12">
                  <InputFormItem
                    name="txid"
                    label="Transaction ID (TXID)"
                    placeholder="Enter transaction ID (optional)"
                  />
                </div>
              </>
            )}

            {/* Mobile Money Payment Details */}
            {selectedPaymentMethod === 'mobile_money' && (
              <>
                <div className="col-12">
                  <h5 className="section-title">Mobile Money Withdrawal Details</h5>
                </div>
                
                <div className="col-lg-6 col-md-8 col-12">
                  <SelectFormItem
                    name="mobileProvider"
                    label="Mobile Provider"
                    options={withdrawEnumerators.mobileProvider.map((value) => ({
                      value,
                      label: i18n(`entities.withdraw.enumerators.mobileProvider.${value}`),
                    }))}
                    required={true}
                  />
                </div>

                <div className="col-lg-6 col-md-8 col-12">
                  <InputFormItem
                    name="phoneNumber"
                    label="Recipient Phone Number"
                    required={true}
                    placeholder="Enter recipient phone number with country code"
                  />
                </div>

                <div className="col-lg-6 col-md-8 col-12">
                  <InputFormItem
                    name="withdrawId"
                    label="Withdrawal ID/Reference"
                    required={true}
                    placeholder="Enter withdrawal reference number"
                  />
                </div>
              </>
            )}

          
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={props.saveLoading}
                iconClass="far fa-save"
              />
              &nbsp;
              {i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>
              &nbsp;
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times"></i>&nbsp;
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>

      <style>{`
        .section-title {
          color: #2D3748;
          font-size: 16px;
          font-weight: 600;
          margin: 20px 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #E2E8F0;
        }
        
        .form-buttons {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
        }
        
        .btn {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </FormWrapper>
  );
}

export default WithdrawForm;