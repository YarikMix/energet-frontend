import { RootState } from "src/app/providers/StoreProvider";

const getUserRole = (state: RootState) => {
    return state.userReducer.userInfo?.role;
};

export default getUserRole;
