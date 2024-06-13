import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Layout from "./components/layout/Layout";

import './App.css';
import { CheckoutProvider } from '@chec/react-commercejs-hooks';
//import { CheckoutTruckProvider } from './context';
//import { loadStripe } from "@stripe/stripe-js";
import { AnimatePresence } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

//const stripePromise = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  hideProgressBar: true,
  className: "w-full md:max-w-xl",
  toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
};

function App() {
  const notify = () => toast("Wow so easy!");


  return (
    <>
      <CheckoutProvider>
          <Header />
          <AnimatePresence initial={false} mode='wait'>
            <Layout />
          </AnimatePresence>
          <button onClick={notify}>Notify!</button>
          <ToastContainer {...toastOptions} />
          <Footer />
      </CheckoutProvider>
    </>
  );
}

export default App;
