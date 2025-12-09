
import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import VideoFeed from './components/VideoFeed';
import Profile from './components/Profile';
import Create from './components/Create';
import Earnings from './components/Earnings';
import Login from './components/Login';
import Status from './components/Status';
import Dialer from './components/Dialer';
import { Tab, UserModel } from './types';
import { MOCK_VIDEOS, MOCK_USER, COINS_PER_VIEW, COINS_PER_LIKE } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [user, setUser] = useState<UserModel>(MOCK_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [earnedToday, setEarnedToday] = useState(0);

  // Generic Balance Updater
  const handleUpdateBalance = (amount: number) => {
      setUser(prev => ({
          ...prev,
          balance: prev.balance + amount
      }));
      if (amount > 0) {
          setEarnedToday(prev => prev + amount);
      }
  };

  // User Profile Updater
  const handleUpdateUser = (updatedData: Partial<UserModel>) => {
      setUser(prev => ({
          ...prev,
          ...updatedData
      }));
  };

  // Specific handlers wrapper
  const handleEarnView = () => handleUpdateBalance(COINS_PER_VIEW);
  const handleEarnLike = () => handleUpdateBalance(COINS_PER_LIKE);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <VideoFeed 
                    videos={MOCK_VIDEOS} 
                    onEarnView={handleEarnView} 
                    onEarnLike={handleEarnLike} 
                    userBalance={user.balance}
                    onUpdateBalance={handleUpdateBalance}
                />;
      case Tab.STATUS:
        return <Status />;
      case Tab.DIALER:
        return <Dialer />;
      case Tab.CREATE:
        return <Create onUpdateBalance={handleUpdateBalance} />;
      case Tab.WALLET:
        return <Earnings balance={user.balance} />;
      case Tab.PROFILE:
        return <Profile 
                  user={user} 
                  videos={MOCK_VIDEOS} 
                  onLogout={() => setIsLoggedIn(false)} 
                  onUpdateUser={handleUpdateUser}
                />;
      default:
        return <VideoFeed 
                    videos={MOCK_VIDEOS} 
                    onEarnView={handleEarnView} 
                    onEarnLike={handleEarnLike}
                    userBalance={user.balance}
                    onUpdateBalance={handleUpdateBalance} 
                />;
    }
  };

  if (!isLoggedIn) {
      return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden pb-16">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;