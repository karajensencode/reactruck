
const CartItem = ({ item, onRemove, onAdd }) => {
    return (
        <div>
            <span>
                <img src={item.image.url} alt={item.image.alt} />
            </span>
`           <h3><b>{item.name}</b></h3>
            <span className="ec ly adu bbm">
                <button
                    className="ab ly yz aed alm are aru avz awf axu bbs bbw bce big bmg"
                    onClick={() => onRemove(item.id)}
                >-</button>
                <div class="col-sm-10">
                    <input type="number" class="form-control form-control-sm" id="colFormLabelSm" />
                </div>
                <button
                    className="ab ly yz aed alm are aru avz awf axu bbs bbw bce big bmg"
                    onClick={() => onAdd(item)}
                >+</button>
            </span>
            <p>Price: ${item.price.formatted / 100}</p>
            {/* <p>SKU: {line_item.sku}</p>
            <p>Product ID: {line_item.product_id}</p> */}
            {Object.entries(item.selected_options).map(([key, value]) => (
                <p key={key}>{key}: {value}</p>
            ))}
        </div>
    );
}
export default CartItem;