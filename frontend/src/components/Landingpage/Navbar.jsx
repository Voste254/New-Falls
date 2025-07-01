import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "../ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

  function handleClick(){
    navigate('/Login', {state:{name:'voste', surname:"okutah"}})  
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">Falls</div>

        <div className="hidden md:flex space-x-6 items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6 flex">
              <NavigationMenuItem>
                <Button variant="ghost">Home</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" onClick={handleClick}>Clothings</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Footwear</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Uniforms</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">Home</Button>
          <Button variant="ghost" className="w-full justify-start">Clothings</Button>
          <Button variant="ghost" className="w-full justify-start">Footwear</Button>
          <Button variant="ghost" className="w-full justify-start">Uniforms</Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
