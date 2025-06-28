// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { T_Item } from "entities/Item/model/types/Item.ts";
import {
    T_Order,
    T_UpdateItemCount,
} from "entities/Order/model/types/Order.ts";
import { api } from "src/app/api.ts";

type T_DraftOrderState = {
    order?: T_Order | null;
    items: number[];
};

const initialState: T_DraftOrderState = {
    order: null,
    items: [],
};

export const handleFetchDraftOrder = createAsyncThunk<
    T_Order,
    void,
    AsyncThunkConfig
>("draft_order", async function () {
    const response = await api.get("/orders/draft/");
    return response.data;
});

export const handleUpdateItemCount = createAsyncThunk<
    T_Order,
    T_UpdateItemCount,
    AsyncThunkConfig
>("update_item_count", async function ({ itemId, count }, thunkAPI) {
    const state = thunkAPI.getState();

    const response = await api.put(
        `/orders/${state.orderReducer.order.id}/update_item/${itemId}`,
        { count }
    );

    return response.data;
});

export const deleteItemFromOrder = createAsyncThunk<
    T_Order,
    number,
    AsyncThunkConfig
>("delete_item_from_order", async function (itemId, thunkAPI) {
    const state = thunkAPI.getState();

    const response = await api.delete(
        `/orders/${state.orderReducer.order.id}/delete_item/${itemId}`
    );

    thunkAPI.dispatch(unselectItem(itemId));

    return response.data;
});

export const addItemToDraftOrder = createAsyncThunk<
    T_Order,
    number,
    AsyncThunkConfig
>("add_item_to_order", async function (itemId) {
    const response = await api.post(
        `/orders/add_item_to_draft_order/${itemId}/`
    );

    return response.data;
});

export const addItemsToDraftOrder = createAsyncThunk<
    T_Order,
    T_Item[],
    AsyncThunkConfig
>("add_item_to_order", async function (items) {
    const response = await api.post(`/orders/add_items_to_draft_order/`, items);

    return response.data;
});

export const deleteDraftOrder = createAsyncThunk<void, void, AsyncThunkConfig>(
    "delete_draft_order",
    async function () {
        await api.delete("/orders/draft/");
    }
);

export const deleteItemsFromDraftOrder = createAsyncThunk<
    T_Order,
    void,
    AsyncThunkConfig
>("delete_items_from_draft_order", async function (_, thunkAPI) {
    const state = thunkAPI.getState();

    const response = await api.post(
        `/orders/${state.orderReducer.order.id}/delete_items/`,
        { items: state.orderReducer.items }
    );

    return response.data;
});

export const formDraftOrder = createAsyncThunk<void, void, AsyncThunkConfig>(
    "update_draft_order_status_user",
    async function (_, thunkAPI) {
        const state = thunkAPI.getState();

        await api.put(
            `/orders/${state.orderReducer.order.id}/update_status_user/`
        );
    }
);

const draftOrderSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        toggleSelectItem: (state, action) => {
            if (state.items.includes(action.payload)) {
                state.items = state.items.filter(
                    (item) => item != action.payload
                );
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        unselectItem: (state, action) => {
            state.items = state.items.filter((item) => item != action.payload);
        },
        selectAllItems: (state) => {
            state.items = state.order.items.map((item) => item.id);
        },
        unselectAllItems: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            handleFetchDraftOrder.fulfilled,
            (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
                state.order = action.payload;
            }
        );
        builder.addCase(
            deleteItemFromOrder.fulfilled,
            (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
                state.order = action.payload;
            }
        );
        builder.addCase(
            addItemToDraftOrder.fulfilled,
            (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
                state.order = action.payload;
            }
        );
        builder.addCase(
            deleteDraftOrder.fulfilled,
            (state: T_DraftOrderState) => {
                state.order = null;
                state.items = [];
            }
        );
        builder.addCase(
            deleteItemsFromDraftOrder.fulfilled,
            (state: T_DraftOrderState, action: PayloadAction<T_Order>) => {
                state.order = action.payload;
                state.items = [];
            }
        );
        builder.addCase(
            formDraftOrder.fulfilled,
            (state: T_DraftOrderState) => {
                state.order = null;
                state.items = [];
            }
        );
    },
});

export const {
    toggleSelectItem,
    unselectItem,
    selectAllItems,
    unselectAllItems,
} = draftOrderSlice.actions;

export default draftOrderSlice.reducer;
