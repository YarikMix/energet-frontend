import { useRouteMatch } from "src/app/Router/AppRouter.tsx";
import { Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import getUserRole from "entities/User/model/selectors/getRole.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";

export type T_Tab = {
    id: number;
    path: string;
    label: string;
    needAuth?: boolean;
    roles?: E_UserRole[];
    icon?: React.ReactElement;
};

const Nav = ({ tabs, extraTabs = [], children }) => {
    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const role = useAppSelector(getUserRole);
    const { pathname } = useLocation();

    const routeMatch = useRouteMatch(
        tabs.map((tab) => tab.path).concat(extraTabs)
    );
    let currentTab = routeMatch ? routeMatch.pattern?.path : false;

    if (tabs.find((tab) => tab.extraPaths?.includes(pathname))) {
        currentTab = tabs.find((tab) =>
            tab.extraPaths?.includes(pathname)
        ).path;
    }

    return (
        <Tabs value={currentTab}>
            {tabs.map((route) => (
                <Tab
                    key={route.id}
                    label={route.label}
                    value={route.path}
                    to={route.path}
                    component={Link}
                    icon={route.icon}
                    iconPosition="start"
                    hidden={
                        (route.needAuth !== undefined &&
                            route.needAuth !== isAuthenticated) ||
                        (route.roles && !route.roles.includes(role))
                    }
                />
            ))}
            {children}
        </Tabs>
    );
};

export default Nav;
