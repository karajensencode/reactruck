
const Review = ({ checkoutToken }) => { 
    return (
        <>
            <h1>Order Summary</h1>
            <ul>
            {checkoutToken.live.line_items.map((product) => {
                <>
                    <li>{product.name}</li>
                    <li>Quantity: {product.quantity}</li>
                </>
            })}
            </ul>
        </>
    )
}
export default Review;