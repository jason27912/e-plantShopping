import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import AboutUs from './pages/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function Navbar() {
  const totalItems = useSelector((state) => state.cart?.totalItems || 0);
  return (
    <nav style={{ backgroundColor: '#2d6a4f', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ color: 'white', margin: 0 }}>🌿 Paradise Nursery</h1>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/plants" style={{ color: 'white', textDecoration: 'none' }}>Plants</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
          🛒 <span style={{ backgroundColor: '#ffb703', color: '#1b4332', borderRadius: '50%', padding: '2px 8px' }}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

function LandingPage() {
  return (
    <div className="landing-container">
      <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '50px', borderRadius: '15px', textAlign: 'center', color: 'white', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Welcome to Paradise Nursery</h1>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>Bring nature home with our premium collection of indoor plants</p>
        <Link to="/plants">
          <button style={{ backgroundColor: '#2d6a4f', color: 'white', border: 'none', padding: '12px 30px', fontSize: '18px', borderRadius: '8px', cursor: 'pointer' }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
