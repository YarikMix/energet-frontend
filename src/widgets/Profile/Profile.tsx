import { useSelector } from "react-redux";
import { getUser } from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const Profile = () => {
    const user = useSelector(getUser);

    const formatUserRole = () => {
        if (user.role == E_UserRole.Buyer) {
            return "Покупатель";
        } else if (user.role == E_UserRole.Producer) {
            return "Поставщик";
        }

        return "Модератор";
    };

    const handleSaveProfile = () => {
        // TODO
    };

    const openChangePasswordModal = () => {
        // TODO
    };

    if (!user) {
        return <></>;
    }

    return (
        <>
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
                <Button onClick={handleSaveProfile} variant="contained">
                    Сохранить
                </Button>
                <Button onClick={openChangePasswordModal} variant="outlined">
                    Изменить пароль
                </Button>
            </Box>
        </>
    );
};
