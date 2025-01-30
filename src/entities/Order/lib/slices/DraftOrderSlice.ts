import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { api } from "src/app/api.ts";
import { T_Order } from "entities/Order/model/types/Order.ts";

type T_DraftOrderState = {
    order?: T_Order | null;
    items_count: number;
};

const initialState: T_DraftOrderState = {
    order: null,
    items_count: 0,
};

export const handleFetchDraftOrder = createAsyncThunk<
    T_Order,
    void,
    AsyncThunkConfig
>("draft_order", async function () {
    const response = await api.get("/orders/draft/");
    console.log("handleFetchDraftOrder");
    console.log(response.data);
    return response.data;
});

type test = {
    itemId: number;
    count: number;
};

export const handleUpdateItemCount = createAsyncThunk<
    T_Order,
    test,
    AsyncThunkConfig
>("update_item_count", async function ({ itemId, count }, thunkAPI) {
    console.log("handleUpdateItemCount");
    console.log("count", count);
    console.log(1);
    const state = thunkAPI.getState();
    console.log(2);

    const response = await api.put(
        `/orders/${state.orderReducer.order.id}/update_item/${itemId}`,
        { count }
    );

    console.log(3);
    console.log(response.data);
    return response.data;
});

const draftOrderSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateItemsCount: (state, action: PayloadAction<number>) => {
            state.items_count = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            handleFetchDraftOrder.fulfilled,
            (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
                state.order = action.payload;
                state.items_count = action.payload.items.length;
            }
        );
        // builder.addCase(
        //     handleUpdateItemCount.fulfilled,
        //     (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
        //         state.order = action.payload;
        //         // state.items_count = action.payload.items.length;
        //     }
        // );
    },
});

export const { updateItemsCount } = draftOrderSlice.actions;

export default draftOrderSlice.reducer;
