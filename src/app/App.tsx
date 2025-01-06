import { BrowserRouter } from "react-router-dom";
import AppRouter from "src/app/AppRouter.tsx";
import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";

function App() {
    return (
        <>
            <BrowserRouter basename="/">
                <Reset />
                <div className={styles.root}>
                    <Header />
                    <AppRouter />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
