import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { api } from "src/app/api.ts";

const initialState = {
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
    loading: false,
};

export const calculateFetch = createAsyncThunk<void, void, AsyncThunkConfig>(
    "calculate_configurator",
    async function (_, thunkAPI) {
        thunkAPI.dispatch(updateLoading(true));

        const state = thunkAPI.getState();
        const response = await api.post("/optim/", {
            coords: state.configuratorReducer.coords,
            // load: {
            //     name: "Зимнее и летнее потребление",
            //     value: [94646, 122626],
            // },
            load: {
                name: "Постоянное потребление",
                value: state.configuratorReducer.power,
            },
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
    }
);

const configuratorSlice = createSlice({
    name: "configurator",
    initialState: initialState,
    reducers: {
        updateCoords: (state, action) => {
            console.log("updateCoords");
            console.log(state.coords);
            state.coords = action.payload;
        },
        updatePower: (state, action) => {
            state.power = action.payload;
        },
        updateEnSource: (state, action) => {
            state.enSource = action.payload;
        },
        updateEnDSource: (state, action) => {
            state.enDSource = action.payload;
        },
        updateEnStorage: (state, action) => {
            state.enStorage = action.payload;
        },
        updateLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(calculateFetch.fulfilled, (state, action) => {
            // state.order = action.payload;

            console.log(action.payload);

            state.loading = false;
        });
        builder.addCase(calculateFetch.rejected, () => {
            console.log("Что-то пошло не так ;(");
        });
    },
});

export const {
    updateCoords,
    updatePower,
    updateEnSource,
    updateEnDSource,
    updateEnStorage,
    updateLoading,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
