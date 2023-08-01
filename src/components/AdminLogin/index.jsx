import AdminHeader from "../AdminHeader";
import { Logo } from "../Icons";
import LoginForm from "../LoginForm";
import style from "./adminLogin.module.scss"

export function AdminLogin() {
  return (
    <>
      <AdminHeader />
      <div className={style.adminLogin}>
        <LoginForm redirectUrl="/admin" />
      </div>
    </>
  )
}