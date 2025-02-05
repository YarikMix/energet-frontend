import { useQuery } from "react-query";
import { api } from "src/app/api.ts";
import { T_Order } from "entities/Order/model/types/Order.ts";

export const useOrder = (order_id) =>
    useQuery(
        ["Order", order_id],
        (): Promise<T_Order> =>
            api.get(`/orders/${order_id}`).then((response) => response.data),
        {
            enabled: order_id != null,
        }
    );

export const useOrdersList = () =>
    useQuery(
        ["OrdersList"],
        (): Promise<T_Order[]> =>
            api.get(`/orders/`).then((response) => response.data)
    );
