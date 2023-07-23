import { Logo } from "../Icons";
import LoginForm from "../LoginForm";
import style from "./adminLogin.module.scss"

export function AdminLogin () {
    return (
        <div className={style.container}>
       <div className={style.logo}>
        <Logo />
        <span className={style.title}>CRYPTER</span>
        </div>
        <LoginForm redirectUrl="/admin"/>
        </div>
    )
}