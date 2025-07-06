import { useEffect, useState } from 'react';

export default function Rightbar() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic width based on screen size
  const getRightbarWidth = () => {
    if (windowWidth <= 640) return 0; // Fully hidden at <= 640px
    if (windowWidth <= 768) return 100; // Narrow on small tablets
    return 200; // Default width on larger screens
  };

  const width = getRightbarWidth();

  return width === 0 ? null : (
    <div
      className="transition-all duration-300 ease-in-out px-2.5 font-[Jaini_Purva] flex flex-col gap-[15px] mr-[30px] border-l-2 border-black mt-[30px] sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto"
      style={{
        width: `${width}px`,
        minWidth: '60px',
      }}
    >
      <ul>
        <li>Foods</li>
        <li>Breakfast</li>
        <li>Lunch</li>
        <li>Supper</li>
      </ul>
    </div>
  );
}
