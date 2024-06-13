import { stripHtml } from "string-strip-html";
//import { useMemo } from "react";
import { ToastContainer } from 'react-toastify'; //, toast

const ProductItem = ({ product, handleAddToCart, handleRemoveFromCart }) => {
  const { result } = stripHtml(product.description);

  const toastOptions = {
    position: "bottom-center",
    draggable: false,
    hideProgressBar: true,
    className: "w-full md:max-w-xl",
    toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="mt-3 flex -space-x-2 overflow-hidden">
          <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              //className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={product.image?.url}
              alt={product.name}
          />
        </div>
        <div className="product__info">
          <h4 className="product__name text-lg font-medium">{product.name}</h4>
          <p className="product__description text-gray-600">{result}</p>
          <button
            onClick={() => handleAddToCart(product.id, 1)}
            className="btn-primary" //"bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleRemoveFromCart(product.id, product.quanitity)}
            className="btn-primary" //"bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Remove From Cart Cart
          </button>
          <ToastContainer {...toastOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;