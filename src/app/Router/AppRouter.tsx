import { BinPage } from "pages/BinPage/BinPage.tsx";
import { ConfiguratorPage } from "pages/ConfiguratorPage/ConfiguratorPage.tsx";
import { FavouritesPage } from "pages/FavouritesPage/FavouritesPage.tsx";
import { ItemAddPage } from "pages/ItemAddPage/ItemAddPage.tsx";
import ItemEditPage from "pages/ItemEditPage/ItemEditPage.tsx";
import { ItemPage } from "pages/ItemPage/ItemPage.tsx";
import ItemsPage from "pages/ItemsPage/ItemsPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import { OrdersTablePage } from "pages/OrdersTablePage/OrdersTablePage.tsx";
import { ProfilePage } from "pages/ProfilePage/ProfilePage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";

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
            <Route path="/add_item" element={<ItemAddPage />} />
            <Route path="/items/:id/edit" element={<ItemEditPage />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/profile/" element={<ProfilePage />} />
            <Route path="/configurator/" element={<ConfiguratorPage />} />
            <Route path="/favourites/" element={<FavouritesPage />} />
            <Route path="/bin/" element={<BinPage />} />
            <Route path="/orders" element={<OrdersTablePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
