import {combineReducers} from 'redux';
import staffs from './staffs';
import staffDetail from './staffDetail';
import directReporters from './directReporters';
import redirect from './redirect';

const reducers = combineReducers({
    staffs,
    staffDetail,
    directReporters,
    redirect
});

export default reducers;