import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronLeft, Check, Shield, Truck, RotateCcw } from 'lucide-react';
import { getProductById, products } from '../mockdata';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        <div className="text-center">
          <p className="text-3xl mb-2">😕</p>
          <p className="text-lg font-medium mb-4">Product not found</p>
          <button onClick={() => navigate('/')} className="text-sm text-amber-600 underline">Back to home</button>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-slate-900' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-slate-50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">{product.brand}</p>
                <h1 className="text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Newsreader, serif' }}>
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                  wishlisted ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i < Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
              <span className="text-sm text-slate-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-slate-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg">-{product.discount}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Frame Color', value: product.frameColor },
                { label: 'Lens Color', value: product.lensColor },
                { label: 'Shape', value: product.frameShape.charAt(0).toUpperCase() + product.frameShape.slice(1) },
                { label: 'Material', value: product.material },
              ].map(spec => (
                <div key={spec.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium">{spec.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">Size</p>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedSize === size
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-700 mb-3">Key Features</p>
              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                    <Check size={11} /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                id="product-add-to-cart"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 shadow-lg'
                }`}
              >
                {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-5 py-4 rounded-xl border-2 transition-all ${
                  wishlisted ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-slate-200 text-slate-600 hover:border-rose-300'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'On orders over $100' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: Shield, label: 'Authentic', sub: '100% genuine product' },
              ].map(badge => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="text-center">
                    <Icon size={20} className="mx-auto text-slate-400 mb-1" />
                    <p className="text-xs font-semibold text-slate-700">{badge.label}</p>
                    <p className="text-[10px] text-slate-400">{badge.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'Newsreader, serif' }}>You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
