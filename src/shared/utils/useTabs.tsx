import React, { ReactNode, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { a11yProps } from "shared/utils/a11yProps.tsx";
import { withStyles } from "@mui/styles";

interface TabsComponentProps {
    orientation?: "horizontal" | "vertical";
    tabHeight?: string | number;
    extraChild?: ReactNode;
}

const useTabs = (tabs: string[]) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
    };

    const TabsComponent = ({
        orientation = "horizontal",
        tabHeight = "auto",
        extraChild,
    }: TabsComponentProps) => {
        const StyledTab = withStyles({
            root: {
                height: tabHeight,
            },
        })(Tab);

        return (
            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                orientation={orientation}
                TabIndicatorProps={{
                    style: {
                        display: orientation == "horizontal" ? "block" : "none",
                    },
                }}
            >
                {tabs.map((name, idx) => (
                    <StyledTab label={name} {...a11yProps(idx)} key={idx} />
                ))}
                {React.isValidElement(extraChild) && extraChild}
            </Tabs>
        );
    };

    return {
        currentTab,
        TabsComponent,
    };
};

export default useTabs;
