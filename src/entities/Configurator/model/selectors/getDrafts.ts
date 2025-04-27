import { RootState } from "src/app/providers/StoreProvider";
import { T_Configuration } from "entities/Configurator/lib/slices/configuratorSlice.ts";

const getConfiguratorDrafts = (state: RootState): T_Configuration[] => {
    return state.configuratorReducer.drafts;
};

export default getConfiguratorDrafts;
