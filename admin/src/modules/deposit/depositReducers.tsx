import list from 'src/modules/deposit/list/depositListReducers';
import form from 'src/modules/deposit/form/depositFormReducers';
import view from 'src/modules/deposit/view/depositViewReducers';
import destroy from 'src/modules/deposit/destroy/depositDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
 
});
