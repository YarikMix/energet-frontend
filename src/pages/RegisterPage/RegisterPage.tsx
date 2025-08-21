import { Box, Container } from "@mui/material";
import { handleRegister } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import RegisterForm from "src/widgets/RegisterForm/RegisterForm.tsx";
import { T_UserRegisterCredentials } from "src/widgets/RegisterForm/types.ts";
import { useVKID } from "src/widgets/VKID/hooks/useVKID.ts";

const RegisterPage = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isAuthenticated = useSelector(getIsAuthenticated);

    const onSubmit = (data: T_UserRegisterCredentials) => {
        dispatch(handleRegister(data));
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
            <RegisterForm onSubmit={onSubmit} />
            <Box ref={vkidButtonRef} sx={{ mt: 2 }} />
        </Container>
    );
};

export default RegisterPage;
