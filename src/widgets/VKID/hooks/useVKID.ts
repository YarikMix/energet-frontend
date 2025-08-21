import * as VKID from "@vkid/sdk";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useVKID = (buttonRef: RefObject<HTMLElement>) => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const navigate = useNavigate();

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
                            console.log("exchangeCode success");
                            console.log("data", data);
                        })
                        .catch(() => {
                            console.log("exchangeCode error");
                        });
                }
            );
    }, [buttonRef, isAuthenticated, navigate]);
};
