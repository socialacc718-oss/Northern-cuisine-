import { OrderSlipData, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export function formatWhatsAppOrderMessage(slip: OrderSlipData): string {
  const itemList = slip.items
    .map((item: CartItem, index: number) => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      return `${index + 1}. *${item.name}${variantText}* × ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`;
    })
    .join('\n');

  const notesText = slip.customer.specialInstructions
    ? `\n📝 *Notes:* ${slip.customer.specialInstructions}`
    : '';

  const landmarkText = slip.customer.landmark
    ? `\n📍 *Landmark:* ${slip.customer.landmark}`
    : '';

  const orderTypeIcon = slip.customer.orderType === 'delivery' ? '🛵 Home Delivery' : '🛍 Takeaway Pickup';

  const message = `📋 *NORTHERN CUISINE - ONLINE ORDER SLIP*
━━━━━━━━━━━━━━━━━━━━
🧾 *Order ID:* ${slip.orderId}
📅 *Date & Time:* ${slip.createdAt}
🏷 *Order Mode:* ${orderTypeIcon}
━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS:*
• *Name:* ${slip.customer.fullName}
• *Phone:* ${slip.customer.phoneNumber}
${slip.customer.orderType === 'delivery' ? `• *Address:* ${slip.customer.deliveryAddress}${landmarkText}` : '• *Pickup:* Northern Cuisine Counter'}${notesText}
━━━━━━━━━━━━━━━━━━━━
🍽 *ORDER BREAKDOWN:*
${itemList}
━━━━━━━━━━━━━━━━━━━━
💵 *BILL DETAILS:*
• Subtotal: Rs. ${slip.subtotal.toLocaleString()}
${slip.customer.orderType === 'delivery' ? `• Delivery Fee: Rs. ${slip.deliveryFee.toLocaleString()}` : '• Delivery Fee: Rs. 0 (Takeaway)'}
⭐ *NET PAYABLE: Rs. ${slip.total.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━
💳 *Payment:* ${slip.customer.paymentMethod}
✨ *Status:* Received via Website

_Please confirm my order & approximate delivery time. Shukriya!_`;

  return message;
}

export function generateWhatsAppUrl(slip: OrderSlipData): string {
  const message = formatWhatsAppOrderMessage(slip);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encoded}`;
}

export function getDirectWhatsAppInquiryUrl(customMessage?: string): string {
  const text = customMessage || `Salam Northern Cuisine! Mujhe menu or order k baray me maloomat chahiye.`;
  return `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(text)}`;
}
