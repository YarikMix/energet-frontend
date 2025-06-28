// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Tab, Tabs } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import { a11yProps } from "shared/utils/a11yProps.tsx";

interface TabsComponentProps {
    orientation?: "horizontal" | "vertical";
    tabHeight?: string | number;
}

const useTabs = (tabs: string[]) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
    };

    const TabsComponent = ({
        orientation = "horizontal",
        tabHeight = "auto",
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
            </Tabs>
        );
    };

    return {
        currentTab,
        TabsComponent,
    };
};

export default useTabs;
