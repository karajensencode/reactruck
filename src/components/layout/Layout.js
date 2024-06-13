import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { routes } from "./routes";
//import { toast } from "react-toastify";


import Home from "../../pages/Home";
import ProductsList from '../../pages/Products/ProductsList';
//import ProductOptions from '../../pages/Products/ProductOptions';
import ProductItem from '../../pages/Products/ProductItem';
import Checkout from "../../pages/Checkout/Checkout";
import Account from "../../pages/Customer/Account";
import EditAccount from "../../pages/Customer/EditAccount";
import Orders from "../../pages/Customer/Orders";
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Customer/Login";
import OneTimeLoginLink from "../../pages/Customer/OneTimeLoginLink";
import ForgotPassword from "../../pages/ForgotPassword";
import CreateAccount from "../../pages/Customer/CreateAccount";
import Cart from "../../pages/Cart/Cart";

import commerce from '../../lib/Commerce';

const Layout = () => {
    const [ run, setRun ] = useState(true);
    const [ token, setToken ] = useState(null); //Checkout Token
    const [ products, setProducts ] = useState([]);
    const [ cart, setCart ] = useState({});
    const [ customer, setCustomer ] = useState(null);
    const [ order, setOrder ] = useState({}); //Checkout
    const [ errorMessage, setErrorMessage] = useState("");
    const [ message, setMessage ] = useState("");
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ email, setEmail ] = useState('karabeckstead@gmail.com'); //leslie.lawless@example.com
    const [ loading, setLoading ] = useState(false);

    const fetchCart = async () => {
        setCart(commerce.cart.retrieve())
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    };
    /***** CUSTOMER FUNCTIONS *****/


    /*****  CHECKOUT FUNCTIONS *****/
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
            setMessage('Incoming Order', incomingOrder);
        }
        catch (error) {
            setErrorMessage(error.data.error.message);
        }

    };

    const setDiscountCodeInCheckout = async (checkoutId, code) => {
        await commerce.checkout.checkDiscount(checkoutId, { code })
            .then(resp => {
                console.log(resp.live);
                setMessage('Discount Code Set', resp);
                return resp;
            })
            .catch(error => {
                console.log('error while attempting to update live object with discount code');
                throw error;
            })
    };

    /*****  FETCH FUNCTIONS *****/

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
        setMessage('Fetched Products', products);
    };

    const fetchCustomer = async () => {
        const customerData = await commerce.customer.about();
        setCustomer(customerData);
        setMessage('Customer Data Set', customer);
        if (!customer) console.log('Customer Not Logged In,..');
        // const customerId = customer.id;
        // const data = await commerce.customer.about(customerId);
        //     console.log(customerId);
        //     console.log(data);
        //     setMessage('Customer Data ', data);
    };

    /*****  CUSTOMER FUNCTIONS *****/

    const createCustomer = async (email) => {
        const newCustomer = {
            email: email, // Add any other required fields here
        };
        try {
            const response = await commerce.customers.create(newCustomer);
            console.log('Customer created successfully:', response);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const updateCustomer = () => {
        commerce.customer.update({
            email: 'leslie.lawless@example.com',
            firstname: 'Leslie',
            lastname: 'Lawless',
            external_id: 'MY_CRM_USER_123',
        }, 'cstmr_K1YDR2qy29Qem6')
            .then((customer) => console.log(customer));
    };

    const setCustomerStatus = () => {
        const isLoggedIn = commerce.customer.isLoggedIn();
        if (!isLoggedIn || isLoggedIn === false) {
            return Promise.resolve(null);
        }
        return commerce.customer.about().then((customer) => {
            setCustomer(customer);
            // console.log('Customer Data ', customer);
            // setMessage('Customer Data ', customer);
        }).catch(() => { //404, customer doesn't exist
            commerce.customer.logout();
        });
    };

    const clearCustomer = () => {
        commerce.customer.logout();
    };

    /*****  CART FUNCTIONS *****/

    const generateToken = async (cartId) => {
        //cartId
        if (!cartId) return;
        //const token =
        commerce.checkout.generateToken('white-shirt', { type: 'permalink' })
        .then((checkout) => console.log(checkout.id))
        //const token = await commerce.checkout.generateToken('Strawberry-Vanilla-Drink', { type: "cart", });
        setToken(token);
        setMessage('Generate Token', token);
    };

    const handleSetLoggedIn = () => { //email, baseUrl
        commerce.customer.login('leslie.lawless@example.com', 'https://yourwebsite.com/login/callback').then((token) => {
            console.log(token);
            setMessage('Handle Set Logged In', token);
            setIsLoggedIn(true);

        });
    };

    const handleJWT = () => {
        commerce.customer.getToken('1ae420a5-2f43-426f-8a61-516eabb56d33', true).then((jwt) => {
            console.log('JWT', jwt);
            setMessage('JSON Web Token', jwt);
        });
        console.log(`Token should be set`);
    }

    const handleLogout = () => {
        commerce.customer.logout();
        setIsLoggedIn(false);
    };

    const intialLoad = () => {
        console.log('Inside Intial Load Function');
        //setLoading(true);
        if(run) fetchProducts();
        if(run && !cart) fetchCart();
        if(cart.id) generateToken(cart.id);
        if(token) handleSetLoggedIn();
        handleJWT();
        setIsLoggedIn(commerce.customer.isLoggedIn());
        //if (loading) setLoading(false);
        if (cart && cart.id && order && order.id) {
            setMessage('No Error Messages Reported...');
            setRun(false);
            console.log('Cart has been loaded and Run has been ran..')
        }
    };

    useEffect(() => {
        if (run) {
            console.log('Running');
        }
    }, [run]);

    // if (loading) {
    //     return (
    //         <div>Loading...</div>
    //     );
    // }

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
            <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                <Router>
                    <Routes>
                        {/* {routes.map(route => <Route {...route} />)} */}
                        <Route path="/home" element={<Home />} />
                                    <Route
                                        path="/" element={<ProductsList
                                            products={products}
                                            onAddToCart={handleAddToCart}
                                    />} />
                                    <Route
                                        path="/product/:id"
                                        element={<ProductItem
                                            products={products}
                                            cart={cart}
                                            setCart={setCart}
                                    />} />
                                    <Route path="/cart" element={<Cart
                                        cart={cart}
                                        fetchCart={fetchCart}
                                        onAddToCart={handleAddToCart}
                                        handleUpdateCartQty={handleUpdateCartQty}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                        handleEmptyCart={handleEmptyCart}
                                    />} />
                                    <Route path="/checkout" element={<Checkout
                                        cart={cart}
                                        order={order}
                                        handleCaptureCheckout={handleCaptureCheckout}
                                        error={errorMessage}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                        isLoggedIn={isLoggedIn}
                                    />} />
                                    <Route path="/account" element={<Account
                                        customer={customer}
                                    />} />
                                    <Route path="/account/orders" element={<Orders
                                        customer={customer}
                                    />} />
                                    <Route path="/account/edit" element={<EditAccount
                                        customer={customer}
                                    />} />
                        <Route path="/createAccount" element={<CreateAccount />} />
                                    <Route path="/login" element={<Login
                                        setEmail={setEmail}
                                        handleSetLoggedIn={handleSetLoggedIn}
                                    />} />
                        <Route path="/onetime" element={<OneTimeLoginLink />} />
                        <Route path="/password" element={<ForgotPassword />} />
                        <Route path="*" element={<h1>404</h1>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Router>
                </div>
                <div><button onClick={intialLoad}>Load</button></div>
            </div>
        </div>
        </div>
        </div>
    )
};
export default Layout;