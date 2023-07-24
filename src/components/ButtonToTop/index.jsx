import { useEffect } from "react";
import { useState } from "react";
import ArrowUp from "../Icons/arrow-up";
import { scrollTo } from "../../utils";
import styles from "./buttonToTop.module.scss";

export default function BackToTopButton(){
    const [backToTop, setBacktoTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setBacktoTop(true)
            } else {
                setBacktoTop(false)
            }
        })
    }, [])

    return (
        <>
            {backToTop && (
                <>
                <button className={styles.button} onClick={() => scrollTo("body")}>
                    <ArrowUp />
                </button>
                </>
            )}
        </>
    )
}