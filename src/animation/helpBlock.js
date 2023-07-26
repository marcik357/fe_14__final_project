export const blockAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export const listAnimation = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 10 },
  transition: { duration: 0.5 },
};

export const itemAnimation = {
  initial: { opacity: 0, x: 0, fontWeight: 400 },
  animate: { opacity: 1, x: 40 },
  exit: { opacity: 0, x: 0 },
  transition: { duration: 0.5 },
};