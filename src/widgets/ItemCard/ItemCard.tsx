import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { T_Item } from "entities/Item/model/types/Item.ts";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import * as React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { handleUpdateItemCount } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { useSelector } from "react-redux";

interface IProps {
    item: T_Item;
    showAddToDraftOrderBtn?: boolean;
    isBinPage?: boolean;
}

function useDebounce(cb, delay) {
    const [debounceValue, setDebounceValue] = useState(cb);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(cb);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [cb, delay]);
    return debounceValue;
}

const ItemCard = ({
    item,
    showAddToDraftOrderBtn = false,
    isBinPage = false,
}: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [error, setError] = useState(false);

    const [count, setCount] = useState(item?.count);
    const debouncedCount = useDebounce(count, 500);

    const order = useSelector((state) => state.orderReducer.order);

    const handleOpenItemDetailsPage = () => {
        navigate("/items/" + item.id);
    };

    const addToDraftOrder = () => {
        // TODO
    };

    const handleAddItemToFavourites = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("handleAddItemToFavourites");
        // TODO
    };

    const handleUpdateCount = (e) => {
        const { value } = e.target;

        if (value <= 0 || value > 100) {
            setError(true);
        } else {
            setError(false);
        }

        setCount(value);
    };

    const handleIncreaseCount = () => {
        if (count < 99) {
            setCount((count) => count + 1);
        }
    };

    const handleDecreaseCount = () => {
        if (count > 1) {
            setCount((count) => count - 1);
        }
    };

    useEffect(() => {
        if (
            isBinPage &&
            !error &&
            order.items.find((i) => i.id == item.id).count != debouncedCount
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
        setCount(item.count);
    }, [item]);

    if (isBinPage) {
        const variantBackgroundColor = {
            filled: "primary.main",
        };

        const variantColor = {
            filled: "white",
        };

        function MyIconButton({ variant, ...other }) {
            return (
                <IconButton
                    sx={{
                        backgroundColor: variantBackgroundColor[variant],
                        color: variantColor[variant],
                        "&:hover": {
                            backgroundColor: variantBackgroundColor[variant],
                        },
                    }}
                    {...other}
                />
            );
        }

        return (
            <Card sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    sx={{ width: "260px" }}
                    image={item.image as string}
                    alt=""
                />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
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
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                            {item.price} ₽
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            startIcon={<FavoriteBorderIcon />}
                            onClick={handleAddItemToFavourites}
                        >
                            В избранное
                        </Button>

                        <Box display="flex" alignItems="center" gap="10px">
                            <MyIconButton
                                variant="filled"
                                onClick={handleDecreaseCount}
                            >
                                <RemoveIcon />
                            </MyIconButton>
                            <TextField
                                label="Количество"
                                variant="outlined"
                                sx={{ width: "125px" }}
                                value={count}
                                onChange={handleUpdateCount}
                                type="number"
                                error={error}
                            />
                            <MyIconButton
                                variant="filled"
                                onClick={handleIncreaseCount}
                            >
                                <AddIcon />
                            </MyIconButton>
                        </Box>
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
            sx={{ maxWidth: 345, position: "relative" }}
            onClick={handleOpenItemDetailsPage}
        >
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onClick={handleAddItemToFavourites}
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 2,
                    color: "#fff",
                }}
            />
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.image as string}
                    alt=""
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
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
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
                    {showAddToDraftOrderBtn && (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={addToDraftOrder}
                                fullWidth
                            >
                                Добавить в корзину
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
