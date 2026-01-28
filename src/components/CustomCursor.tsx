import React, { useState, useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * 
 * Currently DISABLED - To enable:
 * 1. Set ENABLE_CUSTOM_CURSOR to true in IndexNoThree.tsx
 * 2. Uncomment the cursor: none styles in index.css
 * 
 * All code is kept intact for easy re-enabling.
 */
const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Dot follows immediately
        dotX = mouseX;
        dotY = mouseY;
        
        setMousePosition({ 
          x: cursorX, 
          y: cursorY 
        });
        
        if (cursorRef.current) {
          cursorRef.current.style.left = `${cursorX - 10}px`;
          cursorRef.current.style.top = `${cursorY - 10}px`;
        }
        
        if (dotRef.current) {
          dotRef.current.style.left = `${dotX - 2}px`;
          dotRef.current.style.top = `${dotY - 2}px`;
        }
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleElementEnter, { passive: true });
    document.addEventListener('mouseout', handleElementLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementEnter);
      document.removeEventListener('mouseout', handleElementLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
