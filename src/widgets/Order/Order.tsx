import { T_Order } from "entities/Order/model/types/Order.ts";
import { Box, Link, Stack, Typography } from "@mui/material";
import { formatDate } from "shared/utils/date.ts";
import React from "react";
import { OrderStatusBar } from "shared/OrderStatusBar/OrderStatusBar.tsx";
import { Link as RouterLink } from "react-router-dom";

export const Order = ({ order }: { order: T_Order }) => {
    return (
        <Stack gap={8}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box display="flex" alignItems="center" gap={5}>
                    <Typography variant="span" color="#4D4D4D" fontSize={20}>
                        Заказ №{order.id}
                    </Typography>
                    <Typography color="text.secondary">
                        От {formatDate(order.formation_date)}
                    </Typography>
                </Box>
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
            <OrderStatusBar status={order.status} />
            <Stack gap={3}>
                {order.items.map((item) => {
                    return (
                        <Stack direction="row" gap={5}>
                            <Link
                                component={RouterLink}
                                to={`/items/${item.id}`}
                                width={100}
                            >
                                {item.name}
                            </Link>
                            <Typography>x</Typography>
                            <Typography>{item.count} шт</Typography>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};
