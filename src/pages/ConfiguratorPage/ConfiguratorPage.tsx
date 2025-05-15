import {
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Step,
    StepButton,
    Stepper,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CoordsPicker } from "src/widgets/CoordsPicker/CoordsPicker.tsx";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import { Consumption } from "src/widgets/Consumption/Consumption.tsx";
import { Optimization } from "src/widgets/Optimization/Optimization.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import {
    calculateFetch,
    resetConfigurator,
    saveDraftCalculation,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { ConfiguratorResultTable } from "src/widgets/ConfiguratorResultItemsTable/ConfiguratorResultTable.tsx";
import { addItemsToDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useNavigate } from "react-router-dom";
import ConfiguratorResultPage from "src/widgets/ConfiguratorResultPage/ConfiguratorResultPage.tsx";

export const ConfiguratorPage = () => {
    const steps = ["Локация", "Потребление", "Оптимизация", "Результат"];

    const [step, setStep] = useState(0);

    const { loading, items } = useAppSelector(
        (state) => state.configuratorReducer
    );

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleStep = async (index) => {
        if (index < 0 || index > 3) {
            return;
        }

        setStep(index);

        if (index == 3) {
            await fetchConfigurator();
            setStep(3);
        }
    };

    const handleOpenNextStep = () => {
        handleStep(step + 1);
    };

    const fetchConfigurator = async () => {
        dispatch(calculateFetch());
    };

    const handleExitFromConfigurator = async () => {
        navigate("/");
        dispatch(resetConfigurator());
        setStep(0);
    };

    const isLastStep = step == 3;

    if (isLastStep && !items && !loading) {
        return <></>;
    }

    if (loading) {
        return (
            <Stack
                direction="column"
                gap={5}
                sx={{ width: "100%", height: "800px" }}
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress size={48} />
                <Typography variant="h5" textAlign="center">
                    Выполняется обработка данных,
                    <br /> идет подсчет результатов
                </Typography>
            </Stack>
        );
    }

    if (!loading && items && !items.length) {
        return (
            <Stack
                direction="column"
                gap={5}
                sx={{ width: "100%", height: "800px" }}
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5" textAlign="center">
                    Подходящий комплект не найден
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExitFromConfigurator}
                >
                    Вернуться на главную
                </Button>
            </Stack>
        );
    }

    const saveToDraft = async () => {
        navigate("/");
        await dispatch(saveDraftCalculation());
        dispatch(resetConfigurator());
        setStep(0);
    };

    const nextStepBtnVisible = !isLastStep;

    return (
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack gap={10} width="100%">
                <Box width="100%">
                    <Stepper nonLinear activeStep={step} width="100%">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepButton
                                        onClick={() => handleStep(index)}
                                    >
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <TabPanel currentTab={step} index={0}>
                            <CoordsPicker />
                        </TabPanel>
                        <TabPanel currentTab={step} index={1}>
                            <Consumption />
                        </TabPanel>
                        <TabPanel currentTab={step} index={2}>
                            <Optimization />
                        </TabPanel>
                        <TabPanel currentTab={step} index={3}>
                            <ConfiguratorResultPage
                                setStep={setStep}
                                items={items}
                            />
                        </TabPanel>
                    </Box>
                    <Box>
                        {nextStepBtnVisible && (
                            <Button
                                variant="contained"
                                sx={{ width: "140px", fontSize: 14 }}
                                onClick={handleOpenNextStep}
                            >
                                Далее
                            </Button>
                        )}
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};
