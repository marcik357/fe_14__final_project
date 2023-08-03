import styles from '../Mint/MintPage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from '../../utils/vars';
import { setErrorAction } from '../../redux/actions/errorActions';
import { fetchData } from '../../utils';
import { reqDelete, reqPost, reqPut } from '../../utils/requestBody';
// import { cleanCart, createCartFromLS } from '../../redux/actions/cartActions';

export function MintBtn({ orders, isOverlayVisible, mintCard, user }) {
  const { token } = useSelector(state => state.token);
  const { cart } = useSelector(state => state.cart);
  const { mintCardFirst, mintCardSecond } = useSelector(state => state.mint);
  const dispatch = useDispatch();

  async function createMint(orders, selectCard) {
    try {
      let order = orders.find((item) => item.products.some(product => product.product.itemNo === selectCard.itemNo) && item.products)
      order.products = order.products.filter(item => {
        if (item.product.itemNo !== selectCard.itemNo) return item;
        if (item.product.itemNo === selectCard.itemNo && item.cartQuantity > 1) {
          item.cartQuantity -= 1;
          return item
        };
      });
      order.email = "tester.crypter@gmail.com";
      order.products.length >= 1
        ? await changeOrder(order, order._id)
        : await deleteOrder(order._id)
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async function changeOrder(changedOrder, orderNumber) {
    try {
      await fetchData(`${baseUrl}orders/${orderNumber}`, reqPut(JSON.stringify(changedOrder)));
      // await fetchData(`${baseUrl}orders/${orderNumber}`, {
      //   method: "PUT",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(changedOrder)
      // })
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async function deleteOrder(orderNumber) {
    try {
      await fetchData(`${baseUrl}orders/${orderNumber}`, reqDelete());
      // await fetchData(`${baseUrl}orders/${orderNumber}`, {
      //   method: "DELETE",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(createMintOrder())
      // })
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  function createMintOrder() {
    return {
      canceled: false,
      paymentInfo: "Mint",
      letterSubject: "Mint",
      name: "Mint",
      email: "tester.crypter@gmail.com",
      mobile: "+380674444444",
      card: "4242 4242 4242 4242",
      letterHtml: "<p>Mint</p>",
      customerId: user._id,
    }
  }

  async function sendMintOrder(mintCard) {
    try {
      if (cart?.products?.length > 0) {
        const cartArray = cart?.products?.map(({ cartQuantity, product }) => ({ product: product?._id, cartQuantity: cartQuantity }))

        await fetchData(`${baseUrl}cart`, reqDelete());
        // await fetchData(`${baseUrl}cart`, {
        //   method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });

        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })));
        // await fetchData(`${baseUrl}cart`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })
        // });

        await fetchData(`${baseUrl}orders`, reqPost(JSON.stringify(createMintOrder())));
        // await fetchData(`${baseUrl}orders`, {
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`
        //   },
        //   body: JSON.stringify(createMintOrder())
        // });

        await fetchData(`${baseUrl}cart`, reqDelete());
        // await fetchData(`${baseUrl}cart`, {
        //   method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });

        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: cartArray })));
        // await fetchData(`${baseUrl}cart`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ products: cartArray })
        // });
      }
      else {
        await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })));
        // await fetchData(`${baseUrl}cart`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ products: [{ product: mintCard._id, cartQuantity: 1 }] })
        // });

        await fetchData(`${baseUrl}orders`, reqPost(JSON.stringify(createMintOrder())));
        // await fetchData(`${baseUrl}orders`, {
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`
        //   },
        //   body: JSON.stringify(createMintOrder())
        // })

        await fetchData(`${baseUrl}cart`, reqDelete());
        // await fetchData(`${baseUrl}cart`, {
        //   method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  return (
    <button
      // className={styles.mintPage__hiddenButton_text}
      onClick={async () => {
        try {
          await createMint(orders, mintCardFirst);
          await createMint(orders, mintCardSecond);
          await sendMintOrder(mintCard);
        } catch (error) {
          dispatch(setErrorAction(error.message));
        }
      }}>
      Mint
    </button>
  )
}

