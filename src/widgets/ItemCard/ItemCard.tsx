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

interface IProps {
    data: T_Item;
    showAddToDraftOrderBtn?: boolean;
    isBinPage?: boolean;
}

const ItemCard = ({
    data,
    showAddToDraftOrderBtn = false,
    isBinPage = false,
}: IProps) => {
    const navigate = useNavigate();

    const handleOpenItemDetailsPage = () => {
        navigate("/items/" + data.id);
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
                    image={data.image as string}
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
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                            {data.price} ₽
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
                            <MyIconButton variant="filled">
                                <RemoveIcon />
                            </MyIconButton>
                            <TextField
                                label="Количество"
                                variant="outlined"
                                sx={{ width: "125px" }}
                            />
                            <MyIconButton variant="filled">
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
                    image={data.image as string}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
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
                            {data.price}₽
                        </Typography>
                    </Box>
                    <ItemProperty name="Тип" value={data.item_type.name} />
                    <ItemProperty
                        name="Производитель"
                        value={data.item_producer.name}
                    />
                    <ItemProperty name="Вес" value={data.weight + " кг"} />
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
