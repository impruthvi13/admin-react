import { createSelector } from 'reselect'

const selectAuthReducer = (state) => state.auth

export const selectAuth = createSelector(
    [selectAuthReducer],
    (auth) => auth.auth
)

export const selectToken = createSelector(
    [selectAuthReducer],
    (auth) => auth.token
)

export const selectAuthResponse = createSelector(
    [selectAuthReducer],
    (auth) => auth.authResponse
)

export const selectIsAuthenticated = createSelector(
    [selectAuthReducer],
    (auth) => auth.isAuthenticated
)

export const selectIsLoading = createSelector(
    [selectAuthReducer],
    (auth) => auth.isLoading
)

export const selectIsAuthError = createSelector(
    [selectAuthReducer],
    (auth) => auth.authError
)
