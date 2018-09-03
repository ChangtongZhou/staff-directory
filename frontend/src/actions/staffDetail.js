import axios from 'axios';

function getStaffDetailStart() {
    return {
        type: 'REQUEST_STAFFDETAIL_START'
    };
}

function getStaffDetailSuccess(response) {
    return {
        type: 'REQUEST_STAFFDETAIL_SUCCESS',
        detail: response.detail,
        managerName: response.managerName,
        numOfDRs: response.numOfDRs
    }
}

function getStaffDetailFail(error) {
    return {
        type: 'REQUEST_STAFFDETAIL_FAIL',
        error: error
    }
}

export function getStaffDetail(id) {
    return (dispatch, store) => {
        dispatch(getStaffDetailStart());
        axios
        .get(`/api/staff/${id}`)
        .then(response => {
            dispatch(getStaffDetailSuccess(response.data));
        })
        .catch(err => {
            dispatch(getStaffDetailFail(err));
        })
    }
}

// export function getManager(id) {
//     return (dispatch, store) => {
//         dispatch(getStaffDetailStart());
//         axios
//         .get(`/api/staff/${id}`)
//         .then(response => {
//             dispatch(getStaffDetailSuccess(response.data));
//         })
//         .catch(err => {
//             dispatch(getStaffDetailFail(err));
//         })
//     }
// }

export function editStaff(id, newStaff) {
    return (dispatch, store) => {
        dispatch(getStaffDetailStart());
        axios
        .put(`api/staff/${id}`, newStaff)
        .then(response => {
            dispatch(getStaffDetailSuccess(response.data.message));
        })
        .catch(err => {
            dispatch(getStaffDetailFail(err));
        })
    }
}
