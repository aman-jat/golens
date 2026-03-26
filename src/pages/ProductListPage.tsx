import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mockdata';
import ProductCard from '../components/ProductCard';
import { Sun, Glasses, Monitor, SlidersHorizontal } from 'lucide-react';

type Category = 'sunglasses' | 'eyeglasses' | 'computer-glasses';

const CATEGORY_META: Record<string, { label: string; desc: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  sunglasses: { label: 'Sunglasses', desc: 'UV-protective, polarized lenses for every style.', icon: Sun },
  eyeglasses: { label: 'Eyeglasses', desc: 'Precision optical frames for every face shape.', icon: Glasses },
  'computer-glasses': { label: 'Computer Glasses', desc: 'Blue light blocking lenses for screen time.', icon: Monitor },
};

export default function ProductListPage() {
  const { category } = useParams<{ category: string }>();
  const cat = (category as Category) || 'sunglasses';
  const meta = CATEGORY_META[cat] || CATEGORY_META['sunglasses'];
  const Icon = meta.icon;

  const filtered = useMemo(() =>
    products.filter(p => p.category === cat),
    [cat]
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Icon size={20} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Collection</span>
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Newsreader, serif' }}>{meta.label}</h1>
          <p className="text-slate-400">{meta.desc} — {filtered.length} styles</p>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-600 text-sm">{filtered.length} products</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-xl mb-2">No products found</p>
            <p className="text-sm">Try browsing a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
