import React, { useState } from 'react';
import { Search, ShoppingBag, Star, Tag, Filter, Heart, ShoppingCart } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home', 'Toys', 'Sports'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 1299,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 899,
    originalPrice: 1999,
    rating: 4.2,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
    tag: 'Trending'
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 499,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 230,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    tag: 'New'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 1599,
    originalPrice: 3500,
    rating: 4.6,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    tag: 'Sale'
  },
  {
    id: 5,
    name: 'Gaming Headset',
    price: 2499,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&q=80',
    tag: ''
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 1899,
    originalPrice: 3299,
    rating: 4.4,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    tag: 'Hot'
  }
];

const Stores: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white pb-20 overflow-y-auto">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-pink-500" />
            <h1 className="text-xl font-bold">Stores</h1>
          </div>
          <div className="relative">
            <ShoppingCart size={24} className="text-gray-300" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search for products, brands..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 border-l border-gray-700 pl-3">
             <Filter size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="px-4 mt-2">
        <div className="w-full h-40 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden flex items-center p-6 shadow-lg shadow-purple-900/20">
            <div className="relative z-10 w-2/3">
                <span className="bg-white text-pink-600 text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Flash Sale</span>
                <h2 className="text-2xl font-bold mb-1">50% OFF</h2>
                <p className="text-sm text-white/90 mb-3">On all electronics this week</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
                    Shop Now
                </button>
            </div>
            <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/shopping-bag-3025705-2526903.png" 
                alt="Sale" 
                className="absolute right-0 bottom-0 w-32 h-32 object-contain drop-shadow-2xl transform rotate-12"
            />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 px-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Categories</h3>
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-white text-black' 
                        : 'bg-slate-900 text-gray-400 border border-slate-800'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all group">
                <div className="relative aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-pink-500 transition-colors">
                        <Heart size={14} />
                    </button>
                    {product.tag && (
                        <span className="absolute top-2 left-2 bg-pink-600 text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-sm">
                            {product.tag}
                        </span>
                    )}
                </div>
                <div className="p-3">
                    <div className="flex items-center space-x-1 mb-1">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] text-gray-400">{product.rating} ({product.reviews})</span>
                    </div>
                    <h3 className="text-sm font-medium line-clamp-1 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                            <span className="text-sm font-bold text-white">₹{product.price}</span>
                        </div>
                        <button className="bg-slate-800 hover:bg-white hover:text-black p-2 rounded-lg transition-colors border border-slate-700">
                            <ShoppingCart size={14} />
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;