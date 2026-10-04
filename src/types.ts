export interface MenuItem {
  id: string;
  name: string;
  category: 'deals' | 'starter' | 'chicken' | 'gravies' | 'beef' | 'fried_rice' | 'noodles' | 'pasta';
  price: number;
  description: string;
  serving?: string;
  isSpicy?: boolean;
  image?: string;
  dealType?: 'couple' | 'family';
  variants?: {
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  id: string; // unique cart line id (id + variant)
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariant?: string;
  category: string;
  notes?: string;
  image?: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phoneNumber: string;
  orderType: 'delivery' | 'takeaway';
  deliveryAddress: string;
  landmark?: string;
  specialInstructions?: string;
  paymentMethod: 'Cash on Delivery' | 'Online Bank / JazzCash / Easypaisa';
}

export interface OrderSlipData {
  orderId: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending WhatsApp Confirmation' | 'Confirmed';
}
