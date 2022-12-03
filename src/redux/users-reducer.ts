import { userAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_CURRENT = 'SET_TOTAL_CURRENT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

type PhotosType = {
    small: string,
    large: string
}

// type UsersType = {
//     items: Array<ItemsUsersType>
//     totalCount: number
//     error: string
// }
    
let initalState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowInProgress: [] as Array<number> // массив id пользователей
}

type initalStateType = typeof initalState

const usersReducer = (state = initalState, action: any): initalStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(i => {
                    if (action.userId === i.id) {
                        return { ...i, followed: true }
                    }
                    return i;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(i => {
                    if (i.id === action.userId) {
                        return { ...i, followed: false }
                    }
                    return i;
                })
            };
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_CURRENT:
            return { ...state, totalUserCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case SET_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowInProgress: action.isFetching
                    ? [...state.isFollowInProgress, action.userId]
                    : [state.isFollowInProgress.filter(id => id != action.userId)]
            }
        default:
            return state;
    }
}

type followACType = {
    type: typeof FOLLOW
    userId: number
}
type unfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
type setUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type setTotalUserCount = {
    type: typeof SET_TOTAL_CURRENT
    count: number
}
type toggleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type setFollowingProgress = {
    type: typeof SET_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followAC = (userId: number): followACType => ({ type: FOLLOW, userId });
export const unfollowAC = (userId: number): unfollowACType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UserType>): setUsersType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (totalUserCount: number): setTotalUserCount => ({ type: SET_TOTAL_CURRENT, count: totalUserCount });
export const toggleIsFetching = (isFetching: boolean): toggleIsFetching => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setFollowingProgress = (isFetching: boolean, userId: number): setFollowingProgress => ({ type: SET_FOLLOWING_PROGRESS, isFetching, userId });


export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let response = await userAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUserCount(response.totalCount));
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    dispatch(setFollowingProgress(true, userId));
    let response = await userAPI.deleteUserFollowing(userId)
    if (response.resultCode === 0) {
        dispatch(unfollowAC(userId));
    }
    dispatch(setFollowingProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch: any) => {
    dispatch(setFollowingProgress(true, userId));
    let response = await userAPI.postUserFollowing(userId)
    if (response.resultCode === 0) {
        dispatch(followAC(userId));
    }
    dispatch(setFollowingProgress(false, userId));
}

export default usersReducer;