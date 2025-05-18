import { Button, Stack, Typography } from "@mui/material";
import {
    resetConfigurator,
    saveDraftCalculation,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { addItemsToDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import ConfiguratorResultItemsTable from "src/widgets/ConfiguratorResultItemsTable/ConfiguratorResultItemsTable.tsx";
import ConfiguratorResultParamsTable from "src/widgets/ConfiguratorResultParamsTable/ConfiguratorResultParamsTable.tsx";

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
            <Typography variant="h6">
                Оптимальные параметры (быстрая оценка)
            </Typography>
            <ConfiguratorResultParamsTable />
            <Typography variant="h6">
                Оптимальная конфигурация (с уточненными стоимостными
                показателями)
            </Typography>
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
