import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: mouseX, y: mouseY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="custom-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      
      {/* Cursor dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
        }}
      />
    </>
  );
};

export default CustomCursor;
