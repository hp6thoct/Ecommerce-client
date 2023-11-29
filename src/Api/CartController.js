import axios from "axios";

export function getCart(userId) {
  return axios.get(`http://localhost:8080/cart/get/${userId}`);
}

export function createCart(userId) {
  return axios.get(`http://localhost:8080/cart/createCart/${userId}`);
}
export function addToCart(cartId, item) {
  return axios.post(`http://localhost:8080/cart/add/${cartId}`, item);
}
export function updateCartItem(cartid, itemid, quantity) {
  return axios.post(
    `http://localhost:8080/cart/updateQuantity/${cartid}/${itemid}/${quantity}`
  );
}
export function deleteItem(cartid, itemid){
  return axios.post(
    `http://localhost:8080/cart/remove/${cartid}/${itemid}`
  );
}