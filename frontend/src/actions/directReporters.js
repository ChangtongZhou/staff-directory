import axios from 'axios';

function getReportersStart() {
    return {
        type: 'REQUEST_REPORTERS_START'
    };
}

function getReportersSuccess(response) {
    return {
        type: 'REQUEST_REPORTERS_SUCCESS',
        staff: response
    }
}

function getReportersFail(error) {
    return {
        type: 'REQUEST_REPORTERS_FAIL',
        error: error
    }
}

export function getReporters(id) {
    return (dispatch, store) => {
        dispatch(getReportersStart());
        axios
        .get(`/api/staff/${id}/reporters`)
        .then(response => {
            dispatch(getReportersSuccess(response.data.reporters));
        })
        .catch(err => {
            dispatch(getReportersFail(err));
        });
    };
};


