import axios from "axios";

export function calculateShip(data) {
  return axios.post("http://localhost:8080/shipping/calculateCost", data);
}

export function calculatePayment(data) {
  return axios.post("http://localhost:8080/payment/calculateCost", data);
}

export function confirmOrder(data) {
  return axios.post("http://localhost:8080/orders/confirm-order", data);
}

export function getUserOrder(id) {
  return axios.get(`http://localhost:8080/orders/customer-orders/${id}`);
}
