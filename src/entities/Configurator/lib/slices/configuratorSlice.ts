// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { AxiosResponse } from "axios";
import { T_Item } from "entities/Item/model/types/Item.ts";
import { DEFAULT_COORDS } from "shared/utils/consts.ts";
import { api } from "src/app/api.ts";

export type T_ConfigurationResultItem = {
    item: T_Item;
    total_count: number;
    total_price: number;
};

export type T_ConfigurationResult = {
    items: T_ConfigurationResultItem[];
    total_price: number;
    params: T_ConfigurationParams;
};

export type T_Configuration = {
    id?: number;
    coords: [number, number];
    consumptionType: number;
    consumptionConst: number;
    consumptionSeasons: number[];
    consumptionMonth: number[];
    enSource: {
        solar: 0 | 1;
        wind: 0 | 1;
        TEG: 0 | 1;
    };
    enDSource: {
        DGS: 0 | 1;
        FC: 0 | 1;
    };
    enStorage: {
        AB: 0 | 1;
        SC: 0 | 1;
    };
    optimizationType: number;
};

export type T_ConfigurationParams = {
    RPS: string;
    LCOE: string;
    CapEx: string;
    OpEx: string;
    Economy: string;
    NPV: string;
};

interface IState {
    drafts: T_Configuration[];
    configuration: T_Configuration;
    loading: boolean;
    items: T_ConfigurationResultItem[] | null;
    total_price: number | null;
    params: T_ConfigurationParams | null;
}

const initialState: IState = {
    drafts: [],
    configuration: {
        coords: DEFAULT_COORDS,
        consumptionType: 1,
        consumptionConst: 100,
        consumptionSeasons: [100, 100, 100, 100],
        consumptionMonth: [],
        enSource: {
            solar: 1, // солнечная панель
            wind: 0, // ветрогенератор
            TEG: 0, // термоэлектрический генератор
        },
        enDSource: {
            DGS: 0, // дизель
            FC: 0, // топливный элемент (пока нет)
        },
        enStorage: {
            AB: 1, // аккамуляторная батерея
            SC: 0, // суперконденсатор (пока нет)
        },
        optimizationType: 1,
    },
    loading: false,
    items: null,
    total_price: null,
    params: null,
};

export const saveDraftCalculation = createAsyncThunk<
    void,
    void,
    AsyncThunkConfig
>("save_draft_configurator", async function (_, thunkAPI) {
    const state = thunkAPI.getState();

    const configuration = state.configuratorReducer.configuration;

    const consumptionType = configuration.consumptionType;

    const getConsumption = () => {
        if (consumptionType == 1) {
            return [configuration.consumptionConst];
        } else if (consumptionType == 2) {
            return configuration.consumptionSeasons;
        } else if (consumptionType == 3) {
            return configuration.consumptionMonth;
        }
    };

    await api.post("/drafts/", {
        coords: configuration.coords,
        consumption_type: consumptionType,
        consumption_value: getConsumption(),
        energy_sources: {
            ...configuration.enSource,
            ...configuration.enDSource,
        },
        energy_storages: configuration.enStorage,
        optimization_target: configuration.optimizationType,
    });
});

export const deleteDraftConfigurator = createAsyncThunk<
    T_Configuration[],
    string,
    AsyncThunkConfig
>("delete_configurator_draft", async function (draft_id) {
    const response = await api.delete(`/drafts/${draft_id}`);

    return response.data;
});

export const fetchConfiguratorDrafts = createAsyncThunk<
    T_Configuration[],
    void,
    AsyncThunkConfig
>("fetch_configurator_drafts", async function (_, thunkAPI) {
    const state = thunkAPI.getState();

    const response = (await api.get(
        "/drafts/",
        state.configuration
    )) as AxiosResponse<T_Configuration[]>;

    return response.data;
});

export const calculateFetch = createAsyncThunk<
    T_ConfigurationResult,
    void,
    AsyncThunkConfig
>("calculate_configurator", async function (_, thunkAPI) {
    thunkAPI.dispatch(updateLoading(true));

    const state = thunkAPI.getState();

    const configuration = state.configuratorReducer.configuration;

    const getConsumption = () => {
        if (configuration.consumptionType == 1) {
            return {
                name: "Постоянное потребление",
                value: configuration.consumptionConst,
                type: "Классика",
            };
        } else if (configuration.consumptionType == 2) {
            return {
                name: "Зимнее и летнее потребление",
                value: configuration.consumptionSeasons,
                type: "Классика",
            };
        } else if (configuration.consumptionType == 3) {
            return {
                name: "Потребление по месяцам",
                value: configuration.consumptionMonth,
                type: "Классика",
            };
        }
    };

    const response = await api.post("/configurator/", {
        coords: configuration.coords,
        load: getConsumption(),
        EnSource: configuration.enSource,
        EnDSource: configuration.enDSource,
        EnStorage: configuration.enStorage,
    });

    return response.data;
});

const configuratorSlice = createSlice({
    name: "configurator",
    initialState: initialState,
    reducers: {
        updateCoords: (state, action) => {
            state.configuration.coords = action.payload;
        },
        updateConsumptionType: (state: IState, action) => {
            state.configuration.consumptionType = action.payload;
        },
        updateConsumptionConst: (state: IState, action) => {
            state.configuration.consumptionConst = action.payload;
        },
        updateConsumptionSeasons: (state: IState, action) => {
            state.configuration.consumptionSeasons = action.payload;
        },
        updateConsumptionMonth: (state: IState, action) => {
            state.configuration.consumptionMonth = action.payload;
        },
        updateEnSource: (state: IState, action) => {
            state.configuration.enSource = action.payload;
        },
        updateEnDSource: (state: IState, action) => {
            state.configuration.enDSource = action.payload;
        },
        updateEnStorage: (state: IState, action) => {
            state.configuration.enStorage = action.payload;
        },
        updateLoading: (state: IState, action) => {
            state.loading = action.payload;
        },
        resetConfigurator: () => {
            return initialState;
        },
        openDraftConfigurator: (state: IState, action) => {
            state.configuration.coords = action.payload.coords;

            state.configuration.consumptionType =
                action.payload.consumption_type;

            if (action.payload.consumption_type == 1) {
                state.configuration.consumptionConst =
                    action.payload.consumption_value[0];
            } else if (action.payload.consumption_type == 2) {
                state.configuration.consumptionSeasons =
                    action.payload.consumption_value;
            } else if (action.payload.consumption_type == 3) {
                state.configuration.consumptionMonth =
                    action.payload.consumption_value;
            }

            state.configuration.enSource = {
                solar: action.payload.energy_sources.solar,
                wind: action.payload.energy_sources.wind,
                TEG: action.payload.energy_sources.TEG,
            };

            state.configuration.enDSource = {
                DGS: action.payload.energy_sources.DGS,
                FC: action.payload.energy_sources.FC,
            };

            state.configuration.enStorage = {
                AB: action.payload.energy_storages.AB,
                SC: action.payload.energy_storages.SC,
            };

            state.configuration.optimizationType =
                action.payload.optimization_target;
        },
        updateOptimizationType: (state: IState, action) => {
            state.configuration.optimizationType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            calculateFetch.fulfilled,
            (state: IState, action: PayloadAction<T_ConfigurationResult>) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
                state.params = action.payload.params;
            }
        );
        builder.addCase(calculateFetch.rejected, (state: IState) => {
            state.loading = false;
            state.items = [];
        });
        builder.addCase(
            fetchConfiguratorDrafts.fulfilled,
            (state: IState, action: PayloadAction<T_Configuration[]>) => {
                state.drafts = action.payload;
            }
        );
        builder.addCase(
            deleteDraftConfigurator.fulfilled,
            (state: IState, action: PayloadAction<T_Configuration[]>) => {
                state.drafts = action.payload;
            }
        );
    },
});

export const {
    updateCoords,
    updateConsumptionType,
    updateConsumptionConst,
    updateConsumptionSeasons,
    updateConsumptionMonth,
    updateEnSource,
    updateEnDSource,
    updateEnStorage,
    updateOptimizationType,
    updateLoading,
    resetConfigurator,
    openDraftConfigurator,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
