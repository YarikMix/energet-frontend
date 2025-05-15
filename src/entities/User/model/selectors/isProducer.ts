import { RootState } from "src/app/providers/StoreProvider";
import { E_UserRole } from "entities/User/model/types/User.ts";

const getIsProducer = (state: RootState) => {
    return state.userReducer.userInfo?.role == E_UserRole.Producer;
};

export default getIsProducer;
