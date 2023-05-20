import { useNavigate } from "react-router-dom";

import { LogoutIcon } from "../../assets/LogoutIcon";

import style from "./style.module.css";

export function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        return navigate("/");
    };

    return (
        <div to="/" className={style.defaultIconButton} onClick={handleLogout}>
            <LogoutIcon />
            <p>Sair</p>
        </div>
    );
}
