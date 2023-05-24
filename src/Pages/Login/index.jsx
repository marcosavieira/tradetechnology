import { useNavigate } from "react-router-dom";
import { GetStatus } from "../../services/GetStatus";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await GetStatus(data.apiKey);
            const notify = (msg) => {
                if (msg === "sucess") {
                    toast.success("Login Efetuado !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                if (msg === "error") {
                    toast.error("Api Key inválida !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            };
            if (response.errors.length === 0) {
                notify("sucess");
            } else {
                notify("error");
            }
            if (localStorage.length > 0) {
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.container}>
            <ToastContainer />
            <div className={style.sidebarBackground} />
            <div className={style.loginFormContainer}>
                <h1>Meu Time</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="apiKey">Autenticação</label>
                    <input
                        name="apiKey"
                        placeholder="Api key"
                        {...register("apiKey", { required: true })}
                    />
                    <button
                        className={style.loginFormContainerButton}
                        type="submit"
                    >
                        Login
                    </button>
                    <p>
                        Não tem cadastro?
                        <a href="https://dashboard.api-football.com/register">
                            Clique Aqui{" "}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};
