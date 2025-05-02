import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    addToFavourites,
    removeFromFavourites,
    useItem,
} from "entities/Item/api/itemsApi.ts";
import { useSelector } from "react-redux";
import {
    getIsAuthenticated,
    getIsBuyer,
} from "entities/User/model/selectors/getUser.ts";
import * as React from "react";
import {
    addItemToDraftOrder,
    deleteItemFromOrder,
} from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { isAddedToDraftOrder } from "entities/Item/lib/isAddedToDraftOrder.ts";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import useTabs from "shared/utils/useTabs.tsx";

export const ItemPage = () => {
    const { id } = useParams<{ id: number }>();

    const isAuthenticated = useSelector(getIsAuthenticated);
    const dispatch = useAppDispatch();
    const isBuyer = useSelector(getIsBuyer);

    const order = useSelector((state) => state.orderReducer.order);

    const { data: item, isLoading, refetch } = useItem(id as number);

    const tabs = ["Особенности", "Характеристики", "Документация"];

    const { currentTab, TabsComponent } = useTabs(tabs);

    const handleAddToDraftOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addItemToDraftOrder(id as number));
    };

    const handleDeleteFromOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteItemFromOrder(id as number));
    };

    if (isLoading || !item) {
        return <div>isLoading</div>;
    }

    const handleToggleItemFavourite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(
            item.favourite
                ? removeFromFavourites(item.id)
                : addToFavourites(item.id)
        );
        refetch();
    };

    const ItemProperty = ({ name, value }) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {name}
                </Typography>
                <Typography>{value}</Typography>
            </Box>
        );
    };

    return (
        <Container>
            <Box fullWidth sx={{ display: "flex", gap: "58px", mb: 3 }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="400"
                        image={`/images/${item.image}`}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                    }}
                >
                    <Box mb={2}>
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography
                            variant="h5"
                            sx={{ color: "#319CFF", my: 3 }}
                        >
                            {item.price} ₽
                        </Typography>
                        <ItemProperty name="Тип" value={item.item_type.name} />
                        <ItemProperty
                            name="Производитель"
                            value={item.item_producer.name}
                        />
                        <ItemProperty name="Вес" value={item.weight + " кг"} />
                    </Box>
                    {isAuthenticated && isBuyer && (
                        <Box fullWidth sx={{ display: "flex", gap: "14px" }}>
                            <Button
                                variant={
                                    (isAddedToDraftOrder(order, id as number)
                                        ? "outlined"
                                        : "contained") as
                                        | "outlined"
                                        | "contained"
                                }
                                sx={{ display: "flex", flex: 1 }}
                                onClick={(e) =>
                                    isAddedToDraftOrder(order, id as number)
                                        ? handleDeleteFromOrder(e)
                                        : handleAddToDraftOrder(e)
                                }
                            >
                                {isAddedToDraftOrder(order, id as number)
                                    ? "Из корзины"
                                    : "В корзину"}
                            </Button>

                            <Button
                                variant={
                                    (item.favourite
                                        ? "outlined"
                                        : "contained") as
                                        | "outlined"
                                        | "contained"
                                }
                                sx={{ display: "flex", flex: 1 }}
                                onClick={handleToggleItemFavourite}
                            >
                                {item.favourite
                                    ? "Из избранного"
                                    : "В избранное"}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box>
                {TabsComponent({})}
                <Box sx={{ pt: 3 }}>
                    <TabPanel currentTab={currentTab} index={0}>
                        TODO
                    </TabPanel>
                    <TabPanel currentTab={currentTab} index={1}>
                        <Box sx={{ width: "400px" }}>
                            <ItemProperty
                                name="Тип"
                                value={item.item_type.name}
                            />
                            <ItemProperty
                                name="Производитель"
                                value={item.item_producer.name}
                            />
                            <ItemProperty
                                name="Вес"
                                value={item.weight + " кг"}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel currentTab={currentTab} index={2}>
                        TODO
                    </TabPanel>
                </Box>
            </Box>
        </Container>
    );
};
