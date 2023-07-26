import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpenList } from "../Icons/open-list.jsx";
import { CloseList } from "../Icons/close-list.jsx";
import { MarkerList } from "../Icons/marker-list-hc.jsx";
import { ArrowRightBlue } from "../Icons/arrow-right-blue.jsx";
import styles from "./helpBlock.module.scss";
import { blockAnimation, itemAnimation, listAnimation } from "../../animation/helpBlock.js";

export default function HelpBlock({
  blockData,
  activeBlocks,
  activeClickedItem,
  toggleBlock,
  handleClickItem,
}) {
  const { id, title, items } = blockData;
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleHoverItem = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleLeaveItem = () => {
    setHoveredItemId(null);
  };

  return (
    <div className={styles.helpInfo}>
      <button
        type="button"
        className={`${styles.helpInfo__block} ${activeBlocks.includes(id) && styles.helpInfo__block_active}`}
        onClick={() => toggleBlock(id)}>
        {title}
        <span>{activeBlocks.includes(id) ? <CloseList /> : <OpenList />}</span>
      </button>
      <AnimatePresence>
        {activeBlocks.includes(id) && (
          <motion.div
            className={styles.helpInfo__wrapper}
            {...blockAnimation}>
            <motion.ul
              className={styles.helpInfo__list}
              {...listAnimation}>
              {items.map((item) => (
                <li
                  className={styles.helpInfo__item}
                  key={item.id}
                  onMouseEnter={() => handleHoverItem(item.id)}
                  onMouseLeave={handleLeaveItem}>
                  <motion.button
                    type="button"
                    onClick={() => handleClickItem(item.id)}
                    className={`${styles.helpInfo__question} ${styles.question} ${activeClickedItem === item.id && styles.question_active}`}>
                    <span className={styles.question__title}>
                      {hoveredItemId === item.id
                        ? <ArrowRightBlue />
                        : <MarkerList />}
                      {item.title}
                    </span>
                    <AnimatePresence>
                      {activeClickedItem === item.id && (
                        <motion.p
                          className={styles.question__text}
                          {...itemAnimation}>
                          {item.content}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
