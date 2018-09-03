const staffDetail = (state = {isLoading: false, error: null, detail: {}}, action) => {
    switch(action.type) {
        case 'REQUEST_STAFFDETAIL_START':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_STAFFDETAIL_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null,
                detail: action.detail.staff,
                manager: action.detail.managerName,
                numOfDRs: action.detail.numOfDRs
            };
        case 'REQUEST_STAFFDETAIL_FAIL':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default staffDetail;