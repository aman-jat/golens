import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Heart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'cart';
  const { items: cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { items: wishlistItems, removeFromWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { placeOrder } = useOrders();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    placeOrder(cartItems, totalPrice);
    clearCart();
    setOrdered(true);
  };

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const setTab = (tab: string) => setSearchParams(tab === 'cart' ? {} : { tab });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Newsreader, serif' }}>
            My Bag
          </h1>
          {/* Tabs */}
          <div className="flex mt-6 border-b border-slate-200">
            <button
              id="tab-cart"
              onClick={() => setTab('cart')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'cart'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShoppingCart size={16} />
              Cart ({cartItems.length})
            </button>
            <button
              id="tab-wishlist"
              onClick={() => setTab('wishlist')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'wishlist'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Heart size={16} />
              Wishlist ({wishlistItems.length})
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <>
            {ordered ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Package size={36} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Newsreader, serif' }}>Order Placed!</h2>
                <p className="text-slate-500 mb-8">Your order has been confirmed. Track it in My Orders.</p>
                <div className="flex justify-center gap-4">
                  <Link to="/orders" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors">
                    View Orders
                  </Link>
                  <Link to="/" className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-24">
                <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
                <p className="text-slate-400 mb-8">Browse our collection and add items to your cart.</p>
                <Link to="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-xl" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">{item.product.brand}</p>
                            <Link to={`/product/${item.product.id}`}>
                              <p className="font-semibold text-slate-900 text-sm leading-tight hover:text-slate-600 transition-colors" style={{ fontFamily: 'Newsreader, serif' }}>
                                {item.product.name}
                              </p>
                            </Link>
                            <p className="text-xs text-slate-400 mt-0.5">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty Control */}
                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
                    <h2 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: 'Newsreader, serif' }}>Order Summary</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                        <span>${totalPrice.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Shipping</span>
                        <span className={totalPrice >= 100 ? 'text-emerald-600 font-medium' : ''}>
                          {totalPrice >= 100 ? 'FREE' : '$12'}
                        </span>
                      </div>
                      <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900">
                        <span>Total</span>
                        <span>${(totalPrice + (totalPrice >= 100 ? 0 : 12)).toFixed(0)}</span>
                      </div>
                    </div>

                    {totalPrice < 100 && (
                      <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2.5 mb-4">
                        Add ${(100 - totalPrice).toFixed(0)} more for free shipping!
                      </p>
                    )}

                    <button
                      id="checkout-btn"
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg"
                    >
                      {isAuthenticated ? 'Place Order' : 'Sign In to Checkout'}
                      <ArrowRight size={16} />
                    </button>
                    <Link to="/" className="block text-center text-sm text-slate-500 mt-3 hover:text-slate-700 transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-24">
                <Heart size={48} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Your wishlist is empty</h2>
                <p className="text-slate-400 mb-8">Save items you love to your wishlist.</p>
                <Link to="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
                    <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="p-4">
                      <p className="text-xs text-slate-400 font-medium mb-0.5">{product.brand}</p>
                      <Link to={`/product/${product.id}`}>
                        <p className="font-semibold text-slate-900 text-sm mb-1 hover:text-slate-600 transition-colors" style={{ fontFamily: 'Newsreader, serif' }}>
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-lg font-bold text-slate-900 mb-4">${product.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <ShoppingCart size={13} /> Move to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="p-2.5 border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
