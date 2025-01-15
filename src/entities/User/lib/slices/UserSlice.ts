import { T_User, T_UserState } from "entities/User/model/types/User.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { api } from "src/app/api.ts";
import { T_UserRegisterCredentials } from "src/widgets/RegisterForm/types.ts";

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

export const handleRegister = createAsyncThunk<
    T_User,
    T_UserRegisterCredentials,
    AsyncThunkConfig
>("register", async function (data: T_UserRegisterCredentials) {
    const response = await api.post("/auth/register/", data);
    return response.data;
});

export const handleLogout = createAsyncThunk<void, void, AsyncThunkConfig>(
    "logout",
    async function () {
        console.log("handleLogout");
        await api.post("/auth/logout/");
    }
);

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
        builder.addCase(
            handleRegister.fulfilled,
            (state: T_UserState, action: PayloadAction<T_User>) => {
                state.is_authenticated = true;
                state.userInfo = action.payload;
            }
        );
        builder.addCase(handleLogout.fulfilled, (state: T_UserState) => {
            state.is_authenticated = false;
            state.userInfo = null;
        });
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
