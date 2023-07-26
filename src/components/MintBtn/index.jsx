import style from './index.module.scss';
import axios from 'axios';
import { useSelector } from "react-redux";
import { baseUrl } from '../../utils/vars';

export function MintBtn({setMint,mint,orders}){
    const { token } = useSelector(state=>state.token)
    const { mintCardFirst,mintCardSecond } = useSelector(state=> state.mint);

    function createMint  (orders,selectCard) {
        let order = orders.find((item)=>item.products.some(product=>product.product.itemNo ===selectCard.itemNo) ? item.products:"")
        order.products =order.products.filter(item=>item.product.itemNo !==selectCard.itemNo ),
        order.email ="tester.crypter@gmail.com",
        order.products.length > 1 ?changeOrder(token,order,order._id): deleteOrder(token,order._id)
        }
    

    function changeOrder(token,changedOrder,orderNumber){
        axios.defaults.headers.put['Authorization'] = `Bearer ${token}`
        axios
        .put(`${baseUrl}orders/${orderNumber}`,changedOrder)
    }
    function deleteOrder (token,orderNumber){
        axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`
        axios
        .delete(`${baseUrl}orders/${orderNumber}`)
    }
    return (
        <>
        <button
        className={style.btn_mint}
        onClick={()=>(
            // createMint(orders,mintCardFirst),
            // createMint(orders,mintCardSecond),
            setMint(!mint)
            )
}
>Mint</button>
  </>
    )
}