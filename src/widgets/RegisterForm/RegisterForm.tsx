import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { PasswordInput } from "shared/PasswordInput/PasswordInput.tsx";
import { useForm } from "react-hook-form";
import { T_UserRegisterCredentials } from "src/widgets/RegisterForm/types.ts";
import UserRoleSelector from "shared/UserRoleSelector/UserRoleSelector.tsx";
import { E_UserRole } from "entities/User/model/types/User.ts";

type Props = {
    onSubmit: (data: T_UserRegisterCredentials) => void;
};

const RegisterForm = ({ onSubmit }: Props) => {
    const form = useForm<T_UserRegisterCredentials>({
        defaultValues: {
            phone: "",
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            role: E_UserRole.Buyer,
        },
    });

    const { register, handleSubmit, formState, control } = form;

    const { errors } = formState;

    return (
        <Paper elevation={10} sx={{ padding: 2 }}>
            <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
            >
                Регистрация
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    label="Имя"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    name="name"
                    {...register("name", {
                        required: "Поле обязательное",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
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
                <TextField
                    label="Телефон"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    name="phone"
                    {...register("phone", {
                        required: "Поле обязательное",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <PasswordInput
                    label="Пароль"
                    name="password"
                    register={register}
                    error={errors.password}
                />
                <PasswordInput
                    label="Повторите пароль"
                    name="repeatPassword"
                    register={register}
                    error={errors.repeatPassword}
                />
                <UserRoleSelector control={control} />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Зарегистрироваться
                </Button>
                <Box fullWidth sx={{ textAlign: "center", mt: 2 }}>
                    <Link component={RouterLink} to="/login">
                        Уже есть аккаунт? Войти
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default RegisterForm;
