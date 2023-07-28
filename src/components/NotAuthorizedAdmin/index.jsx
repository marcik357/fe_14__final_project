import { Link } from "react-router-dom"
import { Arrow } from "../Icons"
import style from "./notAuthorizedAdmin.module.scss"

export function NotAuthorizedAdmin() {
  return (
    <div className={style.notAuthorized}>
      <Link to={"/"} className={style.notAuthorized__link}>
        <Arrow className={style.notAuthorized__arrow} />
        <p>Back to Home</p>
      </Link>
      <div className={style.notAuthorized__message}>You don't have enough rights</div>
    </div>
  );
}
