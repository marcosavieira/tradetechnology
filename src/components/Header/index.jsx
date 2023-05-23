import style from "./style.module.css";
import { GetStatus } from "../../services/GetStatus";
import { useEffect, useState } from "react";
import ball from "../../assets/flomar_Football_(soccer).svg";
import { LogoutModal } from "../LogoutModal";
import { ChevronIcon } from "../ChevronIcon";
import { PlacarTimer } from "../PlacarTimer/index";

export const Header = () => {
    const [name, setName] = useState("");
    const apiKey = localStorage.getItem("apiKey");
    const fetch = async () => {
        const response = await GetStatus(apiKey);
        try {
            if (response) {
                setName(response.response.account.firstname);
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
    }, []);

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

                        <PlacarTimer />
                        <div className={style.userProfileWrapper}>
                            <div
                                onClick={() =>
                                    setOptionsModalHidden(!optionsModalHidden)
                                }
                                className={style.containerModal}
                            >
                                <ChevronIcon className={style.profileMenu} />
                                <LogoutModal
                                    openModal={toggleModalStatus}
                                    isHidden={optionsModalHidden}
                                />
                                <span>{name}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={style.loading}>
                            <img src={ball} alt="" />
                        </div>
                    </>
                )}
            </header>
        </>
    );
};
