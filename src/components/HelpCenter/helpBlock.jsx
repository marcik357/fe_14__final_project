// helpBlock.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { OpenList } from "../Icons/open-list.jsx";
import { CloseList } from "../Icons/close-list.jsx";
import { MarkerList } from "../Icons/marker-list-hc.jsx";
import { ArrowRightBlue } from "../Icons/arrow-right-blue.jsx";
import styles from "./helpCenter.module.scss";

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
        className={`${styles.helpCenter__blockButton} ${
          activeBlocks.includes(id) ? styles.helpCenter__active : ""
        }`}
        onClick={() => toggleBlock(id)}
      >
        {title}
        <span>{activeBlocks.includes(id) ? <CloseList /> : <OpenList />}</span>
      </button>
      {activeBlocks.includes(id) && (
        <motion.ul
          className={styles.helpCenter__list}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item) => (
            <li
              key={item.id}
              onMouseEnter={() => handleHoverItem(item.id)}
              onMouseLeave={handleLeaveItem}
            >
              <motion.button
                type="button"
                onClick={() => handleClickItem(item.id)}
                className={`${styles.helpCenter__blockButtonItem} ${
                  activeClickedItem === item.id
                    ? styles.helpCenter__activeItem
                    : ""
                }`}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <span className={styles.helpCenter__blockButtonItemTitle}>
                  {hoveredItemId === item.id ? (
                    <ArrowRightBlue />
                  ) : (
                    <MarkerList />
                  )}
                  {item.title}
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeClickedItem === item.id && <p>{item.content}</p>}
                </motion.div>
              </motion.button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
