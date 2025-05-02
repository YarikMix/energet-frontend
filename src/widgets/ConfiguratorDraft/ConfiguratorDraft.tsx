import { Button, Stack, Typography } from "@mui/material";
import {
    deleteDraftConfigurator,
    openDraftConfigurator,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import InfoTable from "src/widgets/InfoTable/InfoTable.tsx";

export default function (draft) {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const openDraftInConfigurator = (draft) => {
        dispatch(openDraftConfigurator(draft));
        navigate("/configurator");
    };

    const handleDeleteDraft = (draft_id) => {
        dispatch(deleteDraftConfigurator(draft_id));
    };

    return (
        <Stack
            direction="column"
            bgcolor="#F7F9FC"
            borderRadius="12px"
            paddingTop="28px"
            paddingBottom="42px"
            paddingLeft="38px"
            paddingRight="28px"
            gap={2}
            key={draft.id}
        >
            <Stack
                direction="row"
                width="100%"
                justifyContent="space-between"
                spacing={5}
            >
                <Typography variant="span" color="#4D4D4D" fontSize={20}>
                    Черновик №{draft.id}
                </Typography>
                <Stack direction="row" gap={4}>
                    <Button
                        variant="outlined"
                        onClick={() => handleDeleteDraft(draft.id)}
                    >
                        Удалить
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => openDraftInConfigurator(draft)}
                    >
                        Открыть в конфигураторе
                    </Button>
                </Stack>
            </Stack>
            <Stack
                direction="column"
                width="100%"
                justifyContent="space-between"
            >
                <InfoTable
                    rows={["Локация", "Потребление", "Оптимизация"]}
                    cols={[
                        `${draft.coords[0].toFixed(2)} ${draft.coords[1].toFixed(2)}`,
                        draft.consumptionType == 1
                            ? "Постоянное потребление"
                            : "Потребление по сезонам",
                        draft.optimization_target == 1
                            ? "Минимизация CAPEX"
                            : "Минимизация стоимости электроэнергии",
                    ]}
                />
            </Stack>
        </Stack>
    );
}
