export interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  estimatedTime: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}