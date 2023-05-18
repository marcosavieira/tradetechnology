import { useNavigate } from "react-router-dom";
import { GetStatus } from "../../services/GetStatus";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

export const Login = () => {
 const { register, handleSubmit } = useForm();
 const navigate = useNavigate();
 const onSubmit = async (data) => {
  GetStatus(data);

  setTimeout(() => {
   if (localStorage.getItem("apiKey")) {
    navigate("/home");
   }
  }, 2000);
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
     <button className={style.loginFormContainerButton} type="submit">
      Login
     </button>
     <p>
      Não tem cadastro?
      <a href="https://dashboard.api-football.com/register">Clique Aqui </a>
     </p>
    </form>
   </div>
  </div>
 );
};
