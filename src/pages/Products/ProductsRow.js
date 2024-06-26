import React from 'react';
import ProductCard from './ProductCard';

const ProductRow = ({ products }) => {
    const reg = /(<([^>]+)>)/ig;


    return (
        <div className="row mb-5">
            {products.map((product) => (
                <div key={product.id} className="col-6 col-sm-6 col-lg-3">
                    <ProductCard
                        permalink={product.permalink}
                        image={product.media.source}
                        name={product.name}
                        price={product.price.formatted_with_symbol}
                        description={product.description && product.description.replace(reg, '')}
                        soldOut={product.is.sold_out}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductRow;