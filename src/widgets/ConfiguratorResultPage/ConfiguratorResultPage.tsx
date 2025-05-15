import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import ConfiguratorResultItemsTable from "src/widgets/ConfiguratorResultItemsTable/ConfiguratorResultItemsTable.tsx";
import ConfiguratorResultParamsTable from "src/widgets/ConfiguratorResultParamsTable/ConfiguratorResultParamsTable.tsx";
import { addItemsToDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import {
    resetConfigurator,
    saveDraftCalculation,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";

const ConfiguratorResultPage = ({ items, setStep }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddResultToDraftOrder = async () => {
        const list = items.map((item) => ({
            id: item.id,
            count: item.count,
        }));
        await dispatch(addItemsToDraftOrder(list));
        navigate("/bin");
        dispatch(resetConfigurator());
        setStep(0);
    };

    const saveToDraft = async () => {
        navigate("/");
        await dispatch(saveDraftCalculation());
        dispatch(resetConfigurator());
        setStep(0);
    };

    return (
        <Stack gap={3}>
            <Typography variant="h6">Оптимальные параметры</Typography>
            <ConfiguratorResultParamsTable />
            <Typography variant="h6">Оптимальная конфигурация</Typography>
            <ConfiguratorResultItemsTable />
            <Stack direction="row" gap={4}>
                <Button
                    variant="contained"
                    sx={{ maxWidth: 200 }}
                    onClick={handleAddResultToDraftOrder}
                >
                    Добавить в корзину
                </Button>
                <Button
                    variant="outlined"
                    sx={{ maxWidth: 200 }}
                    onClick={saveToDraft}
                >
                    Сохранить черновик
                </Button>
            </Stack>
        </Stack>
    );
};

export default ConfiguratorResultPage;
