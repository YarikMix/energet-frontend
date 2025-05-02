import { RootState } from "src/app/providers/StoreProvider";

export const getConsumptionType = (state: RootState): number =>
    state.configuratorReducer.configuration.consumptionType;

export const getConsumptionConst = (state: RootState): number =>
    state.configuratorReducer.configuration.consumptionConst;

export const getConsumptionSeasons = (state: RootState): number[] =>
    state.configuratorReducer.configuration.consumptionSeasons;

export const getConsumptionMonth = (state: RootState): number[] =>
    state.configuratorReducer.configuration.consumptionMonth;
