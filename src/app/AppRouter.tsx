import ItemsPage from "pages/ItemsPage/ItemsPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
        </Routes>
    );
};

export default AppRouter;
