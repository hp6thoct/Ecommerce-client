import React from 'react';
import { List, Typography, Button, Divider } from 'antd';
import ProductInCart from '../Components/ProductInCart';
import { useUser } from '../Context/UserContext';

const { Text } = Typography;

const Cart = () => {
  const { cart, saveCart } = useUser();

  // Check if cart is null or undefined
  if (!cart) {
    return <div>Loading...</div>;  // You can render a loading state or handle it as needed
  }

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = { ...cart };
    updatedCart.items[index].quantity = newQuantity;
    saveCart(updatedCart);
  };

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
            <ProductInCart
              product={item.product}
              quantity={item.quantity}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
            />
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
