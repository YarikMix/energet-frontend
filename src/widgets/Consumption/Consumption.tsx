import React, { useState } from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import { ConsumptionTemplate } from "src/widgets/Consumption/ConsumptionTemplate/ConsumptionTemplate.tsx";
import { ConsumptionConstant } from "src/widgets/Consumption/ConsumptionConstant/ConsumptionConstant.tsx";
import { ConsumptionSeasons } from "src/widgets/Consumption/ConsumptionSeasons/ConsumptionSeasons.tsx";
import { ConsumptionMonth } from "src/widgets/Consumption/ConsumptionMonth/ConsumptionMonth.tsx";

export const Consumption = () => {
    const [consumptionType, setConsumptionType] = useState(1);

    const handleChange = (e) => {
        setConsumptionType(parseInt(e.target.value));
    };

    return (
        <div>
            <FormControl>
                <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ mb: 2 }}
                >
                    Выберите тип потребления
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={consumptionType}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Шаблон потребления"
                    />
                    <TabPanel currentTab={consumptionType} index={0}>
                        <ConsumptionTemplate />
                    </TabPanel>
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Постоянное потребление"
                    />
                    <TabPanel currentTab={consumptionType} index={1}>
                        <ConsumptionConstant />
                    </TabPanel>
                    <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Потребление по сезоннам"
                    />
                    <TabPanel currentTab={consumptionType} index={2}>
                        <ConsumptionSeasons />
                    </TabPanel>
                    <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="Потребление по месяцам"
                    />
                    <TabPanel currentTab={consumptionType} index={3}>
                        <ConsumptionMonth />
                    </TabPanel>
                </RadioGroup>
            </FormControl>
        </div>
    );
};
