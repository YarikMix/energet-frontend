// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from "@mui/material";
import { updateConsumptionConst } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { getConsumptionConst } from "entities/Configurator/model/selectors/getConsumption.ts";
import { useSelector } from "react-redux";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConsumptionConstant = () => {
    const consumption = useSelector(getConsumptionConst);

    const dispatch = useAppDispatch();

    const setPower = (value: number) => {
        dispatch(updateConsumptionConst(value));
    };

    return (
        <Box p={3}>
            <ConsumptionPowerInput value={consumption} setValue={setPower} />
        </Box>
    );
};
