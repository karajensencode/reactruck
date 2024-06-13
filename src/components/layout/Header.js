import { useState, useEffect,createRef, useRef } from 'react';
import MobileMenu from '../common/MobileMenu';
import Logo from './Header/Logo'; // import logo from './logo.svg';

import commerce from '../../lib/Commerce';

const Header = () => {
  const header = useRef(true);
  const [ userLoggedIn, setUserLoggedIn ] = useState(false);
  const [ showMobileMenu, setShowMobileMenu ] = useState(false);
  const [ mobileMenu, setMhowMobileMenu ] = useState(false);
  const [ showCart, setShowCart ] = useState(false);
  const [ playAddToCartAnimation, setPlayAddToCartAnimation ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);

const duration = 300;

const defaultStyle = {
  zIndex: '-1',
  transition: `height ${duration}ms ease-in-out`,
  height: 0
};

  // const transitionStyles = () => {
  //   entering: { height: '100vh' },
  //   entered: { height: '100vh' },
  //   exiting: { height: 0 },
  //   exited: { height: 0 }
  // };

  const animate = ({ transparent }) => {
    if (!transparent) {return;}
    if (window.scrollY > 10) {
      header.current.classList.add('invert');
    } else {
      header.current.classList.remove('invert');
    }
  }

  const toggleMobileMenu = () => {
    setMhowMobileMenu(!showMobileMenu);
    if (!showMobileMenu) header.current.classList.add('invert');
    else animate();
  }

  const toggleAddToCartAnimation = () => {
        setPlayAddToCartAnimation(!playAddToCartAnimation);
  };

  const clearCustomer = () => {
    commerce.customer.logout();
  };

  const handleLogout = () => {
    clearCustomer();
    setLoggedIn(false);
    setUserLoggedIn(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleScroll = () => {
    window.requestAnimationFrame(animate);
  };

  // Fetch user login state

  useEffect(() => {
    const fetchUserLoginState = async () => {
      const status = commerce.customer.isLoggedIn();
      setUserLoggedIn(status);
    };
    fetchUserLoginState();
    setLoggedIn(commerce.customer.isLoggedIn());
  });

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <Logo />
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
              Order
              <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <MobileMenu />
          </div>
          <a href="/#" className="text-sm font-semibold leading-6 text-gray-900">Press</a>
          <a href="/account" className="text-sm font-semibold leading-6 text-gray-900">Account</a>
          <a href="/cart" className="text-sm font-semibold leading-6 text-gray-900">Cart</a>
          <a href="/checkout" className="text-sm font-semibold leading-6 text-gray-900">Checkout</a>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userLoggedIn ?
            <a href="/account" className="text-sm font-semibold leading-6 text-gray-900"> Account <span aria-hidden="true">&rarr;</span></a>
            :
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
          }
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              setUserLoggedIn(false);
            }}
          >Customer </button>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              handleLogout();
            }}
            >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;