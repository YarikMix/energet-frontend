// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { Stack, TextField, Typography, Box, Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapFeature,
    YMapFeatureDataSource,
    YMapControls,
    YMapListener,
    reactify,
} from "../../lib/ymaps";
const { useState, useCallback } = React;
import { updateCoords } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { LOCATION, LINES, POLYGONS } from "shared/utils/consts.ts";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

import * as ymaps3DefaultUITheme from "@yandex/ymaps3-default-ui-theme";
const { YMapDefaultMarker, YMapSearchControl } = reactify.module(ymaps3DefaultUITheme);

const clampLon = (lon: number) => Math.max(-180, Math.min(180, lon));
const clampLat = (lat: number) => Math.max(-90, Math.min(90, lat));

export const CoordsPicker = () => {
    const { coords } = useAppSelector(
        (state) => state.configuratorReducer.configuration
    );

    const [location, setLocation] = useState(LOCATION);
    const [activeLayer, setActiveLayer] = useState<"polygons" | "lines">("polygons");

    // локальные стейты для строкового ввода
    const [lonInput, setLonInput] = useState(coords[0]?.toString() ?? "");
    const [latInput, setLatInput] = useState(coords[1]?.toString() ?? "");

    const dispatch = useAppDispatch();

    const isValidCoordinateInput = (value: string) => {
        // пустая строка или "-" разрешены (для ввода)
        if (value === "" || value === "-") return true;

        // проверяем, что это корректное число с одним минусом и одной точкой
        // ^-? - минус в начале, \d* - цифры, (\.\d*)? - опциональная точка с цифрами
        const regex = /^-?\d*(\.\d*)?$/;
        return regex.test(value);
    };

    const isCoordsValid = (newCoords) => {
        return newCoords && newCoords[0] !== undefined && newCoords[1] !== undefined;
    };

    const handleClick = (e) => {
        const newCoords = e?.entity?.geometry?.coordinates;
        if (!isCoordsValid(newCoords)) return;

        let [lon, lat] = newCoords;
        lon = clampLon(Number(lon.toFixed(5)));
        lat = clampLat(Number(lat.toFixed(5)));

        dispatch(updateCoords([lon, lat]));
        setLocation({ center: [lon, lat], duration: 400 });

        setLonInput(lon.toString());
        setLatInput(lat.toString());
    };

    const handleCoordLonChange = (e) => {
        const value = e.target.value;
        if (!isValidCoordinateInput(value)) return;
        setLonInput(value);

        if (value === "" || value === "-") return; // позволяем пустое или "-"
        const newLon = parseFloat(value);
        if (isNaN(newLon)) return;

        const clamped = clampLon(newLon);
        dispatch(updateCoords([clamped, coords[1]]));

        setLocation({
            center: [clamped, coords[1]],
            zoom: 12,
            duration: 400,
        });
    };

    const handleCoordLatChange = (e) => {
        const value = e.target.value;
        if (!isValidCoordinateInput(value)) return;
        setLatInput(value);

        if (value === "" || value === "-") return;
        const newLat = parseFloat(value);
        if (isNaN(newLat)) return;

        const clamped = clampLat(newLat);
        dispatch(updateCoords([coords[0], clamped]));

        setLocation({
            center: [coords[0], clamped],
            zoom: 12,
            duration: 400,
        });
    };

    const searchResultHandler = useCallback((searchResult: SearchResponse) => {
        updateMapLocation(searchResult);
    }, []);

    const updateMapLocation = useCallback((searchResult: SearchResponse) => {
        if (searchResult.length !== 0) {
            let center;
            let zoom;
            let bounds;

            if (searchResult.length === 1) {
                let [lon, lat] = searchResult[0].geometry?.coordinates ?? [];
                lon = clampLon(lon);
                lat = clampLat(lat);
                center = [lon, lat];
                zoom = 16;

                setLonInput(lon.toString());
                setLatInput(lat.toString());
            } else {
                bounds = findSearchResultBoundsRange(searchResult);
            }

            setLocation({ center, zoom, bounds, duration: 400 });
        }
    }, []);

    return (
        <Stack gap={3} sx={{ maxWidth: 600 }}>
            <Typography variant="span" fontSize={20}>
                Введите координаты
            </Typography>

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" gap={2}>
                    <TextField
                        value={latInput}
                        label="с. ш."
                        variant="outlined"
                        sx={{ width: 100 }}
                        onChange={handleCoordLatChange}
                    />
                    <TextField
                        value={lonInput}
                        label="в. д."
                        variant="outlined"
                        sx={{ width: 100 }}
                        onChange={handleCoordLonChange}
                    />
                </Stack>

                <Stack direction="row" gap={2}>
                    <RadioGroup
                        row
                        value={activeLayer}
                        onChange={(e) => setActiveLayer(e.target.value as "polygons" | "lines")}
                    >
                        <FormControlLabel
                            value="polygons"
                            control={<Radio />}
                            label="Полигоны"
                        />
                        <FormControlLabel
                            value="lines"
                            control={<Radio />}
                            label="Линии"
                        />
                    </RadioGroup>
                </Stack>
            </Stack>

            <Box sx={{ maxWidth: 600, height: 400 }}>
                <YMap location={location}>

                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />

                    <YMapControls position="left top">
                        <YMapSearchControl searchResult={searchResultHandler} />
                    </YMapControls>
                    <YMapListener onClick={handleClick} />
                    <YMapDefaultMarker
                        coordinates={location.center ?? DEFAULT_COORDS}
                        iconName={"fallback"}
                    />

                    {/* Источники данных */}
                    <YMapFeatureDataSource id="polygonsSource" />
                    <YMapFeatureDataSource id="linesSource" />

                    {/* Отдельные слои */}
                    <YMapDefaultFeaturesLayer
                        source="polygonsSource"
                        visible={activeLayer === "polygons"}
                    />
                    <YMapDefaultFeaturesLayer
                        source="linesSource"
                        visible={activeLayer === "lines"}
                    />

                    {POLYGONS.map((poly) => (
                        <YMapFeature
                            key={poly.id}
                            geometry={poly.geometry}
                            style={poly.style}
                            source="polygonsSource"
                        />
                    ))}

                    {LINES.map((line) => (
                        <YMapFeature
                            key={line.id}
                            geometry={line.geometry}
                            style={line.style}
                            source="linesSource"
                        />
                    ))}
                </YMap>
            </Box>
        </Stack>
    );
};
