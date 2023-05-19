import style from "./style.module.css";
import { GetStatus } from "../../services/GetStatus";
import { useEffect, useState } from "react";
import ball from "../../assets/flomar_Football_(soccer).svg";

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
    useEffect(() => {
        fetch();
    });

    return (
        <>
            {name ? (
                <header>
                    <span>Meu Time</span>
                    <span>{name.firstname}</span>
                </header>
            ) : (
                <div className={style.loading}>
                    <img src={ball} alt="" />
                </div>
            )}
        </>
    );
};
