import { profileAPI, userAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO = 'SET_PHOTO';



type PostDataType = {
    id: number
    text: string
    likes: number
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {
    small: string,
    large: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initalState = {
    postData: [
        { id: 1, text: 'Hello', likes: 5 },
        { id: 2, text: 'Bye', likes: 15 },
        { id: 3, text: 'Hi', likes: 20 }
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: ""
}

export type InitalStateType = typeof initalState;

const profileReducer = (state = initalState, action: any):  InitalStateType => {
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
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        default:
            return state;
    }
}
type addPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type deletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type setUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
type setPhotoType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): addPostActionType => ({ type: ADD_POST, newPostText });
export const deletePostActionCreator = (id: number): deletePostActionType => ({ type: DELETE_POST, id });
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status: string): setUserStatusType => ({ type: SET_USER_STATUS, status });
export const setPhoto = (photos: PhotosType): setPhotoType => ({ type: SET_PHOTO, photos });


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await userAPI.getUserProfile(userId);
    dispatch(setUserProfile(response));
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response));
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch (error) {
        // здесь дебажим и смотрим, что пришло и что можно вывести
    }
}

export const uploadPhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.putPhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
}

export const postDataProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.postDataProfile(profile);
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("profile", { _error: response.messages[0] }));
        return Promise.reject(response.messages[0])
    }
}



export default profileReducer;