import { Link } from 'react-router-dom'; //, Redirect
//import Login from './Customer/Login';
import { useEffect } from 'react'; //import { CheckoutContext } from '@chec/react-commercejs-hooks/dist/checkout/CheckoutProvider';

const CheckoutOther = ({ cart, order, generateToken, handleCaptureCheckout, handleRemoveFromCart, isLoggedIn }) => {
    //const { checkout } = useContext(CheckoutContext);s
    //  https://commercejs.com/docs/sdk/checkout#generate-token

    useEffect(() => {
        if (cart) generateToken(cart.id);
    }, [cart, generateToken]);

    // if (isLoggedIn) {
        return (
            <div>
            {order.line_items && (
            <div>
                <h2>Shopping Cart</h2>
                {order.line_items.map((lineItem) => (
                <div key={lineItem.id}>
                    <Link to={`/product/${lineItem.product_id}`}>{lineItem.name}</Link>
                    <button onClick={() => handleRemoveFromCart(lineItem.id)}>Remove</button>
                    <p>Quantity: {lineItem.quantity}</p>
                    <p>Price: ${lineItem.price.formatted_with_symbol}</p>
                </div>
                ))}
                <p>Total: ${order.total_price.formatted_with_symbol}</p>
                <button onClick={() => handleCaptureCheckout(order.id)}>Checkout</button>
            </div>
            )}
        </div>
        );
    // }

    // return (
    //     <Login />
    // );
};

export default CheckoutOther;