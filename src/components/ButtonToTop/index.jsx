import { useEffect } from "react";
import { useState } from "react";
import ArrowUp from "../Icons/arrow-up";
import { scrollTo } from "../../utils";
import styles from "./buttonToTop.module.scss";
import { motion, AnimatePresence } from 'framer-motion';
import { buttonAnimation } from "../../animation";

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
        <AnimatePresence>
            {backToTop && (
                <>
                <motion.button {...buttonAnimation} className={styles.button} onClick={() => scrollTo("body")}>
                    <ArrowUp />
                </motion.button>
                </>
            )}
        </AnimatePresence>
    )
}