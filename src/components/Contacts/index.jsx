import LoginForm from '../../components/LoginForm';
import SignUpForm from '../../components/SignUpForm';
import { useState } from 'react';
import style from './index.module.scss';

export function Contacts() {
    const [isNewUser, setIsNewUser] = useState(true);
    return (
        <>
        <div className={style.contacts__btn}  >
        <button
         className={isNewUser? style.active__btn :""}
         onClick={()=>(setIsNewUser(true))}>Login user</button>
        <button
        className={!isNewUser? style.active__btn :""}
        onClick={()=>(setIsNewUser(false))}>New user</button>
        </div>
        {isNewUser ? <LoginForm /> : <SignUpForm />}
        </>
    )
}