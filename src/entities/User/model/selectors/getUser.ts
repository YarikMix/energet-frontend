import { RootState } from "src/app/providers/StoreProvider";

export const getUser = (state: RootState) => {
    return state.userReducer.userInfo;
};

export const getIsAuthenticated = (state: RootState) => {
    return state.userReducer.is_authenticated;
};
