import { Stack, Typography } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { updateCoords } from "entities/Configurator/lib/slices/configuratorSlice.ts";

export const CoordsPicker = () => {
    const { coords } = useAppSelector((state) => state.configuratorReducer);

    const dispatch = useAppDispatch();

    const handleClick = (e) => {
        dispatch(updateCoords(e.get("coords")));
    };

    const isCoordsValid = () => {
        return coords && coords[0] && coords[1];
    };

    return (
        <Stack gap={2}>
            <Typography variant="span" fontSize={20} sx={{ mb: 5 }}>
                Введите координаты:{" "}
                {isCoordsValid() &&
                    `${coords[0].toFixed(2)}, ${coords[1].toFixed(2)}`}
            </Typography>
            <Map
                defaultState={{
                    center: isCoordsValid() ? coords : [55.75, 37.57],
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
