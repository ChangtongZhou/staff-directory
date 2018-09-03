import {combineReducers} from 'redux';
import staffs from './staffs';
import staffDetail from './staffDetail';
import directReporters from './directReporters';

const reducers = combineReducers({
    staffs,
    staffDetail,
    directReporters
});

export default reducers;