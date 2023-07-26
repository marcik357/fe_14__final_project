import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpenList } from "../Icons/open-list.jsx";
import { CloseList } from "../Icons/close-list.jsx";
import { MarkerList } from "../Icons/marker-list-hc.jsx";
import { ArrowRightBlue } from "../Icons/arrow-right-blue.jsx";
import styles from "./helpCenter.module.scss";
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
    <div className={styles.helpCenter__infoBlock}>
      <button
        type="button"
        className={`${styles.helpCenter__blockButton} ${activeBlocks.includes(id) && styles.helpCenter__active}`}
        onClick={() => toggleBlock(id)}>
        {title}
        <span>{activeBlocks.includes(id) ? <CloseList /> : <OpenList />}</span>
      </button>
      <AnimatePresence>
        {activeBlocks.includes(id) && (
          <motion.div
            className={styles.helpCenter__listContainer}
            {...blockAnimation}>
            <motion.ul
              className={styles.helpCenter__list}
              {...listAnimation}>
              {items.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => handleHoverItem(item.id)}
                  onMouseLeave={handleLeaveItem}>
                  <motion.button
                    type="button"
                    onClick={() => handleClickItem(item.id)}
                    className={`${styles.helpCenter__blockButtonItem} ${activeClickedItem === item.id && styles.helpCenter__activeItem}`}>
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItemId === item.id
                        ? <ArrowRightBlue />
                        : <MarkerList />}
                      {item.title}
                    </span>
                    <AnimatePresence>
                      {activeClickedItem === item.id && (
                        <motion.p {...itemAnimation}>
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
