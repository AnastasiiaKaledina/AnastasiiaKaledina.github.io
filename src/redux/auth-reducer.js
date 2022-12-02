import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_PERSONAL_ACCOUNT_HEADER = 'SET_PERSONAL_ACCOUNT_HEADER';

let initalState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    log: false
}

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_PERSONAL_ACCOUNT_HEADER:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export const setPersonalAccountHeader = (userId, email, login, isAuth) => ({ type: SET_PERSONAL_ACCOUNT_HEADER, data: { userId, email, login, isAuth } });


export const getAuth = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setPersonalAccountHeader(id, email, login, true));
    }
}

export const postLogin = (email, password, rememberMe) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const deleteLogin = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
            dispatch(setPersonalAccountHeader(null, null, null, false));
        }
}

export default authReducer;