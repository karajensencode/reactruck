import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout }) => {

    const handleSubmit = async ({ event, elements, stripe }) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(cardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        if (error) { console.log(error) }
        else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                //shipping: { name: 'Primary', street: shippingData.adress1
                fulfillment: {},//{ shippping_method: shipppingData.shippimgOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                },
            }
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <h1>Payment Methods</h1>
            <Elements stripe={stripePromise} >
                {({ elements, stripe }) => { 
                    <form>
                        <CardElement />
                        <br />
                        <br />
                        <div>
                            <button>Back</button>
                            <button>Pay { checkoutToken.live.subtitle.formatted_with_symbol}</button>
                        </div>
                    </form>
                }}
            </Elements>
        </>
    )
};
export default PaymentForm;