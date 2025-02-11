import { Stack, Typography } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";

interface IProps {
    coords: number[2];
    setCoords: (value: number[2]) => void;
}

export const CoordsPicker = ({ coords, setCoords }: IProps) => {
    const handleClick = (e) => {
        setCoords(e.get("coords"));
    };

    return (
        <Stack gap={2}>
            <Typography variant="span" fontSize={20} sx={{ mb: 5 }}>
                Введите координаты:{" "}
                {coords && `${coords[0].toFixed(2)}, ${coords[1].toFixed(2)}`}
            </Typography>
            <Map
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                onClick={handleClick}
                width={600}
                height={400}
            >
                <Placemark geometry={coords} />
            </Map>
        </Stack>
    );
};
