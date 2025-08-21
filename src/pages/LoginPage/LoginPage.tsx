import { Box, Container } from "@mui/material";
import * as VKID from "@vkid/sdk";
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

        const oneTap = new VKID.OneTap();
        const container = document.getElementById("VkIdSdkOneTap");
        if (container) {
            oneTap
                .render({ container })
                .on(
                    VKID.OneTapInternalEvents.LOGIN_SUCCESS,
                    (payload: VKID.AuthResponse) => {
                        const code = payload.code;
                        const deviceId = payload.device_id;

                        VKID.Auth.exchangeCode(code, deviceId)
                            .then((data) => {
                                console.log("exchangeCode success");
                                console.log("data", data);
                            })
                            .catch(() => {
                                console.log("exchangeCode error");
                            });
                    }
                );
        }
    }, [isAuthenticated]);

    return (
        <Container maxWidth="xs" sx={{ pt: 8 }}>
            <LoginForm onSubmit={onSubmit} />
            <Box id="VkIdSdkOneTap" sx={{ mt: 2 }} />
        </Container>
    );
};

export default LoginPage;
