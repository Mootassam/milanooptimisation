import { createSelector } from 'reselect';

const selectRaw = (state) => state.deposit.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);
const selectModal = createSelector(
  [selectRaw],
  (raw) => raw.showModal,
);




const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const couponsFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectModal,
  selectRaw,
};

export default couponsFormSelectors;