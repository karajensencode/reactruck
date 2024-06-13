import { useState } from 'react';
import TestGateway from './TestGateway';
import Stripe from './Stripe';

const PaymentDetails = () => {
    const [ gateways, setGateways] = useState()
    const [ selectedGateway, setSelectedGateway] = useState();

    return (
        <>
            <p className="font-size-subheader font-weight-semibold mb-3">
                Payment Detail
            </p>
            <div className="border border-color-gray400 mb-5">
                <TestGateway
                    gateways={gateways}
                    setSelectedGateway={setSelectedGateway}
                />
                <Stripe
                    gateways={gateways}
                    setSelectedGateway={setSelectedGateway} />
            </div>
        </>
    );
};

export default PaymentDetails;