import list from 'src/modules/withdraw/list/withdrawListReducers';
import form from 'src/modules/withdraw/form/withdrawFormReducers';
import view from 'src/modules/withdraw/view/withdrawViewReducers';
import destroy from 'src/modules/withdraw/destroy/withdrawDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  
});
