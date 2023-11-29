import React, { useState } from "react";
import { Descriptions, Button, List, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ConfirmStep = ({
  shippingData,
  paymentData,
  onPrev,
  onFinish,
  cart,
  confirmBill,
  setCurrentStep,
}) => {
  const cartItems = cart.items.map((item, index) => ({
    quantity: item.product.quantity,
    name: item.product.name,
    amount: item.amount.toFixed(2),
  }));

  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleFinish = async () => {
    const res = confirmBill();
    setOrderSuccess(res);
    onFinish();
  };

  if (orderSuccess) {
    return (
      <Result
        status={orderSuccess ? "success" : "error"}
        title="Order Placed Successfully!"
        subTitle="Thank you for shopping with us."
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => {
              setOrderSuccess(false);
              if(orderSuccess){
                navigate('/')
              }
            }}
          >
            Go Back
          </Button>,
        ]}
      />
    );
  }

  return (
    <div>
      <Descriptions title="Order Summary" bordered>
        {/* Display shipping details */}
        <Descriptions.Item label="Shipping Method">
          {shippingData.method}
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Address">
          {shippingData.shippingAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Receiver Phone">
          {shippingData.receiverPhone}
        </Descriptions.Item>

        {/* Display payment details */}
        <Descriptions.Item label="Payment Method">
          {paymentData.paymentMethod}
        </Descriptions.Item>
        <Descriptions.Item label="Total Amount">
          $
          {paymentData.total_amount
            ? paymentData.total_amount.toFixed(2)
            : cart.total.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: "16px" }}>
        <h3>Cart Items:</h3>
        <List
          dataSource={cartItems}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {item.quantity} {item.name}:
              </span>
              <span>${item.amount}</span>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Button style={{ margin: "0 8px" }} onClick={onPrev}>
          Previous
        </Button>
        <Button type="primary" onClick={handleFinish}>
          Confirm Order
        </Button>
      </div>
    </div>
  );
};

export default ConfirmStep;
