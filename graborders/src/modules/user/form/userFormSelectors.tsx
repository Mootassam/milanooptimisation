import { createSelector } from 'reselect';

const selectRaw = (state) => state.user.form;

const selectUser = createSelector(
  [selectRaw],
  (raw) => raw.user,
);

const selectRefLoading = createSelector(
  [selectRaw],
  (raw) => raw.refLoading,
);




const selectRefUsers = createSelector(
  [selectRaw],
  (raw) => raw.invitedUsers,
);


const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const userFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectUser,
  selectRefLoading,
  selectRefUsers,
  selectRaw,
};

export default userFormSelectors;
