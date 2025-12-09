import React, { useRef, useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import LiveRoom from './LiveRoom';
import { VideoModel, LiveStreamModel } from '../types';
import { MOCK_LIVE_STREAMS, MOCK_FOLLOWING_USERS, MOCK_CONTACTS } from '../constants';
import { User, Users, Settings, X, Bell, BellOff, UserMinus, UserPlus, Filter, Search, Share2, Copy, MessageCircle, Facebook, Twitter, Instagram, Link, Send, MoreHorizontal, Check } from 'lucide-react';

interface VideoFeedProps {
  videos: VideoModel[];
  onEarnView: () => void;
  onEarnLike: () => void;
  userBalance: number;
  onUpdateBalance: (amount: number) => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ videos, onEarnView, onEarnLike, userBalance, onUpdateBalance }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFeed, setActiveFeed] = useState<'FOLLOWING' | 'FOR_YOU' | 'LIVE'>('FOR_YOU');
  const [selectedLiveStream, setSelectedLiveStream] = useState<LiveStreamModel | null>(null);
  
  // Following Settings State
  const [showFollowingSettings, setShowFollowingSettings] = useState(false);
  const [followingSort, setFollowingSort] = useState<'LATEST' | 'POPULAR'>('LATEST');

  // Share Sheet State
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter videos based on active feed to simulate different content
  const displayVideos = activeFeed === 'FOR_YOU' 
    ? videos 
    : videos.slice(0, 2); 

  // Reset scroll and active index when feed changes
  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = 0;
    }
    setActiveIndex(0);
  }, [activeFeed]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const handleCopyLink = () => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      // Logic to copy link would go here
  };

  return (
    <div className="relative w-full h-full bg-black">
      
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-30 pt-6 pb-8 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="relative flex justify-center items-center space-x-6 pointer-events-auto px-4">
             {/* Left Icon */}
             <div className="absolute left-4">
                <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                    <Search size={20} />
                </button>
             </div>

             <button 
                onClick={() => setActiveFeed('FOLLOWING')}
                className={`text-base font-bold transition-all duration-200 drop-shadow-md ${
                    activeFeed === 'FOLLOWING' 
                    ? 'text-white scale-105 border-b-2 border-white pb-1' 
                    : 'text-white/60 hover:text-white/90 scale-100'
                }`}
             >
                Following
             </button>
             <div className="w-[1px] h-4 bg-white/20"></div>
             <button 
                onClick={() => setActiveFeed('FOR_YOU')}
                className={`text-base font-bold transition-all duration-200 drop-shadow-md ${
                    activeFeed === 'FOR_YOU' 
                    ? 'text-white scale-105 border-b-2 border-white pb-1' 
                    : 'text-white/60 hover:text-white/90 scale-100'
                }`}
             >
                For You
             </button>
             <div className="w-[1px] h-4 bg-white/20"></div>
             <button 
                onClick={() => setActiveFeed('LIVE')}
                className={`text-base font-bold transition-all duration-200 drop-shadow-md ${
                    activeFeed === 'LIVE' 
                    ? 'text-pink-500 scale-105 border-b-2 border-pink-500 pb-1' 
                    : 'text-white/60 hover:text-pink-400 scale-100'
                }`}
             >
                Live
             </button>

             {/* Right Icons */}
             <div className="absolute right-4 flex items-center gap-1">
                 {/* Share Icon Removed */}

                 {/* Settings Icon - Only visible on Following Tab */}
                 {activeFeed === 'FOLLOWING' && (
                     <button 
                        onClick={() => setShowFollowingSettings(true)}
                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                     >
                        <Settings size={20} />
                     </button>
                 )}
             </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeFeed === 'LIVE' ? (
          <div className="w-full h-full pt-20 pb-20 px-2 overflow-y-auto bg-slate-950">
             <div className="grid grid-cols-2 gap-3">
                 {MOCK_LIVE_STREAMS.map((stream) => (
                     <div 
                        key={stream.id} 
                        onClick={() => setSelectedLiveStream(stream)}
                        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 cursor-pointer group"
                     >
                         <img src={stream.thumbnail} alt={stream.username} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute top-2 left-2 bg-pink-600 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white uppercase animate-pulse">
                             Live
                         </div>
                         <div className="absolute top-2 right-2 bg-black/40 px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-sm">
                             <Users size={10} /> {stream.viewers}
                         </div>
                         <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black via-black/60 to-transparent">
                             <h3 className="text-white font-bold text-sm truncate">{stream.title}</h3>
                             <div className="flex items-center gap-1 mt-1">
                                 <img src={stream.avatar} className="w-4 h-4 rounded-full border border-white" />
                                 <span className="text-xs text-gray-300 truncate">@{stream.username}</span>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
      ) : (
        /* Scrollable Video Feed */
        <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        >
            {displayVideos.length > 0 ? (
                displayVideos.map((video, index) => (
                    <div key={`${activeFeed}-${video.id}`} className="w-full h-full snap-start">
                    <VideoCard 
                        video={video} 
                        isActive={index === activeIndex} 
                        onEarnView={onEarnView}
                        onEarnLike={onEarnLike}
                    />
                    </div>
                ))
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-900 snap-start">
                    <p className="mb-4">No following videos yet</p>
                    <button 
                        onClick={() => setActiveFeed('FOR_YOU')}
                        className="px-6 py-2 bg-pink-600 rounded-full text-white font-medium"
                    >
                        Browse For You
                    </button>
                </div>
            )}
        </div>
      )}

      {/* Live Room Overlay */}
      {selectedLiveStream && (
          <LiveRoom 
            mode="VIEWER" 
            streamData={selectedLiveStream} 
            onClose={() => setSelectedLiveStream(null)} 
            userBalance={userBalance}
            onUpdateBalance={onUpdateBalance}
          />
      )}

      {/* Following Settings Overlay */}
      {showFollowingSettings && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-end md:justify-center animate-in fade-in duration-200">
              <div className="w-full max-w-md bg-slate-900 rounded-t-2xl md:rounded-2xl p-6 h-[80vh] md:h-auto flex flex-col animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                          <Settings className="text-pink-500" />
                          <h2 className="text-xl font-bold text-white">Following Settings</h2>
                      </div>
                      <button 
                        onClick={() => setShowFollowingSettings(false)}
                        className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
                      >
                          <X size={20} className="text-white" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                      
                      {/* Sort Options */}
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                          <h3 className="text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                              <Filter size={14} /> Feed Sort
                          </h3>
                          <div className="flex gap-2">
                              <button 
                                onClick={() => setFollowingSort('LATEST')}
                                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border ${followingSort === 'LATEST' ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                              >
                                  Latest
                              </button>
                              <button 
                                onClick={() => setFollowingSort('POPULAR')}
                                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border ${followingSort === 'POPULAR' ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                              >
                                  Popular
                              </button>
                          </div>
                      </div>

                      {/* Manage Following List */}
                      <div>
                          <div className="flex justify-between items-center mb-3 px-1">
                              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Manage Following</h3>
                              <div className="relative">
                                  <input type="text" placeholder="Search" className="bg-slate-800 rounded-full py-1 pl-8 pr-3 text-xs text-white border-none w-32 focus:w-40 transition-all focus:ring-1 focus:ring-pink-500" />
                                  <Search size={12} className="absolute left-2.5 top-1.5 text-gray-500" />
                              </div>
                          </div>
                          <div className="space-y-3">
                              {MOCK_FOLLOWING_USERS.map((user) => (
                                  <div key={user.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl hover:bg-slate-700/80 transition group">
                                      <div className="flex items-center gap-3">
                                          <div className="relative">
                                              <img src={user.avatar} className="w-10 h-10 rounded-full border border-gray-600 object-cover" alt={user.username} />
                                              {user.isLive && <div className="absolute -bottom-1 -right-1 bg-pink-600 text-[8px] px-1.5 py-0.5 rounded-full text-white font-bold border border-slate-900">LIVE</div>}
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-white text-sm">@{user.username}</h4>
                                              <p className="text-xs text-gray-500">Following</p>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-slate-600 rounded-full transition">
                                              <Bell size={16} />
                                          </button>
                                          <button className="px-3 py-1.5 border border-gray-600 rounded-lg text-xs font-medium text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition">
                                              Unfollow
                                          </button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Suggestions */}
                      <div>
                          <h3 className="text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider">Suggested for You</h3>
                          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                              {[1, 2, 3, 4].map((i) => (
                                  <div key={i} className="min-w-[120px] bg-slate-800 p-3 rounded-xl flex flex-col items-center border border-slate-700">
                                      <img src={`https://picsum.photos/100/100?random=${10+i}`} className="w-12 h-12 rounded-full mb-2 object-cover" />
                                      <span className="text-xs font-bold text-white mb-2">User {i}</span>
                                      <button className="w-full py-1 bg-white text-black text-xs font-bold rounded-lg hover:bg-pink-500 hover:text-white transition-colors">
                                          Follow
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      )}

      {/* Share Sheet Overlay */}
      {showShareSheet && (
          <div 
             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200" 
             onClick={() => setShowShareSheet(false)}
          >
              <div 
                 className="bg-slate-900 rounded-t-2xl p-4 border-t border-gray-800 animate-in slide-in-from-bottom duration-300 max-h-[70vh] flex flex-col" 
                 onClick={e => e.stopPropagation()}
              >
                  <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-6"></div>
                  
                  <h3 className="text-white font-bold text-center mb-6">Share to</h3>

                  {/* Recent Contacts */}
                  <div className="mb-6 overflow-x-auto no-scrollbar">
                      <div className="flex gap-4 px-2">
                           {MOCK_CONTACTS.slice(0, 5).map(contact => (
                               <div key={contact.id} className="flex flex-col items-center gap-2 min-w-[64px]">
                                   <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-pink-600 relative">
                                       <img src={contact.avatar} className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                                       <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border border-slate-900">
                                           <MessageCircle size={10} className="text-white" />
                                       </div>
                                   </div>
                                   <span className="text-[10px] text-gray-400 truncate w-full text-center">{contact.name.split(' ')[0]}</span>
                               </div>
                           ))}
                      </div>
                  </div>

                  {/* Apps Row */}
                  <div className="flex gap-6 overflow-x-auto no-scrollbar px-2 mb-6 pb-2">
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-900/20">
                               <MessageCircle size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">WhatsApp</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-pink-900/20">
                               <Instagram size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">Instagram</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
                               <Facebook size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">Facebook</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-900/20">
                               <Twitter size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">Twitter</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-900/20">
                               <Send size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">Direct</span>
                       </button>
                       <button className="flex flex-col items-center gap-2 min-w-[60px]">
                           <div className="w-12 h-12 rounded-full bg-slate-700 text-white flex items-center justify-center border border-slate-600">
                               <MoreHorizontal size={24} />
                           </div>
                           <span className="text-[10px] text-gray-300">More</span>
                       </button>
                  </div>

                  {/* Actions Row */}
                  <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 mb-4">
                       <button 
                          onClick={handleCopyLink}
                          className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-xl whitespace-nowrap active:scale-95 transition"
                       >
                           {copiedLink ? <Check size={20} className="text-green-500" /> : <Link size={20} className="text-gray-400" />}
                           <span className={`text-sm font-medium ${copiedLink ? 'text-green-500' : 'text-gray-300'}`}>
                               {copiedLink ? 'Copied' : 'Copy Link'}
                           </span>
                       </button>
                       <button className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-xl whitespace-nowrap active:scale-95 transition">
                           <Users size={20} className="text-gray-400" />
                           <span className="text-sm font-medium text-gray-300">Duet</span>
                       </button>
                       <button className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-xl whitespace-nowrap active:scale-95 transition">
                           <BellOff size={20} className="text-gray-400" />
                           <span className="text-sm font-medium text-gray-300">Not interested</span>
                       </button>
                  </div>

                  <button 
                      onClick={() => setShowShareSheet(false)}
                      className="w-full py-4 bg-slate-800 rounded-xl text-gray-300 font-bold hover:bg-slate-700 transition mt-2"
                  >
                      Cancel
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

export default VideoFeed;