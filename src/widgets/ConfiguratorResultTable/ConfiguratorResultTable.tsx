import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConfiguratorResultTable = () => {
    const { items } = useAppSelector((state) => state.configuratorReducer);

    const columns: GridColDef[] = [
        { field: "name", headerName: "Название", width: 200 },
        { field: "type", headerName: "Тип", width: 200 },
        {
            field: "power",
            headerName: "Мощность",
            type: "number",
            width: 200,
        },
        {
            field: "price",
            headerName: "Цена за 1 шт",
            type: "number",
            width: 200,
        },
        {
            field: "count",
            headerName: "Количество",
            sortable: false,
            width: 200,
        },
    ];

    const rows = items.map((item) => ({
        id: item.id,
        name: item.name,
        power: item.power + " Вт",
        type: item.item_type.name,
        price: item.price + " ₽",
        count: item.count,
    }));

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid rows={rows} columns={columns} hideFooter={true} />
        </Paper>
    );
};
