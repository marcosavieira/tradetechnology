import style from "./style.module.css";
import { GetStatus } from "../../services/GetStatus";
import { useEffect, useState } from "react";
import ball from "../../assets/flomar_Football_(soccer).svg";
import { LogoutModal } from "../LogoutModal";
import { ChevronIcon } from "../ChevronIcon";

export const Header = () => {
    const [name, setName] = useState("");
    const api = localStorage.getItem("apiKey");
    const fetch = async () => {
        const response = await GetStatus(api);
        try {
            if (response) {
                setTimeout(() => {
                    setName(response);
                }, 3000);
            }
        } catch (error) {
            console.log("", error);
        }
    };

    const useModal = () => {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        const toggleModalStatus = () => {
            setModalIsOpen(!modalIsOpen);
        };

        return {
            modalIsOpen,
            toggleModalStatus,
        };
    };

    const [optionsModalHidden, setOptionsModalHidden] = useState(true);
    const { modalIsOpen, toggleModalStatus } = useModal();

    useEffect(() => {
        fetch();
    });

    /* const ProfileImage = ({ src, name }) => {
        return src !== "" ? (
            <img
                src={src}
                alt="Foto do Usuário"
                className={style.userProfileImage}
            />
        ) : (
            <div className={style.defaultProfileImage}>
                <span className={style.initialNameLetter}>
                    {name.firstname[0].toUpperCase()}
                </span>
            </div>
        );
    }; */

    return (
        <>
            <header>
                {name ? (
                    <>
                        <span>Meu Time</span>
                        {/*   // <span>{name.firstname}</span> */}
                    </>
                ) : (
                    <div className={style.loading}>
                        <img src={ball} alt="" />
                    </div>
                )}
                <div className={style.userProfileWrapper}>
                    {/* <ProfileImage src={""} name={name.firstname} /> */}

                    <div
                        onClick={() =>
                            setOptionsModalHidden(!optionsModalHidden)
                        }
                        style={{ marginRight: "2rem", cursor: "pointer" }}
                    >
                        <ChevronIcon className={style.profileMenu} />
                        <LogoutModal
                            openModal={toggleModalStatus}
                            isHidden={optionsModalHidden}
                        />
                        <span>{name.firstname}</span>
                    </div>
                </div>
            </header>
        </>
    );
};
