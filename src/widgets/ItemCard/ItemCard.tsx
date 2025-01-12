import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import mock from "assets/mock.png";
import { T_Item } from "entities/Item/model/types/Item.ts";

const ItemCard = (data: T_Item) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={mock as string}
                    alt="green iguana"
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                            Тип
                        </Typography>
                        <Typography>{data.item_type.name}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                            Производитель
                        </Typography>
                        <Typography>{data.item_producer.name}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
