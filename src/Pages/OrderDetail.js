import React from "react";
import { Typography, List, Space } from "antd";
import moment from "moment";
import { useLocation } from "react-router-dom";

const { Text } = Typography;

const OrderDetail = () => {
  const location = useLocation();

  const order = location.state.order;

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Order Detail</h2>
      <div>
        <Text strong>Date: {formatDate(order.orderDate)}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Cart Items:</Text>
        <List
          itemLayout="horizontal"
          dataSource={order.cart.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.product.name}
                description={`Quantity: ${
                  item.quantity
                }, Price: $${item.product.price.toFixed(2)}`}
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Payment Method: {order.payment.paymentMethod}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Total: ${order.totalAmount.toFixed(2)}</Text>
      </div>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default OrderDetail;
