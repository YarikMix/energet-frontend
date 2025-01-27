import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";
import { AppRouter } from "src/app/Router/AppRouter.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { handleCheckUser } from "entities/User/lib/slices/UserSlice.ts";
import { Box, CircularProgress } from "@mui/material";

function App() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const checkUser = async () => {
        setIsLoading(true);
        await dispatch(handleCheckUser());
        setIsLoading(false);
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <>
            <Reset />
            {isLoading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div className={styles.root}>
                    <Header />
                    <AppRouter />
                </div>
            )}
        </>
    );
}

export default App;
