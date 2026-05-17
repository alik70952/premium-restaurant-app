import { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ReservationScreen from './screens/ReservationScreen';
import LoyaltyScreen from './screens/LoyaltyScreen';
import ProfileScreen from './screens/ProfileScreen';

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'reservation'
  | 'loyalty'
  | 'profile';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
  extras?: string[];
}

export default function AppRouter() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const navigate = (screen: Screen, food?: FoodItem) => {
    if (food) setSelectedFood(food);
    setCurrentScreen(screen);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) removeFromCart(id);
    else setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0A0A0A' }}>
      {currentScreen === 'splash' && <SplashScreen onComplete={() => navigate('onboarding')} />}
      {currentScreen === 'onboarding' && <OnboardingScreen onComplete={() => navigate('login')} />}
      {currentScreen === 'login' && <LoginScreen onLogin={() => navigate('home')} />}
      {currentScreen === 'home' && (
        <HomeScreen navigate={navigate} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      )}
      {currentScreen === 'food-detail' && selectedFood && (
        <FoodDetailScreen food={selectedFood} onBack={() => navigate('home')} onAddToCart={addToCart} />
      )}
      {currentScreen === 'cart' && (
        <CartScreen cart={cart} onBack={() => navigate('home')} onCheckout={() => navigate('checkout')} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      )}
      {currentScreen === 'checkout' && (
        <CheckoutScreen cart={cart} onBack={() => navigate('cart')} onComplete={() => { setCart([]); navigate('home'); }} />
      )}
      {currentScreen === 'reservation' && (
        <ReservationScreen onBack={() => navigate('home')} navigate={navigate} />
      )}
      {currentScreen === 'loyalty' && (
        <LoyaltyScreen onBack={() => navigate('home')} navigate={navigate} />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen onBack={() => navigate('home')} navigate={navigate} />
      )}
    </div>
  );
}
