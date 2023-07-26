import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './help.module.scss';
import Loader from '../../components/Loader';
import { fetchData, loadData } from '../../utils';
import HelpBlock from '../../components/HelpBlock';

export function Help() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  
  const [helpData, setHelpData] = useState([])
  const [activeBlocks, setActiveBlocks] = useState([]);
  const [clickedItems, setClickedItems] = useState({});

  const toggleBlock = (block) => {
    if (activeBlocks.includes(block)) {
      setActiveBlocks(activeBlocks.filter((activeBlock) => activeBlock !== block));
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

  const helpLoad = useCallback(async () => {
    const data = await fetchData('/data/helpCenterData.json')
    setHelpData(data);
  }, [])

  useEffect(() => {
    loadData(dispatch, helpLoad)
  }, [dispatch, helpLoad]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <div className={styles.helpCenter}>
        <div className={styles.helpCenter__container}>
          <div className={styles.helpCenter__content}>
            <div className={styles.helpCenter__cube}>
              <h3 className={styles.helpCenter__title}>Gettings started on Crypter</h3>
              <img src="/images/banners/cube.webp" className={styles.helpCenter__img} alt="cube" />
            </div>
          </div>
          <div className={styles.helpCenter__info}>
            {helpData?.map((blockData) => {
              return (
              <HelpBlock
                key={blockData.id}
                blockData={blockData}
                activeBlocks={activeBlocks}
                activeClickedItem={clickedItems[blockData.id] || null}
                toggleBlock={toggleBlock}
                handleClickItem={(itemId) => handleClickItem(blockData.id, itemId)} />
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}