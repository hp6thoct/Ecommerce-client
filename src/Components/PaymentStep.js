import React from 'react';
import { Form, Select, Button } from 'antd';

const { Option } = Select;

const PaymentStep = ({ onNext, onPrev, processPayment }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Payment Form Values:', values);
    processPayment(values); 
    onNext(); // Move to the next step
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item
        label="Payment Method"
        name="paymentMethod"
        rules={[{ required: true, message: 'Please select a payment method' }]}
      >
        <Select placeholder="Select a payment method">
          <Option value="Cash">Payment by Cash</Option>
          <Option value="Paypal">Payment via Paypal</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          <Button onClick={onPrev}>Previous</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PaymentStep;
