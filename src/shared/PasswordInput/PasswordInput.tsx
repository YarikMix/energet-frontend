// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export const PasswordInput = ({
    label = "Пароль",
    name = "password",
    register,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <TextField
            label={label}
            name={name}
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            {...register(name, {
                required: "Поле обязательное",
            })}
            error={!!error}
            helperText={error?.message}
        />
    );
};
