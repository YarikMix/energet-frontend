import { Box } from "@mui/material";
import * as React from "react";

interface TabPanelProps {
    currentTab: number;
    children?: React.ReactNode;
    index: number;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, index, currentTab, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={currentTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {currentTab === index && <Box>{children}</Box>}
        </div>
    );
};
