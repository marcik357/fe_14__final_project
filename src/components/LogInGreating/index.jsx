import style from './logInGreating.module.scss'
import logInGreatingProps from './logInGreatingProps'

export default function LogInGreating({ type, onClickHandler, classList }) {
  const { title, subtitle, switch_subtitle, button } = logInGreatingProps.find(obj => obj.type === type)
  return (
    <div className={`${style.greating} + ${classList}`}>
      <h3 className={style.greating__title}>{title}</h3>
      <p className={style.greating__subtitle}>{subtitle}</p>
      <p className={style.greating__subtitle}>{switch_subtitle}</p>
      <button
        onClick={() => onClickHandler()}
        className={style.greating__btn}>
        {button}
      </button>
    </div>
  )
}