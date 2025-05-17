import { Step, StepLabel, Stepper } from "@mui/material";
import { E_OrderStatus } from "entities/Order/model/types/Order.ts";

export const OrderStatusBar = ({ status }: { status: E_OrderStatus }) => {
    const steps = ["Черновик", "В пути", status == 3 ? "Отменен" : "Доставлен"];

    console.log("status", status);

    const isDone =
        status == E_OrderStatus.Completed || status == E_OrderStatus.Rejected;

    // TODO: Писать причину почему заказ отменен

    return (
        <Stepper activeStep={isDone ? 10 : status}>
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
