

export default function Sidebar({clicked,handleClick}) {

  return (
    <div className="w-[200px] px-2.5 font-[jaini] flex flex-col gap-[15px] ml-[30px] border-r-2 border-black mt-[30px] sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto">
    
      {[
        { text: 'Home', icon: 'https://i.ibb.co/JWtHsnps/pngegg-3.png' },
        { text: 'V-Room', icon: 'https://i.ibb.co/bMDJYRTN/pngegg-4.png' },
        { text: 'Chats', icon: 'https://i.ibb.co/XrSJCBqY/69c7572b985105af03266468412efe3122ea76ce.png' },
        { text: 'Add post', icon: 'https://i.ibb.co/QFBX6q91/pngegg-5.png' },
        { text: 'Bookmarks', icon: 'https://i.ibb.co/S4ryFypg/pngegg-6.png' },
        { text: 'Settings', icon: 'https://i.ibb.co/YTNQ9X4x/pngegg-7.png' },
        { text: 'My cart', icon: 'https://i.ibb.co/mF1hJ4w8/pngegg-8.png' },
      ].map((item, index) => (
        <button
          key={index}
          className={
            clicked[index]
              ? "flex items-center bg-red-300 rounded-md border-none text-[20px] text-black cursor-pointer gap-[10px] p-[5px] border-b border-black"
              : "flex items-center bg-none border-none text-[20px] text-black cursor-pointer gap-[10px] p-[5px] border-b border-black"
          }
          onClick={() => handleClick(index)} 
        >
          <img
            src={item.icon}
            alt={`${item.text} icon`}
            className="w-[28px] h-[28px]"
          />
          <p className="m-0">{item.text}</p>
        </button>
      ))}
    </div>
  );
}
