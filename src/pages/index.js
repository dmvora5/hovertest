import React, { useState } from 'react';
import { useRouter } from 'next/router'; // If you're using Next.js

const ItemCard = ({ item }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const router = useRouter(); // For handling redirection

  // Timer to track long press
  let touchTimer;

  const handleMouseEnter = () => {
    setIsTouched(true);
  };

  const handleMouseLeave = () => {
    setIsTouched(false);
  };

  const handleMouseMove = (e) => {
    setCursorPosition({
      top: e.clientY + 5,
      left: e.clientX + 5,
    });
  };

  // Touch and Hold for Mobile
  const handleTouchStart = (e) => {
    setCursorPosition({
      top: e.touches[0].clientY + 5,
      left: e.touches[0].clientX + 5,
    });

    touchTimer = setTimeout(() => {
      setIsTouched(true);
    }, 500); // 500ms delay for long press
  };

  const handleTouchMove = (e) => {
    if (isTouched) {
      setCursorPosition({
        top: e.touches[0].clientY + 5,
        left: e.touches[0].clientX + 5,
      });
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer); // Clear the timer if user releases early
    setIsTouched(false); // Hide modal when touch is released
  };

  const handleClick = () => {
    router.push('/new-page'); // Redirect to a different page on click/touch
  };

  return (
    <div
      className="item-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}  // Track touch movement for dragging
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
    >
      <img src={item.image} alt={item.name} className="item-image" style={{ width: '150px', height: '150px' }} />
      
      {isTouched && (
        <div
          className="hover-modal"
          style={{
            position: 'fixed',
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left}px`,
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            opacity: 0.9,
            zIndex: 1000,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none',
          }}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
          <p>Volume: {item.volume}</p>
        </div>
      )}
    </div>
  );
};


const ItemList = () => {
  const items = [
    { 
      id: 1, 
      name: 'Item 1', 
      description: 'Description for item 1', 
      price: '10', 
      volume: '1000', 
      image: '/test.png' 
    },
    { 
      id: 2, 
      name: 'Item 2', 
      description: 'Description for item 2', 
      price: '20', 
      volume: '2000', 
      image: '/test.png' 
    },
    { 
      id: 3, 
      name: 'Item 3', 
      description: 'Description for item 3', 
      price: '30', 
      volume: '3000', 
      image: '/test.png' 
    },
    // Add more items as needed
  ];

  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
