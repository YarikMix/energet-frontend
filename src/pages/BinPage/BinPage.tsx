import {
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Typography,
} from "@mui/material";
import { useDrftOrder } from "entities/Order/api/orderApi.ts";

export const BinPage = () => {
    const { data: order, isLoading } = useDrftOrder();

    if (isLoading || !order) {
        return <div>Loading</div>;
    }

    console.log(order);

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
                    138 товаров
                </span>
            </Box>
            <Box>
                <Box>
                    <FormControlLabel
                        label="Выбрать все"
                        control={<Checkbox />}
                    />
                </Box>
                <Box>
                    <Box></Box>
                    <Box></Box>
                </Box>
            </Box>
        </Container>
    );
};
