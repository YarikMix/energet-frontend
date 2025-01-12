import { ItemOption, T_Item } from "entities/Item/model/types/Item.ts";
import { useQuery } from "react-query";
import { api } from "src/app/api.ts";

interface IProps {
    searchParams: [string, number[], number[]];
}

interface ISeachItemsQueryParamsDict {
    name?: string;
    types?: string;
    producers?: string;
}

export const useItemsList = ({ searchParams }: IProps) =>
    useQuery(
        ["ItemsList", ...searchParams],
        (): Promise<T_Item[]> => {
            const params: ISeachItemsQueryParamsDict = {};

            if (searchParams[0]) {
                params.name = searchParams[0];
            }

            if (searchParams[1].length > 0) {
                params.types = searchParams[1].join(",");
            }

            if (searchParams[2].length > 0) {
                params.producers = searchParams[2].join(",");
            }

            return api
                .get(`/items`, {
                    params: params,
                })
                .then((response) => response.data);
        },
        { keepPreviousData: true }
    );

export const useItemsTypesList = () =>
    useQuery(
        ["ItemsTypes"],
        (): Promise<ItemOption[]> =>
            api.get(`/items/types`).then((response) => response.data)
    );

export const useItemsProducersList = () =>
    useQuery(
        ["ItemsProducers"],
        (): Promise<ItemOption[]> =>
            api.get(`/items/producers`).then((response) => response.data)
    );
