import React, { useState } from 'react';
import { X, Send, User, Phone, MapPin, FileText, CheckCircle2, Bike, Store, AlertCircle } from 'lucide-react';
import { CartItem, OrderCustomerInfo, OrderSlipData } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'delivery' | 'takeaway';
  onOrderGenerated: (slip: OrderSlipData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onOrderGenerated,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState<'delivery' | 'takeaway'>(orderType);
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online Bank / JazzCash / Easypaisa'>('Cash on Delivery');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = selectedOrderType === 'delivery' ? RESTAURANT_INFO.standardDeliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Baraye meharbani apna Mukammal Naam (Full Name) likhein.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setError('Baraye meharbani sahi WhatsApp Phone Number darj karein (e.g. 0333-1234567).');
      return;
    }

    if (selectedOrderType === 'delivery' && !address.trim()) {
      setError('Home delivery k liye mukammal address darj karein.');
      return;
    }

    // Generate unique order ID
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NC-${randomCode}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const customer: OrderCustomerInfo = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      orderType: selectedOrderType,
      deliveryAddress: address.trim(),
      landmark: landmark.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      paymentMethod,
    };

    const slip: OrderSlipData = {
      orderId,
      createdAt: formattedDate,
      customer,
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      status: 'Confirmed',
    };

    onOrderGenerated(slip);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl text-white overflow-hidden max-h-[95dvh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="shrink-0 px-5 py-4 border-b border-neutral-800 bg-neutral-900/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white shrink-0 border border-emerald-500">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Logo"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                Customer Details & Slip
              </h3>
              <p className="text-[11px] text-neutral-400">
                Order slip WhatsApp number: 0333 4253027 par send hogi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Order Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Order Method:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedOrderType('delivery')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  selectedOrderType === 'delivery'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Home Delivery (DC Rs. 100)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  selectedOrderType === 'takeaway'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeaway Pickup (Free)</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customer Name (Aap Ka Naam) *</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Muhammad Ali"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* WhatsApp / Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phone / WhatsApp Number *</span>
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 0333 1234567"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Delivery Address (only if delivery) */}
          {selectedOrderType === 'delivery' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complete Delivery Address (Ghar / Office Address) *</span>
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Street #, Sector / Colony, City"
                className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
              />
            </div>
          )}

          {/* Landmark */}
          {selectedOrderType === 'delivery' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-400">
                Nearest Landmark (Mashhoor Jagah - Optional)
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Near Mosque, Market, Plaza..."
                className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>Special Instructions / Kitchen Notes (Optional)</span>
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra spicy, less spicy, extra cutlery"
              className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-medium text-neutral-300">Payment Option:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'bg-emerald-950/70 border-emerald-500 text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-neutral-400">Pay when receiving food</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Online Bank / JazzCash / Easypaisa')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'Online Bank / JazzCash / Easypaisa'
                    ? 'bg-emerald-950/70 border-emerald-500 text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="font-semibold">JazzCash / Bank Transfer</div>
                <div className="text-[11px] text-neutral-400">Screenshot to WhatsApp</div>
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-mono text-white">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Charges</span>
              <span className="font-mono text-white">
                {deliveryFee === 0 ? 'Free (Takeaway)' : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm text-white">
              <span>Grand Total</span>
              <span className="font-mono text-emerald-400">Rs. {grandTotal.toLocaleString()}/-</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Generate Official Slip & Send to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
