import { useQuery } from "react-query";
import { api } from "src/app/api.ts";
import { T_Order } from "entities/Order/model/types/Order.ts";

export const useDraftOrder = () =>
    useQuery(
        ["DraftOrder"],
        (): Promise<T_Order> =>
            api.get(`/orders/draft`).then((response) => response.data)
    );

export const useUpdateItemCount = ({ order_id, item_id, count }) =>
    useQuery(
        ["UpdateItemCount", item_id],
        (): Promise<T_Order> =>
            api
                .put(`/orders/${order_id}/update_item/${item_id}`, { count })
                .then((response) => response.data),
        { refetchOnMount: false }
    );
