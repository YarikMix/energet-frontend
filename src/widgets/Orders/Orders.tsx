import { Box, Button, Stack, Typography } from "@mui/material";
import { useOrder, useOrdersList } from "entities/Order/api/orderApi.ts";
import { formatDate } from "shared/utils/date.ts";
import { useState } from "react";
import { Order } from "src/widgets/Order/Order.tsx";
import { ORDER_STATUSES } from "src/app/consts.ts";
import { E_OrderStatus } from "entities/Order/model/types/Order.ts";

export const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

    const { data: orders, isLoading } = useOrdersList();

    const { data: order, isLoading: isOrderLoading } = useOrder(selectedOrder);

    const openOrder = (order_id) => {
        setSelectedOrder(order_id);
    };

    const closeOrder = () => {
        setSelectedOrder(null);
    };

    if (selectedOrder && order && !isOrderLoading) {
        return (
            <div>
                <Typography
                    color="text.secondary"
                    onClick={closeOrder}
                    sx={{ cursor: "pointer", mb: 5 }}
                >
                    Вернуться к заказам
                </Typography>
                <Order order={order} />
            </div>
        );
    }

    if (isLoading || !orders) {
        return <></>;
    }

    return (
        <Stack gap={5}>
            {orders.map((order) => {
                return (
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgcolor="#F7F9FC"
                        borderRadius="12px"
                        paddingTop="28px"
                        paddingBottom="42px"
                        paddingLeft="38px"
                        paddingRight="28px"
                        sx={{ cursor: "pointer" }}
                        onClick={() => openOrder(order.id)}
                    >
                        <Stack direction="row" spacing={5}>
                            <Typography
                                variant="span"
                                color="#4D4D4D"
                                fontSize={20}
                            >
                                Заказ №{order.id}
                            </Typography>
                            <Typography color="text.secondary">
                                От {formatDate(order.formation_date)}
                            </Typography>
                        </Stack>
                        <Box display="flex" gap={5} alignItems="center">
                            <Button variant="contained">
                                {ORDER_STATUSES[order.status]}
                            </Button>
                            <Typography
                                variant="span"
                                color="#4D4D4D"
                                fontSize={20}
                                width={100}
                                textAlign="center"
                            >
                                {order.price} ₽
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Stack>
    );
};
