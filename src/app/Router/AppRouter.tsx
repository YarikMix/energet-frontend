import {
    matchPath,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import ItemsPage from "pages/ItemsPage/ItemsPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import { ProfilePage } from "pages/ProfilePage/ProfilePage.tsx";
import { ItemPage } from "pages/ItemPage/ItemPage.tsx";
import { BinPage } from "pages/BinPage/BinPage.tsx";
import { FavouritesPage } from "pages/FavouritesPage/FavouritesPage.tsx";
import { ConfiguratorPage } from "pages/ConfiguratorPage/ConfiguratorPage.tsx";

export const useRouteMatch = (patterns: readonly string[]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/profile/" element={<ProfilePage />} />
            <Route path="/configurator/" element={<ConfiguratorPage />} />
            <Route path="/favourites/" element={<FavouritesPage />} />
            <Route path="/bin/" element={<BinPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
};
