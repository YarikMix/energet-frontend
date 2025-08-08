import { Box, CircularProgress } from "@mui/material";
import { handleFetchDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { handleCheckUser } from "entities/User/lib/slices/UserSlice.ts";
import getIsBuyer from "entities/User/model/selectors/isBuyer.ts";
import { useEffect, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { AppRouter } from "src/app/Router/AppRouter.tsx";
import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";

function App() {
    const isBuyer = useAppSelector(getIsBuyer);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const checkUser = async () => {
        setIsLoading(true);
        await dispatch(handleCheckUser());
        setIsLoading(false);
    };

    const fetchDraftOrder = async () => {
        dispatch(handleFetchDraftOrder());
    };

    const onAppStarted = async () => {
        await checkUser();
        if (isBuyer) {
            await fetchDraftOrder();
        }
    };

    useEffect(() => {
        onAppStarted();
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
            <button
                onClick={() => {
                    throw new Error("This is your first error!");
                }}
            >
                Break the world
            </button>
        </>
    );
}

export default App;
