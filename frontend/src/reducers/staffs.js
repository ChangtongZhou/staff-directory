const staffs = (state = {isLoading: false, error: null, staff: []}, action) => {
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
                staff: action.staff
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

export default staffs;