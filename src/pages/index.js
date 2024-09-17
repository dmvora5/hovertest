import React, { useState } from 'react';
import { useRouter } from 'next/router'; // If you're using Next.js

const ItemCard = ({ item, isTouched, cursorPosition, handleTouchStart, handleTouchMove, handleTouchEnd, handleClick }) => {
  return (
    <div
      className="item-card"
      onMouseEnter={() => handleTouchStart(item.id)}
      onMouseLeave={handleTouchEnd}
      onMouseMove={handleTouchMove}
      onClick={handleClick}
      onTouchStart={(e) => handleTouchStart(item.id, e)}
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
  const [activeItemId, setActiveItemId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [isTouched, setIsTouched] = useState(false);
  const router = useRouter(); // For handling redirection
  let touchTimer;

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

  // Touch and Hold for Mobile
  const handleTouchStart = (id, e) => {
    if (e) {
      setCursorPosition({
        top: e.touches[0].clientY + 5,
        left: e.touches[0].clientX + 5,
      });
    }

    touchTimer = setTimeout(() => {
      setActiveItemId(id);
      setIsTouched(true);
    }, 500); // 500ms delay for long press
  };

  const handleTouchMove = (e) => {
    // Ensure that touches exist and there is at least one touch point
    if (isTouched && e.touches && e.touches.length > 0) {
      setCursorPosition({
        top: e.touches[0].clientY + 5,
        left: e.touches[0].clientX + 5,
      });
    }
  };
  

  const handleTouchEnd = () => {
    clearTimeout(touchTimer); // Clear the timer if user releases early
    setIsTouched(false); // Hide modal when touch is released
    setActiveItemId(null); // Reset active card when touch ends
  };

  const handleClick = () => {
    router.push('/new-page'); // Redirect to a different page on click/touch
  };

  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item}
          isTouched={isTouched && activeItemId === item.id}  // Only show modal if this is the active card
          cursorPosition={cursorPosition}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default ItemList;
