import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";

const ConfiguratorResultParamsTable = () => {
    const { params } = useAppSelector((state) => state.configuratorReducer);
    const columns: GridColDef[] = [
        { field: "name", headerName: "Название", width: 200 },
        { field: "value", headerName: "Значение", width: 200 },
        {
            field: "description",
            headerName: "Описание",
            width: 200,
        },
    ];

    console.log("params", params);

    if (!params) {
        return null;
    }

    const rows = Object.entries(params).map((param, idx) => ({
        id: idx,
        name: param[0],
        value: param[1],
        description: "TODO", // Вынести в утилиту
    }));

    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid rows={rows} columns={columns} hideFooter={true} />
        </Paper>
    );
};

export default ConfiguratorResultParamsTable;
