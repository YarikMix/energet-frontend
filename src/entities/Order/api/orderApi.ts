import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { T_Order } from "entities/Order/model/types/Order.ts";
import { useQuery } from "react-query";
import { api } from "src/app/api.ts";

export const useOrder = (order_id) =>
    useQuery(
        ["Order", order_id],
        (): Promise<T_Order> =>
            api.get(`/orders/${order_id}`).then((response) => response.data),
        {
            enabled: order_id != null,
        }
    );

interface ISeachItemsQueryParamsDict {
    status?: string;
}

export const useOrdersList = (status) =>
    useQuery(["OrdersList"], (): Promise<T_Order[]> => {
        const params: ISeachItemsQueryParamsDict = {};

        if (status > 0) {
            params.status = status;
        }

        return api
            .get(`/orders/`, { params })
            .then((response) => response.data);
    });

export const updateOrderStatus = createAsyncThunk<
    void,
    object,
    AsyncThunkConfig
>("update_order_status", async function ({ order_id, status }) {
    const response = await api.put(`/orders/${order_id}/`, { status });

    return response.data;
});
