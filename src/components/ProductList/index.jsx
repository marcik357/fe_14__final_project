/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { useEffect } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import { getDataAsync } from '../../redux/actions/getDataAction';

function ProductList(props) {
  const { products, getDataAsync } = props;
  
  useEffect(() => {
    getDataAsync();
  }, [getDataAsync]);

  return products ? (
    <div className={styles.home}>
      <div className={styles.home__title}>
        <h2>NFTs</h2>
      </div>
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
const mapDispatchToProps = {
  getDataAsync,
};
const mapStateToProps = (state) => ({
  products: state.data.products,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
