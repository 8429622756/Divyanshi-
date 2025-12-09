
import React from 'react';
import { Home, Phone, PlusSquare, Wallet, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const getIconClass = (tab: Tab) => 
    `flex flex-col items-center space-y-1 ${activeTab === tab ? 'text-white' : 'text-gray-500'}`;

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-black border-t border-gray-900 flex justify-around items-center z-50 px-2">
      <button onClick={() => onTabChange(Tab.HOME)} className={getIconClass(Tab.HOME)}>
        <Home size={24} fill={activeTab === Tab.HOME ? "currentColor" : "none"} />
        <span className="text-[10px]">Home</span>
      </button>

      <button onClick={() => onTabChange(Tab.DIALER)} className={getIconClass(Tab.DIALER)}>
        <Phone size={24} fill={activeTab === Tab.DIALER ? "currentColor" : "none"} />
        <span className="text-[10px]">Dialer</span>
      </button>

      <button onClick={() => onTabChange(Tab.CREATE)} className="flex items-center justify-center -mt-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl flex items-center justify-center border-2 border-white">
          <PlusSquare size={24} className="text-black" />
        </div>
      </button>

      <button onClick={() => onTabChange(Tab.WALLET)} className={getIconClass(Tab.WALLET)}>
        <Wallet size={24} fill={activeTab === Tab.WALLET ? "currentColor" : "none"} />
        <span className="text-[10px]">Wallet</span>
      </button>

      <button onClick={() => onTabChange(Tab.PROFILE)} className={getIconClass(Tab.PROFILE)}>
        <User size={24} fill={activeTab === Tab.PROFILE ? "currentColor" : "none"} />
        <span className="text-[10px]">Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;
