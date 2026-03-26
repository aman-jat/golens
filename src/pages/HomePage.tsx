import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Sun, Glasses, Monitor } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, getBestsellers, getNewArrivals } from '../mockdata';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=90',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&q=90',
  'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=90',
];

const CATEGORIES = [
  { label: 'Sunglasses', slug: 'sunglasses', icon: Sun, count: products.filter(p => p.category === 'sunglasses').length, bg: 'from-amber-50 to-orange-50', accent: 'text-amber-600', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80' },
  { label: 'Eyeglasses', slug: 'eyeglasses', icon: Glasses, count: products.filter(p => p.category === 'eyeglasses').length, bg: 'from-blue-50 to-indigo-50', accent: 'text-blue-600', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80' },
  { label: 'Computer Glasses', slug: 'computer-glasses', icon: Monitor, count: products.filter(p => p.category === 'computer-glasses').length, bg: 'from-emerald-50 to-teal-50', accent: 'text-emerald-600', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80' },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const bestsellers = useMemo(() => getBestsellers(), []);
  const newArrivals = useMemo(() => getNewArrivals(), []);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden bg-slate-950">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Hero eyewear"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-40' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles size={12} />
              New 2026 Collection
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              See the World
              <br />
              <span className="text-amber-400">Differently</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Premium eyewear crafted for the discerning eye. From iconic sunglasses to precision prescription frames.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products/sunglasses"
                id="hero-shop-now"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/30"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/products/eyeglasses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? 'bg-amber-400 w-6' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '50,000+', label: 'Happy Customers' },
            { num: '200+', label: 'Premium Brands' },
            { num: '4.9★', label: 'Average Rating' },
            { num: 'Free', label: 'Returns & Exchanges' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Newsreader, serif' }}>{stat.num}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Shop by Category</h2>
            <p className="text-slate-500">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.bg} p-6 border border-white hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm mb-4`}>
                    <Icon size={20} className={cat.accent} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Newsreader, serif' }}>{cat.label}</h3>
                  <p className="text-slate-500 text-sm mb-4">{cat.count} styles available</p>
                  <span className={`inline-flex items-center gap-1 text-sm font-semibold ${cat.accent} group-hover:gap-2 transition-all`}>
                    Browse Collection <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-amber-500" />
                <span className="text-amber-600 text-sm font-semibold uppercase tracking-wide">Top Picks</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Newsreader, serif' }}>Bestsellers</h2>
            </div>
            <Link to="/products/sunglasses" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-blue-500" />
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Just Arrived</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Newsreader, serif' }}>New Collection</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
            Free Shipping on Orders Over $100
          </h2>
          <p className="text-slate-400 mb-8">Plus free returns within 30 days. No questions asked.</p>
          <Link
            to="/products/sunglasses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/30"
          >
            Shop the Collection <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
