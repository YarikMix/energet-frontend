import { useQuery } from "react-query";
import { api } from "src/app/api.ts";
import { T_Order } from "entities/Order/model/types/Order.ts";

export const useDrftOrder = () =>
    useQuery(
        ["DraftOrder"],
        (): Promise<T_Order> =>
            api.get(`/orders/draft`).then((response) => response.data)
    );
