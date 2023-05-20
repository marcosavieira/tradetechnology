import { LogoutButton } from "../LogoutButton/index";

import style from "./style.module.css";

export const LogoutModal = ({ openModal, isHidden }) => {
    return (
        <div className={`${style.modalWrapper} ${isHidden && style.hidden}`}>
            <div className={style.modalTriangle} />
            <div className={style.modalContent}>
                <LogoutButton />
            </div>
        </div>
    );
};
