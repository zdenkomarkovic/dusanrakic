"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "@/types/book";

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Filter out any invalid items where book is undefined
        const validItems = parsed.filter(
          (item: CartItem) => item && item.book && item.book._id
        );
        setItems(validItems);
      } catch (error) {
        console.error("Failed to parse cart data:", error);
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (book: Book) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.book._id === book._id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.book._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.book._id !== bookId)
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.book.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
