import { Product, CartItem, CustomerInfo, Order, ApiResponse, CartResponse, ProductsResponse } from '../types';

// API base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Products API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data }: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Cart API
export const fetchCartItems = async (sessionId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/${sessionId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data?.items || [];
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};

export const addToCart = async (sessionId: string, productId: string, quantity: number = 1): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        productId,
        quantity
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data.items || [];
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (sessionId: string, productId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        productId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data?.items || [];
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateQuantity = async (sessionId: string, productId: string, quantity: number): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        productId,
        quantity
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data?.items || [];
  } catch (error) {
    console.error('Error updating quantity:', error);
    throw error;
  }
};

export const clearCart = async (sessionId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data?.items || [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Checkout API
export const checkout = async (sessionId: string, customerInfo: CustomerInfo): Promise<Order> => {
  try {
    const response = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        customerInfo
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    const data = apiResponse?.data;
    return data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

// Utility functions
export const generateSessionId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const getSessionId = (): string => {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = generateSessionId();
    localStorage.setItem('sessionId', id);
  }
  return id;
};


export default {
  fetchProducts,
  fetchCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  checkout,
  generateSessionId,
  getSessionId,
};