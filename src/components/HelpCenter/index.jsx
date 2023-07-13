import React, { useState } from "react";
import { OpenList } from "../Icons/open-list";
import { CloseList } from "../Icons/close-list";
import { MarkerList } from "../Icons/marker-list-hc";
import { ArrowRightBlue } from "../Icons/arrow-right-blue";
import styles from "./helpCenter.module.scss";

export function HelpCenter() {
  const [activeBlocks, setActiveBlocks] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const toggleBlock = (block) => {
    if (activeBlocks.includes(block)) {
      setActiveBlocks(
        activeBlocks.filter((activeBlock) => activeBlock !== block)
      );
      setClickedItem(null);
    } else {
      setActiveBlocks([...activeBlocks, block]);
    }
  };

  const handleClickItem = (block) => {
    if (clickedItem === block) {
      setClickedItem(null);
    } else {
      setClickedItem(block);
    }
  };

  return (
    <div className={styles.helpCenter}>
      <div className={styles.helpCenter__content}>
        <div className={styles.helpCenter__cubeBlockWrap}>
          <div className={styles.helpCenter__cubeBlock}>
            <h2>Gettings started on Crypter</h2>
            <img src='/images/banners/cube.png' alt="cube" />
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
                <li
                  onMouseEnter={() => setHoveredItem(1)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(1)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 1 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 1 ? <ArrowRightBlue /> : <MarkerList />}
                      Connect your wallet to Crypter
                    </span>
                    {clickedItem === 1 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(2)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(2)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 2 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 2 ? <ArrowRightBlue /> : <MarkerList />}
                      Guide to collection NFT artworks on Crypter
                    </span>
                    {clickedItem === 2 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(3)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(3)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 3 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 3 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace balance
                    </span>
                    {clickedItem === 3 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(4)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(4)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 4 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 4 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace fees
                    </span>
                    {clickedItem === 4 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(5)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(5)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 5 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 5 ? <ArrowRightBlue /> : <MarkerList />}
                      What is offer price?
                    </span>
                    {clickedItem === 5 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
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
                <li
                  onMouseEnter={() => setHoveredItem(6)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(6)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 6 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 6 ? <ArrowRightBlue /> : <MarkerList />}
                      Connect your wallet to Crypter
                    </span>
                    {clickedItem === 6 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(7)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(7)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 7 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 7 ? <ArrowRightBlue /> : <MarkerList />}
                      Guide to collection NFT artworks on Crypter
                    </span>
                    {clickedItem === 7 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(8)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(8)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 8 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 8 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace balance
                    </span>
                    {clickedItem === 8 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(9)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(9)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 9 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 9 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace fees
                    </span>
                    {clickedItem === 9 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(10)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(10)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 10 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 10 ? <ArrowRightBlue /> : <MarkerList />}
                      What is offer price?
                    </span>
                    {clickedItem === 10 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
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
                             <li
                  onMouseEnter={() => setHoveredItem(11)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(11)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 11 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 11 ? <ArrowRightBlue /> : <MarkerList />}
                      Connect your wallet to Crypter
                    </span>
                    {clickedItem === 11 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(12)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(12)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 12 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 12 ? <ArrowRightBlue /> : <MarkerList />}
                      Guide to collection NFT artworks on Crypter
                    </span>
                    {clickedItem === 12 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(13)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(13)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 13 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 13 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace balance
                    </span>
                    {clickedItem === 13 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(14)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(14)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 14 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 14 ? <ArrowRightBlue /> : <MarkerList />}
                      Marketplace fees
                    </span>
                    {clickedItem === 14 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
                <li
                  onMouseEnter={() => setHoveredItem(15)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleClickItem(15)}
                    className={`${styles.helpCenter__blockButtonItem} ${
                      clickedItem === 15 ? styles.helpCenter__activeItem : ""
                    }`}
                  >
                    <span className={styles.helpCenter__blockButtonItemTitle}>
                      {hoveredItem === 15 ? <ArrowRightBlue /> : <MarkerList />}
                      What is offer price?
                    </span>
                    {clickedItem === 15 && (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed consequuntur beatae facilis, iusto incidunt quaerat
                        suscipit veniam repudiandae, est possimus quo corrupti
                        saepe ea officia illum vero unde sint vel.
                      </p>
                    )}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
