import { RootState } from "src/app/providers/StoreProvider";

type T_Optimization = {
    enSource: Record<string, number>;
    enDSource: Record<string, number>;
    enStorage: Record<string, number>;
};

const getOptimization = (state: RootState): T_Optimization =>
    state.configuratorReducer.configuration;

export default getOptimization;
