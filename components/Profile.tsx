
import React, { useState, useEffect, useRef } from 'react';
import { UserModel, VideoModel } from '../types';
import { 
  Settings, LogOut, ChevronRight, User, Lock, Shield, Bell, Globe, HelpCircle, FileText, 
  ChevronLeft, Camera, Edit2, Share2, QrCode, Mail, Smartphone, AlertCircle, X, Check, 
  MessageCircle, Download, Eye, AtSign, Mic2, UserX, Fingerprint, Key, Save, Laptop, 
  ShieldCheck, Info, Heart, UserPlus, Video, Zap, PauseCircle, BellOff, Moon, Sun, Type, 
  Wifi, Play, SmartphoneCharging, Subtitles, Layers, Trash2, Volume2, PictureInPicture, 
  ArrowUpCircle, Grid, Plus, Music, Mic, Headphones, Sliders, Speaker, Database, Server, 
  Image, FileVideo, HardDrive, Search, AlertTriangle, LifeBuoy, ChevronDown, MessageSquare, 
  Users, FileCheck, Scale, Copyright, IndianRupee, Coins, Sparkles, MapPin, Tablet, FileJson, 
  FileCode, Clock, CheckCircle, Wallet, CreditCard, Banknote, ShieldAlert, MonitorPlay, 
  Timer, BadgeCheck, Star, CloudLightning, Film, RotateCcw, Copy, Flag, Contact, Facebook, Twitter, Book, Filter,
  Loader2
} from 'lucide-react';

interface ProfileProps {
  user: UserModel;
  videos: VideoModel[];
  onLogout: () => void;
  onUpdateUser: (data: Partial<UserModel>) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, videos, onLogout, onUpdateUser }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [settingsPage, setSettingsPage] = useState<'MAIN' | 'ACCOUNT' | 'PRIVACY' | 'SECURITY' | 'NOTIFICATIONS' | 'DISPLAY' | 'VIDEO' | 'AUDIO' | 'DATA' | 'LANGUAGE' | 'HELP' | 'TERMS' | 'BLOCKED_ACCOUNTS' | 'LOGIN_ACTIVITY' | 'DOWNLOAD_DATA' | 'TERMS_DETAIL' | 'PRIVACY_DETAIL' | 'COMMUNITY_GUIDELINES_DETAIL' | 'CONTENT_POLICY_DETAIL' | 'HELP_WITHDRAW_EARNINGS' | 'HELP_VIDEO_UNDER_REVIEW' | 'HELP_GET_VERIFIED' | 'HELP_COMMUNITY_GUIDELINES' | 'HELP_REPORT_PROBLEM' | 'HELP_SAFETY_CENTER' | 'DOWNLOAD_SETTINGS' | 'CAMERA_RECORDING_SETTINGS' | 'COMMENT_SETTINGS'>('MAIN');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showFindFriends, setShowFindFriends] = useState(false);
  const [activeTab, setActiveTab] = useState<'POSTS' | 'LIKED'>('POSTS');

  // Edit Profile State
  const [editName, setEditName] = useState(user.name || '');
  const [editUsername, setEditUsername] = useState(user.username);
  const [editBio, setEditBio] = useState(user.bio || '');
  const [editWebsite, setEditWebsite] = useState(user.website || '');
  const [editAvatar, setEditAvatar] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditName(user.name || '');
    setEditUsername(user.username);
    setEditBio(user.bio || '');
    setEditWebsite(user.website || '');
    setEditAvatar(user.avatar);
  }, [user]);

  // Privacy State
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [whoCanMessage, setWhoCanMessage] = useState('Friends');
  const [whoCanDuet, setWhoCanDuet] = useState('Everyone');
  const [showLikedVideos, setShowLikedVideos] = useState(false);
  
  // Comment Settings State
  const [commentPrivacy, setCommentPrivacy] = useState<'Everyone' | 'Friends' | 'No One'>('Everyone');
  const [filterAllComments, setFilterAllComments] = useState(false);
  const [filterSpam, setFilterSpam] = useState(true);
  const [filterKeywords, setFilterKeywords] = useState(false);
  const [keywordsList, setKeywordsList] = useState<string[]>(['spam', 'fake']);
  const [keywordInput, setKeywordInput] = useState('');

  // Blocked Users State
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', username: 'toxic_player_01', avatar: 'https://picsum.photos/100/100?random=101', date: '2 days ago' },
    { id: 'b2', username: 'spam_bot_official', avatar: 'https://picsum.photos/100/100?random=102', date: '1 week ago' },
    { id: 'b3', username: 'fake_giveaway_hub', avatar: 'https://picsum.photos/100/100?random=103', date: '2 weeks ago' },
  ]);
  const [blockedSearch, setBlockedSearch] = useState('');

  // Login Activity State
  const [loginSessions, setLoginSessions] = useState([
    { id: 's1', device: 'iPhone 13 Pro', location: 'Mumbai, India', ip: '192.168.1.1', lastActive: 'Active now', isCurrent: true, type: 'MOBILE' },
    { id: 's2', device: 'Windows PC (Chrome)', location: 'Delhi, India', ip: '10.0.0.1', lastActive: '2 hours ago', isCurrent: false, type: 'DESKTOP' },
    { id: 's3', device: 'iPad Air', location: 'Bangalore, India', ip: '172.16.0.1', lastActive: 'Yesterday', isCurrent: false, type: 'TABLET' },
  ]);

  // Download Data State
  const [downloadStatus, setDownloadStatus] = useState<'IDLE' | 'PREPARING' | 'READY'>('IDLE');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState<'HTML' | 'JSON'>('HTML');

  // Security State
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [saveLoginInfo, setSaveLoginInfo] = useState(true);

  // Notification State
  const [pauseAllNotifications, setPauseAllNotifications] = useState(false);
  const [notifyLikes, setNotifyLikes] = useState(true);
  const [notifyComments, setNotifyComments] = useState(true);
  const [notifyFollows, setNotifyFollows] = useState(true);
  const [notifyMentions, setNotifyMentions] = useState(true);
  const [notifyDirectMessages, setNotifyDirectMessages] = useState(true);
  const [notifyLiveStreams, setNotifyLiveStreams] = useState(true);
  const [notifyVideoUpdates, setNotifyVideoUpdates] = useState(true);

  // Display State
  const [darkMode, setDarkMode] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [keepScreenOn, setKeepScreenOn] = useState(true);
  const [textSize, setTextSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [showRupees, setShowRupees] = useState(false);
  const [showFloatingWidget, setShowFloatingWidget] = useState(true);
  const [showCoinAnimation, setShowCoinAnimation] = useState(true);

  // Data & Storage State
  const [cacheSize, setCacheSize] = useState('245 MB');
  const [downloadsSize, setDownloadsSize] = useState('1.2 GB');
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [uploadQuality, setUploadQuality] = useState<'Standard' | 'High'>('High');
  const [mediaAutoPlay, setMediaAutoPlay] = useState<'Wifi' | 'Always' | 'Never'>('Wifi');

  // Video State
  const [autoScroll, setAutoScroll] = useState(false);
  const [pipMode, setPipMode] = useState(false);
  const [volumeNormalizer, setVolumeNormalizer] = useState(true);

  // Audio State
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [equalizer, setEqualizer] = useState('Normal');
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [appSounds, setAppSounds] = useState(true);

  // Data State
  const [uploadWifiOnly, setUploadWifiOnly] = useState(false);
  const [autoDownload, setAutoDownload] = useState('WiFi');
  
  // Download Settings State
  const [downloadQuality, setDownloadQuality] = useState<'Standard' | 'High'>('Standard');
  const [smartDownloads, setSmartDownloads] = useState(true);
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);
  const [deleteWatched, setDeleteWatched] = useState(false);

  // Camera Settings State
  const [settingCameraQuality, setSettingCameraQuality] = useState('1080p');
  const [settingCameraStabilization, setSettingCameraStabilization] = useState(true);
  const [settingCameraGrid, setSettingCameraGrid] = useState(false);
  const [settingMirrorFrontCamera, setSettingMirrorFrontCamera] = useState(true);
  const [settingLocationTags, setSettingLocationTags] = useState(false);
  const [settingDefaultTimer, setSettingDefaultTimer] = useState('Off');

  // Find Friends State
  const [suggestedUsers, setSuggestedUsers] = useState([
    { id: 's1', username: 'diana_dance', name: 'Diana', avatar: 'https://picsum.photos/100/100?random=201', mutual: 'Followed by rohit + 2 more', isFollowing: false },
    { id: 's2', username: 'fitness_freak', name: 'Aryan Fit', avatar: 'https://picsum.photos/100/100?random=202', mutual: 'New to Divyanshi', isFollowing: false },
    { id: 's3', username: 'travel_bug_india', name: 'Travel with Me', avatar: 'https://picsum.photos/100/100?random=203', mutual: 'Followed by angel_riya', isFollowing: false },
    { id: 's4', username: 'tech_today', name: 'Tech Reviews', avatar: 'https://picsum.photos/100/100?random=204', mutual: 'Suggested for you', isFollowing: false },
    { id: 's5', username: 'foodie_delhi', name: 'Delhi Eats', avatar: 'https://picsum.photos/100/100?random=205', mutual: 'Follows you', isFollowing: false },
  ]);
  const [findFriendsSearch, setFindFriendsSearch] = useState('');

  // Report Problem State
  const [reportTopic, setReportTopic] = useState('App Crash');

  // Language State
  const [appLanguage, setAppLanguage] = useState('English');
  const [contentLanguages, setContentLanguages] = useState(['English', 'Hindi']);

  // Helper Toggle Component
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-pink-600' : 'bg-gray-600'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );
  
  const handleUnblockUser = (id: string) => {
    setBlockedUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleLogoutSession = (id: string) => {
    setLoginSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleClearCache = () => {
    if (cacheSize === '0 MB') return;
    setIsClearingCache(true);
    setTimeout(() => {
        setCacheSize('0 MB');
        setIsClearingCache(false);
    }, 1500);
  };

  const handleRequestDownload = () => {
      setDownloadStatus('PREPARING');
      setDownloadProgress(0);

      // Simulate download preparation
      const interval = setInterval(() => {
          setDownloadProgress(prev => {
              if (prev >= 100) {
                  clearInterval(interval);
                  setDownloadStatus('READY');
                  return 100;
              }
              return prev + 5; // Increment progress
          });
      }, 150);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (event) => {
             if (event.target?.result) {
                 setEditAvatar(event.target.result as string);
             }
         };
         reader.readAsDataURL(e.target.files[0]);
     }
  };

  const handleSaveProfile = () => {
     onUpdateUser({
         name: editName,
         username: editUsername,
         bio: editBio,
         website: editWebsite,
         avatar: editAvatar
     });
     setShowEditProfile(false);
  };

  const handleToggleFollow = (id: string) => {
      setSuggestedUsers(prev => prev.map(u => 
          u.id === id ? { ...u, isFollowing: !u.isFollowing } : u
      ));
  };

  const handleAddKeyword = () => {
      if (keywordInput.trim()) {
          setKeywordsList([...keywordsList, keywordInput.trim()]);
          setKeywordInput('');
      }
  };

  const handleRemoveKeyword = (keyword: string) => {
      setKeywordsList(keywordsList.filter(k => k !== keyword));
  };

  const handleWhatsAppInvite = () => {
      const text = encodeURIComponent(`Hey! Join me on Divyanshi, India's premier short video app. Watch, Create & Earn! 🚀\n\nDownload here: https://divyanshi.app/invite?u=${user.username}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSMSInvite = () => {
      const text = `Hey! Join me on Divyanshi, India's premier short video app. Watch, Create & Earn! 🚀\n\nDownload here: https://divyanshi.app/invite?u=${user.username}`;
      window.open(`sms:?body=${encodeURIComponent(text)}`, '_self');
  };

  const handleShareProfile = async () => {
      const shareData = {
          title: `Follow @${user.username} on Divyanshi`,
          text: `Hey! Check out ${user.name}'s profile (@${user.username}) on Divyanshi. Watch my videos and follow me!`,
          url: `https://divyanshi.app/@${user.username}`
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err: any) {
              // Ignore AbortError which happens when user cancels the share sheet
              if (err.name !== 'AbortError') {
                  console.error('Error sharing:', err);
              }
          }
      } else {
          // If native share not supported, show QR code which acts as share card
          setShowQrCode(true);
      }
  };

  const handleModalShare = async () => {
      const shareData = {
          title: `Follow @${user.username} on Divyanshi`,
          text: `Hey! Check out ${user.name}'s profile (@${user.username}) on Divyanshi. Watch my videos and follow me!`,
          url: `https://divyanshi.app/@${user.username}`
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err: any) {
              // Ignore AbortError which happens when user cancels the share sheet
              if (err.name !== 'AbortError') {
                  console.error('Error sharing:', err);
              }
          }
      } else {
          // Fallback if inside modal: Copy to clipboard
          try {
              await navigator.clipboard.writeText(shareData.url);
              alert("Profile link copied to clipboard!");
          } catch (err) {
              console.error("Failed to copy", err);
          }
      }
  };

  const handleDownloadFile = async () => {
      try {
          const JSZip = (window as any).JSZip;
          if (!JSZip) {
              alert("Export functionality requires the JSZip library. Please ensure internet access.");
              return;
          }

          const zip = new JSZip();
          
          // Add JSON Data
          const exportData = {
              user: user,
              settings: {
                  isPrivateAccount,
                  activeStatus,
                  allowDownloads,
                  darkMode,
                  appLanguage,
                  contentLanguages
              },
              history: {
                  loginSessions,
                  blockedUsers
              },
              meta: {
                  exportedAt: new Date().toISOString(),
                  version: "1.0.2"
              }
          };

          zip.file("data_export.json", JSON.stringify(exportData, null, 2));

          // Add HTML Report
          if (downloadFormat === 'HTML') {
              const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Divyanshi Data Export</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
                        h1 { color: #db2777; border-bottom: 2px solid #db2777; padding-bottom: 10px; }
                        h2 { margin-top: 30px; color: #444; }
                        .section { background: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 20px; }
                        .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
                        .value { font-weight: 500; }
                        .badge { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; }
                        .badge-green { background: #d1fae5; color: #065f46; }
                    </style>
                </head>
                <body>
                    <h1>Divyanshi Data Export</h1>
                    <p>Generated on: ${new Date().toLocaleString()}</p>

                    <h2>User Profile</h2>
                    <div class="section">
                        <p><span class="label">Username:</span> <span class="value">@${user.username}</span></p>
                        <p><span class="label">Balance:</span> <span class="value">${user.balance} Coins</span></p>
                        <p><span class="label">Followers:</span> <span class="value">${user.followers}</span></p>
                        <p><span class="label">Following:</span> <span class="value">${user.following}</span></p>
                    </div>

                    <h2>Account Settings</h2>
                    <div class="section">
                        <p><span class="label">Private Account:</span> <span class="value">${isPrivateAccount ? 'Yes' : 'No'}</span></p>
                        <p><span class="label">Language:</span> <span class="value">${appLanguage}</span></p>
                        <p><span class="label">Dark Mode:</span> <span class="value">${darkMode ? 'Enabled' : 'Disabled'}</span></p>
                    </div>
                    
                    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 50px;">
                        &copy; 2024 Divyanshi Inc. All rights reserved.
                    </p>
                </body>
                </html>
              `;
              zip.file("report.html", htmlContent);
          }

          // Generate Zip
          const content = await zip.generateAsync({ type: "blob" });
          
          // Trigger Download
          const link = document.createElement("a");
          link.href = URL.createObjectURL(content);
          link.download = `divyanshi_export_${user.username}_${Date.now()}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Reset state after a delay
          setTimeout(() => {
              setDownloadStatus('IDLE');
          }, 3000);

      } catch (error) {
          console.error("Export failed:", error);
          alert("Failed to generate zip file.");
      }
  };

  const toggleContentLanguage = (lang: string) => {
      setContentLanguages(prev => 
          prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
      );
  };

  const handleBackNavigation = () => {
    if (settingsPage === 'BLOCKED_ACCOUNTS' || settingsPage === 'COMMENT_SETTINGS') {
        setSettingsPage('PRIVACY');
    } else if (settingsPage === 'LOGIN_ACTIVITY' || settingsPage === 'DOWNLOAD_DATA') {
        setSettingsPage('SECURITY');
    } else if (['TERMS_DETAIL', 'PRIVACY_DETAIL', 'COMMUNITY_GUIDELINES_DETAIL', 'CONTENT_POLICY_DETAIL'].includes(settingsPage)) {
        setSettingsPage('TERMS');
    } else if (['HELP_WITHDRAW_EARNINGS', 'HELP_VIDEO_UNDER_REVIEW', 'HELP_GET_VERIFIED', 'HELP_COMMUNITY_GUIDELINES', 'HELP_REPORT_PROBLEM', 'HELP_SAFETY_CENTER'].includes(settingsPage)) {
        setSettingsPage('HELP');
    } else if (['DOWNLOAD_SETTINGS', 'CAMERA_RECORDING_SETTINGS', 'LANGUAGE', 'ACCOUNT', 'PRIVACY', 'SECURITY', 'NOTIFICATIONS', 'DISPLAY', 'VIDEO', 'AUDIO', 'DATA', 'HELP', 'TERMS'].includes(settingsPage)) {
        setSettingsPage('MAIN');
    } else {
        setShowSettings(false);
    }
  };

  // --- RENDER DISCOVER PEOPLE ---
  if (showFindFriends) {
      return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans animate-in slide-in-from-bottom duration-300">
           {/* Header */}
           <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
              <button onClick={() => setShowFindFriends(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                 <ChevronLeft size={24} className="text-white" />
              </button>
              <h2 className="text-xl font-bold text-white">Discover People</h2>
           </div>

           <div className="flex-1 overflow-y-auto pb-20">
               {/* Search Bar */}
               <div className="p-4">
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                          type="text" 
                          placeholder="Search users..." 
                          value={findFriendsSearch}
                          onChange={(e) => setFindFriendsSearch(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                      />
                  </div>
               </div>

               {/* Sync Contacts Options */}
               <div className="px-4 mb-6 space-y-3">
                   <div className="flex items-center justify-between">
                       <h3 className="text-white font-bold text-base">Invite Friends</h3>
                   </div>
                   <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                       <button onClick={handleWhatsAppInvite} className="flex flex-col items-center gap-2 min-w-[70px]">
                           <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30">
                               <MessageCircle size={24} />
                           </div>
                           <span className="text-[10px] text-gray-400">WhatsApp</span>
                       </button>
                       <button onClick={handleSMSInvite} className="flex flex-col items-center gap-2 min-w-[70px]">
                           <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                               <MessageSquare size={24} />
                           </div>
                           <span className="text-[10px] text-gray-400">SMS</span>
                       </button>
                       <button onClick={handleModalShare} className="flex flex-col items-center gap-2 min-w-[70px]">
                           <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center border border-indigo-500/30">
                               <Copy size={24} />
                           </div>
                           <span className="text-[10px] text-gray-400">Copy Link</span>
                       </button>
                       <button onClick={handleShareProfile} className="flex flex-col items-center gap-2 min-w-[70px]">
                           <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center border border-sky-500/30">
                               <Share2 size={24} />
                           </div>
                           <span className="text-[10px] text-gray-400">Share</span>
                       </button>
                   </div>
                   
                   <button className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 hover:bg-slate-800 transition">
                       <div className="flex items-center gap-3">
                           <div className="p-2 bg-blue-500/20 rounded-full text-blue-500"><Contact size={20} /></div>
                           <div className="text-left">
                               <h4 className="font-bold text-white text-sm">Connect Contacts</h4>
                               <p className="text-xs text-gray-500">Find people you know</p>
                           </div>
                       </div>
                       <button className="px-4 py-1.5 bg-blue-600 rounded-lg text-xs font-bold text-white">Connect</button>
                   </button>
                   
                   <button className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 hover:bg-slate-800 transition">
                       <div className="flex items-center gap-3">
                           <div className="p-2 bg-indigo-500/20 rounded-full text-indigo-500"><Facebook size={20} /></div>
                           <div className="text-left">
                               <h4 className="font-bold text-white text-sm">Connect Facebook</h4>
                               <p className="text-xs text-gray-500">Find Facebook friends</p>
                           </div>
                       </div>
                       <button className="px-4 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white">Connect</button>
                   </button>

                   {/* Invite via WhatsApp */}
                   <button onClick={handleWhatsAppInvite} className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 hover:bg-slate-800 transition">
                       <div className="flex items-center gap-3">
                           <div className="p-2 bg-green-500/20 rounded-full text-green-500"><MessageCircle size={20} /></div>
                           <div className="text-left">
                               <h4 className="font-bold text-white text-sm">Invite via WhatsApp</h4>
                               <p className="text-xs text-gray-500">Share link with contacts</p>
                           </div>
                       </div>
                       <button onClick={(e) => {e.stopPropagation(); handleWhatsAppInvite();}} className="px-4 py-1.5 bg-green-600 rounded-lg text-xs font-bold text-white">Invite</button>
                   </button>
               </div>

               {/* Suggested Users */}
               <div className="px-4">
                   <h3 className="text-white font-bold text-base mb-4">Suggested for you</h3>
                   <div className="space-y-4">
                       {suggestedUsers
                          .filter(u => u.username.toLowerCase().includes(findFriendsSearch.toLowerCase()) || u.name.toLowerCase().includes(findFriendsSearch.toLowerCase()))
                          .map((user) => (
                           <div key={user.id} className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                   <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-800" />
                                   <div>
                                       <h4 className="font-bold text-white text-sm">{user.username}</h4>
                                       <p className="text-xs text-gray-500">{user.name}</p>
                                       <p className="text-[10px] text-gray-400 mt-0.5">{user.mutual}</p>
                                   </div>
                               </div>
                               <button 
                                  onClick={() => handleToggleFollow(user.id)}
                                  className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all ${user.isFollowing ? 'bg-slate-800 text-white border border-gray-600' : 'bg-pink-600 text-white border border-pink-600'}`}
                               >
                                   {user.isFollowing ? 'Requested' : 'Follow'}
                               </button>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
        </div>
      );
  }

  // --- RENDER SETTINGS ---
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans animate-in slide-in-from-right duration-300">
        
        {/* Settings Header */}
        <div className="p-4 border-b border-gray-800 flex items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <button 
            onClick={handleBackNavigation}
            className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition mr-2"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {settingsPage === 'MAIN' ? 'Settings & Privacy' : 
             settingsPage === 'BLOCKED_ACCOUNTS' ? 'Blocked Accounts' :
             settingsPage === 'COMMENT_SETTINGS' ? 'Comment Settings' :
             settingsPage === 'LOGIN_ACTIVITY' ? 'Login Activity' :
             settingsPage === 'DOWNLOAD_DATA' ? 'Download Your Data' :
             settingsPage === 'TERMS_DETAIL' ? 'Terms of Service' :
             settingsPage === 'PRIVACY_DETAIL' ? 'Privacy Policy' :
             settingsPage === 'COMMUNITY_GUIDELINES_DETAIL' ? 'Community Guidelines' :
             settingsPage === 'CONTENT_POLICY_DETAIL' ? 'Content Policy' :
             settingsPage === 'HELP_WITHDRAW_EARNINGS' ? 'How to Withdraw' :
             settingsPage === 'HELP_VIDEO_UNDER_REVIEW' ? 'Video Under Review' :
             settingsPage === 'HELP_GET_VERIFIED' ? 'How to get Verified' :
             settingsPage === 'HELP_COMMUNITY_GUIDELINES' ? 'Community Guidelines' :
             settingsPage === 'HELP_REPORT_PROBLEM' ? 'Report a Problem' :
             settingsPage === 'HELP_SAFETY_CENTER' ? 'Safety Center' :
             settingsPage === 'DOWNLOAD_SETTINGS' ? 'Video Download Settings' :
             settingsPage === 'CAMERA_RECORDING_SETTINGS' ? 'Camera Settings' :
             settingsPage === 'DATA' ? 'Data & Storage' :
             settingsPage === 'LANGUAGE' ? 'Language' :
             settingsPage === 'HELP' ? 'Help Center' : 
             settingsPage === 'TERMS' ? 'Terms & Policies' :
             settingsPage.charAt(0) + settingsPage.slice(1).toLowerCase().replace('_', ' ')}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          
          {/* MAIN MENU */}
          {settingsPage === 'MAIN' && (
            <div className="space-y-6">
              
              {/* Follow and Invite Section */}
              <div className="space-y-1">
                 <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Follow & Invite</h3>
                 <button onClick={() => setShowFindFriends(true)} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                    <div className="flex items-center gap-3">
                      <UserPlus size={20} className="text-white" />
                      <span className="text-white font-medium">Follow and invite friends</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                 </button>
                 
                 {/* WhatsApp Invite */}
                 <button onClick={handleWhatsAppInvite} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                    <div className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full bg-green-500/20 text-green-500">
                          <MessageCircle size={18} />
                      </div>
                      <span className="text-white font-medium">Invite friends via WhatsApp</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                 </button>

                 {/* SMS Invite */}
                 <button onClick={handleSMSInvite} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                    <div className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-500">
                          <MessageSquare size={18} />
                      </div>
                      <span className="text-white font-medium">Invite friends via SMS</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                 </button>
                 
                 {/* Share Profile */}
                 <button onClick={handleShareProfile} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                    <div className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full bg-gray-500/20 text-gray-400">
                          <Share2 size={18} />
                      </div>
                      <span className="text-white font-medium">Share profile</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                 </button>
              </div>

              {/* Account Section */}
              <div className="space-y-1">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Account</h3>
                <button onClick={() => setSettingsPage('ACCOUNT')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <User size={20} className="text-blue-400" />
                     <span className="text-white font-medium">Account</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('PRIVACY')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Lock size={20} className="text-green-400" />
                     <span className="text-white font-medium">Privacy</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('SECURITY')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Shield size={20} className="text-orange-400" />
                     <span className="text-white font-medium">Security</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Content & Display */}
              <div className="space-y-1">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Content & Display</h3>
                <button onClick={() => setSettingsPage('NOTIFICATIONS')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Bell size={20} className="text-yellow-400" />
                     <span className="text-white font-medium">Notifications</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('DISPLAY')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Smartphone size={20} className="text-purple-400" />
                     <span className="text-white font-medium">Display</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('LANGUAGE')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Globe size={20} className="text-teal-400" />
                     <span className="text-white font-medium">Language</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('VIDEO')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Video size={20} className="text-red-400" />
                     <span className="text-white font-medium">Video Player</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('AUDIO')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Volume2 size={20} className="text-pink-400" />
                     <span className="text-white font-medium">Audio</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('CAMERA_RECORDING_SETTINGS')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Camera size={20} className="text-rose-400" />
                     <span className="text-white font-medium">Camera Recording</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Cache & Cellular */}
              <div className="space-y-1">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Cache & Cellular</h3>
                <button onClick={() => setSettingsPage('DATA')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Database size={20} className="text-cyan-400" />
                     <span className="text-white font-medium">Data & Storage</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('DOWNLOAD_SETTINGS')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <Film size={20} className="text-indigo-400" />
                     <span className="text-white font-medium">Video Downloads</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Support */}
              <div className="space-y-1">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Support</h3>
                <button onClick={() => setSettingsPage('HELP')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <HelpCircle size={20} className="text-emerald-400" />
                     <span className="text-white font-medium">Help Center</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
                <button onClick={() => setSettingsPage('TERMS')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                   <div className="flex items-center gap-3">
                     <FileText size={20} className="text-gray-400" />
                     <span className="text-white font-medium">Terms & Policies</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Logout */}
              <button onClick={onLogout} className="w-full flex items-center justify-center p-4 bg-slate-800/50 hover:bg-red-500/10 text-red-500 font-bold rounded-xl mt-8 transition">
                <LogOut size={20} className="mr-2" />
                Log Out
              </button>

              <div className="text-center text-xs text-gray-600 mt-4 pb-8">
                Version 1.0.2 (Build 240)
              </div>
            </div>
          )}
          
          {/* DATA & STORAGE PAGE */}
          {settingsPage === 'DATA' && (
              <div className="space-y-6">
                  {/* Storage Section */}
                  <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                       <div className="p-4 border-b border-slate-800">
                           <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">Storage</h4>
                           <div className="mb-4">
                               <div className="flex justify-between text-xs mb-1 font-medium">
                                   <span className="text-white">12.4 GB Used</span>
                                   <span className="text-gray-500">256 GB Total</span>
                               </div>
                               <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-pink-600 w-[15%] rounded-full"></div>
                               </div>
                           </div>
                           
                           <div className="space-y-3">
                               <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <div className="p-2 bg-slate-800 rounded-lg text-gray-400"><Database size={18} /></div>
                                       <div>
                                           <span className="text-white text-sm font-medium block">Cache</span>
                                           <span className="text-xs text-gray-500">{cacheSize}</span>
                                       </div>
                                   </div>
                                   <button 
                                      onClick={handleClearCache}
                                      disabled={cacheSize === '0 MB' || isClearingCache}
                                      className="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-bold text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                   >
                                       {isClearingCache ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                       Clear
                                   </button>
                               </div>
                               
                               <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <div className="p-2 bg-slate-800 rounded-lg text-gray-400"><HardDrive size={18} /></div>
                                       <div>
                                           <span className="text-white text-sm font-medium block">Downloads</span>
                                           <span className="text-xs text-gray-500">{downloadsSize}</span>
                                       </div>
                                   </div>
                                   <button className="px-3 py-1.5 border border-slate-700 rounded-lg text-xs font-bold text-white hover:bg-slate-800 transition">
                                       Manage
                                   </button>
                               </div>
                           </div>
                       </div>
                  </div>

                  {/* Data Saver Section */}
                  <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <div>
                               <span className="text-white font-medium block">Data Saver</span>
                               <span className="text-xs text-gray-500">Reduce data usage on cellular networks</span>
                           </div>
                           <Toggle checked={dataSaver} onChange={setDataSaver} />
                       </div>
                       
                       <div className="p-4">
                           <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">Media Quality</h4>
                           
                           <div className="flex items-center justify-between mb-4">
                               <div>
                                   <span className="text-white font-medium block text-sm">Upload Quality</span>
                                   <span className="text-xs text-gray-500">Higher quality uses more data</span>
                               </div>
                               <div className="flex bg-slate-800 p-1 rounded-lg">
                                   <button 
                                      onClick={() => setUploadQuality('Standard')}
                                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${uploadQuality === 'Standard' ? 'bg-white text-black' : 'text-gray-400'}`}
                                   >
                                      Standard
                                   </button>
                                   <button 
                                      onClick={() => setUploadQuality('High')}
                                      className={`px-3 py-1 text-xs font-bold rounded-md transition ${uploadQuality === 'High' ? 'bg-white text-black' : 'text-gray-400'}`}
                                   >
                                      High
                                   </button>
                               </div>
                           </div>

                           <div className="space-y-3">
                               <div className="flex items-center justify-between">
                                   <span className="text-white text-sm font-medium">Auto-play videos</span>
                                   <select 
                                      value={mediaAutoPlay}
                                      onChange={(e) => setMediaAutoPlay(e.target.value as any)}
                                      className="bg-slate-800 text-white text-xs font-bold border-none rounded-lg py-1.5 px-3 outline-none"
                                   >
                                       <option value="Wifi">WiFi Only</option>
                                       <option value="Always">Mobile & WiFi</option>
                                       <option value="Never">Never</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                  </div>
              </div>
          )}
          
          {/* DOWNLOAD SETTINGS PAGE */}
          {settingsPage === 'DOWNLOAD_SETTINGS' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Video Quality</h4>
                             <div className="flex gap-2 bg-black/50 p-1 rounded-xl">
                                 {['Standard', 'High'].map((quality) => (
                                     <button 
                                       key={quality}
                                       onClick={() => setDownloadQuality(quality as any)}
                                       className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${downloadQuality === quality ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                     >
                                         {quality}
                                     </button>
                                 ))}
                             </div>
                             <p className="text-[10px] text-gray-500 mt-2">High quality uses more storage space.</p>
                        </div>
                        
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <div>
                               <span className="text-white font-medium block">Smart Downloads</span>
                               <span className="text-xs text-gray-500">Auto-download videos based on your interests</span>
                           </div>
                           <Toggle checked={smartDownloads} onChange={setSmartDownloads} />
                        </div>

                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <div>
                               <span className="text-white font-medium block">Download over Wi-Fi only</span>
                               <span className="text-xs text-gray-500">Save mobile data</span>
                           </div>
                           <Toggle checked={downloadOverWifi} onChange={setDownloadOverWifi} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                           <div>
                               <span className="text-white font-medium block">Delete watched videos</span>
                               <span className="text-xs text-gray-500">Automatically remove videos you've seen</span>
                           </div>
                           <Toggle checked={deleteWatched} onChange={setDeleteWatched} />
                        </div>
                   </div>

                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4">
                       <h4 className="font-bold text-white text-sm mb-2">Manage Storage</h4>
                       <div className="flex justify-between items-center mb-4">
                           <span className="text-xs text-gray-400">Used by Downloads</span>
                           <span className="text-xs text-white font-bold">1.2 GB</span>
                       </div>
                       <button className="w-full py-3 border border-red-500/50 text-red-500 font-bold rounded-xl hover:bg-red-500/10 transition">
                           Delete All Downloads
                       </button>
                   </div>
              </div>
          )}

          {/* ACCOUNT PAGE */}
          {settingsPage === 'ACCOUNT' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                          <span className="text-white font-medium">Email</span>
                          <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">user@example.com</span>
                              <ChevronRight size={16} className="text-gray-600" />
                          </div>
                      </div>
                      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                          <span className="text-white font-medium">Phone</span>
                          <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">+91 98765 43210</span>
                              <ChevronRight size={16} className="text-gray-600" />
                          </div>
                      </div>
                      <div className="p-4 flex justify-between items-center hover:bg-slate-800 transition cursor-pointer">
                          <span className="text-white font-medium">Password</span>
                          <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">Last changed 3 months ago</span>
                              <ChevronRight size={16} className="text-gray-600" />
                          </div>
                      </div>
                  </div>

                  <div>
                      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Account Control</h3>
                      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800 transition text-red-400">
                              <span className="font-medium">Deactivate Account</span>
                              <ChevronRight size={16} />
                          </button>
                          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800 transition text-red-500">
                              <span className="font-bold">Delete Account</span>
                              <ChevronRight size={16} />
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* PRIVACY PAGE */}
          {settingsPage === 'PRIVACY' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                          <div>
                              <h4 className="font-bold text-white text-sm">Private Account</h4>
                              <p className="text-xs text-gray-500">Only approved followers can see your content</p>
                          </div>
                          <Toggle checked={isPrivateAccount} onChange={setIsPrivateAccount} />
                      </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                          <div>
                              <h4 className="font-bold text-white text-sm">Activity Status</h4>
                              <p className="text-xs text-gray-500">Show when you're active</p>
                          </div>
                          <Toggle checked={activeStatus} onChange={setActiveStatus} />
                      </div>
                  </div>

                  <div>
                      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Interactions</h3>
                      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                           <button onClick={() => setSettingsPage('BLOCKED_ACCOUNTS')} className="w-full p-4 flex items-center justify-between hover:bg-slate-800 border-b border-slate-800 transition">
                               <span className="text-white font-medium">Blocked Accounts</span>
                               <ChevronRight size={16} className="text-gray-500" />
                           </button>
                           <div className="p-4 flex items-center justify-between border-b border-slate-800">
                               <span className="text-white font-medium">Allow Downloads</span>
                               <Toggle checked={allowDownloads} onChange={setAllowDownloads} />
                           </div>
                           <div className="p-4 flex items-center justify-between border-b border-slate-800">
                               <span className="text-white font-medium">Who can message you</span>
                               <span className="text-xs text-gray-400">{whoCanMessage}</span>
                           </div>
                           <button onClick={() => setSettingsPage('COMMENT_SETTINGS')} className="w-full p-4 flex items-center justify-between hover:bg-slate-800 transition">
                               <span className="text-white font-medium">Who can comment</span>
                               <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{commentPrivacy}</span>
                                  <ChevronRight size={16} className="text-gray-500" />
                               </div>
                           </button>
                      </div>
                  </div>
              </div>
          )}
          
          {/* COMMENT SETTINGS PAGE */}
          {settingsPage === 'COMMENT_SETTINGS' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                       <div className="p-4 border-b border-slate-800">
                           <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">Who can comment on your videos</h4>
                           <div className="flex flex-col gap-2">
                               {['Everyone', 'Friends', 'No One'].map(option => (
                                   <button 
                                       key={option}
                                       onClick={() => setCommentPrivacy(option as any)}
                                       className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition"
                                   >
                                       <span className="text-sm font-medium text-white">{option}</span>
                                       {commentPrivacy === option && <Check className="text-pink-600" size={18} />}
                                   </button>
                               ))}
                           </div>
                       </div>
                   </div>

                   <div>
                       <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Comment Filters</h3>
                       <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                            <div className="p-4 flex items-center justify-between border-b border-slate-800">
                                <div>
                                    <span className="text-white font-medium block">Filter all comments</span>
                                    <span className="text-xs text-gray-500">Recent comments will be hidden until you approve them</span>
                                </div>
                                <Toggle checked={filterAllComments} onChange={setFilterAllComments} />
                            </div>
                            <div className="p-4 flex items-center justify-between border-b border-slate-800">
                                <div>
                                    <span className="text-white font-medium block">Filter spam and offensive comments</span>
                                    <span className="text-xs text-gray-500">Hide comments that may be offensive or spam</span>
                                </div>
                                <Toggle checked={filterSpam} onChange={setFilterSpam} />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <span className="text-white font-medium block">Filter keywords</span>
                                    <span className="text-xs text-gray-500">Hide comments with specific keywords</span>
                                </div>
                                <Toggle checked={filterKeywords} onChange={setFilterKeywords} />
                            </div>
                            
                            {filterKeywords && (
                                <div className="p-4 bg-slate-800/50 border-t border-slate-800 animate-in slide-in-from-top-2">
                                    <div className="flex gap-2 mb-3">
                                        <input 
                                            type="text" 
                                            value={keywordInput}
                                            onChange={(e) => setKeywordInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                                            placeholder="Add a keyword..."
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
                                        />
                                        <button 
                                            onClick={handleAddKeyword}
                                            disabled={!keywordInput.trim()}
                                            className="bg-pink-600 p-2 rounded-lg text-white disabled:opacity-50"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {keywordsList.map(keyword => (
                                            <div key={keyword} className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                                {keyword}
                                                <button onClick={() => handleRemoveKeyword(keyword)}><X size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2">Comments containing these words will be hidden automatically.</p>
                                </div>
                            )}
                       </div>
                   </div>
              </div>
          )}

          {/* NOTIFICATIONS PAGE */}
          {settingsPage === 'NOTIFICATIONS' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                          <div>
                              <h4 className="font-bold text-white text-sm">Pause All</h4>
                              <p className="text-xs text-gray-500">Temporarily pause notifications</p>
                          </div>
                          <Toggle checked={pauseAllNotifications} onChange={setPauseAllNotifications} />
                      </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Likes</span>
                           <Toggle checked={notifyLikes} onChange={setNotifyLikes} />
                       </div>
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Comments</span>
                           <Toggle checked={notifyComments} onChange={setNotifyComments} />
                       </div>
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">New Followers</span>
                           <Toggle checked={notifyFollows} onChange={setNotifyFollows} />
                       </div>
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Mentions</span>
                           <Toggle checked={notifyMentions} onChange={setNotifyMentions} />
                       </div>
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Direct Messages</span>
                           <Toggle checked={notifyDirectMessages} onChange={setNotifyDirectMessages} />
                       </div>
                       <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Live Streams</span>
                           <Toggle checked={notifyLiveStreams} onChange={setNotifyLiveStreams} />
                       </div>
                       <div className="p-4 flex items-center justify-between">
                           <span className="text-white font-medium">Video Updates</span>
                           <Toggle checked={notifyVideoUpdates} onChange={setNotifyVideoUpdates} />
                       </div>
                  </div>
              </div>
          )}

          {/* DISPLAY PAGE */}
          {settingsPage === 'DISPLAY' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <div className="p-4 border-b border-slate-800">
                            <h4 className="font-bold text-white text-sm mb-4">Appearance</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => setDarkMode(false)}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 ${!darkMode ? 'bg-white text-black border-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                >
                                    <Sun size={24} />
                                    <span className="text-xs font-bold">Light</span>
                                </button>
                                <button 
                                    onClick={() => setDarkMode(true)}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 ${darkMode ? 'bg-slate-700 text-white border-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                >
                                    <Moon size={24} />
                                    <span className="text-xs font-bold">Dark</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Data Saver</span>
                           <Toggle checked={dataSaver} onChange={setDataSaver} />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                           <span className="text-white font-medium">Keep Screen On</span>
                           <Toggle checked={keepScreenOn} onChange={setKeepScreenOn} />
                        </div>
                   </div>
              </div>
          )}

          {/* LANGUAGE PAGE */}
          {settingsPage === 'LANGUAGE' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <div className="p-4 border-b border-slate-800">
                            <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">App Language</h4>
                            <div className="flex flex-wrap gap-2">
                                {['English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Gujarati'].map(lang => (
                                    <button 
                                        key={lang}
                                        onClick={() => setAppLanguage(lang)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold border transition ${appLanguage === lang ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Content Languages</h4>
                            <p className="text-xs text-gray-500 mb-3">Select languages you understand to improve your feed.</p>
                            <div className="flex flex-wrap gap-2">
                                {['English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Gujarati', 'Punjabi', 'Kannada', 'Malayalam'].map(lang => (
                                    <button 
                                        key={lang}
                                        onClick={() => toggleContentLanguage(lang)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold border transition ${contentLanguages.includes(lang) ? 'bg-white border-white text-black' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                   </div>
              </div>
          )}

          {/* SECURITY PAGE */}
          {settingsPage === 'SECURITY' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <button onClick={() => setSettingsPage('LOGIN_ACTIVITY')} className="w-full p-4 flex items-center justify-between hover:bg-slate-800 border-b border-slate-800 transition">
                           <span className="text-white font-medium">Login Activity</span>
                           <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <button onClick={() => setSettingsPage('DOWNLOAD_DATA')} className="w-full p-4 flex items-center justify-between hover:bg-slate-800 border-b border-slate-800 transition">
                           <span className="text-white font-medium">Download Your Data</span>
                           <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">App Lock</span>
                           <Toggle checked={isAppLockEnabled} onChange={setIsAppLockEnabled} />
                        </div>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">2-Step Verification</span>
                           <Toggle checked={isTwoFactorEnabled} onChange={setIsTwoFactorEnabled} />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                           <span className="text-white font-medium">Save Login Info</span>
                           <Toggle checked={saveLoginInfo} onChange={setSaveLoginInfo} />
                        </div>
                   </div>
              </div>
          )}
          
          {/* CAMERA RECORDING SETTINGS PAGE */}
          {settingsPage === 'CAMERA_RECORDING_SETTINGS' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Default Resolution</h4>
                             <div className="flex gap-2">
                                 {['720p', '1080p', '4K'].map(res => (
                                     <button 
                                         key={res}
                                         onClick={() => setSettingCameraQuality(res)}
                                         className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${settingCameraQuality === res ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                     >
                                         {res}
                                     </button>
                                 ))}
                             </div>
                        </div>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Stabilization</span>
                           <Toggle checked={settingCameraStabilization} onChange={setSettingCameraStabilization} />
                        </div>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Grid Lines</span>
                           <Toggle checked={settingCameraGrid} onChange={setSettingCameraGrid} />
                        </div>
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                           <span className="text-white font-medium">Mirror Front Camera</span>
                           <Toggle checked={settingMirrorFrontCamera} onChange={setSettingMirrorFrontCamera} />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                           <span className="text-white font-medium">Location Tags</span>
                           <Toggle checked={settingLocationTags} onChange={setSettingLocationTags} />
                        </div>
                   </div>
              </div>
          )}

          {/* BLOCKED ACCOUNTS PAGE */}
          {settingsPage === 'BLOCKED_ACCOUNTS' && (
              <div className="space-y-4">
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                          type="text" 
                          placeholder="Search" 
                          value={blockedSearch}
                          onChange={(e) => setBlockedSearch(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-pink-500 outline-none"
                      />
                  </div>
                  <div className="space-y-2">
                      {blockedUsers.length > 0 ? (
                          blockedUsers.map(user => (
                              <div key={user.id} className="bg-slate-900 rounded-xl p-3 flex justify-between items-center border border-slate-800">
                                  <div className="flex items-center gap-3">
                                      <img src={user.avatar} className="w-10 h-10 rounded-full bg-gray-700" />
                                      <div>
                                          <h4 className="font-bold text-white text-sm">{user.username}</h4>
                                          <p className="text-xs text-gray-500">Blocked {user.date}</p>
                                      </div>
                                  </div>
                                  <button 
                                      onClick={() => handleUnblockUser(user.id)}
                                      className="px-3 py-1.5 border border-gray-600 rounded-lg text-xs font-bold text-gray-300 hover:bg-slate-800 transition"
                                  >
                                      Unblock
                                  </button>
                              </div>
                          ))
                      ) : (
                          <div className="text-center py-10 text-gray-500 text-sm">No blocked accounts</div>
                      )}
                  </div>
              </div>
          )}

          {/* LOGIN ACTIVITY PAGE */}
          {settingsPage === 'LOGIN_ACTIVITY' && (
              <div className="space-y-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider px-2">Where you're logged in</h3>
                  <div className="space-y-2">
                      {loginSessions.map(session => (
                          <div key={session.id} className="bg-slate-900 rounded-xl p-4 flex justify-between items-start border border-slate-800">
                              <div className="flex gap-3">
                                  <div className="mt-1">
                                      {session.type === 'MOBILE' ? <Smartphone size={20} className="text-gray-400" /> : 
                                       session.type === 'DESKTOP' ? <Laptop size={20} className="text-gray-400" /> : 
                                       <Tablet size={20} className="text-gray-400" />}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white text-sm">{session.device}</h4>
                                      <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                                      {session.isCurrent && <span className="text-xs text-green-500 font-bold mt-1 block">Active Now</span>}
                                  </div>
                              </div>
                              {!session.isCurrent && (
                                  <button 
                                      onClick={() => handleLogoutSession(session.id)}
                                      className="text-red-500 text-xs font-bold hover:underline"
                                  >
                                      Logout
                                  </button>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* DOWNLOAD DATA PAGE */}
          {settingsPage === 'DOWNLOAD_DATA' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download size={32} className="text-blue-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Download Your Information</h3>
                      <p className="text-sm text-gray-400 mb-6">
                          Get a copy of what you've shared on Divyanshi. You can download your profile information, posts, and settings history.
                      </p>
                      
                      {downloadStatus === 'IDLE' && (
                          <div className="space-y-4">
                              <div className="flex justify-center gap-4 text-sm mb-4">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="radio" name="format" checked={downloadFormat === 'HTML'} onChange={() => setDownloadFormat('HTML')} className="accent-pink-600" />
                                      <span className="text-white">HTML (Readable)</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="radio" name="format" checked={downloadFormat === 'JSON'} onChange={() => setDownloadFormat('JSON')} className="accent-pink-600" />
                                      <span className="text-white">JSON (Machine)</span>
                                  </label>
                              </div>
                              <button 
                                  onClick={handleRequestDownload}
                                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white transition"
                              >
                                  Request Download
                              </button>
                          </div>
                      )}

                      {downloadStatus === 'PREPARING' && (
                          <div className="space-y-3">
                              <div className="w-full bg-slate-800 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-200" style={{ width: `${downloadProgress}%` }}></div>
                              </div>
                              <p className="text-xs text-gray-400 animate-pulse">Preparing your file... {downloadProgress}%</p>
                          </div>
                      )}

                      {downloadStatus === 'READY' && (
                          <div className="animate-in fade-in zoom-in duration-300">
                              <div className="bg-green-500/10 text-green-500 p-3 rounded-lg text-sm font-bold mb-4 flex items-center justify-center gap-2">
                                  <CheckCircle size={16} /> File Ready
                              </div>
                              <button 
                                  onClick={handleDownloadFile}
                                  className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-white transition flex items-center justify-center gap-2"
                              >
                                  <Download size={18} /> Download File
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {/* HELP PAGE */}
          {settingsPage === 'HELP' && (
              <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
                       <h3 className="text-lg font-bold text-white mb-4">Hi, how can we help?</h3>
                       <div className="relative">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                           <input 
                               type="text" 
                               placeholder="Search help articles..." 
                               className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors"
                           />
                       </div>
                  </div>

                  <div className="space-y-1">
                      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Popular Topics</h3>
                      <button onClick={() => setSettingsPage('HELP_WITHDRAW_EARNINGS')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <span className="text-white font-medium">How to withdraw earnings?</span>
                           <ChevronRight size={16} className="text-gray-500" />
                      </button>
                      <button onClick={() => setSettingsPage('HELP_VIDEO_UNDER_REVIEW')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <span className="text-white font-medium">Why is my video under review?</span>
                           <ChevronRight size={16} className="text-gray-500" />
                      </button>
                      <button onClick={() => setSettingsPage('HELP_GET_VERIFIED')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <span className="text-white font-medium">How to get Verified badge?</span>
                           <ChevronRight size={16} className="text-gray-500" />
                      </button>
                  </div>

                  <div className="space-y-1">
                       <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">Support & Safety</h3>
                       <button onClick={() => setSettingsPage('HELP_REPORT_PROBLEM')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-red-500/20 rounded-full text-red-500"><AlertTriangle size={18} /></div>
                               <span className="text-white font-medium">Report a Problem</span>
                           </div>
                           <ChevronRight size={16} className="text-gray-500" />
                       </button>
                       <button onClick={() => setSettingsPage('HELP_SAFETY_CENTER')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-blue-500/20 rounded-full text-blue-500"><Shield size={18} /></div>
                               <span className="text-white font-medium">Safety Center</span>
                           </div>
                           <ChevronRight size={16} className="text-gray-500" />
                       </button>
                       <button onClick={() => setSettingsPage('HELP_COMMUNITY_GUIDELINES')} className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl transition">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-green-500/20 rounded-full text-green-500"><Book size={18} /></div>
                               <span className="text-white font-medium">Community Guidelines</span>
                           </div>
                           <ChevronRight size={16} className="text-gray-500" />
                       </button>
                  </div>
              </div>
          )}

          {/* HELP: REPORT PROBLEM */}
          {settingsPage === 'HELP_REPORT_PROBLEM' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                       <label className="text-xs text-gray-500 font-bold block mb-2 uppercase">Topic</label>
                       <div className="flex flex-wrap gap-2 mb-4">
                           {['App Crash', 'Video Playback', 'Upload Issue', 'Account', 'Other'].map(topic => (
                               <button 
                                  key={topic}
                                  onClick={() => setReportTopic(topic)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${reportTopic === topic ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                               >
                                   {topic}
                               </button>
                           ))}
                       </div>
                       
                       <label className="text-xs text-gray-500 font-bold block mb-2 uppercase">Description</label>
                       <textarea 
                           className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 outline-none h-32 resize-none text-sm mb-4"
                           placeholder="Describe the issue in detail..."
                       ></textarea>
                       
                       <div className="flex items-center gap-4 mb-6">
                           <button className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 transition">
                               <Image size={24} />
                               <span className="text-[10px] mt-1">Screenshot</span>
                           </button>
                           <button className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 transition">
                               <FileVideo size={24} />
                               <span className="text-[10px] mt-1">Screen Rec</span>
                           </button>
                       </div>

                       <button className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-xl font-bold text-white transition">
                           Submit Report
                       </button>
                   </div>
              </div>
          )}

          {/* HELP: VERIFICATION */}
          {settingsPage === 'HELP_GET_VERIFIED' && (
              <div className="space-y-6">
                   <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BadgeCheck size={32} className="text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Apply for Verification</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Verified badges confirm that a notable account is authentic.
                        </p>

                        <div className="space-y-4 text-left">
                            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <span className="text-sm text-gray-300">Complete Profile</span>
                                <CheckCircle size={18} className="text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <span className="text-sm text-gray-300">10k+ Followers</span>
                                <span className="text-xs font-bold text-yellow-500">2.4k / 10k</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <span className="text-sm text-gray-300">Active last 30 days</span>
                                <CheckCircle size={18} className="text-green-500" />
                            </div>
                        </div>

                        <button className="w-full py-3 bg-slate-700 text-gray-400 font-bold rounded-xl mt-6 cursor-not-allowed">
                            Requirements Not Met
                        </button>
                   </div>
              </div>
          )}

           {/* HELP: SAFETY */}
          {settingsPage === 'HELP_SAFETY_CENTER' && (
              <div className="space-y-4">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                       <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" className="w-full h-32 object-cover opacity-60" />
                       <div className="p-4">
                           <h3 className="font-bold text-white text-lg mb-2">Your Safety Matters</h3>
                           <p className="text-sm text-gray-400">Learn how to stay safe on Divyanshi.</p>
                       </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                       <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                           <ShieldCheck size={24} className="text-green-500 mb-2" />
                           <h4 className="font-bold text-white text-sm">Account Security</h4>
                           <p className="text-xs text-gray-500 mt-1">Enable 2FA and strong passwords.</p>
                       </div>
                       <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                           <UserX size={24} className="text-red-500 mb-2" />
                           <h4 className="font-bold text-white text-sm">Blocking</h4>
                           <p className="text-xs text-gray-500 mt-1">How to block and report users.</p>
                       </div>
                       <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                           <Lock size={24} className="text-blue-500 mb-2" />
                           <h4 className="font-bold text-white text-sm">Privacy</h4>
                           <p className="text-xs text-gray-500 mt-1">Control who sees your content.</p>
                       </div>
                       <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                           <LifeBuoy size={24} className="text-yellow-500 mb-2" />
                           <h4 className="font-bold text-white text-sm">Resources</h4>
                           <p className="text-xs text-gray-500 mt-1">External safety partners.</p>
                       </div>
                   </div>
              </div>
          )}

          {/* HELP: TEXT ARTICLES (Generic) */}
          {['HELP_WITHDRAW_EARNINGS', 'HELP_VIDEO_UNDER_REVIEW', 'HELP_COMMUNITY_GUIDELINES'].includes(settingsPage) && (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                  <h3 className="text-lg font-bold text-white mb-4">
                      {settingsPage === 'HELP_WITHDRAW_EARNINGS' ? 'How to withdraw earnings?' :
                       settingsPage === 'HELP_VIDEO_UNDER_REVIEW' ? 'Why is my video under review?' :
                       'Community Guidelines'}
                  </h3>
                  <div className="prose prose-invert prose-sm text-gray-400">
                      {settingsPage === 'HELP_WITHDRAW_EARNINGS' ? (
                          <>
                              <p>To withdraw your earnings, you must have a minimum balance of 500 coins. Go to your Wallet, click Withdraw, select your payment method (UPI or Bank Transfer), and enter the amount.</p>
                              <p className="mt-2">Withdrawals are typically processed within 24-48 hours. Please ensure your KYC details are up to date.</p>
                          </>
                      ) : settingsPage === 'HELP_VIDEO_UNDER_REVIEW' ? (
                          <>
                              <p>Videos may be placed under review if our AI detects potential violations of our Community Guidelines. This includes content that might be unsafe, copyright infringing, or inappropriate.</p>
                              <p className="mt-2">Reviews usually take 1-2 hours. If your video is approved, it will be visible on your profile. If rejected, you will receive a notification with the reason.</p>
                          </>
                      ) : (
                          <>
                              <ul className="list-disc pl-4 space-y-2">
                                  <li>Be respectful to others. Harassment and hate speech are not tolerated.</li>
                                  <li>Do not post sexually explicit or violent content.</li>
                                  <li>Respect copyright laws. Only post content you own or have the right to use.</li>
                                  <li>Do not spam or post misleading information.</li>
                              </ul>
                          </>
                      )}
                  </div>
              </div>
          )}

          {/* TERMS PAGE */}
           {settingsPage === 'TERMS' && (
              <div className="space-y-4">
                   <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <button onClick={() => setSettingsPage('TERMS_DETAIL')} className="w-full flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Terms of Service</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <button onClick={() => setSettingsPage('PRIVACY_DETAIL')} className="w-full flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Privacy Policy</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <button onClick={() => setSettingsPage('COMMUNITY_GUIDELINES_DETAIL')} className="w-full flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Community Guidelines</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <button onClick={() => setSettingsPage('CONTENT_POLICY_DETAIL')} className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Content Policy</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                   </div>
                   <p className="text-xs text-gray-500 text-center px-4">
                       By using Divyanshi, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
                   </p>
              </div>
          )}

          {/* DETAIL PAGES FOR TERMS */}
          {['TERMS_DETAIL', 'PRIVACY_DETAIL', 'COMMUNITY_GUIDELINES_DETAIL', 'CONTENT_POLICY_DETAIL'].includes(settingsPage) && (
               <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 h-full overflow-y-auto">
                   <h3 className="text-lg font-bold text-white mb-4">
                       {settingsPage === 'TERMS_DETAIL' ? 'Terms of Service' :
                        settingsPage === 'PRIVACY_DETAIL' ? 'Privacy Policy' :
                        settingsPage === 'COMMUNITY_GUIDELINES_DETAIL' ? 'Community Guidelines' :
                        'Content Policy'}
                   </h3>
                   <div className="text-sm text-gray-400 space-y-4 leading-relaxed">
                       <p>Last updated: October 25, 2023</p>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                       <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                   </div>
               </div>
          )}
          
        </div>
      </div>
    );
  }

  // --- RENDER MAIN PROFILE ---
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto pb-20 font-sans">
      
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-800">
         <button onClick={() => setShowFindFriends(true)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
             <UserPlus size={24} />
         </button>
         <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowEditProfile(true)}>
             <span className="font-bold text-lg">{user.username}</span>
             <ChevronDown size={16} />
         </div>
         <div className="flex items-center gap-2">
             <button onClick={() => setShowQrCode(true)} className="p-2 rounded-full hover:bg-gray-800 transition">
                 <QrCode size={24} />
             </button>
             <button onClick={() => setShowSettings(true)} className="p-2 -mr-2 rounded-full hover:bg-gray-800 transition">
                 <Settings size={24} />
             </button>
         </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-6 px-4">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
             <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full border-4 border-slate-950 object-cover" />
          </div>
          <button 
             onClick={() => setShowEditProfile(true)}
             className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-2 border-slate-950 text-white hover:bg-blue-600 transition"
          >
             <Edit2 size={14} />
          </button>
        </div>
        
        <h1 className="text-xl font-bold mb-1">@{user.username}</h1>
        {user.name && <h2 className="text-sm font-medium text-gray-300 mb-1">{user.name}</h2>}
        <p className="text-sm text-gray-400 mb-4 px-8 text-center line-clamp-2">{user.bio}</p>
        {user.website && (
            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-pink-500 font-medium mb-4 hover:underline">
                <Globe size={12} className="mr-1" /> {user.website}
            </a>
        )}
        
        {/* Stats */}
        <div className="flex items-center space-x-8 mb-6">
           <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
               <span className="font-bold text-lg">{user.following}</span>
               <span className="text-xs text-gray-500">Following</span>
           </div>
           <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
               <span className="font-bold text-lg">{user.followers}</span>
               <span className="text-xs text-gray-500">Followers</span>
           </div>
           <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
               <span className="font-bold text-lg">{user.totalLikes}</span>
               <span className="text-xs text-gray-500">Likes</span>
           </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 mb-8 w-full max-w-xs">
           <button 
             onClick={() => setShowEditProfile(true)}
             className="flex-1 bg-slate-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
           >
             Edit Profile
           </button>
           <button 
             onClick={() => setShowQrCode(true)}
             className="flex-1 bg-slate-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
           >
             Share Profile
           </button>
           <button onClick={() => setShowFindFriends(true)} className="w-10 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 transition">
             <UserPlus size={18} />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-1 sticky top-[72px] bg-slate-950 z-10">
         <button 
           onClick={() => setActiveTab('POSTS')}
           className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${activeTab === 'POSTS' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
         >
             <Grid size={20} />
         </button>
         <button 
           onClick={() => setActiveTab('LIKED')}
           className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${activeTab === 'LIKED' ? 'border-white text-white' : 'border-transparent text-gray-500'}`}
         >
             {showLikedVideos ? <Heart size={20} /> : <Lock size={20} />}
         </button>
      </div>

      {/* Video Grid */}
      {activeTab === 'POSTS' ? (
        <div className="grid grid-cols-3 gap-0.5 pb-2">
            {videos.map((video) => (
              <div key={video.id} className="aspect-[3/4] bg-slate-900 relative group cursor-pointer">
                 <img src={video.thumbnail} className="w-full h-full object-cover" />
                 <div className="absolute bottom-1 left-1 text-white text-[10px] flex items-center drop-shadow-md">
                    <Play size={10} className="mr-0.5 fill-white" /> {video.shares}
                 </div>
              </div>
            ))}
            {/* Generate some dummy placeholders to fill grid */}
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="aspect-[3/4] bg-slate-900 relative group cursor-pointer">
                     <img src={`https://picsum.photos/300/400?random=${i + 10}`} className="w-full h-full object-cover opacity-80" />
                     <div className="absolute bottom-1 left-1 text-white text-[10px] flex items-center drop-shadow-md">
                        <Play size={10} className="mr-0.5 fill-white" /> {(i * 1500).toLocaleString()}
                     </div>
                </div>
            ))}
        </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              {showLikedVideos ? (
                  <>
                    <Heart size={48} className="mb-4 opacity-50" />
                    <p className="text-sm">No liked videos yet</p>
                  </>
              ) : (
                  <>
                    <Lock size={48} className="mb-4 opacity-50" />
                    <h3 className="font-bold text-white mb-1">Liked videos are private</h3>
                    <p className="text-xs">Change visibility in privacy settings</p>
                  </>
              )}
          </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
           <div className="bg-slate-900 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom duration-300">
               <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                   <button onClick={() => setShowEditProfile(false)} className="text-gray-400">Cancel</button>
                   <h3 className="font-bold text-lg">Edit Profile</h3>
                   <button onClick={handleSaveProfile} className="text-pink-500 font-bold">Save</button>
               </div>

               <div className="flex flex-col items-center mb-6">
                   <div className="relative mb-2 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                       <img src={editAvatar} className="w-20 h-20 rounded-full object-cover group-hover:opacity-60 transition" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                           <Camera className="text-white" size={24} />
                       </div>
                   </div>
                   <input 
                       type="file" 
                       ref={fileInputRef} 
                       className="hidden" 
                       accept="image/*"
                       onChange={handleImageUpload}
                   />
                   <button onClick={() => fileInputRef.current?.click()} className="text-pink-500 text-sm font-medium">Change Photo</button>
               </div>

               <div className="space-y-4">
                   <div>
                       <label className="text-xs text-gray-500 font-bold block mb-1">Name</label>
                       <div className="relative">
                            <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-800 border-b border-gray-700 p-2 text-white focus:border-pink-500 outline-none" />
                            <User size={16} className="absolute right-2 top-3 text-gray-500" />
                       </div>
                   </div>
                   <div>
                       <label className="text-xs text-gray-500 font-bold block mb-1">Username</label>
                       <div className="relative">
                            <input value={editUsername} onChange={e => setEditUsername(e.target.value)} className="w-full bg-slate-800 border-b border-gray-700 p-2 text-white focus:border-pink-500 outline-none" />
                            <AtSign size={16} className="absolute right-2 top-3 text-gray-500" />
                       </div>
                   </div>
                   <div>
                       <label className="text-xs text-gray-500 font-bold block mb-1">Bio</label>
                       <textarea value={editBio} onChange={e => setEditBio(e.target.value)} className="w-full bg-slate-800 border-b border-gray-700 p-2 text-white focus:border-pink-500 outline-none h-20 resize-none" />
                   </div>
                   <div>
                       <label className="text-xs text-gray-500 font-bold block mb-1">Website</label>
                       <div className="relative">
                            <input value={editWebsite} onChange={e => setEditWebsite(e.target.value)} className="w-full bg-slate-800 border-b border-gray-700 p-2 text-white focus:border-pink-500 outline-none" />
                            <Globe size={16} className="absolute right-2 top-3 text-gray-500" />
                       </div>
                   </div>
               </div>
           </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQrCode && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-200" onClick={() => setShowQrCode(false)}>
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-b-[50%] -mt-10"></div>
                  
                  <div className="relative z-10">
                       <div className="w-20 h-20 rounded-full border-4 border-white mx-auto shadow-lg mb-4">
                           <img src={user.avatar} className="w-full h-full rounded-full" />
                       </div>
                       <h2 className="text-2xl font-bold text-gray-900">@{user.username}</h2>
                       <p className="text-gray-500 text-sm mb-6">Scan to follow me</p>

                       <div className="bg-gray-100 p-4 rounded-xl mx-auto w-48 h-48 flex items-center justify-center mb-6">
                           <QrCode size={140} className="text-black" />
                       </div>

                       <div className="flex justify-center gap-4">
                           <button onClick={handleModalShare} className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500">
                               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Share2 size={20} /></div>
                               <span className="text-xs">Share</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500">
                               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Download size={20} /></div>
                               <span className="text-xs">Save</span>
                           </button>
                       </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Profile;
