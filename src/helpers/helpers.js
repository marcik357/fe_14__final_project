
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP request error');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTJlMTgxYzIzYTI5NjdiMTAzZTFiMSIsImZpcnN0TmFtZSI6IkxpbGlhIiwibGFzdE5hbWUiOiJDaGVraCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzYxNTA0MSwiZXhwIjoxNjg3NjUxMDQxfQ.NU8zngAPuWZGhNeV1iYjhNaYK83bEHNYrVWW3_tsOZs';
// const newProduct = {
//   name: 'nft11',
//   currentPrice: 1.25,
//   previousPrice: 2.03,
//   categories: 'dog-1',
//   imageUrls: [
//     'img/products/men/001.png',
//   ],
//   quantity: 1,
//   color: 'white',
//   author: '@randomdash'
// };
// login
// const userData = {
//   loginOrEmail: 'liliacheh@gmail.com',
//   password: 'V1kfuhtC'
// };
// async function login(user) {
//   try {
//     const response = await fetch('https://plankton-app-6vr5h.ondigitalocean.app/api/customers/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     } else {
//       const data = await response.json();
//       const {token} = data;
//       console.log(token);
//       return token;
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }
// login(userData);
// async function addProduct(product) {
//   try {
//     const res = await fetch('https://plankton-app-6vr5h.ondigitalocean.app/api/products', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(product)
//     });
//     if (!res.ok) {
//       throw new Error('HTTP request error');
//     } const addedProduct = res.json();
//     return addedProduct;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }
// addProduct(newProduct);
// add all products

// async function addProductsToDatabase(products) {
//   try {
//     await Promise.all(products.map((product) => addProduct(product)));
//     console.log('Усі продукти додано до бази даних!');
//   } catch (err) {
//     console.error('Сталася помилка під час додавання продуктів:', err.message);
//   }
// }

// addProductsToDatabase(products);

// add new user
// const newCustomer = {
//   firstName: 'Lilia',
//   lastName: 'Chekh',
//   login: 'Cheshka',
//   email: 'liliacheh@gmail.com',
//   password: 'V1kfuhtC',
//   telephone: '+380630000001',
//   gender: 'male',
//   avatarUrl: 'img/customers/023649.png',
//   isAdmin: true
// };
// async function addUser(user) {
//   try {
//     const response = await fetch('https://plankton-app-6vr5h.ondigitalocean.app/api/customers', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     } else {
//       return response.json();
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }
// addUser(newCustomer);
