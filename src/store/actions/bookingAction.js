import actionTypes from './actionTypes';

export const updateBookedTime = (data) => ({
    type: actionTypes.UPDATE_BOOKED_TIME,
    data: data
})