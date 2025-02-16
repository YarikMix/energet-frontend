import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { api } from "src/app/api.ts";
import { T_Item } from "entities/Item/model/types/Item.ts";

export type T_ConfigurationResultItem = {
    item: T_Item;
    total_count: number;
    total_price: number;
};

export type T_ConfigurationResult = {
    items: T_ConfigurationResultItem[];
    total_price: number;
};

interface IState {
    coords: [number, number];
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
    power: number;
    power1: number;
    power2: number;
    loading: boolean;
    items: T_ConfigurationResultItem[] | null;
    total_price: number | null;
}

const initialState: IState = {
    coords: [55.75, 37.57],
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
        AB: 0, // аккамуляторная батерея
        SC: 0, // суперконденсатор (пока нет)
    },
    power: 100,
    power1: 100,
    power2: 100,
    loading: false,
    items: null,
    total_price: null,
};

export const calculateFetch = createAsyncThunk<
    T_ConfigurationResult,
    void,
    AsyncThunkConfig
>("calculate_configurator", async function (_, thunkAPI) {
    thunkAPI.dispatch(updateLoading(true));

    const state = thunkAPI.getState();
    const response = await api.post("/configurator/", {
        coords: state.configuratorReducer.coords,
        load: {
            name: "Зимнее и летнее потребление",
            value: [
                state.configuratorReducer.power1,
                state.configuratorReducer.power2,
            ],
        },
        // load: {
        //     name: "Постоянное потребление",
        //     value: state.configuratorReducer.power,
        // },
        ElCost: 0, // 0 если не выбран шаблон потребления
        EnSource: state.configuratorReducer.enSource,
        EnDSource: state.configuratorReducer.enDSource,
        EnStorage: state.configuratorReducer.enStorage,
        // OptTarget: {
        //     target: "Минимизация стоимости электроэнергии",
        //     value: 0.3,
        //     d_target: 0.02,
        // },
        OptTarget: {
            target: "Надежность энергоснабжения (минимизация LCOE)",
            value: 0.3,
            d_target: 0.02,
        },
        Additions: {
            pitch: 15,
            shading: [],
            shadinggg: [
                [-1.047, -0.52, 5, 6],
                [0.52, 1.047, 7, 3],
                [0.52, 1.047, 7, 3],
                [-1.047, -0.52, 5, 6],
            ],
            WTorient: 22,
            WTheight: 10,
        },
        Options: {
            N_steps: 10,
            step: 0.2,
        },
    });

    return response.data;
});

const configuratorSlice = createSlice({
    name: "configurator",
    initialState: initialState,
    reducers: {
        updateCoords: (state, action) => {
            console.log("updateCoords");
            console.log(state.coords);
            state.coords = action.payload;
        },
        updatePower: (state: IState, action) => {
            state.power = action.payload;
        },
        updatePower1: (state: IState, action) => {
            state.power1 = action.payload;
        },
        updatePower2: (state: IState, action) => {
            state.power2 = action.payload;
        },
        updateEnSource: (state: IState, action) => {
            state.enSource = action.payload;
        },
        updateEnDSource: (state: IState, action) => {
            state.enDSource = action.payload;
        },
        updateEnStorage: (state: IState, action) => {
            state.enStorage = action.payload;
        },
        updateLoading: (state: IState, action) => {
            state.loading = action.payload;
        },
        resetConfigurator: (state: IState) => {
            state.items = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            calculateFetch.fulfilled,
            (state: IState, action: PayloadAction<T_ConfigurationResult>) => {
                console.log(action.payload);

                state.loading = false;
                state.items = action.payload.items;
                state.total_price = action.payload.total_price;
            }
        );
        builder.addCase(calculateFetch.rejected, () => {
            console.log("Что-то пошло не так ;(");
        });
    },
});

export const {
    updateCoords,
    updatePower,
    updatePower1,
    updatePower2,
    updateEnSource,
    updateEnDSource,
    updateEnStorage,
    updateLoading,
    resetConfigurator,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
