import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold font-serif">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'Newsreader, serif' }}>
              Golens
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products/sunglasses" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sunglasses</Link>
            <Link to="/products/eyeglasses" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Eyeglasses</Link>
            <Link to="/products/computer-glasses" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Computer Glasses</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              id="nav-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Search size={20} />
            </button>

            <Link to="/cart" id="nav-cart-btn" className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <Link to="/cart?tab=wishlist" id="nav-wishlist-btn" className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="nav-user-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user?.name[0]}</span>
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Package size={15} />
                      My Orders
                    </Link>
                    <button
                      id="nav-logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                id="nav-login-btn"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                <User size={15} />
                Sign In
              </Link>
            )}

            <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3">
            <input
              id="nav-search-input"
              type="text"
              placeholder="Search for sunglasses, eyeglasses..."
              autoFocus
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {['Sunglasses', 'Eyeglasses', 'Computer Glasses'].map(item => (
              <Link
                key={item}
                to={`/products/${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-700 border-b border-gray-100"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
