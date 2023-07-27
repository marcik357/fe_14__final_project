import style from './index.module.scss';
import styles from '../Mint/MintPage.module.scss';
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { baseUrl } from '../../utils/vars';
import { setErrorAction } from '../../redux/actions/errorActions';
import { fetchData } from '../../utils';

export function MintBtn({orders,isOverlayVisible,card,user}){
    const { token } = useSelector(state=>state.token)
    const { mintCardFirst,mintCardSecond } = useSelector(state=> state.mint);
    const dispatch = useDispatch();
    const { products } =useSelector(state=> state.products);
    console.log(card);

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

    function getMintCard(token){
        axios.defaults.headers.get['Authorization'] = `Bearer ${token}`
        axios
        .get(`${baseUrl}mintProducts`)
        .then(res=>{
            setMintResult(res.data)})}
 
function createMintOrder (){
const order={
      paymentInfo: "Mint",
      letterSubject: "Mint",
      name: "Mint",
      email: "tester.crypter@gmail.com",
      mobile: "+380674444444",
      card: "4242 4242 4242 4242",
      totalSum: 1,
      letterHtml: "<p>Mint</p>",
      customerId:user._id,
    };
    const newCartArray = [{product:card,cartQuantity:1}]

    return { ...order, products: newCartArray}
  }


  async function sendMintOrder() {
    try {
      await fetchData(`${baseUrl}orders`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createMintOrder())
      })
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }

    return (
        <button
        className={isOverlayVisible && styles.mintPage__hiddenButton_text}
        onClick={()=>{
            // setMintResult(products[Math.floor(Math.random() * products?.length)])
            sendMintOrder()
        }
        }
            // getMintCard(token)
            // console.log(card)
            // createMint(orders,mintCardFirst),
            // createMint(orders,mintCardSecond),
            // setMint(!mint)
            >Mint</button>
    )
}

