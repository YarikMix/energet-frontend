import { Box, Stack, Typography } from "@mui/material";
import { fetchConfiguratorDrafts } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import getConfiguratorDrafts from "entities/Configurator/model/selectors/getDrafts.ts";
import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import ConfiguratorDraft from "src/widgets/ConfiguratorDraft/ConfiguratorDraft.tsx";

export const ConfiguratorDrafts = () => {
    const drafts = useAppSelector(getConfiguratorDrafts);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchConfiguratorDrafts());
    }, [dispatch]);

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
                <ConfiguratorDraft {...draft} />
            ))}
        </Stack>
    );
};
