import { useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart, fetchCart, onAddToCart, handleUpdateCartQty, handleRemoveFromCart,  }) => {

    useEffect(() => {
        fetchCart();

    }, [fetchCart]);

    if (cart && cart.line_items) {
        if (cart.line_items.length > 0) {
            return (
                <>
                    <div>
                        <p>{cart.line_items.length}</p>
                        {cart.line_items.map(line_item => (
                            <CartItem
                                key={line_item.id}
                                line_item={line_item}
                                onRemove={handleRemoveFromCart}
                                onAdd={onAddToCart}
                            />
                            // <p>{line_item.name}</p>
                        ))}
                    </div>
                    <div className="cart__footer">
                        <button className="cart__btn-empty" onClick={this.handleEmptyCart}>Empty cart</button>
                        <Link
                            className="cart__btn-checkout"
                            to="/checkout"
                        >
                            Checkout
                        </Link>
                    </div>
                </>
            );
        } else {
            return <p>No products in the cart.</p>;
        }
    } else {
        return (
            <div><p>Loading...</p></div>
        );
    }
}

export default Cart;