import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Badge, Container, Tab } from "@mui/material";
import Logo from "assets/logo.svg";
import getUserRole from "entities/User/model/selectors/getRole.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import Nav, { T_Tab } from "src/widgets/Nav/Nav.tsx";
import styles from "./Header.module.scss";

const Header = () => {
    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const role = useAppSelector(getUserRole);
    const order = useAppSelector((state) => state.orderReducer.order);

    const leftTabs: T_Tab[] = [
        {
            id: 1,
            path: "/",
            extraPaths: ["/items/:id", "/items/:id/edit"],
            label: role == E_UserRole.Producer ? "Мои товары" : "Каталог",
        },
        {
            id: 2,
            path: "/configurator",
            label: "Конфигуратор",
            needAuth: true,
            roles: [E_UserRole.Buyer],
        },
        {
            id: 3,
            path: "/orders",
            label: "Заказы",
            needAuth: true,
            roles: [E_UserRole.Moderator],
        },
    ];

    const rightTabs: T_Tab[] = [
        {
            id: 4,
            path: "/profile",
            label: "Профиль",
            needAuth: true,
            icon: <PersonOutlineIcon className={styles.icon} />,
        },
        {
            id: 5,
            path: "/login",
            extraPaths: ["/register"],
            label: "Вход",
            needAuth: false,
            icon: <PersonOutlineIcon className={styles.icon} />,
        },
        {
            id: 6,
            path: "/favourites",
            label: "Избранное",
            needAuth: true,
            roles: [E_UserRole.Buyer],
        },
    ];

    return (
        <Container className={styles.container}>
            <Nav tabs={leftTabs} />

            <Link to="/" className={styles.logo}>
                <img src={Logo as string} alt="" />
            </Link>

            <Nav tabs={rightTabs} extraTabs={["/bin"]}>
                <Tab
                    value="/bin"
                    to="/bin"
                    component={Link}
                    hidden={!isAuthenticated || role !== E_UserRole.Buyer}
                    label="Корзина"
                    sx={{ px: 3 }}
                    icon={
                        <Badge
                            badgeContent={order?.items?.length}
                            color="primary"
                            sx={{ transform: "translateX(45px)" }}
                        ></Badge>
                    }
                />
            </Nav>
        </Container>
    );
};

export default Header;
