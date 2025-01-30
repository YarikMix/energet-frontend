import * as React from "react";
import Logo from "assets/logo.svg";
import styles from "./Header.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { Badge, Box, Container, Tab, Tabs } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useRouteMatch } from "src/app/Router/AppRouter.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { handleFetchDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";

const Header = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const dispatch = useAppDispatch();

    const leftTabs = ["/", "/configurator"];
    const leftRouteMatch = useRouteMatch(leftTabs);
    const currentLeftTab = leftRouteMatch
        ? leftRouteMatch.pattern?.path
        : false;

    const rightTabs = [
        "/profile",
        "/favourites",
        "/login",
        "/register",
        "/bin",
    ];
    const rightRouteMatch = useRouteMatch(rightTabs);
    let currentRightTab = rightRouteMatch
        ? rightRouteMatch.pattern?.path
        : false;
    if (currentRightTab === "/register" || currentRightTab === "/login") {
        currentRightTab = "/auth";
    }

    const items_count = useSelector((state) => state.orderReducer.items_count);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(handleFetchDraftOrder());
        }
    }, [isAuthenticated]);

    return (
        <Container
            sx={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
            }}
            fullWidth
        >
            <Tabs value={currentLeftTab}>
                <Tab label="Каталог" value="/" to="/" component={Link} />
                <Tab
                    label="Конфигуратор"
                    value="/configurator"
                    to="/configurator"
                    component={Link}
                    hidden={!isAuthenticated}
                />
            </Tabs>

            <Link to="/">
                <img src={Logo as string} alt="" />
            </Link>

            <Box>
                <Tabs value={currentRightTab}>
                    <Tab
                        label="Профиль"
                        value="/profile"
                        to="/profile"
                        component={Link}
                        hidden={!isAuthenticated}
                        icon={<PersonOutlineIcon className={styles.icon} />}
                        iconPosition="start"
                    />
                    <Tab
                        label="Вход"
                        value="/auth"
                        to="/login"
                        component={Link}
                        hidden={isAuthenticated}
                        icon={<PersonOutlineIcon className={styles.icon} />}
                        iconPosition="start"
                    />
                    <Tab
                        label="Избранное"
                        value="/favourites"
                        to="/favourites"
                        component={Link}
                        hidden={!isAuthenticated}
                        icon={
                            <FavoriteBorderOutlined className={styles.icon} />
                        }
                        iconPosition="start"
                    />
                    <Tab
                        value="/bin"
                        to="/bin"
                        component={Link}
                        hidden={!isAuthenticated}
                        sx={{ px: 3 }}
                        icon={
                            <Badge
                                badgeContent={items_count}
                                color="primary"
                                className={styles.test}
                                sx={{ transform: "translateX(45px)" }}
                            ></Badge>
                        }
                        label={"Корзина"}
                    />
                </Tabs>
            </Box>
        </Container>
    );
};

export default Header;
