
import React, { useState, useEffect, useRef } from 'react';
import { LiveStreamModel, ChatMessage, GiftModel } from '../types';
import { X, Send, Gift, Share2, Heart, User, Eye, Coins, Settings, Mic, MicOff, Video, VideoOff, Sparkles, Zap, RotateCcw, MoreVertical, Shield, Check, Sliders } from 'lucide-react';
import { GIFTS } from '../constants';

interface LiveRoomProps {
    mode: 'VIEWER' | 'STREAMER';
    streamData?: LiveStreamModel;
    onClose: () => void;
    userBalance?: number;
    onUpdateBalance?: (amount: number) => void;
}

const LiveRoom: React.FC<LiveRoomProps> = ({ mode, streamData, onClose, userBalance = 0, onUpdateBalance }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [showGiftMenu, setShowGiftMenu] = useState(false);
    const [streamerEarnings, setStreamerEarnings] = useState(0);
    const [likes, setLikes] = useState(0);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [viewers, setViewers] = useState(mode === 'VIEWER' ? streamData?.viewers || 0 : 0);

    // Streamer Settings & Features State
    const [showSettings, setShowSettings] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isBeautyOn, setIsBeautyOn] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [streamTitle, setStreamTitle] = useState("My Awesome Stream 🔴");
    const [allowGifts, setAllowGifts] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [streamQuality, setStreamQuality] = useState('720p');

    // Initial Welcome Message
    useEffect(() => {
        setMessages([
            { id: 'sys1', username: 'System', text: 'Welcome to the live stream! Follow community guidelines.', color: 'text-yellow-400' }
        ]);
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Simulator for Streamer Mode (Incoming Gifts & Messages)
    useEffect(() => {
        if (mode === 'STREAMER') {
            const interval = setInterval(() => {
                const random = Math.random();
                if (random > 0.7 && allowComments) {
                    // Random User Message
                    const newMsg: ChatMessage = {
                        id: Date.now().toString(),
                        username: `user_${Math.floor(Math.random() * 1000)}`,
                        text: ['Hello!', 'Big fan sir!', 'Nice stream', 'Op bolte', 'Love from Delhi ❤️'][Math.floor(Math.random() * 5)]
                    };
                    setMessages(prev => [...prev, newMsg]);
                } else if (random > 0.9 && allowGifts) {
                    // Random Gift Received
                    const randomGift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
                    const giftMsg: ChatMessage = {
                        id: Date.now().toString(),
                        username: `fan_${Math.floor(Math.random() * 1000)}`,
                        text: `sent ${randomGift.name}`,
                        isGift: true,
                        giftIcon: randomGift.icon,
                        color: 'text-pink-400'
                    };
                    setMessages(prev => [...prev, giftMsg]);
                    setStreamerEarnings(prev => prev + randomGift.price);
                    if (onUpdateBalance) onUpdateBalance(randomGift.price); // Earn coins
                }
                
                // Random Likes
                setLikes(prev => prev + Math.floor(Math.random() * 5));
                
                // Viewers fluctuation
                setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 2));

            }, 2000);
            return () => clearInterval(interval);
        }
    }, [mode, onUpdateBalance, allowComments, allowGifts]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            username: mode === 'STREAMER' ? 'You (Host)' : 'You',
            text: inputText,
            color: mode === 'STREAMER' ? 'text-pink-400 font-bold' : 'text-white'
        };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
    };

    const handleSendGift = (gift: GiftModel) => {
        if (mode === 'VIEWER') {
            if (userBalance >= gift.price) {
                // Deduct balance
                if (onUpdateBalance) onUpdateBalance(-gift.price);
                
                // Show in chat
                const giftMsg: ChatMessage = {
                    id: Date.now().toString(),
                    username: 'You',
                    text: `sent ${gift.name}`,
                    isGift: true,
                    giftIcon: gift.icon,
                    color: 'text-yellow-400'
                };
                setMessages(prev => [...prev, giftMsg]);
                setShowGiftMenu(false);
                setLikes(prev => prev + 10);
            } else {
                alert("Insufficient Balance!");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {mode === 'VIEWER' ? (
                     <video 
                        src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" 
                        className="w-full h-full object-cover opacity-80" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                     />
                ) : (
                    // Simulated Camera Feed for Streamer
                    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                        {isVideoOn ? (
                             <img 
                                src="https://picsum.photos/400/800" 
                                alt="My Camera" 
                                className={`w-full h-full object-cover transition-all duration-300 ${isBeautyOn ? 'brightness-110 contrast-105 saturate-110 blur-[0.5px]' : ''} ${isFlashOn ? 'brightness-125' : ''}`} 
                             />
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <VideoOff size={48} className="mb-2" />
                                <p>Camera Off</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
                        {mode === 'STREAMER' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <p className="bg-black/50 px-4 py-2 rounded-full text-white backdrop-blur-md text-xs border border-white/10">Broadcasting to Divyanshi Live</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-4 flex justify-between items-start pt-8 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 pr-4 border border-white/5">
                    <img 
                        src={mode === 'VIEWER' ? streamData?.avatar : "https://picsum.photos/150/150"} 
                        alt="Streamer" 
                        className="w-9 h-9 rounded-full border border-white" 
                    />
                    <div>
                        <h3 className="text-white text-xs font-bold max-w-[100px] truncate">{mode === 'VIEWER' ? streamData?.username : 'You (Live)'}</h3>
                        <div className="flex items-center space-x-1 text-[10px] text-gray-300">
                            <Eye size={10} />
                            <span>{viewers}</span>
                        </div>
                    </div>
                    {mode === 'VIEWER' && (
                        <button className="bg-pink-600 text-white text-xs px-3 py-1 rounded-full ml-2 font-bold hover:bg-pink-700 transition">Follow</button>
                    )}
                </div>

                <div className="flex items-center space-x-3">
                     {/* Streamer Earnings Display */}
                    {mode === 'STREAMER' && (
                         <div className="flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/50">
                             <Coins size={14} className="text-yellow-400" />
                             <span className="text-white font-bold text-sm">{streamerEarnings}</span>
                         </div>
                    )}
                    
                    {/* Settings Button */}
                    <button onClick={() => setShowSettings(true)} className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full text-white backdrop-blur-md hover:bg-white/10 transition">
                        <Settings size={18} />
                    </button>

                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full text-white backdrop-blur-md hover:bg-red-500/80 transition">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Streamer Features Toolbar (Right Side) */}
            {mode === 'STREAMER' && (
                <div className="absolute right-4 top-24 flex flex-col space-y-4 z-20">
                     <button onClick={() => setIsMicOn(!isMicOn)} className="flex flex-col items-center group">
                        <div className={`p-2.5 rounded-full backdrop-blur-md transition ${isMicOn ? 'bg-black/30 text-white' : 'bg-white text-black'}`}>
                            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                        </div>
                        <span className="text-[10px] text-white font-medium drop-shadow-md mt-1">Mic</span>
                     </button>

                     <button onClick={() => setIsVideoOn(!isVideoOn)} className="flex flex-col items-center group">
                        <div className={`p-2.5 rounded-full backdrop-blur-md transition ${isVideoOn ? 'bg-black/30 text-white' : 'bg-white text-black'}`}>
                            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                        </div>
                        <span className="text-[10px] text-white font-medium drop-shadow-md mt-1">Cam</span>
                     </button>

                     <button onClick={() => setIsBeautyOn(!isBeautyOn)} className="flex flex-col items-center group">
                        <div className={`p-2.5 rounded-full backdrop-blur-md transition ${isBeautyOn ? 'bg-pink-600 text-white' : 'bg-black/30 text-white'}`}>
                            <Sparkles size={20} />
                        </div>
                        <span className="text-[10px] text-white font-medium drop-shadow-md mt-1">Beauty</span>
                     </button>

                     <button onClick={() => setIsFlashOn(!isFlashOn)} className="flex flex-col items-center group">
                        <div className={`p-2.5 rounded-full backdrop-blur-md transition ${isFlashOn ? 'bg-yellow-500 text-white' : 'bg-black/30 text-white'}`}>
                            <Zap size={20} />
                        </div>
                        <span className="text-[10px] text-white font-medium drop-shadow-md mt-1">Flash</span>
                     </button>

                     <button className="flex flex-col items-center group">
                        <div className="p-2.5 bg-black/30 text-white rounded-full backdrop-blur-md active:rotate-180 transition-transform duration-500">
                            <RotateCcw size={20} />
                        </div>
                        <span className="text-[10px] text-white font-medium drop-shadow-md mt-1">Flip</span>
                     </button>
                </div>
            )}

            {/* Middle Spacer */}
            <div className="flex-1 relative z-10 pointer-events-none">
                {/* Floating Hearts Animation Placeholder */}
                <div className="absolute bottom-10 right-4 flex flex-col space-y-4 opacity-50">
                    <Heart size={24} className="text-pink-500 animate-bounce" />
                    <Heart size={32} className="text-red-500 animate-pulse" />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 p-4 pb-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                
                {/* Chat Area */}
                <div className="h-48 overflow-y-auto no-scrollbar mask-image-linear-to-b mb-4 space-y-2 flex flex-col justify-end">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-black/30 backdrop-blur-sm self-start rounded-lg px-3 py-1.5 max-w-[80%] animate-in slide-in-from-left-4 fade-in duration-200 border border-white/5">
                            <span className="font-bold text-gray-300 text-xs mr-2">{msg.username}:</span>
                            {msg.isGift ? (
                                <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
                                    sent {msg.giftIcon} {msg.text.replace('sent ', '')}
                                </span>
                            ) : (
                                <span className={`text-sm ${msg.color || 'text-white'}`}>{msg.text}</span>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Bottom Bar Controls */}
                <div className="flex items-center space-x-3">
                    <form onSubmit={handleSendMessage} className="flex-1 relative">
                        <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={allowComments ? "Say something..." : "Comments turned off"}
                            disabled={!allowComments && mode === 'VIEWER'}
                            className="w-full bg-black/40 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder-gray-400 backdrop-blur-md disabled:opacity-50"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 p-1 hover:scale-110 transition">
                            <Send size={18} />
                        </button>
                    </form>

                    {mode === 'VIEWER' && (
                        <button 
                            onClick={() => setShowGiftMenu(!showGiftMenu)}
                            disabled={!allowGifts}
                            className={`bg-gradient-to-br from-yellow-400 to-orange-600 p-2.5 rounded-full text-white shadow-lg shadow-orange-500/30 transform transition active:scale-95 ${!allowGifts && 'opacity-50 grayscale'}`}
                        >
                            <Gift size={24} />
                        </button>
                    )}
                    
                    <button className="bg-white/10 p-2.5 rounded-full text-white backdrop-blur-md hover:bg-white/20 transition">
                        <Share2 size={24} />
                    </button>
                    <button 
                        onClick={() => setLikes(prev => prev + 1)}
                        className="bg-pink-600/80 p-2.5 rounded-full text-white backdrop-blur-md active:scale-90 transition hover:bg-pink-600"
                    >
                        <Heart size={24} fill="white" />
                    </button>
                </div>
            </div>

            {/* Gift Menu Modal */}
            {showGiftMenu && (
                <div className="absolute bottom-0 left-0 w-full bg-slate-900 rounded-t-2xl z-50 p-4 border-t border-gray-800 animate-in slide-in-from-bottom-full duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold">Send Gift</h3>
                        <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                            <Coins size={14} />
                            <span className="text-xs font-bold">{userBalance}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                        {GIFTS.map((gift) => (
                            <button 
                                key={gift.id} 
                                onClick={() => handleSendGift(gift)}
                                className="flex flex-col items-center p-2 rounded-xl hover:bg-white/5 transition active:scale-95"
                            >
                                <div className="text-4xl mb-1">{gift.icon}</div>
                                <span className="text-xs text-gray-300 font-medium">{gift.name}</span>
                                <div className="flex items-center space-x-1 mt-1 bg-white/10 px-2 py-0.5 rounded-full">
                                    <Coins size={10} className="text-yellow-400" />
                                    <span className="text-[10px] text-yellow-400 font-bold">{gift.price}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Settings Overlay (Streamer Only) */}
            {mode === 'STREAMER' && showSettings && (
                <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-6 animate-in fade-in duration-200 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                             <Sliders className="text-pink-500" />
                             <h2 className="text-xl font-bold text-white">Live Settings</h2>
                        </div>
                        <button onClick={() => setShowSettings(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <X size={24} className="text-white" />
                        </button>
                    </div>
                    
                    <div className="space-y-6 flex-1">
                         {/* Title */}
                         <div>
                            <label className="text-gray-400 text-sm mb-2 block font-medium">Stream Title</label>
                            <input 
                                value={streamTitle}
                                onChange={(e) => setStreamTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-pink-500 outline-none transition-all focus:ring-1 focus:ring-pink-500"
                            />
                         </div>

                         {/* Quality */}
                         <div>
                            <label className="text-gray-400 text-sm mb-2 block font-medium">Stream Quality</label>
                            <div className="flex gap-2">
                                {['480p', '720p', '1080p'].map(q => (
                                    <button 
                                        key={q}
                                        onClick={() => setStreamQuality(q)}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${streamQuality === q ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                         </div>

                         {/* Toggles */}
                         <div className="bg-slate-800 rounded-2xl p-2 border border-slate-700">
                             <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
                                 <div>
                                     <span className="text-white font-medium block">Allow Gifts</span>
                                     <span className="text-xs text-gray-500">Viewers can send you coins</span>
                                 </div>
                                 <button 
                                    onClick={() => setAllowGifts(!allowGifts)}
                                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${allowGifts ? 'bg-green-500' : 'bg-gray-600'}`}
                                 >
                                     <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${allowGifts ? 'left-6' : 'left-1'}`} />
                                 </button>
                             </div>
                             <div className="flex justify-between items-center p-4">
                                 <div>
                                     <span className="text-white font-medium block">Allow Comments</span>
                                     <span className="text-xs text-gray-500">Viewers can chat with you</span>
                                 </div>
                                 <button 
                                    onClick={() => setAllowComments(!allowComments)}
                                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${allowComments ? 'bg-green-500' : 'bg-gray-600'}`}
                                 >
                                     <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${allowComments ? 'left-6' : 'left-1'}`} />
                                 </button>
                             </div>
                         </div>
                    </div>
                    
                    <button onClick={() => setShowSettings(false)} className="w-full py-4 bg-white text-black font-bold rounded-xl mt-4">
                        Save Settings
                    </button>
                </div>
            )}
            
            {/* Viewer Settings (Report/Block) */}
            {mode === 'VIEWER' && showSettings && (
                 <div className="absolute bottom-0 left-0 w-full bg-slate-900 rounded-t-2xl z-50 p-6 border-t border-gray-800 animate-in slide-in-from-bottom-full duration-300">
                     <h3 className="text-lg font-bold text-white mb-6">Viewer Options</h3>
                     <div className="space-y-2">
                         <button className="w-full flex items-center space-x-3 p-4 bg-slate-800 rounded-xl hover:bg-slate-700 text-left transition">
                             <Shield className="text-white" size={20} />
                             <span className="text-white font-medium">Report Stream</span>
                         </button>
                         <button className="w-full flex items-center space-x-3 p-4 bg-slate-800 rounded-xl hover:bg-slate-700 text-left transition">
                             <VideoOff className="text-white" size={20} />
                             <span className="text-white font-medium">Hide this Stream</span>
                         </button>
                     </div>
                     <button onClick={() => setShowSettings(false)} className="w-full py-4 mt-6 text-gray-400 font-medium">
                         Cancel
                     </button>
                 </div>
            )}

            {/* Backdrop for menus */}
            {(showGiftMenu || showSettings) && (
                <div className="absolute inset-0 z-40 bg-black/50" onClick={() => {setShowGiftMenu(false); setShowSettings(false)}}></div>
            )}
        </div>
    );
};

export default LiveRoom;
