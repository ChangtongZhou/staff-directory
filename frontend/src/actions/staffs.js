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
    return (dispatch, store) => {
        dispatch(getStaffStart());
        axios
        .post('/api/addStaff', newStaff)
        .then(response => {
            dispatch(getStaffSuccess(response.data.message));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        })
    }
}

export function deleteStaff(id) {
    return (dispatch, store) => {
        dispatch(getStaffStart());
        axios
        .delete(`/api/staff/${id}`)
        .then(response => {
            dispatch(getStaffSuccess(response.data.message));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        })
    }
}