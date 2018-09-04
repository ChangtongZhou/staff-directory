import axios from 'axios';

function getStaffStart() {
    return {
        type: 'REQUEST_STAFFS_START'
    };
}

function getStaffSuccess(response) {
    return {
        type: 'REQUEST_STAFFS_SUCCESS',
        staff: response
    }
}

function getStaffFail(error) {
    return {
        type: 'REQUEST_STAFFS_FAIL',
        error: error
    }
}

export function getStaffs() {
    console.log('fetching staff list...')
    return (dispatch, store) => {
        dispatch(getStaffStart());
        axios
        .get('/api/staffs')
        .then(response => {
            dispatch(getStaffSuccess(response.data.staffs));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        });
    };
};

export function addStaff(newStaff) {
    console.log('Adding new staff...')
    return (dispatch, store) => {
        dispatch(getStaffStart());
        axios
        .post('/api/addStaff', newStaff)
        .then(response => {
            // console.log(`res of addStaff action is: ${JSON.stringify(response, null, 2)}`)
            dispatch(getStaffSuccess(response.data.staffs));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        })
    }
}

export function deleteStaff(id) {
    console.log('Deleting selected staff...')
    return (dispatch, store) => {
        dispatch(getStaffStart());
        axios
        .delete(`/api/staff/${id}`)
        .then(response => {
            dispatch(getStaffSuccess(response.data.staffs));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        })
    }
}