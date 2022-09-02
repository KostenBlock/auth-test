import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isPending: false,
    isError: false
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setState: (state, action) => {
            try {
                const {payload} = action;
                for (let key in payload) {
                    if (Object.hasOwnProperty.call(payload, key) && Object.hasOwnProperty.call(state, key)) {
                        state[key] = payload[key];
                    }
                }
            } catch (error) {
            }
        },
        setUsers: (state, action) => {
            const { payload } = action;
            state.users = [...payload];
        },
    }
});

export const getUsers = () => async (dispatch) => {
    try {
        dispatch(setState({ isPending: true }));
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/users`);
        if(Array.isArray(data)) {
            dispatch(setUsers(data));
            return;
        }
        dispatch(setUsers([]));
    } catch (error) {
        console.error(`fail check auth - ${error}`);
        dispatch(setState({ isError: true }));
    } finally {
        dispatch(setState({ isPending: false }));
    }
};

export const { setState, setUsers } = usersSlice.actions;

export const selectUsersSlice = (state) => state.users;

export default usersSlice.reducer;
