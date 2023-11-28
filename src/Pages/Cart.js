import React, { useEffect } from 'react';
import { List, Typography, Button, Divider } from 'antd';
import ProductInCart from "../Components/ProductInCart"
import { useUser } from '../Context/UserContext';
import { updateCartItem } from '../Api/CartController';

const { Text } = Typography;

const Cart = () => {
  const { cart, saveCart } = useUser();

  const handleQuantityChange = async (index, newQuantity) => {
    const updatedCart = { ...cart };
    updatedCart.items[index].quantity = newQuantity;
    const res = await (await updateCartItem(cart.id,cart.item[index].id,newQuantity)).data;
    
    saveCart(updatedCart);
  };

  useEffect(() => {
    // Calculate and update total price whenever cart.items change
    const newTotalPrice = cart.items.reduce((total, item) => total + item.amount, 0);
    const updatedCart = { ...cart, total: newTotalPrice };
    saveCart(updatedCart);
  }, [cart.items, saveCart]);

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Checkout button clicked');
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Shopping Cart</h2>

      {/* List of ProductInCart components */}
      <List
        itemLayout="horizontal"
        dataSource={cart.items}
        renderItem={(item, index) => (
          <List.Item>
            <ProductInCart product={item} quantity={item.quantity} onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} />
          </List.Item>
        )}
      />

      {/* Total Price */}
      <Divider />
      <div style={{ textAlign: 'right', marginBottom: '16px' }}>
        <Text strong>Total Price: ${cart.total.toFixed(2)}</Text>
      </div>

      {/* Checkout Button */}
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={handleCheckout}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
