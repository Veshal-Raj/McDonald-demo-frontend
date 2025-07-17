import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Loader from './components/Loader';
import { Product, CartItem } from './@types';
import { 
  fetchProducts, 
  fetchCartItems, 
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  updateQuantity as updateQuantityAPI,
  clearCart as clearCartAPI,
  checkout as checkoutAPI,
  getSessionId 
} from './api';
import { toast, Toaster } from 'sonner';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionId] = useState(() => getSessionId());

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    fetchAllProducts();
    fetchCart();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Failed to Fetch All Product, Please try again later.")
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const items = await fetchCartItems(sessionId);
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error("Failed to fetch cart")
    }
  };

  const addToCart = async (productId: number) => {
    try {
      const updatedItems = await addToCartAPI(sessionId, productId, 1);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed adding to cart");
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const updatedItems = await removeFromCartAPI(sessionId, productId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error("Error removing from cart");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const updatedItems = await updateQuantityAPI(sessionId, productId, quantity);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error("Error in updating quantity");
    }
  };

  const clearCart = async () => {
    try {
      const updatedItems = await clearCartAPI(sessionId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error("Failed in clearing cart!");
    }
  };

  const handleCheckout = async (customerInfo: any) => {
    try {
      const order = await checkoutAPI(sessionId, customerInfo);
      setCartItems([]);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      
      // Show success message
      toast.success(`Order confirmed! Order ID: ${order.id}. Estimated time: ${order.estimatedTime}`)
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("Failed processing order. Please try again.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <Toaster position="top-center" />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Menu</h3>
          <p className="text-gray-600">Choose from our delicious selection of burgers, chicken, sides, and more</p>
        </div>

        <ProductGrid products={products} onAddToCart={addToCart} />
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;