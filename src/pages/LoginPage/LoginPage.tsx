import { Box, Container } from "@mui/material";
import * as VKID from "@vkid/sdk";
import { handleLogin } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "src/app/api.ts";
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

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        try {
            const data = JSON.parse(code);

            console.log(data);
            if (data) {
                api.post("/auth/vk", { code: { ...data } });
            }
        } catch (e) {
            console.log("error");
            console.log(e);
        }

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");
        console.log("container");
        if (container) {
            oneTap
                .render({ container })
                .on(VKID.WidgetEvents.ERROR, console.error);
        }
    }, [isAuthenticated]);

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
            <Box id="VkIdSdkOneTap" />
        </Container>
    );
};

export default LoginPage;
