import { userAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_CURRENT = 'SET_TOTAL_CURRENT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';

let initalState = {
    users: [],
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowInProgress: []
}

const usersReducer = (state = initalState, action) => {
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

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (totalUserCount) => ({ type: SET_TOTAL_CURRENT, count: totalUserCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setFollowingProgress = (isFetching, userId) => ({ type: SET_FOLLOWING_PROGRESS, isFetching, userId });


export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let response = await userAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUserCount(response.totalCount));
}

export const unfollow = (userId) => async (dispatch) => {
    dispatch(setFollowingProgress(true, userId));
    let response = await userAPI.deleteUserFollowing(userId)
    if (response.resultCode === 0) {
        dispatch(unfollowAC(userId));
    }
    dispatch(setFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    dispatch(setFollowingProgress(true, userId));
    let response = await userAPI.postUserFollowing(userId)
    if (response.resultCode === 0) {
        dispatch(followAC(userId));
    }
    dispatch(setFollowingProgress(false, userId));
}

export default usersReducer;