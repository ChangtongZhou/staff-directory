import axios from 'axios';

function getStaffDetailStart() {
    return {
        type: 'REQUEST_STAFFDETAIL_START'
    };
}

function getStaffDetailSuccess(response) {
    return {
        type: 'REQUEST_STAFFDETAIL_SUCCESS',
        detail: response.staff,
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
            // console.log(`response in staffDetail action: ${JSON.stringify(response.data, null, 2)}`)
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
    console.log(`Editing staff...${JSON.stringify(newStaff)}`)
    return (dispatch, store) => {
        dispatch(getStaffDetailStart());
        axios
        .put(`/api/staff/${id}`, newStaff)
        .then(response => {
            dispatch(getStaffDetailSuccess(response.data));
        })
        .catch(err => {
            dispatch(getStaffDetailFail(err));
        })
    }
}
