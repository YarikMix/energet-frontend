import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import {
    updateEnDSource,
    updateEnSource,
    updateEnStorage,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";

export const Optimization = () => {
    const state = useAppSelector((state) => state.configuratorReducer);

    const dispatch = useAppDispatch();

    const [radio1, setRadio1] = useState(0);

    const handleChangeRadio1 = (e) => {
        setRadio1(parseInt(e.target.value));
    };

    const [radio2, setRadio2] = useState(0);

    const handleChangeRadio2 = (e) => {
        setRadio2(parseInt(e.target.value));
    };

    const [radio3, setRadio3] = useState(0);

    const handleChangeRadio3 = (e) => {
        setRadio3(parseInt(e.target.value));
    };

    return (
        <List sx={{ listStyle: "decimal", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Выбор источников энергии" />
                <FormControl>
                    <RadioGroup value={radio1} onChange={handleChangeRadio1}>
                        <FormControlLabel
                            value={0}
                            control={<Radio defaultChecked />}
                            label="Включить в расчет все"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Выбрать некоторые"
                        />
                        <Box p={2}>
                            <TabPanel currentTab={radio1} index={1}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    state.enSource.solar
                                                )}
                                            />
                                        }
                                        label="Солнечная панель"
                                        onClick={(e) => {
                                            console.log(state.enSource.solar);
                                            dispatch(
                                                updateEnSource({
                                                    ...state.enSource,
                                                    solar:
                                                        1 -
                                                        state.enSource.solar,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Топливный элемент"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Магистральный газ"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    state.enSource.TEG
                                                )}
                                            />
                                        }
                                        label="Термоэлектрический генератор"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnSource({
                                                    ...state.enSource,
                                                    TEG: 1 - state.enSource.TEG,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    state.enSource.wind
                                                )}
                                            />
                                        }
                                        label="Ветрогенератор"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnSource({
                                                    ...state.enSource,
                                                    wind:
                                                        1 - state.enSource.wind,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    state.enDSource.DGS
                                                )}
                                            />
                                        }
                                        label="Дизель"
                                        onClick={(e) => {
                                            console.log("123");
                                            dispatch(
                                                updateEnDSource({
                                                    ...state.enDSource,
                                                    DGS:
                                                        1 - state.enDSource.DGS,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Сеть"
                                    />
                                </FormGroup>
                            </TabPanel>
                        </Box>
                    </RadioGroup>
                </FormControl>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Выбор накопителя энергии" />
                <FormControl>
                    <RadioGroup value={radio2} onChange={handleChangeRadio2}>
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="Включить в расчет все"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Выбрать некоторые"
                        />
                        <Box p={2}>
                            <TabPanel currentTab={radio2} index={1}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    state.enStorage.AB
                                                )}
                                            />
                                        }
                                        label="Аккумуляторная батарея"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnStorage({
                                                    ...state.enStorage,
                                                    AB: 1 - state.enStorage.AB,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Супермаховик"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Гравитационный"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Суперконденсатор"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Пневматический/гидравлический"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Водород"
                                    />
                                </FormGroup>
                            </TabPanel>
                        </Box>
                    </RadioGroup>
                </FormControl>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Целевой показатель оптимизации:" />
                <FormControl>
                    <RadioGroup value={radio3} onChange={handleChangeRadio3}>
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="Минимизация CAPEX"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Минимизация OPEX"
                        />
                        <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="Минимизация стоимости электроэнергии"
                        />
                        <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="Максимальная надежность"
                        />
                        <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label="Минимальный углеродный след"
                        />
                    </RadioGroup>
                </FormControl>
            </ListItem>
        </List>
    );
};
