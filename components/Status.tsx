import React, { useState } from 'react';
import { Download, Share2, Plus, Eye, MoreVertical, ArrowLeft, Lock, Users, UserX, CheckCircle2, Camera, PenTool, X, ChevronRight, Image as ImageIcon } from 'lucide-react';

const STATUSES = [
  {
    id: 1,
    username: 'rahul_01',
    avatar: 'https://picsum.photos/100/100?random=10',
    thumbnail: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&q=80',
    type: 'IMAGE',
    time: '10 min ago',
    views: 45
  },
  {
    id: 2,
    username: 'priya_love',
    avatar: 'https://picsum.photos/100/100?random=11',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
    type: 'VIDEO',
    time: '32 min ago',
    views: 120
  },
  {
    id: 3,
    username: 'funny_clips',
    avatar: 'https://picsum.photos/100/100?random=12',
    thumbnail: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=80',
    type: 'VIDEO',
    time: '1 hr ago',
    views: 890
  },
  {
    id: 4,
    username: 'sad_quotes',
    avatar: 'https://picsum.photos/100/100?random=13',
    thumbnail: 'https://images.unsplash.com/photo-1518644730709-0835105d9399?w=500&q=80',
    type: 'IMAGE',
    time: '2 hrs ago',
    views: 230
  },
  {
    id: 5,
    username: 'nature_lovers',
    avatar: 'https://picsum.photos/100/100?random=14',
    thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&q=80',
    type: 'IMAGE',
    time: '4 hrs ago',
    views: 56
  },
  {
    id: 6,
    username: 'bike_rider',
    avatar: 'https://picsum.photos/100/100?random=15',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80',
    type: 'VIDEO',
    time: '5 hrs ago',
    views: 670
  }
];

const Status: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacy, setPrivacy] = useState<'CONTACTS' | 'EXCEPT' | 'ONLY'>('CONTACTS');
  const [showCamera, setShowCamera] = useState(false);

  // Status Camera Overlay
  if (showCamera) {
      return (
          <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans">
              <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent absolute top-0 w-full z-10">
                  <button onClick={() => setShowCamera(false)} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
                      <X size={24} />
                  </button>
                  <span className="font-bold text-lg drop-shadow-md">Add Status</span>
                  <div className="w-10"></div>
              </div>

              {/* Fake Camera Preview */}
              <div className="flex-1 bg-gray-900 relative">
                  <img src="https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?w=800&q=80" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/50 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Camera Preview</p>
                  </div>
              </div>

              {/* Camera Controls */}
              <div className="bg-black pt-6 pb-8 px-8 flex justify-between items-center">
                  <button className="flex flex-col items-center gap-1 text-gray-400">
                      <ImageIcon size={28} />
                  </button>
                  <button className="w-20 h-20 rounded-full border-4 border-white p-1">
                      <div className="w-full h-full bg-pink-600 rounded-full"></div>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-gray-400">
                      <Camera size={28} />
                  </button>
              </div>
          </div>
      );
  }

  // Privacy Settings Overlay
  if (showPrivacy) {
      return (
          <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                  <button onClick={() => setShowPrivacy(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                      <ArrowLeft size={24} />
                  </button>
                  <h2 className="font-bold text-lg">Status Privacy</h2>
              </div>
              <div className="p-6">
                  <p className="text-sm text-pink-500 font-bold mb-6 uppercase tracking-wider">Who can see my status updates</p>
                  
                  <div className="space-y-6">
                      <button onClick={() => setPrivacy('CONTACTS')} className="w-full flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-blue-400 group-active:scale-90 transition">
                                  <Users size={24} />
                              </div>
                              <div className="text-left">
                                  <h3 className="font-semibold text-lg">My contacts</h3>
                                  <p className="text-xs text-gray-500">Share with all your contacts</p>
                              </div>
                          </div>
                          {privacy === 'CONTACTS' && <CheckCircle2 className="text-pink-600" size={24} />}
                      </button>

                      <button onClick={() => setPrivacy('EXCEPT')} className="w-full flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-orange-400 group-active:scale-90 transition">
                                  <UserX size={24} />
                              </div>
                              <div className="text-left">
                                  <h3 className="font-semibold text-lg">My contacts except...</h3>
                                  <p className="text-xs text-gray-500">Hide status from specific people</p>
                              </div>
                          </div>
                          {privacy === 'EXCEPT' && <CheckCircle2 className="text-pink-600" size={24} />}
                      </button>

                      <button onClick={() => setPrivacy('ONLY')} className="w-full flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-green-400 group-active:scale-90 transition">
                                  <Lock size={24} />
                              </div>
                              <div className="text-left">
                                  <h3 className="font-semibold text-lg">Only share with...</h3>
                                  <p className="text-xs text-gray-500">Select specific contacts</p>
                              </div>
                          </div>
                          {privacy === 'ONLY' && <CheckCircle2 className="text-pink-600" size={24} />}
                      </button>
                  </div>
                  
                  <p className="mt-8 text-xs text-center text-gray-500 leading-relaxed px-4">
                      Changes to your privacy settings won't affect status updates that you've sent already.
                  </p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white pb-20 overflow-y-auto relative">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md p-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Status</h1>
        <button onClick={() => setShowPrivacy(true)} className="p-2 -mr-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* My Status */}
      <div className="p-4 flex items-center space-x-4 cursor-pointer hover:bg-white/5 transition rounded-xl mx-2 mt-2" onClick={() => setShowCamera(true)}>
        <div className="relative">
          <img 
            src="https://picsum.photos/150/150" 
            alt="My Status" 
            className="w-16 h-16 rounded-full border-2 border-gray-700 object-cover opacity-80"
          />
          <div className="absolute bottom-0 right-0 bg-pink-600 rounded-full p-1.5 border-2 border-slate-950">
            <Plus size={14} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">My Status</h3>
          <p className="text-sm text-gray-500">Tap to add status update</p>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="px-4 mt-2 mb-24">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider ml-1">Recent Updates</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {STATUSES.map((status) => (
            <div key={status.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative group active:scale-[0.98] transition-transform">
              {/* Thumbnail */}
              <div className="aspect-[9/16] relative bg-gray-800">
                <img 
                  src={status.thumbnail} 
                  alt="Status" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                
                {/* User Info Overlay */}
                <div className="absolute top-2 left-2 flex items-center space-x-2">
                  <div className={`p-[2px] rounded-full ${status.views > 100 ? 'bg-gradient-to-tr from-yellow-400 to-pink-600' : 'bg-gray-500'}`}>
                    <img 
                      src={status.avatar} 
                      alt={status.username} 
                      className="w-8 h-8 rounded-full border-2 border-black" 
                    />
                  </div>
                  <span className="text-xs font-medium drop-shadow-md truncate max-w-[80px]">
                    {status.username}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold border border-white/10">
                    {status.type}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-3 pt-8">
                <div className="flex justify-between items-end">
                    <div className="text-xs text-gray-300">
                        <p>{status.time}</p>
                        <div className="flex items-center space-x-1 mt-0.5 opacity-70">
                            <Eye size={10} />
                            <span>{status.views}</span>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button className="bg-white/10 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors">
                            <Share2 size={16} />
                        </button>
                        <button className="bg-green-600 hover:bg-green-500 p-2 rounded-full text-white shadow-lg transition-colors">
                            <Download size={16} />
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons (Features) */}
      <div className="fixed bottom-24 right-6 flex flex-col space-y-4 items-center z-30">
        <button className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-300 shadow-lg border border-slate-700 active:scale-90 transition-transform">
            <PenTool size={20} />
        </button>
        <button 
            onClick={() => setShowCamera(true)} 
            className="w-14 h-14 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-900/40 active:scale-90 transition-transform"
        >
            <Camera size={28} />
        </button>
      </div>

    </div>
  );
};

export default Status;