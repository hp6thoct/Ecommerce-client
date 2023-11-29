import React from "react";
import { Card, Image, Typography, InputNumber, Button } from "antd";
import "antd/dist/reset.css"; // Use 'antd/dist/reset.css' for styling

const { Text } = Typography;

const ProductInCart = ({ product, quantity, onQuantityChange, onDelete }) => {
  const { name, image, price } = product;
  const totalPrice = quantity * price;

  return (
    <Card
      style={{
        width: "100%",
        height: "160px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Product Image */}
        <div style={{ width:'70px', marginRight: "16px" }}>
          <Image
            src={image}
            alt={name}
            style={{ width: '100%', objectFit: "cover" }}
          />
        </div>
        {/* Product Name */}
        
          <h5
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              flexGrow: 1,
              maxWidth: "30%",
              textAlign: "center",
              maxHeight: "100px",
            }}
          >
            {name}
          </h5>
        {/* Product Price */}
        <Text
          strong
          style={{ fontSize: 16, textAlign: "center" }}
        >
          ${price}
        </Text>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text strong style={{ margin: 8 }}>
            Quantity:
          </Text>
          <InputNumber min={1} value={quantity} onChange={onQuantityChange} />
        </div>

        {/* Total Price */}
        <Text
          strong
          style={{ fontSize: 16, textAlign: "center" }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Text>

        {/* Delete Button */}
        <Button type="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ProductInCart;
