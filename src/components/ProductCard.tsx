import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../mockdata';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-slate-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
              -{product.discount}%
            </span>
          )}
        </div>
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-500 hover:bg-rose-50 hover:text-rose-500'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-slate-900 font-semibold text-sm leading-tight hover:text-slate-600 transition-colors mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mb-2">{product.frameColor} · {product.frameShape}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'}
                stroke={i < Math.round(product.rating) ? '#f59e0b' : '#d1d5db'}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-1.5">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
