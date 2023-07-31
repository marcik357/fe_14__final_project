// import style from './index.module.scss';
import styles from '../Mint/MintPage.module.scss';
import { useSelector,useDispatch } from "react-redux";
import { baseUrl } from '../../utils/vars';
import { setErrorAction } from '../../redux/actions/errorActions';
import { fetchData } from '../../utils';
import { cleanCart, createCartFromLS } from '../../redux/actions/cartActions';

export function MintBtn({orders,isOverlayVisible,card,user}){
    const { token } = useSelector(state=>state.token);
    const { cart } =useSelector(state=>state.cart);
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
      return {
      canceled:false,
      paymentInfo: "Mint",
      letterSubject: "Mint",
      name: "Mint",
      email: "tester.crypter@gmail.com",
      mobile: "+380674444444",
      card: "4242 4242 4242 4242",
      letterHtml: "<p>Mint</p>",
      customerId:user._id,
    }
  }
    async function sendMintOrder(card) {
     const cartArray=  cart?.products?.map(({cartQuantity,product}) =>{
        return {product:product._id,cartQuantity:cartQuantity}
       } )
      if(cart?.products?.length > 0 ){
      await fetchData(`${baseUrl}cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      
        });
       await fetchData(`${baseUrl}cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: [{product:card._id,cartQuantity:1}] })
      });
       await fetchData(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`},
        body: JSON.stringify(createMintOrder())
      });
      await fetchData(`${baseUrl}cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
       await fetchData(`${baseUrl}cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({products:cartArray})
      });
      }
      else {
        await fetchData(`${baseUrl}cart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ products: [{product:card._id,cartQuantity:1}] })
        });
         await fetchData(`${baseUrl}orders`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`},
          body: JSON.stringify(createMintOrder())
        })
        await fetchData(`${baseUrl}cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
  }
    return (
        <button
        className={isOverlayVisible && styles.mintPage__hiddenButton_text}
        onClick={()=>{
              createMint(orders,mintCardFirst),
              createMint(orders,mintCardSecond),
              sendMintOrder(card)
          }
        }
        >Mint</button>
    )
}

