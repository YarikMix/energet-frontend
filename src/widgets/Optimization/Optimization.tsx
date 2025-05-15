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
import React from "react";
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
import getOptimization from "entities/Configurator/model/selectors/getOptimization.ts";

export const Optimization = () => {
    const { enSource, enDSource, enStorage } = useAppSelector(getOptimization);

    const dispatch = useAppDispatch();

    const isSourcesEnabledAll = Object.entries({
        ...enSource,
        ...enDSource,
    }).every((source) => source[1] == 1);

    const isStoragesEnabledAll = Object.entries(enStorage).every(
        (storage) => storage[1] == 1
    );

    const handleEnableAllSources = () => {
        dispatch(
            updateEnSource({
                solar: 1,
                wind: 1,
                TEG: 1,
            })
        );

        dispatch(
            updateEnDSource({
                DGS: 1,
                FC: 1,
            })
        );
    };

    const handleDisableAllSources = () => {
        if (isSourcesEnabledAll) {
            dispatch(
                updateEnSource({
                    solar: 0,
                    wind: 0,
                    TEG: 0,
                })
            );

            dispatch(
                updateEnDSource({
                    DGS: 0,
                    FC: 0,
                })
            );
        }
    };

    const handleEnableAllStorages = () => {
        dispatch(
            updateEnStorage({
                AB: 1,
                SC: 1,
            })
        );
    };

    const handleDisableAllStorages = () => {
        dispatch(
            updateEnStorage({
                AB: 0,
                SC: 0,
            })
        );
    };

    return (
        <List sx={{ listStyle: "decimal", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Выбор источников энергии" />
                <FormControl>
                    <RadioGroup value={isSourcesEnabledAll ? 0 : 1}>
                        <FormControlLabel
                            value={0}
                            control={<Radio checked={isSourcesEnabledAll} />}
                            label="Включить в расчет все"
                            onClick={handleEnableAllSources}
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio checked={!isSourcesEnabledAll} />}
                            label="Выбрать некоторые"
                            onClick={handleDisableAllSources}
                        />
                        <Box p={2}>
                            <TabPanel
                                currentTab={isSourcesEnabledAll ? 0 : 1}
                                index={1}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(
                                                    enSource.solar
                                                )}
                                            />
                                        }
                                        label="Солнечная панель"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnSource({
                                                    ...enSource,
                                                    solar: 1 - enSource.solar,
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
                                                checked={Boolean(enSource.wind)}
                                            />
                                        }
                                        label="Ветрогенератор"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnSource({
                                                    ...enSource,
                                                    wind: 1 - enSource.wind,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(enSource.TEG)}
                                            />
                                        }
                                        label="Термоэлектрический генератор"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnSource({
                                                    ...enSource,
                                                    TEG: 1 - enSource.TEG,
                                                })
                                            );
                                            e.preventDefault();
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(enDSource.DGS)}
                                            />
                                        }
                                        label="Дизельный генератор"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnDSource({
                                                    ...enDSource,
                                                    DGS: 1 - enDSource.DGS,
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
                    <RadioGroup value={isStoragesEnabledAll ? 0 : 1}>
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="Включить в расчет все"
                            onClick={handleEnableAllStorages}
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Выбрать некоторые"
                            onClick={handleDisableAllStorages}
                        />
                        <Box p={2}>
                            <TabPanel
                                currentTab={isStoragesEnabledAll ? 0 : 1}
                                index={1}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(enStorage.AB)}
                                            />
                                        }
                                        label="Аккумуляторная батарея"
                                        onClick={(e) => {
                                            dispatch(
                                                updateEnStorage({
                                                    ...enStorage,
                                                    AB: 1 - enStorage.AB,
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
        </List>
    );
};
