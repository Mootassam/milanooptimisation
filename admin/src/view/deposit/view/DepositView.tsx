import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function DepositView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <TextViewItem
        label={i18n('entities.deposit.fields.title')}
        value={record.title}
      />

      <TextViewItem
        label={i18n('entities.deposit.fields.codeName')}
        value={record.codeName}
      />

      <TextViewItem
        label={i18n('entities.deposit.fields.discount')}
        value={record.discount}
      />

      <TextViewItem
        label={i18n('entities.deposit.fields.noOfTimes')}
        value={record.noOfTimes}
      />

      <TextViewItem
        label={i18n('entities.deposit.fields.status')}
        value={
          record.status &&
          i18n(
            `entities.deposit.enumerators.status.${record.status}`,
          )
        }
      />

      <TextViewItem
        label={i18n('entities.deposit.fields.type')}
        value={
          record.type &&
          i18n(
            `entities.deposit.enumerators.type.${record.type}`,
          )
        }
      />
    </ViewWrapper>
  );
}

export default DepositView;
