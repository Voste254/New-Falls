import { useState, useEffect } from 'react';

export default function Sidebar({ clicked, handleClick }) {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const menuItems = [
    { text: 'Home', icon: 'https://i.ibb.co/JWtHsnps/pngegg-3.png' },
    { text: 'V-Room', icon: 'https://i.ibb.co/bMDJYRTN/pngegg-4.png' },
    { text: 'Chats', icon: 'https://i.ibb.co/XrSJCBqY/69c7572b985105af03266468412efe3122ea76ce.png' },
    { text: 'Add post', icon: 'https://i.ibb.co/QFBX6q91/pngegg-5.png' },
    { text: 'Bookmarks', icon: 'https://i.ibb.co/S4ryFypg/pngegg-6.png' },
    { text: 'My cart', icon: 'https://i.ibb.co/mF1hJ4w8/pngegg-8.png' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current width
  const getSidebarWidth = () => {
    if (windowWidth <= 640) return 60; // force collapse at mobile
    if (collapsed) return 60;
    return Math.max(60, Math.min(200, (windowWidth / 8))); // Gradual shrink
  };

  const isCollapsed = getSidebarWidth() <= 70;

  return (
    <div
      className={`transition-all duration-300 ease-in-out
        px-2.5 font-[jaini] flex flex-col gap-[15px]
        ${windowWidth <= 640 ? 'ml-0' : 'ml-[30px]'}
        border-r-2 border-black mt-[30px] sticky top-[70px]
        h-[calc(100vh-70px)] overflow-y-auto`}
      style={{
        width: `${getSidebarWidth()}px`,
        minWidth: '60px',
        maxWidth: '200px',
      }}
    >
      {/* Only show toggle button above small screens */}
      {windowWidth > 640 && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 p-2 text-[14px] bg-gray-200 hover:bg-gray-300 rounded transition"
        >
          {collapsed ? '>>' : '<<'}
        </button>
      )}

      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center border-none text-[16px] text-black cursor-pointer gap-[10px] p-[5px] border-b border-black
            ${clicked[index] ? 'bg-red-300 rounded-md' : ''}
            justify-start`}
          onClick={() => handleClick(index)}
        >
          <img
            src={item.icon}
            alt={`${item.text} icon`}
            className="w-[28px] h-[28px]"
          />
          {/* Only show text when sidebar is wide enough */}
          {!isCollapsed && <p className="m-0 whitespace-nowrap">{item.text}</p>}
        </button>
      ))}
    </div>
  );
}
