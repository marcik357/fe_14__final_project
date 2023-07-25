import { Link } from "react-router-dom"
import style from "./adminHeader.module.scss"
import { Logo } from "../Icons"

export default function AdminHeader () {
    return (
        <header className={style.header}>
            <div className={style.wrapper}>
        <div className={style.container}>
        <div className={style.section}>
        <Link to="/admin">
                <div className={style.logo}>
                  <Logo />
                  <span className={style.title}>CRYPTER</span>
                </div>
              </Link>
              </div>
        </div>
        </div>
        </header>
    )
}