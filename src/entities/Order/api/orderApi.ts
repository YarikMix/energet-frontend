import { createAsyncThunk } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { T_Order } from "entities/Order/model/types/Order.ts";
import { api } from "src/app/api.ts";

export const useOrder = (order_id) =>
    useQuery({
        queryKey: ["Order", order_id],
        queryFn: (): Promise<T_Order> =>
            api.get(`/orders/${order_id}`).then((response) => response.data),
        enabled: order_id != null,
    });

interface ISeachItemsQueryParamsDict {
    status?: string;
}

export const useOrdersList = (status) =>
    useQuery({
        queryKey: ["OrdersList"],
        queryFn: (): Promise<T_Order[]> => {
            const params: ISeachItemsQueryParamsDict = {};

            if (status > 0) {
                params.status = status;
            }

            return api
                .get(`/orders/`, { params } as AxiosRequestConfig)
                .then((response) => response.data);
        },
    });

export const updateOrderStatus = createAsyncThunk<
    void,
    { order_id: number; status: number },
    AsyncThunkConfig
>("update_order_status", async function ({ order_id, status }) {
    const response = await api.put(`/orders/${order_id}/`, { status });

    return response.data;
});
