import { T_User, T_UserState } from "entities/User/model/types/User.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { api } from "src/app/api.ts";

const initialState: T_UserState = {
    userInfo: null,
    is_authenticated: false,
};

export const handleLogin = createAsyncThunk<
    T_User,
    T_UserLoginCreadentials,
    AsyncThunkConfig
>("check", async function (data: T_UserLoginCreadentials) {
    const response = await api.post("/auth/login/", data);
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<T_User>) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            handleLogin.fulfilled,
            (state: T_UserState, action: PayloadAction<T_User>) => {
                state.is_authenticated = true;
                state.userInfo = action.payload;
            }
        );
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
