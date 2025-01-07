import { Route, Routes } from "react-router-dom";
import Header from "src/widgets/Header/Header.tsx";
import { Reset } from "styled-reset";
import styles from "./App.module.scss";
import ItemsPage from "pages/ItemsPage/ItemsPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";

function App() {
    return (
        <>
            <Reset />
            <div className={styles.root}>
                <Header />
                <Routes>
                    <Route path="/" element={<ItemsPage />} />
                    <Route path="/login/" element={<LoginPage />} />
                    <Route path="/register/" element={<RegisterPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
