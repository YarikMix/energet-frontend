import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import { T_Item } from "entities/Item/model/types/Item.ts";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
    addItemToDraftOrder,
    deleteItemFromOrder,
    handleUpdateItemCount,
    toggleSelectItem,
    unselectItem,
} from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { useSelector } from "react-redux";
import { isAddedToDraftOrder } from "entities/Item/lib/isAddedToDraftOrder.ts";
import { InputCounter } from "shared/InputCounter/InputCounter.tsx";
import { useDebounce } from "use-debounce";
import {
    addToFavourites,
    removeFromFavourites,
} from "entities/Item/api/itemsApi.ts";
import {
    getIsAuthenticated,
    getIsBuyer,
} from "entities/User/model/selectors/getUser.ts";

interface IProps {
    item: T_Item;
    showAddToDraftOrderBtn?: boolean;
    isBinPage?: boolean;
    onToggleFavourite?: () => void;
}

const ItemCard = ({
    item,
    showAddToDraftOrderBtn = false,
    isBinPage = false,
    onToggleFavourite = () => {},
}: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [count, setCount] = useState(item?.count);
    const [debouncedCount] = useDebounce<number>(count as number, 500);
    const [error, setError] = useState(false);

    const { order, items } = useSelector((state) => state.orderReducer);

    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    const isAuthenticated = useSelector(getIsAuthenticated);
    const isBuyer = useSelector(getIsBuyer);

    const [isChecked, setIsChecked] = useState<boolean>(
        items?.includes(item.id)
    );

    const handleOpenItemDetailsPage = () => {
        navigate("/items/" + item.id);
    };

    const handleAddToDraftOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addItemToDraftOrder(item.id));
    };

    const handleToggleItemFavourite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(
            isFavourite
                ? removeFromFavourites(item.id)
                : addToFavourites(item.id)
        );
        setIsFavourite(!isFavourite);
        if (onToggleFavourite) {
            onToggleFavourite();
        }
    };

    const handleDeleteFromOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteItemFromOrder(item.id));
        dispatch(unselectItem(item.id));
    };

    const handleToggleSelect = () => {
        dispatch(toggleSelectItem(item.id));
    };

    useEffect(() => {
        if (
            isBinPage &&
            !error &&
            order.items.find((i) => i.id == item.id).count != debouncedCount
            // order.items.find((i) => i.id == item.id).count != 0
        ) {
            dispatch(
                handleUpdateItemCount({
                    itemId: item.id,
                    count: debouncedCount as number,
                })
            );
        }
    }, [debouncedCount]);

    useEffect(() => {
        setCount(item?.count);
        if (!item.favourite) {
            setIsFavourite(false);
        } else {
            setIsFavourite(item.favourite);
        }
    }, [item]);

    useEffect(() => {
        setIsChecked(items.includes(item.id));
    }, [items]);

    if (isBinPage) {
        return (
            <Card sx={{ display: "flex" }}>
                <Box width={260}>
                    <CardMedia
                        component="img"
                        sx={{ width: "100%", height: "100%" }}
                        image={`/images/${item.image}`}
                    />
                </Box>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: "1",
                        minWidth: "400px",
                    }}
                >
                    <Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {item.name}
                            </Typography>
                            <Checkbox
                                checked={isChecked}
                                onChange={handleToggleSelect}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </Box>
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                            {item.price} ₽
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={isFavourite}
                                onClick={handleToggleItemFavourite}
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{
                                    width: 56,
                                    height: 56,
                                }}
                            />
                            <IconButton
                                onClick={handleDeleteFromOrder}
                                sx={{ width: 56, height: 56 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <InputCounter
                            value={count as number}
                            setValue={setCount}
                            error={error}
                            setError={setError}
                            min={1}
                            max={100}
                        />
                    </Box>
                </CardContent>
            </Card>
        );
    }

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
        <Card
            sx={{ maxWidth: 345, position: "relative", height: "100%" }}
            onClick={handleOpenItemDetailsPage}
        >
            {isAuthenticated && isBuyer && (
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isFavourite}
                    onClick={handleToggleItemFavourite}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2,
                        color: "#fff",
                    }}
                />
            )}
            <CardActionArea disableRipple={true} sx={{ height: "100%" }}>
                <Box style={{ height: "100%" }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`/images/${item.image}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                Цена
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#319CFF",
                                    fontSize: 18,
                                }}
                            >
                                {item.price}₽
                            </Typography>
                        </Box>
                        <ItemProperty name="Тип" value={item.item_type.name} />
                        <ItemProperty
                            name="Производитель"
                            value={item.item_producer.name}
                        />
                        <ItemProperty name="Вес" value={item.weight + " кг"} />
                        <ItemProperty
                            name={
                                item.item_type.name == "Аккумулятор"
                                    ? "Ёмкость"
                                    : "Мощность"
                            }
                            value={item.power + " вт"}
                        />
                        {showAddToDraftOrderBtn && (
                            <Box>
                                {isAddedToDraftOrder(order, item.id) ? (
                                    <Button
                                        variant="outlined"
                                        onClick={handleDeleteFromOrder}
                                        fullWidth
                                    >
                                        Удалить из корзины
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleAddToDraftOrder}
                                        fullWidth
                                    >
                                        Добавить в корзину
                                    </Button>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
