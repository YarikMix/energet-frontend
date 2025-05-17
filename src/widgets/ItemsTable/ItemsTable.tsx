import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemsTable = ({ items }) => {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "name", headerName: "Название", width: 200 },
        {
            field: "type",
            headerName: "Тип",
            width: 200,
            valueFormatter: (value, row) => row.item_type.name,
        },
        {
            field: "producer",
            headerName: "Производитель",
            width: 200,
            valueFormatter: (value, row) => row.item_producer.name,
        },
        {
            field: "status",
            headerName: "Статус",
            width: 200,
            valueFormatter: (value) => formatStatus(value),
        },
    ];

    const formatStatus = (status: number) => {
        if (status == 1) {
            return "Подтвержден";
        } else if (status == 2) {
            return "Удален";
        }
    };

    const handleRowClick = (item) => {
        navigate("/items/" + item.row.id + "/edit/");
    };

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={items}
                columns={columns}
                onRowClick={handleRowClick}
                localeText={{ noRowsLabel: "Оборудование не найдено" }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
            />
        </Paper>
    );
};

export default ItemsTable;
