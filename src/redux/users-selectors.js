import { createSelector } from "reselect"

export const getPageSize = (state) => {
   return state.usersPage.pageSize
}

const getUsersSelector = (state) => {
   return state.usersPage.users
}

export const getUsersFromState = createSelector(getUsersSelector, (users) => {
   return users.filter(u => true);
})
