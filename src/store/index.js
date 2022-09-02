import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "./reducers/authorization.slice";
import usersSlice from "./reducers/users.slice";

export const store = configureStore({
    reducer: {
        authorization: authorizationSlice,
        users: usersSlice
    }
});
