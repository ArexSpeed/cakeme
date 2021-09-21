const ShopOrders = ({ item }) => {
  return (
    <tr>
      <td className="td__product-id">{item.id}</td>
      <td>
        <div className="td__product">
          <img
            className="td__product-image"
            src={item.imageFirstUrl ? item.imageFirstUrl : ''}
            alt=""
          />
          <div className="td__product-info">
            <div className="td__product-name">{item.name}</div>
            <div className={`td__product-category ${item.category}`}>{item.category}</div>
          </div>
        </div>
      </td>
      <td>{item.userName}</td>
      <td className="td__product-price">
        {item.qty} x €{item.price}
      </td>
      <td className="td__product-price-total">€{item.totalPrice.toFixed(2)}</td>
      <td className="td__product-date">{item.orderDate.substr(0, 10)}</td>
      <td className="td__product-status">
        <span className="init">{item.status}</span>
      </td>
    </tr>
  );
};

export default ShopOrders;
