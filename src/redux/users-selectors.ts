import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize
}

const getUsersSelector = (state: AppStateType) => {
   return state.usersPage.users
}

export const getUsersFromState = createSelector(getUsersSelector, (users) => {
   return users.filter(u => true);
})
