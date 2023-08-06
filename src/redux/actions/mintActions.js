// import { mintTypes } from '../types/mintTypes';

export function addToMint(products, select, mintTypes) {
  if (products) {
    const product = products?.find(item => item.itemNo === select)
    return {
      type: mintTypes,
      payload: product
    }
  }
  return {
    type: mintTypes,
    payload: ''
  }
}
// export function addToMint(products,select,mintTypes) {
//   // const product= products.map(card=>card.find(item=>item.itemNo === select))
//     const product= products?.find(item=>item.itemNo === select)
//     // console.log(product);
//     return {
//         type: mintTypes,
//         payload: product || ''
//       }
// }