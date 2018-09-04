const staffDetail = (state = {isLoading: false, error: null, detail: {}}, action) => {
    switch(action.type) {
        case 'REQUEST_STAFFDETAIL_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'REQUEST_STAFFDETAIL_SUCCESS':
            // console.log(`detail in staffdetail reducer: ${JSON.stringify(action, null, 2)}`)
            return {
                ...state,
                isLoading: false,
                detail: action.detail,
                manager: action.managerName,
                numOfDRs: action.numOfDRs
                
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