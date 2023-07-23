import { Link } from "react-router-dom"
import { Arrow } from "../Icons"
import style from "./notAuthorizedAdmin.module.scss"

export function NotAuthorizedAdmin() {
  return (
    <div className={style.container}>
      <Link to={"/"} className={style.link}>
        <Arrow className={style.arrow} />
        <p>Back to Home</p>
      </Link>
      <div className={style.message}>You are not authorized to access this page.</div>
    </div>
  );
}
