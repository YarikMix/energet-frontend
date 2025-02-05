import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { Box, Button, Container, Stack } from "@mui/material";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { handleLogout } from "entities/User/lib/slices/UserSlice.ts";
import useTabs from "shared/utils/useTabs.tsx";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import * as React from "react";
import { Profile } from "src/widgets/Profile/Profile.tsx";
import { Orders } from "src/widgets/Orders/Orders.tsx";

export const ProfilePage = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const logoutBtnClicked = () => {
        dispatch(handleLogout());
    };

    const tabs = ["Личные данные", "Заказы", "Черновики"];

    const { currentTab, TabsComponent } = useTabs(tabs);

    return (
        <Container sx={{ pt: 5 }}>
            <Stack direction="row" gap={10}>
                <Box width="250px">
                    {TabsComponent({
                        orientation: "vertical",
                        tabHeight: 96,
                    })}
                    <Button
                        onClick={logoutBtnClicked}
                        variant="outlined"
                        sx={{ mt: 5, width: "100%" }}
                    >
                        Выйти
                    </Button>
                </Box>
                <Box width="100%">
                    <TabPanel currentTab={currentTab} index={0}>
                        <Profile />
                    </TabPanel>
                    <TabPanel currentTab={currentTab} index={1}>
                        <Orders />
                    </TabPanel>
                    <TabPanel currentTab={currentTab} index={2}>
                        TODO
                    </TabPanel>
                </Box>
            </Stack>
        </Container>
    );
};
