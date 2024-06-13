import { useEffect,  } from "react";
import commerce from '../../lib/Commerce';

// eslint-disable-next-line
//{ customer, fetchCustomer, isLoggedIn, handleLogout }
const Account = ({ customer }) => {

    useEffect(() => {
        console.log('Customer Use Effect');
        commerce.customer.login('leslie.lawless@example.com', 'https://yourwebsite.com/login/callback').then((token) => console.log('TOKEN', token));
        if (commerce.customer.isLoggedIn()) { 
            commerce.customer.getToken('1ae420a5-2f43-426f-8a61-516eabb56d33').then((jwt) => console.log('Access Token', jwt));
            //updateCustomer();
            commerce.customer.getOrders('cstmr_K1YDR2qy29Qem6').then((orders) => console.log('List Orders', orders));
            commerce.customer.getOrder('ord_Kvg9l6zvnl1bB7').then((order) => console.log('Get Order for Customer', order));
            commerce.customer.about().then((customer) => console.log(customer));
            console.log(commerce.customer.id());
            console.log(commerce.customer.token());
            //if(!customer) fetchCustomer();
            console.log('END ... Customer Use Effect');
        }
    });


    // if (isLoggedIn) {
    //     return (
    //         <a href="/login">Please Log In...</a>
    //     )
    // };

    return (
        <div>
        <h1>Customer Account</h1>
            {customer ? (
                <p>Customer</p>
            // <div>
            //     <h2>Welcome, {customer.firstname} {customer.lastname}</h2>
            //     <p>Email: {customer.email}</p>
            //             {/* Display other customer information as needed */}
            //     {/* <button onClick={handleLogout}>Logout</button> */}
            // </div>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );

}
export default Account;