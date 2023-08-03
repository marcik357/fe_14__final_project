import { createContext, useContext, useEffect, useState } from "react";
import {  onAuthStateChanged,RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase';

const PhoneAuthContext = createContext();

export function PhoneAuthContextProvider({children}){
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          // console.log("Auth", currentuser);
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);///под вопросом

    function setupRecaptcha(number) {
        const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {});
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth,number,recaptchaVerifier)
      }
      return (
        <PhoneAuthContext.Provider value={{setupRecaptcha}}>
             {children}
        </PhoneAuthContext.Provider>
      )
}

export function useUserAuth() {
    return useContext(PhoneAuthContext);
  }