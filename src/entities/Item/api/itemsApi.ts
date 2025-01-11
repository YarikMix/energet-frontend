import { T_Item } from "entities/Item/model/types/Item.ts";
import { useQuery } from "react-query";
import { api } from "src/app/api.ts";

export const useItemsList = ({ searchParams }) =>
    useQuery(
        ["ItemsList", ...searchParams],
        (): Promise<T_Item[]> =>
            api
                .get(`/items?name=${searchParams[0]}`)
                .then((response) => response.data)
    );
