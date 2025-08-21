import * as VKID from "@vkid/sdk";
import { handleCheckUser } from "entities/User/lib/slices/UserSlice.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { RefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "src/app/api.ts";

export const useVKID = (buttonRef: RefObject<HTMLElement>) => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            return;
        }

        const container = buttonRef.current;
        if (!container) {
            return;
        }

        const oneTap = new VKID.OneTap();
        oneTap
            .render({ container })
            .on(
                VKID.OneTapInternalEvents.LOGIN_SUCCESS,
                (payload: VKID.AuthResponse) => {
                    const code = payload.code;
                    const deviceId = payload.device_id;

                    VKID.Auth.exchangeCode(code, deviceId)
                        .then((data) => {
                            const accessToken = data.access_token;

                            const body = {
                                access_token: accessToken,
                            };

                            api.post("/auth/vk", body).then(() => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                dispatch(handleCheckUser());
                                navigate("/");
                            });
                        })
                        .catch(() => {
                            console.log("exchangeCode error");
                        });
                }
            );
    }, [buttonRef, dispatch, isAuthenticated, navigate]);
};
