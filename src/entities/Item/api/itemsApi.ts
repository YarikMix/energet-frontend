import { T_ItemOption, T_Item } from "entities/Item/model/types/Item.ts";
import { useQuery } from "react-query";
import { api } from "src/app/api.ts";
import { ITEMS_PAGE_SIZE } from "src/app/consts.ts";

interface IProps {
    searchParams: [string, number[], number[]];
    page: number;
}

interface ISeachItemsQueryParamsDict {
    name?: string;
    types?: string;
    producers?: string;
    offset?: number;
}

type I_ItemsListResponse = {
    items: T_Item[];
    total_pages: number;
};

export const useItemsList = ({ searchParams, page }: IProps) =>
    useQuery(
        ["ItemsList", ...searchParams, page],
        (): Promise<I_ItemsListResponse> => {
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

            if (page) {
                params.offset = (page - 1) * ITEMS_PAGE_SIZE;
            }

            return api
                .get(`/items`, { params })
                .then((response) => response.data);
        },
        { keepPreviousData: true }
    );

export const useItemsTypesList = () =>
    useQuery(
        ["ItemsTypes"],
        (): Promise<T_ItemOption[]> =>
            api.get(`/items/types`).then((response) => response.data)
    );

export const useItemsProducersList = () =>
    useQuery(
        ["ItemsProducers"],
        (): Promise<T_ItemOption[]> =>
            api.get(`/items/producers`).then((response) => response.data)
    );

export const useItem = (id: string) =>
    useQuery(
        ["Item"],
        (): Promise<T_Item> =>
            api.get(`/items/` + id).then((response) => response.data)
    );
