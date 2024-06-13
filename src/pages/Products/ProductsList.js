import React from 'react';
import ProductItem from './ProductItem';
//import { useCommerce } from '@chec/react-commercejs-hooks';
//import { CommerceContext } from '@chec/react-commercejs-hooks';


const ProductsList = ({ products }) => {
    //const { commerce } = useCommerce();

    if (!products) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {/* <CommerceContext publicKey={process.env.REACT_APP_CHEC_PUBLIC_KEY}> */}
                <h2><b>Menu</b></h2>
                <div className="products" id="products">
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))};
                </div>
            {/* </CommerceContext> */}
        </>
    );
};

export default ProductsList;