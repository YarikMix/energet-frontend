// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { PasswordInput } from "shared/PasswordInput/PasswordInput.tsx";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";

type Props = {
    onSubmit: (data: T_UserLoginCreadentials) => void;
};

const LoginForm = ({ onSubmit }: Props) => {
    const form = useForm<T_UserLoginCreadentials>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    return (
        <Paper elevation={10} sx={{ padding: 2 }}>
            <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
            >
                Вход
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    label="Почта"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    name="email"
                    {...register("email", {
                        required: "Поле обязательное",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <PasswordInput register={register} error={errors.password} />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Войти
                </Button>
                <Box fullWidth sx={{ textAlign: "center", mt: 2 }}>
                    <Link component={RouterLink} to="/register">
                        Нет аккаунта? Зарегистрироваться
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default LoginForm;
