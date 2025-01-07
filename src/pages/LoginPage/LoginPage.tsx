import { Container } from "@mui/material";
import LoginForm from "src/widgets/LoginForm/LoginForm.tsx";
import { T_UserLoginCreadentials } from "src/widgets/LoginForm/types.ts";
import { handleLogin } from "entities/User/lib/slices/UserSlice.ts";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (data: T_UserLoginCreadentials) => {
        console.log(data);
        dispatch(handleLogin(data));
    };

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
        </Container>
    );
};

export default LoginPage;
