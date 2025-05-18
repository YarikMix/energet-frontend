import HelpIcon from "@mui/icons-material/Help";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
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

    const calcTotalSum = () => {
        return items.reduce(function (currentSum, currentItem) {
            return currentSum + currentItem.price;
        }, 0);
    };

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
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6">Оптимальные параметры</Typography>
                <Tooltip title="Быстрая оценка">
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <ConfiguratorResultParamsTable />
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6">Оптимальная конфигурация</Typography>
                <Tooltip
                    title="C уточненными стоимостными
                    показателями"
                >
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Typography variant="span" fontSize={18} color="#4D4D4D">
                Суммарная цена: {calcTotalSum()} ₽
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
