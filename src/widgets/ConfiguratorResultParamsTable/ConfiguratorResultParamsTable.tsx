// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatConfiguratorResultParamValue } from "shared/utils/formatConfiguratorResultParamValue/formatConfiguratorResultParamValue.ts";
import { getConfiguratorResultParamDescription } from "shared/utils/getConfiguratorResultParamDescription.ts";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";

const ConfiguratorResultParamsTable = () => {
    const { params } = useAppSelector((state) => state.configuratorReducer);
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Название",
            width: 200,
        },
        {
            field: "value",
            headerName: "Значение",
            width: 200,
            valueFormatter: (value, row) =>
                formatConfiguratorResultParamValue(row.name, value),
        },
        {
            field: "description",
            headerName: "Описание",
            width: 500,
            valueFormatter: (value, row) =>
                getConfiguratorResultParamDescription(row.name),
        },
    ];

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
