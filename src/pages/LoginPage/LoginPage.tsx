import { Box, Container } from "@mui/material";
import { handleLogin } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import LoginForm from "src/widgets/LoginForm/LoginForm.tsx";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { useVKID } from "src/widgets/VKID/hooks/useVKID.ts";

const LoginPage = () => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector(getIsAuthenticated);

    const dispatch = useAppDispatch();

    const onSubmit = (data: T_UserLoginCreadentials) => {
        dispatch(handleLogin(data));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

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
