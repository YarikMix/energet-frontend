import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";
import { AppRouter } from "src/app/Router/AppRouter.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { handleCheckUser } from "entities/User/lib/slices/UserSlice.ts";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(handleCheckUser());
    }, []);

    return (
        <>
            <Reset />
            <div className={styles.root}>
                <Header />
                <AppRouter />
            </div>
        </>
    );
}

export default App;
