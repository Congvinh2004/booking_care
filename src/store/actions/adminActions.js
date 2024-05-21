import actionTypes from './actionTypes';
import { getAllCodeService, editUserService, createNewUserService, deleteUserService, getTopDoctorHomeService, getAllUsers } from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());

            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error", e)
        }

    }


}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

// position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());

            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFailed error", e)
        }

    }


}

// role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService("ROLE")
            // console.log('check role redux: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());

            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleFailed error", e)
        }

    }


}
export const createNewUser = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await createNewUserService(data)

            if (res && res.errCode === 0) {
                toast.success('create a new user sussceed !')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(saveUserFailed());
                toast.error('create a new user error !')
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error", e)
            toast.error('create a new user error !')

        }

    }
}

export const saveUserSuccess = () => ({

    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({

    type: actionTypes.CREATE_USER_FAILDED
}
)

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));

            }
            else {
                dispatch(fetchAllUsersFailed());

            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersFailed error", e)
        }

    }
}


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data

})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,

})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {

        try {
            let res = await deleteUserService(userId)

            if (res && res.errCode === 0) {
                toast.success('delete user sussceed !')
                dispatch(deleleUserSuccess());
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(deleleUserFailed());
                toast.error('delete user error !')
            }
        } catch (e) {
            dispatch(deleleUserFailed());
            console.log("deleleUserFailed error", e)
            toast.error('delete user error !')

        }

    }
}


export const editUser = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await editUserService(data)

            if (res && res.errCode === 0) {
                toast.success('edit user sussceed !')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(editUserFailed());
                toast.error('edit user error !')
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log("editUserFailed error", e)
            toast.error('edit user error !')

        }

    }
}

export const deleleUserSuccess = () => ({

    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleleUserFailed = () => ({

    type: actionTypes.DELETE_USER_FAILDED
})

export const editUserSuccess = () => ({

    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({

    type: actionTypes.EDIT_USER_FAILDED
})
// let res1 = await getTopDoctorHomeService(3);
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getTopDoctorHomeService('');
            console.log('check res: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }

    }
}


