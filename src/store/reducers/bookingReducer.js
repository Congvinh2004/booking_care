import actionTypes from '../actions/actionTypes';
const initialState = {
    bookedTimes: {},
    isLoading: false
};

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BOOKED_TIME:
            return {
                ...state,
                bookedTimes: {
                    ...state.bookedTimes,
                    [`${action.data.doctorId}-${action.data.date}-${action.data.timeType}`]: true
                }
            };
        default:
            return state;
    }
};

export default scheduleReducer;