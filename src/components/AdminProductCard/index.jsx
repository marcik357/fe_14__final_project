import style from "./adminProductCard.module.scss"
import { Link } from 'react-router-dom';
import { Delete, Edit, View } from '../Icons';

export function AdminProductCard({imageUrls, name, currentPrice, _id, itemNo, quantity, deleteButtonHandler, buttonHandler, author, enabled}) {
    
    return (
        <div className={style.container}>
            <div className={style.icon}><img src={imageUrls[0]} className={style.icon__img} alt={name}/></div>
            <p className={style.name}>{name}</p>
            <p className={style.author}>{author}</p>
            <p>{quantity}</p>
            <p>{enabled ? 'Enabled' : 'Disabled'}</p>
            <p>{currentPrice}</p>
            <Link to={`/product/${itemNo}`} title="View on website" target="_blank"><View/></Link>
            <button className={style.editBtn} onClick={buttonHandler} title="Edit"><Edit/></button>
            <button className={style.delBtn} onClick={deleteButtonHandler} title="Delete"><Delete/></button>

        </div>
    )

    
}