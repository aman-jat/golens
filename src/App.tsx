import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrderProvider } from './contexts/OrderContext';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="bg-slate-950 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'Newsreader, serif' }}>G</span>
                </div>
                <span className="text-white font-bold" style={{ fontFamily: 'Newsreader, serif' }}>Golens</span>
              </div>
              <p className="text-sm leading-relaxed">Premium eyewear for every vision. Crafted with precision, worn with style.</p>
            </div>
            {[
              { title: 'Shop', links: ['Sunglasses', 'Eyeglasses', 'Computer Glasses', 'New Arrivals'] },
              { title: 'Help', links: ['Contact Us', 'Track Order', 'Returns', 'FAQ'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Sustainability'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white text-sm font-semibold mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs">
            <p>© 2026 Golens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="*"
                  element={
                    <Layout>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products/:category" element={<ProductListPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                      </Routes>
                    </Layout>
                  }
                />
              </Routes>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
