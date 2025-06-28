// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Button, Container, Stack } from "@mui/material";
import { handleLogout } from "entities/User/lib/slices/UserSlice.ts";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import getIsBuyer from "entities/User/model/selectors/isBuyer.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTabs from "shared/utils/useTabs.tsx";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { ConfiguratorDrafts } from "src/widgets/ConfiguratorDrafts/ConfiguratorDrafts.tsx";
import { Orders } from "src/widgets/Orders/Orders.tsx";
import { Profile } from "src/widgets/Profile/Profile.tsx";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";

export const ProfilePage = () => {
    const isBuyer = useSelector(getIsBuyer);
    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);

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

    const tabs = ["Личные данные"];

    if (isBuyer) {
        tabs.push("Заказы", "Черновики");
    }

    const { currentTab, TabsComponent } = useTabs(tabs);

    if (!user || !isAuthenticated) {
        return null;
    }

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
                    <TabPanel
                        currentTab={currentTab}
                        index={2}
                        style={{ height: "100%" }}
                    >
                        <ConfiguratorDrafts />
                    </TabPanel>
                </Box>
            </Stack>
        </Container>
    );
};
