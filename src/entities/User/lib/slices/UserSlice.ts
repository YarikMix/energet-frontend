// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { T_User, T_UserState } from "entities/User/model/types/User.ts";
import { api } from "src/app/api.ts";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { T_UserRegisterCredentials } from "src/widgets/RegisterForm/types.ts";

const initialState: T_UserState = {
    userInfo: null,
    is_authenticated: false,
};

export const handleLogin = createAsyncThunk<
    T_User,
    T_UserLoginCreadentials,
    AsyncThunkConfig
>("login", async function (data: T_UserLoginCreadentials) {
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
        await api.post("/auth/logout/");
    }
);

export const handleCheckUser = createAsyncThunk<T_User, void, AsyncThunkConfig>(
    "check",
    async function () {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        try {
            const data = JSON.parse(code);

            console.log(data);
            if (data) {
                api.post("/auth/vk", { code: { ...data } });
            }
        } catch (e) {
            console.log("error");
            console.log(e);
        }

        const response = await api.post("/auth/check/");
        return response.data;
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
        builder.addCase(handleCheckUser.rejected, (state: T_UserState) => {
            state.is_authenticated = false;
            state.userInfo = null;
        });
        builder.addCase(
            handleCheckUser.fulfilled,
            (state: T_UserState, action: PayloadAction<T_User>) => {
                state.is_authenticated = true;
                state.userInfo = action.payload;
            }
        );
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
