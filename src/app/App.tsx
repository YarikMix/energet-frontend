import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";
import { AppRouter } from "src/app/Router/AppRouter.tsx";

function App() {
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
