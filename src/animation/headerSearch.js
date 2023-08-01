export const wrapperAnimation = {
  initial:{opacity: 0},
  animate:{opacity: 1, transition: {delay: 0.1, duration: 0.6, ease: "easeOut" }},
  exit:{opacity: 0, transition: {delay: 0.7, duration: 0.3, ease: "easeIn"}}
 };

export const containerAnimation = {
  initial:{opacity: 0, height: 0},
  animate:{opacity: 1, transition: {delay: 0.2, duration: 0.6, ease: "easeOut"}, height: 'auto'},
  exit:{opacity: 0, transition: {delay: 0.5, duration: 0.3, ease: "easeIn" }, height: 'auto'}
 };

export const bodyAnimation = (index) => ({
  initial:{ opacity: 0, y: -20 },
  animate:{ opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.2, duration: 0.4, ease: "easeOut" }},
  exit:{ opacity: 0, y: -20, transition: { delay: 0.2 + index * 0.2, duration: 0.3, ease: "easeIn"}}
 });

export const linkAnimation = (index) => ({
  initial:{ opacity: 0, y: -20 },
  animate:{ opacity: 1, y: 0, transition: { delay: 0.4 + index * 0.2, duration: 0.4, ease: "easeOut" } },
  exit:{ opacity: 0, y: -20, transition: {delay: 0.08 + index * 0.2, duration: 0.3, ease: "easeIn" } }
 });