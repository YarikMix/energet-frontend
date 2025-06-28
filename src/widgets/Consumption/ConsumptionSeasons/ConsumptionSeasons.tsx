// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Stack } from "@mui/material";
import { updateConsumptionSeasons } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { getConsumptionSeasons } from "entities/Configurator/model/selectors/getConsumption.ts";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConsumptionSeasons = () => {
    const consumption = useAppSelector(getConsumptionSeasons);

    const dispatch = useAppDispatch();

    return (
        <Stack p={3} gap={5}>
            <ConsumptionPowerInput
                label="Зима"
                value={consumption[0]}
                setValue={(newValue) => {
                    const newConsumption = [...consumption];
                    newConsumption[0] = newValue;
                    dispatch(updateConsumptionSeasons(newConsumption));
                }}
            />
            <ConsumptionPowerInput
                label="Лето"
                value={consumption[1]}
                setValue={(newValue) => {
                    const newConsumption = [...consumption];
                    newConsumption[1] = newValue;
                    dispatch(updateConsumptionSeasons(newConsumption));
                }}
            />
            <ConsumptionPowerInput
                label="Весна"
                value={consumption[2]}
                setValue={(newValue) => {
                    const newConsumption = [...consumption];
                    newConsumption[2] = newValue;
                    dispatch(updateConsumptionSeasons(newConsumption));
                }}
            />
            <ConsumptionPowerInput
                label="Осень"
                value={consumption[3]}
                setValue={(newValue) => {
                    const newConsumption = [...consumption];
                    newConsumption[3] = newValue;
                    dispatch(updateConsumptionSeasons(newConsumption));
                }}
            />
        </Stack>
    );
};
