import { useState, useEffect } from "react";
import commerce from "../../lib/Commerce";


const MerchantInformation = () => {
    const [merchant, setMerchant] = useState({});

    useEffect(() => {
        //const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
        commerce.merchants.about().then((merchant) => setMerchant(merchant));
        //commerce.merchants.about().then((merchant) => console.log(merchant.business_name));
    });

    return (
        <div className="merchant-information">
            <h1>Merchant Information</h1>
            <p>{merchant.business_name}</p>
            <p>{merchant.email}</p>
            <p>{merchant.phone}</p>
        </div>
    )
}
export default MerchantInformation;