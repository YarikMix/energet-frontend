import {
    Box,
    Button,
    CardMedia,
    Container,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useItem } from "entities/Item/api/itemsApi.ts";
import { useSelector } from "react-redux";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import * as React from "react";
import { useState } from "react";

export const ItemPage = () => {
    const { id } = useParams<{ id: string }>();

    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);

    const { data: item, isLoading } = useItem(id as string);

    const [currentTab, setCurrentTab] = useState(0);

    if (isLoading || !item) {
        return <div>isLoading</div>;
    }

    const ItemProperty = ({ name, value }) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {name}
                </Typography>
                <Typography>{value}</Typography>
            </Box>
        );
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
    }

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    };

    const CustomTabPanel = (props: TabPanelProps) => {
        const { children, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={currentTab !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {currentTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    };

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
    };

    return (
        <Container>
            <Box fullWidth sx={{ display: "flex", gap: "58px", mb: 3 }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="400"
                        image={item.image as string}
                        alt="green iguana"
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                    }}
                >
                    <Box mb={2}>
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography
                            variant="h5"
                            sx={{ color: "#319CFF", my: 3 }}
                        >
                            {item.price}₽
                        </Typography>
                        <ItemProperty name="Тип" value={item.item_type.name} />
                        <ItemProperty
                            name="Производитель"
                            value={item.item_producer.name}
                        />
                        <ItemProperty name="Вес" value={item.weight + " кг"} />
                    </Box>
                    {isAuthenticated && user?.role == E_UserRole.Buyer && (
                        <Box fullWidth sx={{ display: "flex", gap: "14px" }}>
                            <Button
                                variant="contained"
                                sx={{ display: "flex", flex: 1 }}
                            >
                                В корзину
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ display: "flex", flex: 1 }}
                            >
                                В избранное
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box>
                <Tabs value={currentTab} onChange={handleChange}>
                    <Tab label="Особенности" {...a11yProps(0)} />
                    <Tab label="Характеристики" {...a11yProps(1)} />
                    <Tab label="Документация" {...a11yProps(2)} />
                </Tabs>
                <CustomTabPanel index={0} sx={{ overflow: "hidden" }}>
                    TODO
                </CustomTabPanel>
                <CustomTabPanel index={1}>
                    <Box sx={{ width: "400px" }}>
                        <ItemProperty name="Тип" value={item.item_type.name} />
                        <ItemProperty
                            name="Производитель"
                            value={item.item_producer.name}
                        />
                        <ItemProperty name="Вес" value={item.weight + " кг"} />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel index={2}>TODO</CustomTabPanel>
            </Box>
        </Container>
    );
};
