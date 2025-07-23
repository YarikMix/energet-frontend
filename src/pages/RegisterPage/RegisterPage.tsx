import { Container } from "@mui/material";
import { handleRegister } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import RegisterForm from "src/widgets/RegisterForm/RegisterForm.tsx";
import { T_UserRegisterCredentials } from "src/widgets/RegisterForm/types.ts";

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
    }, [isAuthenticated]);

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <RegisterForm onSubmit={onSubmit} />
        </Container>
    );
};

export default RegisterPage;
