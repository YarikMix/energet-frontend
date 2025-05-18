import { Stack, TextField, Typography } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { updateCoords } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { DEFAULT_COORDS } from "shared/utils/consts.ts";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const CoordsPicker = () => {
    const { coords } = useAppSelector(
        (state) => state.configuratorReducer.configuration
    );

    const dispatch = useAppDispatch();

    const handleClick = (e) => {
        const newCoords = e.get("coords");
        dispatch(updateCoords(newCoords.map((coord) => coord.toFixed(2))));
    };

    const isCoordsValid = () => {
        return coords && coords[0] && coords[1];
    };

    const handleCoordXChange = (e) => {
        dispatch(updateCoords([e.target.value, coords[1]]));
    };

    const handleCoordYChange = (e) => {
        dispatch(updateCoords([coords[0], e.target.value]));
    };

    return (
        <Stack gap={3}>
            <Typography variant="span" fontSize={20}>
                Введите координаты
            </Typography>
            <Stack direction="row" gap={2} sx={{ mb: 4 }}>
                <TextField
                    value={coords[0]}
                    label="X"
                    variant="outlined"
                    sx={{ width: 100 }}
                    onChange={handleCoordXChange}
                />
                <TextField
                    value={coords[1]}
                    label="Y"
                    variant="outlined"
                    sx={{ width: 100 }}
                    onChange={handleCoordYChange}
                />
            </Stack>
            <Map
                defaultState={{
                    center: isCoordsValid() ? coords : DEFAULT_COORDS,
                    zoom: 9,
                }}
                onClick={handleClick}
                width={600}
                height={400}
            >
                <Placemark geometry={coords} />
            </Map>
        </Stack>
    );
};
