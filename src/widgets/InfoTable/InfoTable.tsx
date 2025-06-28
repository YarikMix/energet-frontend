// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Grid2, Typography } from "@mui/material";

interface Props {
    rows: string[];
    cols: string[];
}

export default function ({ rows, cols }: Props) {
    return (
        <Grid2 container rowSpacing={3} columnSpacing={6}>
            <Grid2 container item xs={6} direction="column">
                {rows.map((row) => (
                    <Typography variant="span" color="#4D4D4D">
                        {row}
                    </Typography>
                ))}
            </Grid2>
            <Grid2 container item xs={6} direction="column">
                {cols.map((col) => (
                    <Typography variant="span" color="#4D4D4D">
                        {col}
                    </Typography>
                ))}
            </Grid2>
        </Grid2>
    );
}
