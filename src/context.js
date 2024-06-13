import React, { createContext, useState, useEffect } from 'react';
import { useCycle } from 'framer-motion';
import commerce from './lib/Commerce';

const CartContext = createContext({
    cart: [],
    addItemToCart: () => {}
});

const ModalContext = createContext();
const CompanyContext = createContext();
const CheckoutTruckContext = createContext();
const UserContext = createContext();
//const SodaContext = createContext();
//const SodaListContext = createContext();
const OrderContext = createContext();

const ModalProvider = ({ children }) => {
    const [open, toggle] = useCycle(false, true);

    const openModal = () => {
        toggle();
        document.body.classList.add("overflow-hidden");
    };

    const closeModal = () => {
        toggle(0);
        document.body.classList.remove("overflow-hidden");
    };

    return (
        <ModalContext.Provider value={{ openModal,closeModal, open, toggle}}> {children}
        </ModalContext.Provider>
);

 }

const CompanyProvider = ({ children }) => {
    const [company] = useState({
        name: 'Pop Struck',
        email: 'info@example.com',
        address: '1234 Example St, Example City, EX 12345',
        phone: '18008008888',
        owner: 'jane doe',
    });
        //setCompany

    return (
        <CompanyContext.Provider value={company}>
        {children}
        </CompanyContext.Provider>
    );
};

const CartProvider = ({ children }) => {
    const [open, toggle] = useCycle(false, true);
    const [cart, setCart] = useState({});
    const addToCart = async (newItem) => {
        const item = await commerce.cart.add(newItem);
        setCart(item.cart);
    };

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const cart = await commerce.cart.retrieve();
            return cart;
        } catch (err) {
            console.log('Get Cart Error', err);
        }
    };

    const showCart = () => {
        toggle();
        document.body.classList.add("overflow-hidden");
    };

    const closeCart = () => {
        toggle();
        document.body.classList.remove("overflow-hidden");
    };

    const reset = async () => console.log('Reset');

    return (
        <CartContext.Provider value={{
            cart, addToCart, setCart, getCart, showCart, closeCart,
            reset, open, toggle,
        }}>
        {children}
    </CartContext.Provider>
    );
}

const CheckoutTruckProvider = ({ children }) => {
    const [checkout, setCheckout] = useState({});

    const getCheckout = () => {
        try {
            commerce.checkout.capture(checkout.id)
            .then(res => {
                console.log(res);
                setCheckout(res);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CheckoutTruckContext.Provider value={{ checkout, setCheckout, getCheckout }}>
        {children}
        </CheckoutTruckContext.Provider>
    )

}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Guest' });

    return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
    );
}

// const SodaProvider = ({ children }) => {
//     const [topOrderedSodas, setTopOrderedSodas] = useState([
//         { id: 1, name: 'Coke', price: 1.99, image: '/path/to/top-ordered-soda-image-1.jpg' },
//         { id: 2, name: 'Pepsi', price: 1.99, image: '/path/to/top-ordered-soda-image-2.jpg' },
//         // add more top ordered sodas here
//     ]);

//     const [newlyAddedSodas, setNewlyAddedSodas] = useState([
//         { id: 3, name: 'Orange Crush', price: 2.49, image: '/path/to/newly-added-soda-image-1.jpg' },
//         { id: 4, name: 'Grape Fanta', price: 2.49, image: '/path/to/newly-added-soda-image-2.jpg' },
//         // add more newly added sodas here
//     ]);

//     const [allSodas, setAllSodas] = useState([
//         { id: 1, name: 'Coke', price: 1.99, image: '/path/to/soda-image-1.jpg', flavors: ['Original', 'Diet', 'Zero'] },
//         { id: 2, name: 'Pepsi', price: 1.99, image: '/path/to/soda-image-2.jpg', flavors: ['Original', 'Diet', 'Zero'] },
//         // add more sodas here
//     ]);


//     const [soda, setSoda] = useState({ flavor: 'Cola' });
//     const flavors = ['Cola', 'Lemon-Lime', 'Orange', 'Grape'];
//     const shots = ['Vanilla', 'Chocolate', 'Caramel'];
//     const prices = {
//         regular: 2.5,
//         large: 3.0,
//     };
//     const discounts = [
//         { name: 'Happy Hour', discount: 0.5 },
//         { name: 'Student Discount', discount: 0.1 },
//     ];

//     return (
//         <SodaContext.Provider value={{ soda, setSoda, topOrderedSodas, newlyAddedSodas, allSodas, flavors, shots, prices, discounts  }}>
//             {children}
//         </SodaContext.Provider>
//     );
// }

// const SodaListProvider = ({ children }) => {
//     const [sodaList, setSodaList] = useState(["Cola", "Lemon-Lime", "Orange"]);
//     const [selectedSoda, setSelectedSoda] = useState(null);
//     const [selectedFlavor, setSelectedFlavor] = useState(null);

//     return (
//         <SodaListContext.Provider value={{ sodaList, setSodaList, selectedSoda, setSelectedSoda, selectedFlavor, setSelectedFlavor }}>
//         {children}
//         </SodaListContext.Provider>
//     );
// };

const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
        {children}
        </OrderContext.Provider>
    );
};

export {
    ModalProvider, ModalContext,
    CompanyProvider, CompanyContext,
    CheckoutTruckProvider, CheckoutTruckContext,
    //LoginProvider, LoginContext,
    UserProvider, UserContext,
    CartProvider, CartContext,
    //SodaProvider, SodaContext,
    //SodaListProvider, SodaListContext,
    OrderProvider, OrderContext
};