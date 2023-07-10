import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';


export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState(null)

  function show(data) {
    console.log(data);
    setUser(data)
  }
  
  useEffect(() => {
    token && dispatch(getDataAction(`${baseUrl}customers/customer`, show, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }, 'account-data'));
  }, [dispatch, token]);

  return (
    <>
      {!loading && user
        ? <>
          <Banner
            title='Hello there!'
            subtitle={`General ${user.login}`}
            img='/images/banners/account-banner.webp' />
          <h4>List of your orders:</h4>
        </>
        : <Loader />
      }
    </>)
}