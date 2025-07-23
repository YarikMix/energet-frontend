// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Grid2,
    Typography,
} from "@mui/material";
import { calculateTotalPrice } from "entities/Order/lib/calcTotalPrice.ts";
import { formatItemsCount } from "entities/Order/lib/formatItemsCount.ts";
import {
    deleteDraftOrder,
    deleteItemsFromDraftOrder,
    formDraftOrder,
    handleFetchDraftOrder,
    selectAllItems,
    unselectAllItems,
} from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";

const isSelectedAll = (items) => {
    return items.length == order?.items?.length;
};

export const BinPage = () => {
    const dispatch = useAppDispatch();

    const { order, items } = useSelector((state) => state.orderReducer);

    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => {
        dispatch(handleFetchDraftOrder());
    }, []);

    useEffect(() => {
        setSelectedAll(isSelectedAll(items));
    }, [items]);

    const isSelectedAny = () => {
        return items.length > 0;
    };

    const handleUnselectAll = () => {
        dispatch(unselectAllItems());
    };

    const handleSelectAll = () => {
        dispatch(selectAllItems());
    };

    const handleDeleteDraftOrder = () => {
        dispatch(deleteDraftOrder());
    };

    const handleDeleteItemsFromDraftOrder = () => {
        dispatch(deleteItemsFromDraftOrder());
    };

    const handleFormDraftOrder = () => {
        dispatch(formDraftOrder());
    };

    if (!order || !order.items.length) {
        return (
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <Typography variant="h4" color={"text.secondary"}>
                    Корзина пуста
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "25px",
                    mb: 3,
                }}
            >
                <Typography variant="h4">Корзина</Typography>
                <span
                    style={{
                        marginBottom: "10px",
                        color: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {formatItemsCount(order)}
                </span>
            </Box>
            <Box>
                <Box mb={3} display="flex" alignItems="center" gap={2}>
                    <FormControlLabel
                        label={selectedAll ? "Снять выбор" : "Выбрать все"}
                        unselectable
                        control={
                            <Checkbox
                                checked={selectedAll}
                                onChange={() =>
                                    selectedAll
                                        ? handleUnselectAll()
                                        : handleSelectAll()
                                }
                            />
                        }
                    />
                    {selectedAll && (
                        <Typography
                            color="error.main"
                            sx={{ cursor: "pointer" }}
                            onClick={handleDeleteDraftOrder}
                        >
                            Удалить все
                        </Typography>
                    )}
                    {!selectedAll && isSelectedAny() && (
                        <Typography
                            color="error.main"
                            sx={{ cursor: "pointer" }}
                            onClick={handleDeleteItemsFromDraftOrder}
                        >
                            Удалить
                        </Typography>
                    )}
                </Box>
                <Box display="flex" gap="25px" alignItems="flex-start">
                    <Box sx={{ display: "flex", width: "calc(100% - 400px)" }}>
                        <Grid2
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 1, sm: 1, md: 1 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            {order.items.map((item) => (
                                <Grid2
                                    item
                                    key={item.id}
                                    size={{ xs: 2, sm: 3, md: 3 }}
                                >
                                    <ItemCard item={item} isBinPage={true} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                    <Box
                        sx={{ width: "400px", flexShrink: 1, display: "flex" }}
                    >
                        <Card
                            sx={{
                                width: "100%",
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                gap: 5,
                            }}
                        >
                            <Typography variant="h4">Сумма заказа</Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="text.secondary">
                                    {formatItemsCount(order)}
                                </Typography>
                                <Typography color="text.secondary">
                                    {calculateTotalPrice(order)} ₽
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleFormDraftOrder}
                            >
                                Оформить
                            </Button>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
