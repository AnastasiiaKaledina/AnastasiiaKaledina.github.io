import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_PERSONAL_ACCOUNT_HEADER = 'SET_PERSONAL_ACCOUNT_HEADER';


let initalState= {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

export type InitalStateType = typeof initalState; // чтобы не писать много кода и не дублировать initalState

const authReducer = (state = initalState, action: any): InitalStateType => {
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

type setPersonalAccountDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type setPersonalAccountHeaderType = {
    type: typeof SET_PERSONAL_ACCOUNT_HEADER
    data: setPersonalAccountDataType
}

export const setPersonalAccountHeader = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setPersonalAccountHeaderType => ({ type: SET_PERSONAL_ACCOUNT_HEADER, data: { userId, email, login, isAuth } });


export const getAuth = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setPersonalAccountHeader(id, email, login, true));
    }
}

export const postLogin = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const deleteLogin = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
            dispatch(setPersonalAccountHeader(null, null, null, false));
        }
}

export default authReducer;