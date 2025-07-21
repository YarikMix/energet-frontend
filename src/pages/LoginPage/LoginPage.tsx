import { Container } from "@mui/material";
import { handleLogin } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import LoginForm from "src/widgets/LoginForm/LoginForm.tsx";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isAuthenticated = useSelector(getIsAuthenticated);

    const onSubmit = (data: T_UserLoginCreadentials) => {
        dispatch(handleLogin(data));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
        </Container>
    );
};

export default LoginPage;
