import React, { useState } from 'react';
//import AddFlavor from './components/Floavors/AddFlavor';

const ProductOptions = ({ product }) => {
    const [name, setName] = useState(product.name);
    const [flavor, setFlavor] = useState(product.flavor);
    const [price, setPrice] = useState(product.price);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Soda</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="flavor" className="block text-gray-700 font-bold mb-2">
                Flavor
            </label>
            <input
                type="text"
                id="flavor"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                Price
            </label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Save Changes
            </button>
        </form>
        </div>
    );
};

export default ProductOptions;