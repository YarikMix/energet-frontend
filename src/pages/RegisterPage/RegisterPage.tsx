import { Container } from "@mui/material";
import RegisterForm from "src/widgets/RegisterForm/RegisterForm.tsx";
import { RegisterCredentials } from "src/widgets/RegisterForm/types.ts";

const RegisterPage = () => {
    const onSubmit = (data: RegisterCredentials) => {
        console.log(data);
    };

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <RegisterForm onSubmit={onSubmit} />
        </Container>
    );
};

export default RegisterPage;
