const directReporters = (state = {isLoading: false, error: null, reporters: []}, action) => {
    switch(action.type) {
        case 'REQUEST_STAFFS_START':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_STAFFS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null,
                reporters: action.reporters
            };
        case 'REQUEST_STAFFS_FAIL':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default directReporters;