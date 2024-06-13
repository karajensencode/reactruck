import { useState } from 'react';
import { CardElement } from "@stripe/react-stripe-js";

const Stripe = ({ gateways, selectedGateway }) => {
    const cardElementOptions = {};

    if (!gateways || !gateways.available['stripe']) {
        return null;
    }

    return (
            <div className="borderbottom border-color-gray500">
                <label onClick={() => setGateways('stripe')} className="p-3 d-flex align-items-center cursor-pointer">
                <Radiobox checked={selectedGateway === 'stripe'} className="mr-3"/>
                <p className="font-weight-medium">Credit/debit card (via Stripe)</p>
                </label>

                { selectedGateway === 'stripe' && (
                <div className="pl-5 pr-3 pb-3 ml-2">
                    <CardElement options={cardElementOptions} />
                </div>
                ) }
            </div>
        );
};

export default Stripe;
