import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/src/createAsyncThunk.ts";
import { T_Item, T_ItemOption } from "entities/Item/model/types/Item.ts";
import { useQuery } from "react-query";
import { getFormDataFromObject } from "shared/utils/getFormDataFromObject.ts";
import { api } from "src/app/api.ts";
import { ITEMS_PAGE_SIZE } from "src/app/consts.ts";

interface IProps {
    searchParams: [string, number[], number[]];
    page?: number;
}

interface ISeachItemsQueryParamsDict {
    name?: string;
    types?: string;
    producers?: string;
    offset?: number;
    favourites?: boolean;
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

export const useFavouriteList = ({ searchParams, page }: IProps) =>
    useQuery(
        ["FavouriteItemsList", ...searchParams, page],
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
                .get(`/favourites`, {
                    params,
                })
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

export const useItem = (id: number) =>
    useQuery(
        ["Item"],
        (): Promise<T_Item> =>
            api.get(`/items/` + id).then((response) => response.data)
    );

export const addToFavourites = createAsyncThunk<void, number, AsyncThunkConfig>(
    "add_item_to_favourites",
    async function (item_id) {
        const response = await api.post(`/items/${item_id}/add_to_favourites/`);
        return response.data;
    }
);

export const removeFromFavourites = createAsyncThunk<
    void,
    number,
    AsyncThunkConfig
>("delete_item_from_favourites", async function (item_id) {
    const response = await api.delete(
        `/items/${item_id}/delete_from_favourites/`
    );

    return response.data;
});

export const updateItem = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_item",
    async function ({ id, data }) {
        const response = await api.put(`/items/${id}/`, data);

        return response.data;
    }
);

export const deleteItem = createAsyncThunk<void, number, AsyncThunkConfig>(
    "delete_item",
    async function (id) {
        const response = await api.delete(`/items/${id}/`);

        return response.data;
    }
);

export const updateItemImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_item_image",
    async function ({ item_id, image }) {
        const form_data = new FormData();
        form_data.append("image", image, image.name);

        const response = await api.put(
            `/items/${item_id}/update_image/`,
            form_data
        );

        return response.data;
    }
);

export const createItem = createAsyncThunk<void, object, AsyncThunkConfig>(
    "create_item",
    async function (data) {
        const form_data = getFormDataFromObject(data);

        const response = await api.post(`/items/`, form_data);

        return response.data;
    }
);
