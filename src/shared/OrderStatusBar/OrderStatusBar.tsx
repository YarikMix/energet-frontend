import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { E_OrderStatus } from "entities/Order/model/types/Order.ts";

export const OrderStatusBar = ({ status }: { status: E_OrderStatus }) => {
    const steps = ["Черновик", "В пути", "Доставлен"];
    return (
        <Stepper activeStep={status}>
            {steps.map((label) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};
