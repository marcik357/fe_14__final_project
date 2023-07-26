import React, { useState } from "react";
import styles from "./helpCenter.module.scss";
import HelpBlock from "./helpBlock.jsx";

const helpBlocksData = [
  {
    id: 1,
    title: "Buying",
    items: [
      {
        id: 1,
        title: "Connect your wallet to Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 2,
        title: "Guide to collection NFT artworks on Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 3,
        title: "Marketplace balance",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 4,
        title: "Marketplace fees",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 5,
        title: "What is offer price?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
    ],
  },
  {
    id: 2,
    title: "Selling",
    items: [
      {
        id: 1,
        title: "Connect your wallet to Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 2,
        title: "Guide to collection NFT artworks on Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 3,
        title: "Marketplace balance",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 4,
        title: "Marketplace fees",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 5,
        title: "What is offer price?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
    ],
  },
  {
    id: 3,
    title: "Creating",
    items: [
      {
        id: 1,
        title: "Connect your wallet to Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 2,
        title: "Guide to collection NFT artworks on Crypter",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 3,
        title: "Marketplace balance",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 4,
        title: "Marketplace fees",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
      {
        id: 5,
        title: "What is offer price?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur beatae facilis, iusto incidunt quaerat suscipit veniam repudiandae, est possimus quo corrupti saepe ea officia illum vero unde sint vel.",
      },
    ],
  },
];

export function HelpCenter() {
  const [activeBlocks, setActiveBlocks] = useState([]);
  const [clickedItems, setClickedItems] = useState({});

  const toggleBlock = (block) => {
    if (activeBlocks.includes(block)) {
      setActiveBlocks(
        activeBlocks.filter((activeBlock) => activeBlock !== block)
      );
      setClickedItems((prevItems) => ({ ...prevItems, [block]: null }));
    } else {
      setActiveBlocks([...activeBlocks, block]);
    }
  };

  const handleClickItem = (blockId, itemId) => {
    setClickedItems((prevItems) => {
      const newItems = { ...prevItems };
      newItems[blockId] = newItems[blockId] === itemId ? null : itemId;
      return newItems;
    });
  };

  return (
    <div className={styles.helpCenter}>
      <div className={styles.helpCenter__container}>
        <div className={styles.helpCenter__content}>
          <div className={styles.helpCenter__cubeBlockWrap}>
            <div className={styles.helpCenter__cubeBlock}>
              <h2>Gettings started on Crypter</h2>
              <img src="/images/banners/cube.webp" alt="cube" />
            </div>
          </div>
        </div>

        <div className={styles.helpCenter__infoBlockList}>
          {helpBlocksData.map((blockData) => (
            <HelpBlock
              key={blockData.id}
              blockData={blockData}
              activeBlocks={activeBlocks}
              activeClickedItem={clickedItems[blockData.id] || null}
              toggleBlock={toggleBlock}
              handleClickItem={(itemId) => handleClickItem(blockData.id, itemId)}/>
          ))}
        </div>
      </div>
    </div>
  );
}
