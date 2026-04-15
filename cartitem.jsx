import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeItem } from '../redux/cartSlice';

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

  // Empty cart view
  if (!items || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Your Cart is Empty 🌱</h2>
        <p>Looks like you haven't added any plants yet.</p>
        <Link to="/plants">
          <button style={{
            backgroundColor: '#2d6a4f',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer'
          }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#1b4332' }}>Shopping Cart</h1>
      
      {/* Total Cart Amount and Total Cost */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '25px', 
        padding: '15px', 
        backgroundColor: '#e8f5e9', 
        borderRadius: '8px' 
      }}>
        <span><strong>Total Items:</strong> {totalItems}</span>
        <span><strong>Total Cost:</strong> ${totalPrice?.toFixed(2) || '0.00'}</span>
      </div>

      {/* Cart Items - each plant with thumbnail, name, unit price */}
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          borderBottom: '1px solid #ddd',
          padding: '20px 0',
          flexWrap: 'wrap'
        }}>
          {/* Thumbnail */}
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }}
          />
          
          {/* Name and Unit Price */}
          <div style={{ flex: 2, minWidth: '150px' }}>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ color: '#2d6a4f', fontWeight: 'bold' }}>Unit Price: ${item.price}</p>
            <p><strong>Item Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          
          {/* Increase/Decrease Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => handleDecrease(item.id, item.quantity)}
              style={{
                backgroundColor: '#e63946',
                color: 'white',
                border: 'none',
                width: '35px',
                height: '35px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              -
            </button>
            <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '16px' }}>{item.quantity}</span>
            <button 
              onClick={() => handleIncrease(item.id, item.quantity)}
              style={{
                backgroundColor: '#2d6a4f',
                color: 'white',
                border: 'none',
                width: '35px',
                height: '35px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              +
            </button>
          </div>
          
          {/* Delete Button */}
          <button 
            onClick={() => dispatch(removeItem(item.id))}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Continue Shopping and Checkout Buttons */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center' }}>
        <Link to="/plants">
          <button style={{
            backgroundColor: '#1b4332',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Continue Shopping
          </button>
        </Link>
        
        <button 
          onClick={() => alert('Coming Soon! Checkout functionality will be available soon.')}
          style={{
            backgroundColor: '#ffb703',
            color: '#1b4332',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
