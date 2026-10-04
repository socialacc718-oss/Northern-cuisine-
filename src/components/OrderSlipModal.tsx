import React, { useEffect, useState } from 'react';
import { CheckCircle2, Printer, ArrowLeft, ExternalLink, Share2, PhoneCall, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderSlipData } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { generateWhatsAppUrl, formatWhatsAppOrderMessage } from '../utils/whatsapp';

interface OrderSlipModalProps {
  slip: OrderSlipData | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSlipModal: React.FC<OrderSlipModalProps> = ({ slip, onClose, onNewOrder }) => {
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  useEffect(() => {
    if (slip) {
      // 1. Center burst
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#ef4444', '#34d399', '#fbbf24', '#ffffff'],
      });

      // 2. Left side cannon
      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.7 },
          colors: ['#10b981', '#fbbf24', '#f87171', '#34d399'],
        });
      }, 200);

      // 3. Right side cannon
      const timer2 = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.7 },
          colors: ['#10b981', '#fbbf24', '#f87171', '#34d399'],
        });
      }, 400);

      // Automatic WhatsApp dispatch window
      const dispatchTimer = setTimeout(() => {
        const url = generateWhatsAppUrl(slip);
        window.open(url, '_blank');
      }, 900);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(dispatchTimer);
      };
    }
  }, [slip]);

  if (!slip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySlip = () => {
    const text = formatWhatsAppOrderMessage(slip);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = generateWhatsAppUrl(slip);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[96dvh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Status Notification Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 print:hidden shadow-md">
          <div className="flex items-center gap-2.5 font-medium text-xs sm:text-sm">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-bounce shrink-0">
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm sm:text-base leading-tight">
                Order Received! Mubarak Ho 🎉
              </p>
              <p className="text-[11px] text-emerald-100">
                Official Kitchen Slip WhatsApp par send ho chuki hai.
              </p>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white text-emerald-800 font-bold px-3.5 py-2 rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <span>Open WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Printable Receipt Paper Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-white text-neutral-900 font-sans print:overflow-visible">
          {/* Slip Header */}
          <div className="text-center space-y-2 pb-4 border-b-2 border-dashed border-neutral-300">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-emerald-600 bg-white p-0.5">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Northern Cuisine"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="font-heading font-extrabold text-2xl tracking-tight text-neutral-900">
              NORTHERN CUISINE
            </h2>
            <p className="text-xs text-neutral-600 uppercase tracking-widest font-semibold">
              Hygienic Chinese Food & Continental Delights
            </p>
            <p className="text-[11px] text-neutral-500">
              Order WhatsApp: {RESTAURANT_INFO.whatsappDisplay} · Tel: {RESTAURANT_INFO.secondaryPhone}
            </p>
          </div>

          {/* Slip Metadata Bar */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-100 p-3.5 rounded-xl">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Order Number</span>
              <span className="font-mono font-bold text-neutral-900 text-sm">#{slip.orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Date & Time</span>
              <span className="font-mono text-neutral-800">{slip.createdAt}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Order Type</span>
              <span className="font-semibold text-emerald-700 capitalize">
                {slip.customer.orderType === 'delivery' ? 'Home Delivery' : 'Self Takeaway Pickup'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Payment</span>
              <span className="font-semibold text-neutral-800">{slip.customer.paymentMethod}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border border-neutral-200 rounded-xl p-3.5 text-xs space-y-1">
            <div className="font-bold text-neutral-800 mb-1 border-b border-neutral-200 pb-1 flex justify-between">
              <span>Customer Information</span>
              <span className="font-mono font-normal text-neutral-500">{slip.customer.phoneNumber}</span>
            </div>
            <p><span className="text-neutral-500">Customer Name:</span> <strong className="text-neutral-900">{slip.customer.fullName}</strong></p>
            {slip.customer.orderType === 'delivery' && (
              <p><span className="text-neutral-500">Address:</span> <span className="text-neutral-900">{slip.customer.deliveryAddress}</span></p>
            )}
            {slip.customer.landmark && (
              <p><span className="text-neutral-500">Landmark:</span> <span className="text-neutral-700">{slip.customer.landmark}</span></p>
            )}
            {slip.customer.specialInstructions && (
              <p><span className="text-neutral-500">Special Notes:</span> <span className="text-neutral-700 italic font-medium">{slip.customer.specialInstructions}</span></p>
            )}
          </div>

          {/* Items Breakdown Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-300 pb-1">
              Order Breakdown
            </div>
            <div className="space-y-2">
              {slip.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs py-1 border-b border-neutral-100">
                  <div className="flex-1 pr-3">
                    <p className="font-semibold text-neutral-900">
                      {idx + 1}. {item.name}
                    </p>
                    {item.selectedVariant && (
                      <p className="text-[11px] text-emerald-700">Size: {item.selectedVariant}</p>
                    )}
                    <p className="text-[11px] text-neutral-500 font-mono">
                      Rs. {item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-mono font-bold text-neutral-900 tabular-nums">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Calculation */}
          <div className="pt-2 border-t-2 border-dashed border-neutral-300 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Items Subtotal</span>
              <span className="font-mono tabular-nums text-neutral-900">Rs. {slip.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Standard Delivery Charges</span>
              <span className="font-mono tabular-nums text-neutral-900">
                {slip.deliveryFee === 0 ? 'FREE (Takeaway)' : `Rs. ${slip.deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-300 flex justify-between items-baseline text-base font-extrabold text-neutral-950">
              <span>TOTAL BILL</span>
              <span className="font-mono text-emerald-700 text-lg tabular-nums">
                Rs. {slip.total.toLocaleString()}/-
              </span>
            </div>
          </div>

          {/* Slip Footer Notice */}
          <div className="text-center pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 space-y-1">
            <p className="font-semibold text-neutral-800">Thank you for dining with Northern Cuisine!</p>
            <p>Yeh slip restaurant WhatsApp number par bhej di gayi hai.</p>
            <p className="font-mono text-[10px]">Make Your Choice Worth · Make Your Choice Reasonable</p>
          </div>
        </div>

        {/* Modal Action Controls (shrink-0) */}
        <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 space-y-3 shrink-0 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Send Again on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Slip</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleCopySlip}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Slip Text Copied!' : 'Copy Slip Text'}</span>
            </button>

            <button
              onClick={onNewOrder}
              className="text-xs text-emerald-400 hover:underline font-medium cursor-pointer"
            >
              + Place Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
