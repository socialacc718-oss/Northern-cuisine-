import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, Store } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  orderType: 'delivery' | 'takeaway';
  setOrderType: (type: 'delivery' | 'takeaway') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  orderType,
  setOrderType,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' && items.length > 0 ? RESTAURANT_INFO.standardDeliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel container: fits 100dvh inside viewport */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <aside
          className="w-screen max-w-full sm:max-w-md bg-neutral-950 border-l border-neutral-800 text-white flex flex-col h-[100dvh] shadow-2xl relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          {/* 1. Header (shrink-0) */}
          <div className="shrink-0 px-4 sm:px-6 py-4 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-900/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 id="cart-title" className="font-heading font-bold text-lg text-white">
                  Your Order Cart
                </h2>
                <span className="text-xs text-neutral-400">
                  {items.length === 0 ? '0 items' : `${items.reduce((s, i) => s + i.quantity, 0)} items selected`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Order Mode Selector (Delivery vs Takeaway) */}
          <div className="shrink-0 px-4 sm:px-6 py-3 bg-neutral-900/30 border-b border-neutral-800/60">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Select Order Option:
            </span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery (Rs. 100)</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Self Pickup (Free)</span>
              </button>
            </div>
          </div>

          {/* 3. Cart Items List (scrollable flex-1) */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3.5 overscroll-contain">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base">Cart is Empty</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Explore our Chinese menu or couple deals and add delicious dishes to your order.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-neutral-900/90 border border-neutral-800/80 p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-white truncate">
                      {item.name}
                    </h4>
                    {item.selectedVariant && (
                      <span className="text-[11px] text-emerald-400 block truncate">
                        Size: {item.selectedVariant}
                      </span>
                    )}
                    <span className="text-xs font-mono text-neutral-300 tabular-nums">
                      Rs. {item.price.toLocaleString()} each
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-neutral-950 border border-neutral-700 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-red-400 text-neutral-400 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-emerald-400 text-neutral-400 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer & Checkout (shrink-0) */}
          {items.length > 0 && (
            <div className="shrink-0 p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 space-y-3.5 pb-safe">
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-white">
                    Rs. {subtotal.toLocaleString()}/-
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>
                    Delivery Fee {orderType === 'takeaway' && '(Pickup)'}
                  </span>
                  <span className="font-mono tabular-nums text-white">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}/-`}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm sm:text-base font-bold text-white">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-400 text-lg tabular-nums">
                    Rs. {grandTotal.toLocaleString()}/-
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Slip & WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
                  <span>Standard Delivery: Rs. 100/-</span>
                  <button
                    onClick={onClearCart}
                    className="hover:text-red-400 underline transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
