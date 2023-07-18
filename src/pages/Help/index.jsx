import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../../redux/actions/getDataActions';
import styles from './help.module.scss';
import Loader from '../../components/Loader';
import { BlogIcon } from '../../components/Icons/icon-blog';
import Banner from '../../components/Banner';
import { HelpCenter } from '../../components/HelpCenter';

export function Help() {
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    dispatch(getDataAction('/data/blog.json', setData, {}, 'blog'));
  }, [dispatch])

  return (
    <div id='main'>
      {!loading ? (
        <HelpCenter />
      ) : (
        <Loader />
      )}
    </div>
  );
}