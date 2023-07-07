import React, { useState } from "react";
import { OpenList } from "../Icons/open-list";
import { CloseList } from "../Icons/close-list";
import { MarkerList } from "../Icons/marker-list-hc";
import cube from "../../img/cube.png";
import styles from "./helpCenter.module.scss";

export function HelpCenter() {
  const [activeBlocks, setActiveBlocks] = useState([]);

  const toggleBlock = (block) => {
    if (activeBlocks.includes(block)) {
      setActiveBlocks(
        activeBlocks.filter((activeBlock) => activeBlock !== block)
      );
    } else {
      setActiveBlocks([...activeBlocks, block]);
    }
  };

  return (
    <div className={styles.helpCenter}>
      <div className={styles.helpCenter__content}>
        <div className={styles.helpCenter__cubeBlockWrapper}>
          <div className={styles.helpCenter__cubeBlock}>
            <h2>Gettings started on Crypter</h2>
            <img src={cube} alt="cube" />
          </div>
        </div>
        <div className={styles.helpCenter__infoBlockList}>
          <div className={styles.helpCenter__infoBlock}>
            <button
              type="button"
              className={`${styles.helpCenter__blockButton} ${
                activeBlocks.includes(1) ? styles.helpCenter__active : ""
              }`}
              onClick={() => toggleBlock(1)}
            >
              Buying
              <span>
                {activeBlocks.includes(1) ? <CloseList /> : <OpenList />}
              </span>
            </button>
            {activeBlocks.includes(1) && (
              <ul className={styles.helpCenter__list}>
                <li><MarkerList />Connect your wallet to Crypter</li>
                <li><MarkerList />Guide to collection NFT artworks on Crypter</li>
                <li><MarkerList />Marketplace balance</li>
                <li><MarkerList />Marketplace fees</li>
                <li><MarkerList />What is offer price?</li>
              </ul>
            )}
          </div>
          <div className={styles.helpCenter__infoBlock}>
            <button
              type="button"
              className={`${styles.helpCenter__blockButton} ${
                activeBlocks.includes(2) ? styles.helpCenter__active : ""
              }`}
              onClick={() => toggleBlock(2)}
            >
              Selling
              <span>
                {activeBlocks.includes(2) ? <CloseList /> : <OpenList />}
              </span>
            </button>
            {activeBlocks.includes(2) && (
              <ul className={styles.helpCenter__list}>
                <li><MarkerList />Connect your wallet to Crypter</li>
                <li><MarkerList />Guide to collection NFT artworks on Crypter</li>
                <li><MarkerList />Marketplace balance</li>
                <li><MarkerList />Marketplace fees</li>
                <li><MarkerList />What is offer price?</li>
              </ul>
            )}
          </div>
          <div className={styles.helpCenter__infoBlock}>
            <button
              type="button"
              className={`${styles.helpCenter__blockButton} ${
                activeBlocks.includes(3) ? styles.helpCenter__active : ""
              }`}
              onClick={() => toggleBlock(3)}
            >
              Creating
              <span>
                {activeBlocks.includes(3) ? <CloseList /> : <OpenList />}
              </span>
            </button>
            {activeBlocks.includes(3) && (
              <ul className={styles.helpCenter__list}>
                <li><MarkerList />Connect your wallet to Crypter</li>
                <li><MarkerList />Guide to collection NFT artworks on Crypter</li>
                <li><MarkerList />Marketplace balance</li>
                <li><MarkerList />Marketplace fees</li>
                <li><MarkerList />What is offer price?</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
