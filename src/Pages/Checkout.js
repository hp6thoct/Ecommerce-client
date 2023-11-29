import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import ShippingStep from "../Components/ShippingStep";
import PaymentStep from "../Components/PaymentStep";
import ConfirmStep from "../Components/ConfirmStep";
import {
  calculatePayment,
  calculateShip,
  confirmOrder,
} from "../Api/OrderController";
import ResultModal from "../Components/ResultModal";
import { useUser } from "../Context/UserContext";

const { Step } = Steps;

const Checkout = () => {
  const { cart, user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [errorModal, setErrorModal] = useState(false);
  let contentModal = "!!!";

  useEffect(() => {
    console.log("shipping data", shippingData);
    console.log("payment data", paymentData);
  }, [shippingData, paymentData]);


  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleShippingNext = async () => {
    console.log(shippingData);
    setCurrentStep(currentStep + 1);
  };

  const handlePaymentNext = async () => {
    setCurrentStep(currentStep + 1);
  };

  const processPayment = async (payment) => {
    const input = {
      cart: cart,
      shipping: shippingData,
      payment: payment
    };
    const res = await calculatePayment(input);
    if (res.status === 200 && res.data) {
      console.log("process payment successfully", res.data);
      setPaymentData(res.data);
    } else {
      contentModal = "Can't process payment! Please try again!";
      setErrorModal(true);
      console.log(res.status);
    }
  };

  const processShip = async (input) => {
    const res = await calculateShip(input);
    if (res.status === 200 && res.data) {
      setShippingData(res.data);
      console.log("get shipping feee successfully", res.data);
    } else {
      contentModal = "Can't get shipping fee! Please try again!";
      setErrorModal(true);
      console.log(res.status);
    }
  };

  const confirmBill = async ()=>{
    let resf = true;
    try {
        const data = {
            cart: cart,
            customer: user,
            shipping: shippingData,
            payment: paymentData,
            total_amount: paymentData.total_amount,
          };
          const res = await confirmOrder(data);
          if (res.status === 200 && res.data) {
            setShippingData();
            setPaymentData();
            console.log("Order successfully");
            resf = true
          }
    } catch (error) {
        console.log(error)
        resf=false
    }
    return resf;
  }

  const handleFinish = async () => {
    setCurrentStep(currentStep+1)
  };

  const steps = [
    {
      title: "Shipping",
      content: (
        <ShippingStep
          processShip={processShip}
          onNext={handleShippingNext}
          setShippingData={setShippingData}
        />
      ),
    },
    {
      title: "Choose Payment",
      content: (
        <PaymentStep
          onNext={handlePaymentNext}
          onPrev={handlePrev}
          processPayment={processPayment}
          setPaymentData={setPaymentData}
        />
      ),
    },
    {
      title: "Confirm Order",
      content: (
        <ConfirmStep
          shippingData={shippingData}
          paymentData={paymentData}
          onPrev={handlePrev}
          onFinish={handleFinish}
          confirmBill={confirmBill}
          setCurrentStep={setCurrentStep}
          cart={cart}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "50vh" }}>
      <Steps current={currentStep} size="medium">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <div style={{ marginTop: "16px" }}>
        {steps[currentStep] && (
          <div style={{ marginTop: "16px" }}>{steps[currentStep].content}</div>
        )}
      </div>
      <ResultModal
        visible={errorModal}
        onOk={() => setErrorModal(false)}
        onCancel={() => setErrorModal(false)}
        title="Error Modal"
        content={contentModal}
        isSuccess={false}
      />
    </div>
  );
};

export default Checkout;
