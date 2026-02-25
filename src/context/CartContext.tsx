'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'completed' | 'pending' | 'shipped';
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: () => string;
    orders: Order[];
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('secondskin_cart');
        const savedOrders = localStorage.getItem('secondskin_orders');

        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }

        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    // Save cart and orders to localStorage on change
    useEffect(() => {
        localStorage.setItem('secondskin_cart', JSON.stringify(cart));
        localStorage.setItem('secondskin_orders', JSON.stringify(orders));
    }, [cart, orders]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(
                i => i.id === item.id && i.size === item.size && i.color === item.color
            );

            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += item.quantity;
                return newCart;
            }

            return [...prev, item];
        });
    };

    const removeFromCart = (id: string, size: string, color: string) => {
        setCart(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
    };

    const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(i =>
            (i.id === id && i.size === size && i.color === color)
                ? { ...i, quantity }
                : i
        ));
    };

    const clearCart = () => setCart([]);

    const placeOrder = () => {
        if (cart.length === 0) return "";

        const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const newOrder: Order = {
            id: orderId,
            date: new Date().toISOString(),
            items: [...cart],
            total: cartTotal,
            status: 'completed'
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return orderId;
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            placeOrder,
            orders,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
