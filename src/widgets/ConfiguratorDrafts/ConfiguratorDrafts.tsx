import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import {
    deleteDraftConfigurator,
    fetchConfiguratorDrafts,
    openDraftConfigurator,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import getConfiguratorDrafts from "entities/Configurator/model/selectors/getDrafts.ts";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";

export const ConfiguratorDrafts = () => {
    const drafts = useAppSelector(getConfiguratorDrafts);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchConfiguratorDrafts());
    }, []);

    const openDraftInConfigurator = (draft) => {
        dispatch(openDraftConfigurator(draft));
        navigate("/configurator");
    };

    const handleDeleteDraft = (draft_id) => {
        dispatch(deleteDraftConfigurator(draft_id));
    };

    if (!drafts || !drafts.length) {
        return (
            <Box
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" color="#4D4D4D">
                    Черновиков конфигуратора нет
                </Typography>
            </Box>
        );
    }

    return (
        <Stack gap={5}>
            {drafts.map((draft) => (
                <Stack
                    width="100%"
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
                        <Typography
                            variant="span"
                            color="#4D4D4D"
                            fontSize={20}
                        >
                            Черновик №{draft.id}
                        </Typography>
                        <Stack
                            direction="row"
                            gap={4}
                            onClick={() => handleDeleteDraft(draft.id)}
                        >
                            <Button variant="outlined">Удалить</Button>
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
                        <Grid2 container rowSpacing={3} columnSpacing={6}>
                            <Grid2 container item xs={6} direction="column">
                                <Typography variant="span" color="#4D4D4D">
                                    Локация
                                </Typography>
                                <Typography variant="span" color="#4D4D4D">
                                    Потребление
                                </Typography>
                                <Typography variant="span" color="#4D4D4D">
                                    Оптимизация
                                </Typography>
                            </Grid2>
                            <Grid2 container item xs={6} direction="column">
                                <Typography variant="span" color="#4D4D4D">
                                    {draft.coords[0]} {draft.coords[1]}
                                </Typography>
                                <Typography variant="span" color="#4D4D4D">
                                    {draft.consumption_type == 1
                                        ? `Постоянное потребление`
                                        : `Потребление по сезонам`}
                                </Typography>
                                <Typography variant="span" color="#4D4D4D">
                                    Минимизация CAPEX
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
};
