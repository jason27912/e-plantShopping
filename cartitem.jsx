import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeItem } from '../redux/CartSlice';

function CartItem() {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

  const handleIncrease = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/plants">
          <button style={{ backgroundColor: '#2d6a4f', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '5px' }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      
      {/* Total Cart Amount */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginBottom: '25px' }}>
        <span><strong>Total Items:</strong> {totalItems}</span>
        <span><strong>Total Cost:</strong> ${totalPrice.toFixed(2)}</span>
      </div>

      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ddd', padding: '20px 0', flexWrap: 'wrap' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
          
          <div style={{ flex: 2 }}>
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price}</p>
            <p><strong>Item Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => handleDecrease(item.id, item.quantity)} style={{ backgroundColor: '#e63946', color: 'white', width: '35px', height: '35px', border: 'none', borderRadius: '5px' }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrease(item.id, item.quantity)} style={{ backgroundColor: '#2d6a4f', color: 'white', width: '35px', height: '35px', border: 'none', borderRadius: '5px' }}>+</button>
          </div>
          
          <button onClick={() => dispatch(removeItem(item.id))} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px' }}>Delete</button>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center' }}>
        <Link to="/plants">
          <button style={{ backgroundColor: '#1b4332', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '5px' }}>Continue Shopping</button>
        </Link>
        <button onClick={() => alert('Coming Soon!')} style={{ backgroundColor: '#ffb703', color: '#1b4332', padding: '12px 25px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
