import { Box, Container } from "@mui/material";
import { handleLogin } from "entities/User/lib/slices/UserSlice.ts";
import { useRef } from "react";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import LoginForm from "src/widgets/LoginForm/LoginForm.tsx";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { useVKID } from "src/widgets/VKID/hooks/useVKID.ts";

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (data: T_UserLoginCreadentials) => {
        dispatch(handleLogin(data));
    };

    const vkidButtonRef = useRef<HTMLDivElement | null>(null);

    useVKID(vkidButtonRef);

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
            <Box ref={vkidButtonRef} sx={{ mt: 2 }} />
        </Container>
    );
};

export default LoginPage;
