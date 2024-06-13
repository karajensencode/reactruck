import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from './PaymentForm';
import commerce from "../../lib/Commerce";

// Validates a discount code for the provided checkout token and applies it to the checkout.</PaymentForm>

const Checkout = ({ cart, order, handleCaptureCheckout, backStep, error }) => {
    const [ activeStep, setActiveStep ] = useState(0);
    const [ checkoutToken, setCheckoutToken ] = useState(null);
    const [ shippingData, setShippingData ] = useState({});

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);
            } catch (error) {

            }
        }
        generateToken();
    });

    const Confirmation = () => {
        <div>Confirmation</div>
    };

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={handleCaptureCheckout} />

    return (
        <div>
            <h1>Checkout</h1>
            <main>
                {activeStep === SVGTextPositioningElement.length ? <Confirmation /> : <Form />}
            </main>
        </div>
    )

}

export default Checkout;