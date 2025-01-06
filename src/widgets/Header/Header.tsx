import * as React from "react";
import Logo from "assets/logo.svg";
import styles from "./Header.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.root}>
            <Link
                className={styles.auth_link}
                to="/login"
                style={{ textDecoration: "none" }}
            >
                <PersonOutlineIcon className={styles.auth_link__icon} />
                <div className={styles.auth_link__text}>
                    <span>Вход в личный кабинет</span>
                </div>
            </Link>
            <Link to="/">
                <img src={Logo as string} className={styles.logo} alt="" />
            </Link>
        </div>
    );
};

export default Header;
