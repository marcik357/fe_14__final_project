import style from './collectionDetails.module.scss';
import ProductList from '../ProductList';

export function CollectionDetails({collection, products, productsQuantity}) {

	return (
		<div className={style.collectionDetails}>
		  <div className={style.collectionDetails__info}>
			 <div className={style.collectionDetails__info_wrapper}>
				<div className={style.collectionDetails__info_container}>
				  <img src={collection?.imgUrl} className={style.collectionDetails__collectionIcon} alt="collection-icon" />
				  <h1 className={style.collectionDetails__info_title}>{collection?.name}</h1>
				  <p className={style.collectionDetails__info_id}>{collection?.id}</p>
				  <div className={style.collectionDetails__info_bio}>
					 <div className={style.collectionDetails__info_text}>
						<p className={style.collectionDetails__info_subtitle}>Description</p>
						<p>We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey.</p>
					 </div>
				  </div>
				</div>
			 </div>
		  </div>
		  <div className={style.collectionDetails__products}>
			 <div className={style.collectionDetails__products_container}>
				<p className={style.collectionDetails__products_title}>
				  NFTs
				  <span className={style.collectionDetails__products_counter}>{productsQuantity}</span>
				</p>
			 </div>
			 <ProductList products={products} isInAuthor={true} showPagination={false} />
		  </div>
		</div>
	 );
}