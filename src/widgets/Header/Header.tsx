import * as React from "react";
import Logo from "assets/logo.svg";
import styles from "./Header.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useRouteMatch } from "src/app/Router/AppRouter.tsx";

const Header = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);

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

    return (
        <Container className={styles.root}>
            <Tabs value={currentLeftTab}>
                <Tab label="Каталог" value="/" to="/" component={Link} />
                <Tab
                    label="Конфигуратор"
                    value="/configurator/"
                    to="/configurator/"
                    component={Link}
                    hidden={!isAuthenticated}
                />
            </Tabs>

            <Link to="/">
                <img src={Logo as string} className={styles.logo} alt="" />
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
                        label="Корзина"
                        value="/bin"
                        to="/bin"
                        component={Link}
                        hidden={!isAuthenticated}
                    />
                </Tabs>
            </Box>
        </Container>
    );
};

export default Header;
