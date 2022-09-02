import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        login: 'admin',
        password: 'admin'
    },
    isAuth: false,
    isPending: false,
    isError: false
};

export const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        login: (state, action) => {
            const { user } = state;
            const { payload } = action;
            if(user.login === payload.login && user.password === payload.password) {
                state.isAuth = true;
                return;
            }
            state.isError = true;
        },
        logout: (state) => {
            state.isAuth = false;
        },
    }
});

export const { login, logout } = authorizationSlice.actions;

export const selectAuthorizationSlice = (state) => state.authorization;

export default authorizationSlice.reducer;
