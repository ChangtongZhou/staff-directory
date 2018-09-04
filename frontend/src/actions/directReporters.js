import axios from 'axios';

function getReportersStart() {
    return {
        type: 'REQUEST_REPORTERS_START'
    };
}

function getReportersSuccess(response) {
    // console.log(`get reporters in action: ${JSON.stringify(response, null, 2)}`)
    return {
        type: 'REQUEST_REPORTERS_SUCCESS',
        reporters: response
    }
}

function getReportersFail(error) {
    return {
        type: 'REQUEST_REPORTERS_FAIL',
        error: error
    }
}

export function getReporters(id) {
    console.log('fetching direct reporters.')
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


