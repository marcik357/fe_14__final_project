export const modalAnimation = {
   initial: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
   animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%", transition: { delay: 0.1, duration: 0.3, ease: "easeOut" } },
   exit: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%", transition: { delay: 0.2, duration: 0.5, ease: "easeIn" } }
};