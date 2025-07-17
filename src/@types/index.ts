export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  sessionId: string;
  items: CartItem[];
  total: number;
  lastUpdated: string;
  __v: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  _id: string;
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

export interface ProductsResponse {
  data: Product[];
}