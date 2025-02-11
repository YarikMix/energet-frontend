import {
    Box,
    Button,
    Container,
    Stack,
    Step,
    StepButton,
    Stepper,
} from "@mui/material";
import React, { useState } from "react";
import { CoordsPicker } from "src/widgets/CoordsPicker/CoordsPicker.tsx";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";

export const ConfiguratorPage = () => {
    const steps = ["Локация", "Потребление", "Оптимизация", "Результат"];

    const [step, setStep] = useState(0);

    const [coords, setCoords] = useState<number[]>(null);

    const handleStep = (index) => {
        if (index < 0 || index > 3) {
            return;
        }

        setStep(index);
    };

    const handleOpenNextStep = () => {
        handleStep(step + 1);
    };

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
                            <CoordsPicker
                                coords={coords}
                                setCoords={setCoords}
                            />
                        </TabPanel>
                        <TabPanel currentTab={step} index={1}>
                            Потребление
                        </TabPanel>
                        <TabPanel currentTab={step} index={2}>
                            Оптимизация
                        </TabPanel>
                        <TabPanel currentTab={step} index={3}>
                            Результат
                        </TabPanel>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{ width: "140px", fontSize: 14 }}
                            onClick={handleOpenNextStep}
                        >
                            Далее
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};
