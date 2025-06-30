import React, { createContext, useContext, useEffect, useState } from 'react';

const InterestedContext = createContext();

export const InterestedProvider = ({ children }) => {
  const [interestedItems, setInterestedItems] = useState([]);

  // ✅ Load from localStorage on first render
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('interestedItems')) || [];
      setInterestedItems(stored);
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      setInterestedItems([]);
    }
  }, []);

  // ✅ Sync to localStorage whenever interestedItems change
  useEffect(() => {
    try {
      const compactData = interestedItems.map((item) => ({
        name: item.name,
        brand: item.brand,
        image: item.image?.startsWith('data:image')
          ? 'https://via.placeholder.com/150'
          : item.image,
        quantity: item.quantity || 1,
      }));
      localStorage.setItem('interestedItems', JSON.stringify(compactData));
    } catch (error) {
      console.error('Storage Limit Reached:', error.message);
      alert('❌ Storage limit exceeded. Cannot save more items.');
    }
  }, [interestedItems]);

  // ✅ Add new item or increase quantity if it exists
  const addToInterested = (item) => {
    setInterestedItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Remove item
  const removeFromInterested = (name) => {
    setInterestedItems((prev) => prev.filter((item) => item.name !== name));
  };

  // ✅ Increase quantity
  const incrementItem = (name) => {
    setInterestedItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Decrease quantity (remove if quantity becomes 0)
  const decrementItem = (name) => {
    setInterestedItems((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Clear entire interested list (used after successful submission)
  const clearInterestedItems = () => {
    setInterestedItems([]);
    localStorage.removeItem('interestedItems');
  };

  return (
    <InterestedContext.Provider
      value={{
        interestedItems,
        addToInterested,
        removeFromInterested,
        incrementItem,
        decrementItem,
        clearInterestedItems, // 👈 Add to context
      }}
    >
      {children}
    </InterestedContext.Provider>
  );
};

export const useInterested = () => useContext(InterestedContext);
