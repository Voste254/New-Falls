import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from '../ui/dropdown-menu';
import SettingsModal from '../ui/SettingsModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); // Controls modal visibility

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-purple-600 px-5 py-2 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="text-[32px] sm:text-[40px] md:text-[50px] font-[Jaini_Purva] text-black flex items-center">
          <i className="fas fa-shopping-cart mr-2" />
          FOLLS
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search......."
            className="py-2.5 px-5 rounded-full border-none w-[300px] lg:w-[400px] text-[16px] lg:text-[20px] outline-none"
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
            <img
              src="https://i.ibb.co/BHxC3vxW/pngegg.png"
              alt="Notifications"
              className="w-5 h-5 object-contain"
            />
          </button>

          <button className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
            <img
              src="https://i.ibb.co/wZYKTmGt/pngegg-1.png"
              alt="Dark Mode"
              className="w-5 h-5 object-contain"
            />
          </button>

          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 border-2 border-white hover:scale-105 transition-transform">
                <img
                  src="https://i.ibb.co/Fq85sGjC/pngegg-2.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>@falls</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vroom">Create V-Room</Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link to="/password">Password Manager</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Logging out')}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 bg-white rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-black`} />
        </button>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="absolute top-[70px] left-0 right-0 bg-purple-600 flex flex-col items-start gap-4 p-4 md:hidden shadow-lg z-[1000]">
            <input
              type="text"
              placeholder="Search......."
              className="py-2 px-4 rounded-full border-none w-full text-[16px] outline-none"
            />

            <div className="flex gap-3 w-full justify-start">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
                <img
                  src="https://i.ibb.co/BHxC3vxW/pngegg.png"
                  alt="Notifications"
                  className="w-5 h-5 object-contain"
                />
              </button>

              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 cursor-pointer">
                <img
                  src="https://i.ibb.co/wZYKTmGt/pngegg-1.png"
                  alt="Dark Mode"
                  className="w-5 h-5 object-contain"
                />
              </button>
            </div>

            {/* Mobile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 border-2 border-white hover:scale-105 transition-transform">
                  <img
                    src="https://i.ibb.co/Fq85sGjC/pngegg-2.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="w-48">
                <DropdownMenuLabel>@falls</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/vroom">Create V-Room</Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem asChild>
                  <Link to="/password">Password Manager</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/support">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert('Logging out')}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export default Navbar;
