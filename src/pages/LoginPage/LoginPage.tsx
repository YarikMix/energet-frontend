import { Container } from "@mui/material";
import LoginForm from "src/widgets/LoginForm/LoginForm.tsx";
import { LoginCreadentials } from "src/widgets/LoginForm/types.ts";

const LoginPage = () => {
    const onSubmit = (data: LoginCreadentials) => {
        console.log(data);
    };

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
        </Container>
    );
};

export default LoginPage;
