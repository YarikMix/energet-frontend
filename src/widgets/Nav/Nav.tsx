import { useRouteMatch } from "src/app/Router/AppRouter.tsx";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
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

    const routeMatch = useRouteMatch([
        ...extraTabs,
        ...tabs.flatMap((tab) => [tab.path, ...(tab.extraPaths || [])]),
    ]);

    let currentTab = routeMatch ? routeMatch.pattern?.path : false;

    const foundTab = tabs.find((tab) => tab.extraPaths?.includes(currentTab));
    if (foundTab) {
        currentTab = foundTab.path;
    }

    const isHidden = (tab: T_Tab) =>
        (tab.needAuth !== undefined && tab.needAuth !== isAuthenticated) ||
        (tab.roles && !tab.roles.includes(role));

    return (
        <Tabs value={currentTab}>
            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    label={tab.label}
                    value={tab.path}
                    to={tab.path}
                    component={Link}
                    icon={tab.icon}
                    iconPosition="start"
                    hidden={isHidden(tab)}
                />
            ))}
            {children}
        </Tabs>
    );
};

export default Nav;
