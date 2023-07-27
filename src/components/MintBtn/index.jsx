import style from './index.module.scss';
import styles from '../Mint/MintPage.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { baseUrl } from '../../utils/vars';
import { setErrorAction } from '../../redux/actions/errorActions';
import { fetchData } from '../../utils';

export function MintBtn({orders,isOverlayVisible,card,user}){
    const { token } = useSelector(state=>state.token)
    const { mintCardFirst,mintCardSecond } = useSelector(state=> state.mint);
    const dispatch = useDispatch();

    function createMint  (orders,selectCard) {
        let order = orders.find((item)=>item.products.some(product=>product.product.itemNo ===selectCard.itemNo) ? item.products:"")
        order.products =order.products.filter(item=>item.product.itemNo !==selectCard.itemNo ),
        order.email ="tester.crypter@gmail.com",
        order.products.length > 1 ?changeOrder(token,order,order._id): deleteOrder(token,order._id)
        }
    
    async function changeOrder(token,changedOrder,orderNumber){
        try {
            await fetchData(`${baseUrl}orders/${orderNumber}`, {
              method: "PUT",
              headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' },
              body: JSON.stringify(changedOrder)
            })
          } catch (error) {
            dispatch(setErrorAction(error.message));
          }
    }

    async function deleteOrder (token,orderNumber){
        try {
            await fetchData(`${baseUrl}orders/${orderNumber}`, {
              method: "DELETE",
              headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' },
              body: JSON.stringify(createMintOrder())
            })
          } catch (error) {
            dispatch(setErrorAction(error.message));
          }
    }

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

  async function deleteMintCard() {
    try {
      await fetchData(`${baseUrl}mintProducts/${card._id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      dispatch(setErrorAction(error.message));
    }
  }

    return (
        <button
        className={isOverlayVisible && styles.mintPage__hiddenButton_text}
        onClick={()=>{
            // createMint(orders,mintCardFirst),
            // createMint(orders,mintCardSecond),
            sendMintOrder()
            // deleteMintCard()
        }
        }
            >Mint</button>
    )
}

