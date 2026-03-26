import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import type { Order } from '../contexts/OrderContext';

const STATUS_CONFIG: Record<Order['status'], { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bg: string; label: string }> = {
  Processing: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Processing' },
  Confirmed: { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Confirmed' },
  Shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Shipped' },
  Delivered: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Delivered' },
  Cancelled: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', label: 'Cancelled' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function OrdersPage() {
  const { orders } = useOrders();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4">
        <div className="text-center">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Sign in to view your orders</h2>
          <p className="text-slate-400 mb-8">You need to be signed in to see your order history.</p>
          <Link to="/login" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
            My Orders
          </h1>
          <p className="text-slate-500 text-sm">Welcome back, {user?.name}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">No orders yet</h2>
            <p className="text-slate-400 mb-8">Place your first order to see it here.</p>
            <Link to="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const statusCfg = STATUS_CONFIG[order.status];
              const StatusIcon = statusCfg.icon;

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-slate-900 text-sm">{order.id}</p>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
                          <StatusIcon size={11} />
                          {statusCfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-900">${order.total.toFixed(0)}</p>
                      <p className="text-xs text-slate-400">Est. delivery: {formatDate(order.estimatedDelivery)}</p>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      {(['Confirmed', 'Shipped', 'Delivered'] as const).map((step, idx) => {
                        const steps = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];
                        const currentIdx = steps.indexOf(order.status);
                        const stepIdx = steps.indexOf(step);
                        const done = currentIdx >= stepIdx;
                        return (
                          <React.Fragment key={step}>
                            <div className="flex flex-col items-center gap-1">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {done ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[10px] font-medium ${done ? 'text-emerald-600' : 'text-slate-400'}`}>{step}</span>
                            </div>
                            {idx < 2 && (
                              <div className={`flex-1 h-0.5 mx-2 ${done && currentIdx > stepIdx ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-4 divide-y divide-slate-50">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4 py-3">
                        <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: 'Newsreader, serif' }}>{item.product.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity} · Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(0)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Truck size={13} className="text-slate-400" />
                      Delivering to: {order.address}
                    </div>
                    <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                      Buy Again <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
