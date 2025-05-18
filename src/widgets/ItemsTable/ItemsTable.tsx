import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ItemsTable = ({ items }) => {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "name",
            headerName: "Название",
            width: 200,
        },
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
        if (status == 0) {
            return "Подтвержден";
        } else if (status == 1) {
            return "Снят с продажи";
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
