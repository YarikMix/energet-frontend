// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";

export const ConsumptionTemplate = () => {
    const [consumptionType, setConsumptionType] = useState(-1);

    const handleChangeConsumptionType = (e) => {
        setConsumptionType(parseInt(e.target.value));
    };

    const [maxPowerType, setMaxPowerType] = useState(-1);

    const handleChangeMaxPowerType = (e) => {
        setMaxPowerType(parseInt(e.target.value));
    };

    const [radio3, setRadio3] = useState(0);

    const handleChangeRadio3 = (e) => {
        setRadio3(parseInt(e.target.value));
    };

    const [energyEfficiencyClass, setEnergyEfficiencyClass] = useState();

    const handleChangeEnergyEfficiencyClass = (e) => {
        setEnergyEfficiencyClass(e.target.value);
    };

    const [radio4, setRadio4] = useState(-1);

    const handleChangeRadio4 = (e) => {
        setRadio4(parseInt(e.target.value));
    };

    const [radio5, setRadio5] = useState(-1);

    const handleChangeRadio5 = (e) => {
        setRadio5(parseInt(e.target.value));
    };

    return (
        <List sx={{ listStyle: "decimal", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Тип потребителя" />
                <FormControl>
                    <RadioGroup
                        value={consumptionType}
                        onChange={handleChangeConsumptionType}
                    >
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="Домохозяйство"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Промышленный"
                        />
                    </RadioGroup>
                </FormControl>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Максимальная мощность ЗЗ" />
                <RadioGroup
                    value={maxPowerType}
                    onChange={handleChangeMaxPowerType}
                >
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Максимальная мощность потребления"
                    />
                    <TabPanel currentTab={maxPowerType} index={0}>
                        <TextField
                            label="Введите мощность (кВт)"
                            variant="outlined"
                            sx={{ width: 250 }}
                            type="number"
                        />
                    </TabPanel>
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Максимальное зимнее и летнее суточное потребление"
                    />
                    <TabPanel currentTab={maxPowerType} index={1}>
                        <Stack gap={5}>
                            <TextField
                                label="Зима (кВт*ч/сутки)"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                            <TextField
                                label="Лето (кВт*ч/сутки)"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                        </Stack>
                    </TabPanel>
                </RadioGroup>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Планируется модернизация системы отопления?" />
                <RadioGroup value={radio3} onChange={handleChangeRadio3}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Нет"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Да"
                    />
                    <TabPanel currentTab={radio3} index={1}>
                        <Stack gap={5}>
                            <TextField
                                label="Площадь помещения (м2)"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Класс энергоэффективности
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={energyEfficiencyClass}
                                    label="Класс энергоэффективности"
                                    onChange={handleChangeEnergyEfficiencyClass}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </TabPanel>
                </RadioGroup>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Задать расположение СЭС" />
                <RadioGroup value={radio4} onChange={handleChangeRadio4}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Наземная"
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Крышная"
                    />
                    <TabPanel currentTab={radio4} index={1}>
                        <Stack gap={5}>
                            <TextField
                                label="Площадь крыши (м2)"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                            <TextField
                                label="Угол наклона крыши"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                            <TextField
                                label="Ориентация ската крыши по азимуту"
                                variant="outlined"
                                sx={{ width: 325 }}
                                type="number"
                            />
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="2 ската"
                                />
                            </FormGroup>
                        </Stack>
                    </TabPanel>
                </RadioGroup>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Подключение к сети ЗЗ" />
                <RadioGroup value={radio5} onChange={handleChangeRadio5}>
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Есть"
                    />
                    <TabPanel currentTab={radio5} index={0}>
                        <TextField
                            label="Стоимость ЗЗ (руб/кВт*ч)"
                            variant="outlined"
                            sx={{ width: 250 }}
                            type="number"
                        />
                    </TabPanel>
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Нет"
                    />
                    <TabPanel currentTab={radio5} index={1}>
                        <Stack gap={5}>
                            <TextField
                                label="Стоимость подключения (руб)"
                                variant="outlined"
                                sx={{ width: 275 }}
                                type="number"
                            />
                            <TextField
                                label="Стоимость ЗЗ (руб/кВт*ч)"
                                variant="outlined"
                                sx={{ width: 250 }}
                                type="number"
                            />
                        </Stack>
                    </TabPanel>
                </RadioGroup>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Cтоимость отопления" />
                <TextField
                    label="Введите стоимость (руб/кВт*ч)"
                    variant="outlined"
                    sx={{ width: 275 }}
                    type="number"
                />
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Дополнительные пожелания" />
                <TextField
                    label="Необязательно"
                    variant="outlined"
                    sx={{ width: 325 }}
                    multiline
                    rows={5}
                />
            </ListItem>
        </List>
    );
};
