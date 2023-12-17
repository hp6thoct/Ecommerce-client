import React from "react";
import { Button, InputNumber, Typography } from "antd";
import "antd/dist/reset.css"; // Use 'antd/dist/reset.css' for styling

const { Text } = Typography;

const ProductInCart = ({ product, quantity, onQuantityChange, onDelete }) => {
  const { name, image, price } = product;
  const totalPrice = quantity * price;

  return (
    <div className="flex items-center p-4 bg-white shadow-md">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="mr-4 w-20 h-25 object-cover"
        width="80"
        height="100"
      />

      <div className="flex flex-col flex-grow">
        {/* Product Name */}
        <span className="text-lg font-semibold">{name}</span>
        {/* Product Price */}
        <Text className="text-sm text-gray-500">${price}</Text>
      </div>

      <div className="flex items-center justify-between flex-grow">
        {/* Quantity */}
        <label htmlFor="quantity" className="mr-2">
          Quantity:
        </label>
        <div className="flex items-center">
          <Button
            className="px-2 py-1 bg-gray-200 rounded-l-lg"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            -
          </Button>
          <span className="px-2 py-1 border-t-2 border-b-2 border-gray-300">{quantity}</span>
          <Button
            className="px-2 py-1 bg-gray-200 rounded-r-lg"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end flex-grow">
        {/* Total Price */}
        <Text className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</Text>
        {/* Delete Button */}
        <Button
          type="danger"
          onClick={onDelete}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductInCart;
