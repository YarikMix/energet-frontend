import { Box, Link, Stack, Typography } from "@mui/material";
import { E_OrderStatus, T_Order } from "entities/Order/model/types/Order.ts";
import getIsModerator from "entities/User/model/selectors/isModerator.ts";
import { Link as RouterLink } from "react-router-dom";
import { Dropdown } from "shared/Dropdown/Dropdown.tsx";
import { OrderStatusBar } from "shared/OrderStatusBar/OrderStatusBar.tsx";
import { formatDate } from "shared/utils/date.ts";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";

const ORDER_STATUSES = [
    {
        id: 1,
        name: "В пути",
    },
    {
        id: 2,
        name: "Доставлен",
    },
    {
        id: 3,
        name: "Отменен",
    },
];

interface Props {
    order: T_Order;
    handleChangeOrderStatus?: (status) => void;
}

export const Order = ({ order, handleChangeOrderStatus }: Props) => {
    const isModerator = useAppSelector(getIsModerator);

    return (
        <Stack gap={8}>
            <Stack alignItems="center" gap={3} direction="row">
                <Box display="flex" alignItems="center" gap={5}>
                    <Typography color="#4D4D4D" fontSize={20}>
                        Заказ №{order.id}
                    </Typography>
                    <Typography color="text.secondary">
                        От {formatDate(order.formation_date)}
                    </Typography>
                </Box>
                <Typography
                    color="#4D4D4D"
                    fontSize={20}
                    width={100}
                    textAlign="center"
                >
                    {order.price} ₽
                </Typography>
            </Stack>
            <OrderStatusBar status={order.status} />
            <Stack gap={3}>
                {order.items.map((item) => {
                    return (
                        <Stack
                            direction="row"
                            gap={5}
                            sx={{ alignItems: "center" }}
                        >
                            <Link
                                component={RouterLink}
                                to={`/items/${item.id}`}
                                width={150}
                            >
                                {item.name}
                            </Link>
                            <Typography>x</Typography>
                            <Typography>{item.count} шт</Typography>
                        </Stack>
                    );
                })}
            </Stack>
            {isModerator && (
                <Stack direction="row" gap={10}>
                    <Box>
                        <Typography color="#4D4D4D" fontSize={20} mb={3}>
                            Личные данные
                        </Typography>
                        <Stack gap={2}>
                            <Typography>{order.owner.name}</Typography>
                            <Typography>{order.owner.email}</Typography>
                            <Typography>{order.owner.phone}</Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Typography color="#4D4D4D" fontSize={20} mb={3}>
                            Статус
                        </Typography>
                        <Dropdown
                            options={ORDER_STATUSES}
                            value={order.status}
                            onChange={(status) =>
                                handleChangeOrderStatus?.(status)
                            }
                            disabled={order.status != E_OrderStatus.InWork}
                        />
                    </Box>
                </Stack>
            )}
        </Stack>
    );
};
