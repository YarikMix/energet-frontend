// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Stack
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                gap={4}
                pt={4}
                fullWidth
            >
                <Typography variant="h4">Страница не найдена</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{ fontSize: 20 }}
                >
                    Назад
                </Button>
            </Stack>
        </Container>
    );
};

export default NotFoundPage;
