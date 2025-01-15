import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { handleLogout } from "entities/User/lib/slices/UserSlice.ts";
import { AccountCircle } from "@mui/icons-material";
import { E_UserRole } from "entities/User/model/types/User.ts";

export const ProfilePage = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);
    console.log(user);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const logoutBtnClicked = () => {
        dispatch(handleLogout());
    };

    const formatUserRole = () => {
        if (user.role == E_UserRole.Buyer) {
            return "Покупатель";
        } else if (user.role == E_UserRole.Producer) {
            return "Поставщик";
        }

        return "Модератор";
    };

    return (
        <Container sx={{ pt: 5 }}>
            <Box
                sx={{
                    background: "#F7F9FC",
                    padding: "16px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                <AccountCircle fontSize="large" />
                <Typography fontSize={16}>{formatUserRole()}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    width: "300px",
                    mt: 3,
                    mb: 3,
                }}
            >
                <TextField label="Имя" value={user.name} />
                <TextField label="Телефон" value={user.phone} />
                <TextField label="Почта" value={user.email} />
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
                <Button onClick={logoutBtnClicked} variant="contained">
                    Выйти
                </Button>
                <Button onClick={logoutBtnClicked} variant="contained">
                    Сохранить
                </Button>
                <Button onClick={logoutBtnClicked} variant="outlined">
                    Изменить пароль
                </Button>
            </Box>
        </Container>
    );
};
