import { Stack, Typography } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { updateCoords } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { DEFAULT_COORDS } from "shared/utils/consts.ts";

export const CoordsPicker = () => {
    const { coords } = useAppSelector(
        (state) => state.configuratorReducer.configuration
    );

    const dispatch = useAppDispatch();

    const handleClick = (e) => {
        const newCoords = e.get("coords").map((value) => +value.toFixed(2));
        dispatch(updateCoords(newCoords));
    };

    const isCoordsValid = () => {
        return coords && coords[0] && coords[1];
    };

    return (
        <Stack gap={2}>
            <Typography variant="span" fontSize={20} sx={{ mb: 5 }}>
                Введите координаты:{" "}
                {isCoordsValid() && `${coords[0]}, ${coords[1]}`}
            </Typography>
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
