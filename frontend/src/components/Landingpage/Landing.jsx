import { Link } from "react-router-dom";
// import { Button } from "../ui/button";

import React from 'react';
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { ShoppingBag, Truck, ShieldCheck, Star } from "lucide-react";
import Navbar from "./Navbar";

const products = [
  {
    name: "Leather Boots",
    price: 4500,
    rating: 4.5,
    image: "https://i.postimg.cc/ZnWL7rrb/boots.jpg"
  },
  {
    name: "Denim Jacket",
    price: 3800,
    rating: 4.2,
    image: "https://i.ibb.co/DHZSWPYN/denimn.jpg"
  },
  {
    name: "Stylish Handbag",
    price: 5200,
    rating: 4.7,
    image: "https://i.ibb.co/Wvb2LFtv/handbag.jpg"
  },
  {
    name: "Running Sneakers",
    price: 3200,
    rating: 4.3,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600"
  },
  {
    name: "Wool Trench Coat",
    price: 7600,
    rating: 4.6,
    image: "https://i.ibb.co/V0RGLxML/trenchcoat.jpg"
  },
  {
    name: "Summer Dress",
    price: 2900,
    rating: 4.4,
    image: "https://i.postimg.cc/Y9zc2BVG/summer.jpg"
  },
  {
    name: "Casual Shirt",
    price: 1800,
    rating: 4.1,
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600"
  },
  {
    name: "Hoodie",
    price: 2500,
    rating: 4.3,
    image: "https://i.postimg.cc/vmNRcvHM/hoodie.jpg"
  }
];

const Landing = () => {
  return (
    <div className="bg-white text-gray-800">
        <Navbar/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to <span className="text-purple-600">Falls</span></h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Discover unique, stylish and affordable fashion at your fingertips.
          </p>
          <Link to='/Login'><Button className="text-lg px-8 py-4">Shop Now</Button></Link>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
        <Carousel className="relative">
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-contain"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-purple-600 font-bold mb-1">Ksh {product.price}</p>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'stroke-current'}`} />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Why Shop With Falls?</h2>
          <p className="text-gray-600 text-lg">
            We bring you the latest trends, unmatched quality, and top-notch customer service.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join Our Fashion Community</h2>
          <p className="mb-6 text-lg">
            Be the first to hear about new drops, special offers, and style tips.
          </p>
          <Link to='/Signup'>   <Button variant="secondary" className="text-lg px-6 py-3">Sign Up</Button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 Falls. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;