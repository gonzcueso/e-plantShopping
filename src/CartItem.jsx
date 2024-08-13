import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onItemRemoved }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcular el costo total de todos los productos en el carrito
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const itemCost = parseFloat(item.cost.replace('$', '')); // Elimina el símbolo $ y convierte a número
        return total + item.quantity * itemCost;
    }, 0).toFixed(2); // Asegúrate de tener solo dos decimales
};


  const handleContinueShopping = (e) => {
    onContinueShopping(); // Regresa al listado de productos
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    onItemRemoved(item.name); // Llamar al callback para restaurar el botón en ProductList
  };
  
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      handleRemove(item);
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };
  

  // Calcular el costo total basado en la cantidad de un producto
  const calculateTotalCost = (item) => {
    return item.quantity * item.cost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
