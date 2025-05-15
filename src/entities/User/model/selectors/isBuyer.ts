import { RootState } from "src/app/providers/StoreProvider";
import { E_UserRole } from "entities/User/model/types/User.ts";

const getIsBuyer = (state: RootState) => {
    return state.userReducer.userInfo?.role == E_UserRole.Buyer;
};

export default getIsBuyer;
