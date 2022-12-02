import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO = 'SET_PHOTO';

let initalState = {
    postData: [
        { id: 1, text: 'Hello', likes: '5' },
        { id: 2, text: 'Bye', likes: '15' },
        { id: 3, text: 'Hi', likes: '20' }
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                likes: 10,
                text: action.newPostText
            }
            return {
                ...state,
                postData: [...state.postData, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(u => u.id != action.id)
            };
        case SET_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePostActionCreator = (id) => ({ type: DELETE_POST, id });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const setPhoto = (photos) => ({ type: SET_PHOTO, photos });


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await userAPI.getUserProfile(userId);
    dispatch(setUserProfile(response));
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const uploadPhoto = (file) => async (dispatch) => {
    let response = await profileAPI.putPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
}

export default profileReducer;