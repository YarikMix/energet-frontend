import { RootState } from "src/app/providers/StoreProvider";
import { E_UserRole } from "entities/User/model/types/User.ts";

export const getUser = (state: RootState) => {
    return state.userReducer.userInfo;
};

export const getIsBuyer = (state: RootState) => {
    return state.userReducer.userInfo?.role == E_UserRole.Buyer;
};

export const getIsAuthenticated = (state: RootState) => {
    return state.userReducer.is_authenticated;
};
