import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const products = [
  // Indoor Plants (6 plants)
  { id: 1, name: 'Monstera Deliciosa', price: 29.99, category: 'Indoor Plants', image: '/images/monstera.jpg' },
  { id: 2, name: 'Snake Plant', price: 19.99, category: 'Indoor Plants', image: '/images/snake.jpg' },
  { id: 3, name: 'Fiddle Leaf Fig', price: 49.99, category: 'Indoor Plants', image: '/images/fig.jpg' },
  { id: 4, name: 'Peace Lily', price: 24.99, category: 'Indoor Plants', image: '/images/lily.jpg' },
  { id: 5, name: 'Spider Plant', price: 15.99, category: 'Indoor Plants', image: '/images/spider.jpg' },
  { id: 6, name: 'Pothos', price: 12.99, category: 'Indoor Plants', image: '/images/pothos.jpg' },
  // Succulents (6 plants)
  { id: 7, name: 'Aloe Vera', price: 14.99, category: 'Succulents', image: '/images/aloe.jpg' },
  { id: 8, name: 'Jade Plant', price: 17.99, category: 'Succulents', image: '/images/jade.jpg' },
  { id: 9, name: 'Echeveria', price: 9.99, category: 'Succulents', image: '/images/echeveria.jpg' },
  { id: 10, name: "Burro's Tail", price: 11.99, category: 'Succulents', image: '/images/burro.jpg' },
  { id: 11, name: 'Haworthia', price: 8.99, category: 'Succulents', image: '/images/haworthia.jpg' },
  { id: 12, name: 'String of Pearls', price: 13.99, category: 'Succulents', image: '/images/pearls.jpg' },
  // Herbs (6 plants)
  { id: 13, name: 'Sweet Basil', price: 9.99, category: 'Herbs', image: '/images/basil.jpg' },
  { id: 14, name: 'Rosemary', price: 8.99, category: 'Herbs', image: '/images/rosemary.jpg' },
  { id: 15, name: 'Mint', price: 7.99, category: 'Herbs', image: '/images/mint.jpg' },
  { id: 16, name: 'Thyme', price: 7.99, category: 'Herbs', image: '/images/thyme.jpg' },
  { id: 17, name: 'Oregano', price: 7.99, category: 'Herbs', image: '/images/oregano.jpg' },
  { id: 18, name: 'Cilantro', price: 6.99, category: 'Herbs', image: '/images/cilantro.jpg' },
];

function ProductList() {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const categories = [...new Set(products.map(p => p.category))];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    // Disable the button after adding
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1b4332' }}>Our Plants</h1>
      
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '50px' }}>
          <h2 style={{ borderLeft: '5px solid #2d6a4f', paddingLeft: '15px', marginBottom: '25px', color: '#1b4332' }}>
            {category}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '25px' 
          }}>
            {products.filter(p => p.category === category).map(product => (
              <div key={product.id} style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                textAlign: 'center',
                backgroundColor: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/180'; }}
                />
                <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
                <p style={{ color: '#2d6a4f', fontSize: '18px', fontWeight: 'bold' }}>${product.price}</p>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  disabled={addedItems[product.id]}
                  style={{
                    backgroundColor: addedItems[product.id] ? '#ccc' : '#2d6a4f',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: addedItems[product.id] ? 'not-allowed' : 'pointer',
                    marginTop: '5px',
                    width: '100%'
                  }}
                >
                  {addedItems[product.id] ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
