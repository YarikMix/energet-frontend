// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Container, Modal, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    updateOrderStatus,
    useOrder,
    useOrdersList,
} from "entities/Order/api/orderApi.ts";
import getIsModerator from "entities/User/model/selectors/isModerator.ts";
import { T_User } from "entities/User/model/types/User.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "shared/Dropdown/Dropdown.tsx";
import { formatDate } from "shared/utils/date.ts";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { Order } from "src/widgets/Order/Order.tsx";

const ORDER_STATUSES = [
    {
        id: -1,
        name: "Любой",
    },
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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

export const OrdersTablePage = () => {
    const isModerator = useAppSelector(getIsModerator);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [selectedOrderId, setSelectedOrderId] = useState<number | null>();

    const [status, setStatus] = useState(-1);

    const {
        data: orders,
        isLoading: isOrdersLoading,
        refetch: refetchOrders,
    } = useOrdersList(status);

    const { data: order, refetch: refetchOrder } = useOrder(selectedOrderId);

    useEffect(() => {
        refetchOrders();
    }, [refetchOrders, status]);

    useEffect(() => {
        if (!isModerator) {
            navigate("/");
        }
    }, [isModerator, navigate]);

    const formatStatus = (status: number) => {
        if (status == 1) {
            return "В пути";
        } else if (status == 2) {
            return "Доставлен";
        } else if (status == 3) {
            return "Отменен";
        } else if (status == 4) {
            return "Удален";
        }
    };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "price",
            headerName: "Цена",
            width: 125,
            valueFormatter: (value) => `${value}₽`,
        },
        {
            field: "owner",
            headerName: "Покупатель",
            width: 250,
            valueFormatter: (value: T_User) => value.email,
        },
        {
            field: "status",
            headerName: "Статус",
            width: 125,
            valueFormatter: (value) => formatStatus(value),
        },
        {
            field: "formation_date",
            headerName: "Дата формирования",
            width: 250,
            valueFormatter: (value) => formatDate(value),
        },
        {
            field: "complete_date",
            headerName: "Дата завершения",
            width: 250,
            valueFormatter: (value) => formatDate(value),
        },
    ];

    const handleRowClick = (row) => {
        setSelectedOrderId(row.id);
    };

    const handleChange = (value: number) => {
        setStatus(value);
    };

    const handleChangeOrderStatus = async (status: number) => {
        await dispatch(updateOrderStatus({ order_id: order?.id, status }));
        refetchOrder();
        refetchOrders();
    };

    if (isOrdersLoading || !orders) {
        return null;
    }

    return (
        <Container>
            <Box
                mb={5}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                }}
            >
                <Dropdown
                    label="Статус"
                    options={ORDER_STATUSES}
                    value={status}
                    onChange={handleChange}
                />
            </Box>
            <Paper sx={{ width: "100%" }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    onRowClick={handleRowClick}
                    localeText={{ noRowsLabel: "Оборудование не найдено" }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                />
            </Paper>
            <Modal
                open={!!order}
                onClose={() => setSelectedOrderId(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {order && (
                        <Order
                            order={order}
                            handleChangeOrderStatus={handleChangeOrderStatus}
                        />
                    )}
                </Box>
            </Modal>
        </Container>
    );
};
