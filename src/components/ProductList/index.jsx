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
    <div className={styles.products}>
      <div className={styles.products__title}>
        <h2>NFTs</h2>
      </div>
      <div className={styles.products__wrapper}>
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
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
