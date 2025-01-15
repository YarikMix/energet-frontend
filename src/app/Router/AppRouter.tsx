import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import ItemsPage from "pages/ItemsPage/ItemsPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import { ProfilePage } from "pages/ProfilePage/ProfilePage.tsx";

export const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
};

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ItemsPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/profile/" element={<ProfilePage />} />
        </Routes>
    );
};
