
import React, { useState, useEffect } from 'react';
import { Phone, Clock, Users, Delete, Video, Mic, MicOff, Volume2, PhoneOff, Search, Star, MoreVertical, ArrowLeft, GripHorizontal, Settings, Shield, PhoneForwarded, Voicemail, Bell, Wifi, MessageSquare, ChevronRight, Ban, Filter, Smartphone, Loader2, Contact, Square, Play, Check, Vibrate, Trash2, Plus, HelpCircle, LifeBuoy, ChevronDown } from 'lucide-react';
import { MOCK_CONTACTS, MOCK_RECENT_CALLS } from '../constants';
import { ContactModel } from '../types';

const Dialer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'KEYPAD' | 'RECENTS' | 'CONTACTS'>('KEYPAD');
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState<'MAIN' | 'CALL_FORWARDING' | 'VOICEMAIL' | 'RINGTONE' | 'VIBRATION' | 'BLOCKED'>('MAIN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [activeCallContact, setActiveCallContact] = useState<ContactModel | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  
  // Recents State
  const [recentsFilter, setRecentsFilter] = useState<'ALL' | 'MISSED'>('ALL');

  // Settings State
  const [wifiCalling, setWifiCalling] = useState(true);
  const [blockUnknown, setBlockUnknown] = useState(false);
  const [dialpadSound, setDialpadSound] = useState(true);
  const [vibrateOnTouch, setVibrateOnTouch] = useState(true);

  // Blocked Numbers State
  const [blockedNumbers, setBlockedNumbers] = useState([
      { id: '1', number: '+91 99887 76655', label: 'Spam' },
      { id: '2', number: '+1 202 555 0123', label: 'Telemarketer' },
  ]);
  const [newBlockedNumber, setNewBlockedNumber] = useState('');

  // Ringtone State
  const [selectedRingtone, setSelectedRingtone] = useState('Cosmic Wave');
  const [previewRingtone, setPreviewRingtone] = useState<string | null>(null);
  const [ringtoneVolume, setRingtoneVolume] = useState(80);
  const [selectedVibration, setSelectedVibration] = useState('Synchronized');

  const RINGTONES = [
      { id: '1', name: 'Cosmic Wave', duration: '0:30' },
      { id: '2', name: 'Nebula Drift', duration: '0:25' },
      { id: '3', name: 'Starlight Echo', duration: '0:15' },
      { id: '4', name: 'Classic Phone', duration: '0:10' },
      { id: '5', name: 'Digital Pulse', duration: '0:05' },
      { id: '6', name: 'Soft Chime', duration: '0:12' },
  ];

  const VIBRATION_PATTERNS = [
      { id: '1', name: 'Synchronized (Default)', pattern: [200] },
      { id: '2', name: 'Heartbeat', pattern: [200, 100, 200] },
      { id: '3', name: 'Tick Tock', pattern: [100, 500, 100, 500] },
      { id: '4', name: 'Waltz', pattern: [200, 200, 200, 200, 500, 200] },
      { id: '5', name: 'Zig Zag', pattern: [100, 100, 100, 100, 100, 100] },
      { id: '6', name: 'Off', pattern: [] },
  ];

  // Voicemail State
  const [voicemailGreeting, setVoicemailGreeting] = useState<'DEFAULT' | 'CUSTOM'>('DEFAULT');
  const [visualVoicemail, setVisualVoicemail] = useState(true);
  const [isRecordingGreeting, setIsRecordingGreeting] = useState(false);

  // Call Forwarding State
  const [isLoadingForwarding, setIsLoadingForwarding] = useState(false);
  const [forwardingState, setForwardingState] = useState({
      always: { enabled: false, number: '' },
      busy: { enabled: true, number: '+91 98765 00000' },
      unanswered: { enabled: true, number: '+91 98765 00000' },
      unreachable: { enabled: true, number: '+91 98765 00000' }
  });
  const [editForwardingType, setEditForwardingType] = useState<keyof typeof forwardingState | null>(null);
  const [editForwardingNumber, setEditForwardingNumber] = useState('');

  // Keypad numbers
  const keys = [
    { num: '1', sub: '' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
    { num: '*', sub: '' },
    { num: '0', sub: '+' },
    { num: '#', sub: '' },
  ];

  // Call Timer
  useEffect(() => {
    let interval: any;
    if (isCalling) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (num: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(prev => prev + num);
      // Optional: Play sound here if dialpadSound is true
    }
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const startCall = (contact?: ContactModel) => {
    if (contact) {
      setActiveCallContact(contact);
    } else {
      // Find contact by number or create temp
      const found = MOCK_CONTACTS.find(c => c.phone.replace(/\s/g, '') === phoneNumber.replace(/\s/g, ''));
      setActiveCallContact(found || { 
          id: 'temp', 
          name: phoneNumber, 
          phone: phoneNumber, 
          avatar: 'https://via.placeholder.com/150' 
      });
    }
    setIsCalling(true);
  };

  const endCall = () => {
    setIsCalling(false);
    setActiveCallContact(null);
  };

  // Call Forwarding Handlers
  const handleOpenCallForwarding = () => {
      setSettingsView('CALL_FORWARDING');
      setIsLoadingForwarding(true);
      // Simulate network delay
      setTimeout(() => setIsLoadingForwarding(false), 1500);
  };

  const handleEditForwarding = (type: keyof typeof forwardingState) => {
      setEditForwardingType(type);
      setEditForwardingNumber(forwardingState[type].number);
  };

  const handleSaveForwarding = () => {
      if (editForwardingType) {
          setForwardingState(prev => ({
              ...prev,
              [editForwardingType]: {
                  enabled: true,
                  number: editForwardingNumber
              }
          }));
          setEditForwardingType(null);
      }
  };

  const handleTurnOffForwarding = () => {
      if (editForwardingType) {
          setForwardingState(prev => ({
              ...prev,
              [editForwardingType]: {
                  enabled: false,
                  number: ''
              }
          }));
          setEditForwardingType(null);
      }
  };

  const getForwardingLabel = (type: keyof typeof forwardingState) => {
      switch(type) {
          case 'always': return 'Always forward';
          case 'busy': return 'When busy';
          case 'unanswered': return 'When unanswered';
          case 'unreachable': return 'When unreachable';
      }
  };

  // Blocked Numbers Handlers
  const handleAddBlockedNumber = () => {
      if (newBlockedNumber.trim()) {
          setBlockedNumbers(prev => [...prev, {
              id: Date.now().toString(),
              number: newBlockedNumber,
              label: 'Custom Block'
          }]);
          setNewBlockedNumber('');
      }
  };

  const handleUnblockNumber = (id: string) => {
      setBlockedNumbers(prev => prev.filter(n => n.id !== id));
  };

  const toggleRingtonePreview = (name: string) => {
      if (previewRingtone === name) {
          setPreviewRingtone(null); // Stop
      } else {
          setPreviewRingtone(name); // Play
          // Simulate play duration
          setTimeout(() => {
              setPreviewRingtone(null);
          }, 3000);
      }
  };

  const handleBackNavigation = () => {
      if (settingsView === 'VIBRATION') {
          setSettingsView('RINGTONE');
      } else if (settingsView !== 'MAIN') {
          setSettingsView('MAIN');
      } else {
          setShowSettings(false);
      }
  };

  // Helper Toggle Component
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-pink-600' : 'bg-gray-600'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );

  // --- RENDER SETTINGS OVERLAY ---
  if (showSettings) {
      return (
          <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col font-sans animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900 sticky top-0 z-10">
                  <button 
                    onClick={handleBackNavigation} 
                    className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition"
                  >
                      <ArrowLeft size={24} className="text-white" />
                  </button>
                  <h2 className="font-bold text-lg text-white">
                      {settingsView === 'CALL_FORWARDING' ? 'Call Forwarding' : 
                       settingsView === 'VOICEMAIL' ? 'Voicemail' : 
                       settingsView === 'RINGTONE' ? 'Ringtone' : 
                       settingsView === 'VIBRATION' ? 'Vibration' : 
                       settingsView === 'BLOCKED' ? 'Blocked Numbers' : 'Call Settings'}
                  </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                   {settingsView === 'MAIN' && (
                       <>
                           {/* Features Section */}
                           <div>
                               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 px-1">Features</h3>
                               <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                   <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-pink-500/20 rounded-full text-pink-500"><Volume2 size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm">Dialpad Tones</h4>
                                               <p className="text-xs text-gray-500">Play sound when pressing keys</p>
                                           </div>
                                       </div>
                                       <Toggle checked={dialpadSound} onChange={setDialpadSound} />
                                   </div>
                                   <div className="flex items-center justify-between p-4">
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-blue-500/20 rounded-full text-blue-500"><Smartphone size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm">Vibrate on Touch</h4>
                                               <p className="text-xs text-gray-500">Haptic feedback for dialpad</p>
                                           </div>
                                       </div>
                                       <Toggle checked={vibrateOnTouch} onChange={setVibrateOnTouch} />
                                   </div>
                               </div>
                           </div>

                           {/* Assistive */}
                           <div>
                               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 px-1">Assistive</h3>
                               <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                   <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-blue-500/20 rounded-full text-blue-500"><Wifi size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm">Wi-Fi Calling</h4>
                                               <p className="text-xs text-gray-500">Make calls over Wi-Fi</p>
                                           </div>
                                       </div>
                                       <Toggle checked={wifiCalling} onChange={setWifiCalling} />
                                   </div>
                                   <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition">
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-green-500/20 rounded-full text-green-500"><MessageSquare size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm text-left">Quick Responses</h4>
                                               <p className="text-xs text-gray-500 text-left">Edit messages for declining calls</p>
                                           </div>
                                       </div>
                                       <ChevronRight size={16} className="text-gray-500" />
                                   </button>
                               </div>
                           </div>

                           {/* Blocking */}
                           <div>
                               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 px-1">Blocking & Spam</h3>
                               <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                    <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-red-500/20 rounded-full text-red-500"><Shield size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm">Block Unknown</h4>
                                               <p className="text-xs text-gray-500">Block calls from unidentified callers</p>
                                           </div>
                                       </div>
                                       <Toggle checked={blockUnknown} onChange={setBlockUnknown} />
                                   </div>
                                   <button 
                                      onClick={() => setSettingsView('BLOCKED')}
                                      className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition"
                                   >
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-orange-500/20 rounded-full text-orange-500"><Ban size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm text-left">Blocked Numbers</h4>
                                               <p className="text-xs text-gray-500 text-left">Manage blocked contacts</p>
                                           </div>
                                       </div>
                                       <ChevronRight size={16} className="text-gray-500" />
                                   </button>
                               </div>
                           </div>

                           {/* Advanced */}
                           <div>
                               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 px-1">Advanced</h3>
                               <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                   <button 
                                      onClick={handleOpenCallForwarding}
                                      className="w-full flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 transition"
                                   >
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-purple-500/20 rounded-full text-purple-500"><PhoneForwarded size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm text-left">Call Forwarding</h4>
                                               <p className="text-xs text-gray-500 text-left">Forward calls to another number</p>
                                           </div>
                                       </div>
                                       <ChevronRight size={16} className="text-gray-500" />
                                   </button>
                                   <button 
                                      onClick={() => setSettingsView('VOICEMAIL')}
                                      className="w-full flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 transition"
                                   >
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-teal-500/20 rounded-full text-teal-500"><Voicemail size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm text-left">Voicemail</h4>
                                               <p className="text-xs text-gray-500 text-left">Setup voicemail settings</p>
                                           </div>
                                       </div>
                                       <ChevronRight size={16} className="text-gray-500" />
                                   </button>
                                   <button 
                                      onClick={() => setSettingsView('RINGTONE')}
                                      className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition"
                                   >
                                       <div className="flex items-center gap-3">
                                           <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500"><Bell size={20} /></div>
                                           <div>
                                               <h4 className="font-bold text-white text-sm text-left">Ringtone</h4>
                                               <p className="text-xs text-gray-500 text-left">{selectedRingtone}</p>
                                           </div>
                                       </div>
                                       <ChevronRight size={16} className="text-gray-500" />
                                   </button>
                               </div>
                           </div>
                       </>
                   )}

                   {settingsView === 'CALL_FORWARDING' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                           {isLoadingForwarding ? (
                               <div className="flex flex-col items-center justify-center py-20">
                                   <Loader2 size={32} className="text-pink-500 animate-spin mb-4" />
                                   <p className="text-gray-400 font-medium">Reading settings...</p>
                               </div>
                           ) : (
                               <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                   {(['always', 'busy', 'unanswered', 'unreachable'] as const).map((type) => (
                                       <button 
                                           key={type}
                                           onClick={() => handleEditForwarding(type)}
                                           className="w-full flex items-center justify-between p-5 border-b border-slate-800 last:border-none hover:bg-slate-800 transition"
                                       >
                                           <div className="text-left">
                                               <h4 className={`font-bold text-sm mb-1 ${forwardingState[type].enabled ? 'text-white' : 'text-gray-400'}`}>
                                                   {getForwardingLabel(type)}
                                               </h4>
                                               <p className={`text-xs ${forwardingState[type].enabled ? 'text-pink-500 font-medium' : 'text-gray-500'}`}>
                                                   {forwardingState[type].enabled 
                                                       ? `Forwarding to ${forwardingState[type].number}` 
                                                       : 'Off'
                                                   }
                                               </p>
                                           </div>
                                       </button>
                                   ))}
                               </div>
                           )}
                       </div>
                   )}

                   {settingsView === 'BLOCKED' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-4">
                           {/* Add Number Input */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 p-2 flex gap-2">
                               <div className="relative flex-1">
                                   <input 
                                       type="tel"
                                       value={newBlockedNumber}
                                       onChange={(e) => setNewBlockedNumber(e.target.value)}
                                       placeholder="Add a number"
                                       className="w-full bg-slate-800 text-white rounded-lg pl-3 pr-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-500"
                                   />
                               </div>
                               <button 
                                   onClick={handleAddBlockedNumber}
                                   className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                               >
                                   <Plus size={20} />
                               </button>
                           </div>

                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-slate-800 flex justify-between">
                                    <span>Blocked Contacts</span>
                                    <span>{blockedNumbers.length}</span>
                                </h4>
                                {blockedNumbers.length > 0 ? (
                                    <div className="max-h-[500px] overflow-y-auto">
                                        {blockedNumbers.map((block) => (
                                            <div key={block.id} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-none hover:bg-slate-800/50 transition">
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">{block.number}</h4>
                                                    <p className="text-xs text-gray-500">{block.label}</p>
                                                </div>
                                                <button 
                                                    onClick={() => handleUnblockNumber(block.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition"
                                                    title="Unblock"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                        <Ban size={40} className="mb-3 opacity-30" />
                                        <p className="text-sm">No blocked numbers</p>
                                    </div>
                                )}
                           </div>
                           
                           <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 flex gap-3">
                                <Ban size={20} className="text-orange-400 shrink-0" />
                                <p className="text-xs text-orange-200">
                                    You will not receive calls or messages from blocked numbers.
                                </p>
                           </div>
                       </div>
                   )}

                   {settingsView === 'VOICEMAIL' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
                           {/* Visual Voicemail Toggle */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-teal-500/20 rounded-full text-teal-500"><Voicemail size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Visual Voicemail</h4>
                                            <p className="text-xs text-gray-500">View transcripts of voicemails</p>
                                        </div>
                                    </div>
                                    <Toggle checked={visualVoicemail} onChange={setVisualVoicemail} />
                                </div>
                           </div>

                           {/* Greeting Section */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden p-4">
                               <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Greeting</h4>
                               
                               <div className="flex gap-2 mb-4">
                                    <button 
                                       onClick={() => setVoicemailGreeting('DEFAULT')}
                                       className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${voicemailGreeting === 'DEFAULT' ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                    >
                                       Default
                                    </button>
                                    <button 
                                       onClick={() => setVoicemailGreeting('CUSTOM')}
                                       className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${voicemailGreeting === 'CUSTOM' ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-800 border-slate-700 text-gray-400'}`}
                                    >
                                       Custom
                                    </button>
                               </div>

                               {voicemailGreeting === 'CUSTOM' && (
                                   <div className="bg-black/40 rounded-xl p-4 flex flex-col items-center border border-slate-800/50">
                                       {isRecordingGreeting ? (
                                            <div className="flex flex-col items-center animate-pulse">
                                                <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-2">
                                                    <Mic size={32} />
                                                </div>
                                                <span className="text-red-400 text-xs font-bold">Recording...</span>
                                                <button onClick={() => setIsRecordingGreeting(false)} className="mt-4 w-12 h-12 flex items-center justify-center bg-red-600 rounded-full text-white shadow-lg shadow-red-900/40 hover:bg-red-500 transition">
                                                    <Square size={20} fill="currentColor" />
                                                </button>
                                            </div>
                                       ) : (
                                            <>
                                                <button onClick={() => setIsRecordingGreeting(true)} className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-white mb-2 hover:bg-slate-700 hover:scale-105 transition shadow-lg border border-slate-700">
                                                    <Mic size={28} />
                                                </button>
                                                <span className="text-gray-400 text-xs">Tap to record new greeting</span>
                                                <div className="flex items-center gap-2 mt-4">
                                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full text-xs font-bold text-gray-300 hover:text-white transition">
                                                        <Play size={12} fill="currentColor" /> Play Current
                                                    </button>
                                                </div>
                                            </>
                                       )}
                                   </div>
                               )}
                           </div>

                           {/* PIN Section */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Security PIN</h4>
                                    <button className="text-pink-500 text-xs font-bold hover:underline">Change</button>
                                </div>
                                <div className="flex items-center gap-2">
                                     {[1, 2, 3, 4].map((_, i) => (
                                         <div key={i} className="w-3 h-3 rounded-full bg-white/20"></div>
                                     ))}
                                </div>
                           </div>
                       </div>
                   )}

                   {settingsView === 'RINGTONE' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
                           
                           {/* Volume Slider */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-white text-sm">Ringtone Volume</h4>
                                    <span className="text-xs font-bold text-gray-500">{ringtoneVolume}%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Volume2 size={20} className="text-gray-400" />
                                    <input 
                                       type="range" 
                                       min="0" 
                                       max="100" 
                                       value={ringtoneVolume}
                                       onChange={(e) => setRingtoneVolume(Number(e.target.value))}
                                       className="w-full accent-pink-600 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                           </div>

                           {/* Ringtone List */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                               <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-slate-800">Phone Ringtones</h4>
                               <div className="max-h-[400px] overflow-y-auto">
                                   {RINGTONES.map((tone) => (
                                       <div 
                                           key={tone.id}
                                           onClick={() => setSelectedRingtone(tone.name)}
                                           className={`flex items-center justify-between p-4 border-b border-slate-800 last:border-none cursor-pointer hover:bg-slate-800 transition ${selectedRingtone === tone.name ? 'bg-slate-800' : ''}`}
                                       >
                                           <div className="flex items-center gap-3">
                                               <button 
                                                   onClick={(e) => { e.stopPropagation(); toggleRingtonePreview(tone.name); }}
                                                   className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${previewRingtone === tone.name ? 'bg-pink-600 text-white' : 'bg-slate-700 text-gray-400 hover:bg-white hover:text-black'}`}
                                               >
                                                   {previewRingtone === tone.name ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                               </button>
                                               <div>
                                                   <h4 className={`text-sm font-bold ${selectedRingtone === tone.name ? 'text-pink-500' : 'text-white'}`}>{tone.name}</h4>
                                                   <p className="text-xs text-gray-500">{tone.duration}</p>
                                               </div>
                                           </div>
                                           {selectedRingtone === tone.name && (
                                               <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                                                   <Check size={12} className="text-white" strokeWidth={3} />
                                               </div>
                                           )}
                                       </div>
                                   ))}
                               </div>
                               <button className="w-full p-4 text-center text-sm font-bold text-pink-500 hover:bg-slate-800 transition border-t border-slate-800">
                                   + Add from files
                               </button>
                           </div>

                           {/* Vibration */}
                           <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                <div 
                                    onClick={() => setSettingsView('VIBRATION')}
                                    className="flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <Smartphone size={20} className="text-blue-500" />
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Vibration Pattern</h4>
                                            <p className="text-xs text-gray-500">{selectedVibration}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-500" />
                                </div>
                           </div>
                       </div>
                   )}

                   {settingsView === 'VIBRATION' && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-4">
                            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                {VIBRATION_PATTERNS.map((vib) => (
                                    <div 
                                        key={vib.id}
                                        onClick={() => {
                                            setSelectedVibration(vib.name);
                                            // Haptic feedback simulation
                                            if (navigator.vibrate) {
                                                navigator.vibrate(vib.pattern);
                                            }
                                        }}
                                        className={`flex items-center justify-between p-4 border-b border-slate-800 last:border-none cursor-pointer hover:bg-slate-800 transition ${selectedVibration === vib.name ? 'bg-slate-800' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* We can use an icon here if needed, but simple list is standard for vibration settings */}
                                            <div>
                                                <h4 className={`text-sm font-bold ${selectedVibration === vib.name ? 'text-pink-500' : 'text-white'}`}>{vib.name}</h4>
                                            </div>
                                        </div>
                                        {selectedVibration === vib.name && (
                                            <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                                                <Check size={12} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-3">
                                <Smartphone size={20} className="text-blue-400 shrink-0" />
                                <p className="text-xs text-blue-200">
                                    Tap a pattern to feel the vibration. Vibration will play when your phone is in Ring or Vibrate mode.
                                </p>
                            </div>
                        </div>
                   )}
              </div>

              {/* Edit Forwarding Modal */}
              {editForwardingType && (
                  <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
                      <div className="bg-slate-900 rounded-2xl w-full max-w-xs p-6 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200">
                          <h3 className="text-lg font-bold text-white mb-4">{getForwardingLabel(editForwardingType)}</h3>
                          <div className="bg-slate-800 rounded-xl p-2 mb-6 border border-slate-700">
                              <span className="text-xs text-gray-500 font-bold px-2 block mb-1">NUMBER</span>
                              <input 
                                  type="tel" 
                                  value={editForwardingNumber}
                                  onChange={(e) => setEditForwardingNumber(e.target.value)}
                                  placeholder="Enter number"
                                  className="w-full bg-transparent text-white p-2 outline-none font-medium"
                                  autoFocus
                              />
                          </div>
                          <div className="flex justify-end gap-3">
                              <button 
                                  onClick={handleTurnOffForwarding}
                                  className="px-4 py-2 text-red-400 font-medium hover:bg-red-500/10 rounded-lg transition"
                              >
                                  Turn Off
                              </button>
                              <button 
                                  onClick={() => setEditForwardingType(null)}
                                  className="px-4 py-2 text-gray-400 font-medium hover:bg-gray-800 rounded-lg transition"
                              >
                                  Cancel
                              </button>
                              <button 
                                  onClick={handleSaveForwarding}
                                  className="px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition shadow-lg shadow-pink-900/30"
                              >
                                  Update
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      )
  }

  // --- RENDER CALL SCREEN ---
  if (isCalling && activeCallContact) {
      return (
          <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col font-sans">
               {/* Background Blur Image */}
               <div className="absolute inset-0 z-0 opacity-20">
                   <img src={activeCallContact.avatar} className="w-full h-full object-cover blur-xl" />
               </div>

               <div className="relative z-10 flex-1 flex flex-col items-center pt-20 pb-12 px-8">
                    <div className="mb-8 flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-2xl mb-6 overflow-hidden">
                            <img src={activeCallContact.avatar} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{activeCallContact.name}</h2>
                        <p className="text-gray-400 text-lg">{callDuration > 0 ? formatTime(callDuration) : 'Calling...'}</p>
                    </div>

                    <div className="flex-1 w-full flex items-end justify-center">
                        <div className="grid grid-cols-3 gap-x-8 gap-y-8 w-full max-w-sm">
                            <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center gap-2 group">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                                    {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
                                </div>
                                <span className="text-xs text-gray-300">Mute</span>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-white/10 text-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <GripHorizontal size={28} />
                                </div>
                                <span className="text-xs text-gray-300">Keypad</span>
                            </button>

                            <button onClick={() => setIsSpeaker(!isSpeaker)} className="flex flex-col items-center gap-2 group">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isSpeaker ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                                    <Volume2 size={28} />
                                </div>
                                <span className="text-xs text-gray-300">Speaker</span>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-white/10 text-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <Video size={28} />
                                </div>
                                <span className="text-xs text-gray-300">Video</span>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-white/10 text-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <Users size={28} />
                                </div>
                                <span className="text-xs text-gray-300">Add Call</span>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-white/10 text-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <MoreVertical size={28} />
                                </div>
                                <span className="text-xs text-gray-300">More</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 w-full flex justify-center">
                        <button 
                            onClick={endCall}
                            className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50 transition-transform hover:scale-105 active:scale-95"
                        >
                            <PhoneOff size={32} className="text-white" />
                        </button>
                    </div>
               </div>
          </div>
      )
  }

  // --- MAIN DIALER RENDER ---
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white pb-20 font-sans">
        
        {/* Header Tabs */}
        <div className="flex items-center justify-between p-2 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800">
             <div className="flex flex-1">
                 <button 
                    onClick={() => setActiveTab('KEYPAD')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'KEYPAD' ? 'border-pink-500 text-white' : 'border-transparent text-gray-500'}`}
                 >
                    Keypad
                 </button>
                 <button 
                    onClick={() => setActiveTab('RECENTS')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'RECENTS' ? 'border-pink-500 text-white' : 'border-transparent text-gray-500'}`}
                 >
                    Recents
                 </button>
                 <button 
                    onClick={() => setActiveTab('CONTACTS')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'CONTACTS' ? 'border-pink-500 text-white' : 'border-transparent text-gray-500'}`}
                 >
                    Contacts
                 </button>
             </div>
             <button 
                onClick={() => {
                    setSettingsView('MAIN');
                    setShowSettings(true);
                }}
                className="p-2 text-gray-400 hover:text-white"
             >
                 <MoreVertical size={20} />
             </button>
        </div>

        {/* --- KEYPAD TAB --- */}
        {activeTab === 'KEYPAD' && (
            <div className="flex-1 flex flex-col">
                {/* Number Display */}
                <div className="flex-1 flex flex-col justify-end items-center px-8 pb-8">
                    <span className="text-4xl font-bold tracking-widest text-white mb-2 h-12">
                        {phoneNumber}
                        <span className="animate-pulse text-pink-500">|</span>
                    </span>
                    {phoneNumber && (
                        <button 
                            onClick={() => {
                                // Add to contacts logic here
                            }}
                            className="text-pink-500 text-sm font-medium hover:underline"
                        >
                            Add to Contacts
                        </button>
                    )}
                </div>

                {/* Keypad Grid */}
                <div className="bg-slate-900/30 rounded-t-3xl pb-8 pt-6 px-8">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-xs mx-auto">
                        {keys.map((k) => (
                            <button 
                                key={k.num}
                                onClick={() => handleKeyPress(k.num)}
                                className="w-16 h-16 rounded-full bg-slate-800/80 hover:bg-slate-700 flex flex-col items-center justify-center transition-colors active:scale-95"
                            >
                                <span className="text-2xl font-medium text-white">{k.num}</span>
                                {k.sub && <span className="text-[10px] text-gray-500 font-bold">{k.sub}</span>}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-8 gap-12 max-w-xs mx-auto">
                        <div className="w-16 flex justify-center">
                            {/* Empty or Video Call button */}
                        </div>
                        
                        <button 
                            onClick={() => phoneNumber && startCall()}
                            disabled={!phoneNumber}
                            className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 hover:bg-green-500 transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100"
                        >
                            <Phone size={32} className="text-white fill-white" />
                        </button>

                        <div className="w-16 flex justify-center">
                             {phoneNumber && (
                                 <button 
                                    onClick={handleDelete}
                                    onContextMenu={(e) => { e.preventDefault(); setPhoneNumber(''); }}
                                    className="text-gray-400 hover:text-white transition-colors p-2"
                                 >
                                     <Delete size={28} />
                                 </button>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- RECENTS TAB --- */}
        {activeTab === 'RECENTS' && (
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
                     <div className="flex bg-slate-900 p-1 rounded-xl">
                         <button 
                            onClick={() => setRecentsFilter('ALL')}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${recentsFilter === 'ALL' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                         >
                             All Calls
                         </button>
                         <button 
                            onClick={() => setRecentsFilter('MISSED')}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${recentsFilter === 'MISSED' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                         >
                             Missed
                         </button>
                     </div>
                </div>

                {MOCK_RECENT_CALLS.filter(c => recentsFilter === 'ALL' || c.type === 'MISSED').map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-4 border-b border-slate-900 hover:bg-slate-900/50 transition cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img src={call.avatar} className="w-12 h-12 rounded-full object-cover" />
                                <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950 border border-slate-900 ${
                                    call.type === 'MISSED' ? 'text-red-500' : 
                                    call.type === 'INCOMING' ? 'text-green-500' : 'text-blue-500'
                                }`}>
                                    <Phone size={12} fill="currentColor" />
                                </div>
                            </div>
                            <div>
                                <h3 className={`font-bold text-sm ${call.type === 'MISSED' ? 'text-red-400' : 'text-white'}`}>{call.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{call.time}</span>
                                    {call.duration && (
                                        <>
                                            <span>•</span>
                                            <span>{call.duration}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-green-500 transition">
                             <Phone size={20} />
                        </button>
                    </div>
                ))}
                
                {MOCK_RECENT_CALLS.filter(c => recentsFilter === 'ALL' || c.type === 'MISSED').length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Clock size={40} className="mb-2 opacity-30" />
                        <p className="text-sm">No recent calls found</p>
                    </div>
                )}
            </div>
        )}

        {/* --- CONTACTS TAB --- */}
        {activeTab === 'CONTACTS' && (
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 sticky top-0 bg-slate-950 z-10 pb-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search contacts" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-1 focus:ring-pink-500 outline-none placeholder-gray-500 text-sm"
                        />
                    </div>
                </div>
                
                {/* Favorites Section */}
                <div className="mb-4">
                    <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Favorites</h3>
                    <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
                         {MOCK_CONTACTS.filter(c => c.isFavorite).map((contact) => (
                             <button key={contact.id} onClick={() => startCall(contact)} className="flex flex-col items-center min-w-[64px] group">
                                 <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-pink-600 mb-1">
                                     <img src={contact.avatar} className="w-full h-full rounded-full border-2 border-slate-950 object-cover" />
                                 </div>
                                 <span className="text-[10px] text-gray-300 font-medium truncate w-full text-center group-hover:text-white">{contact.name.split(' ')[0]}</span>
                             </button>
                         ))}
                         <button className="flex flex-col items-center min-w-[64px] group">
                                 <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 mb-1 group-hover:bg-slate-800 transition">
                                     <Star size={20} className="text-gray-400 group-hover:text-yellow-400 transition" />
                                 </div>
                                 <span className="text-[10px] text-gray-500 font-medium truncate w-full text-center">Add</span>
                         </button>
                    </div>
                </div>

                <div className="px-4 pb-2">
                    <button className="w-full flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl mb-2 hover:bg-slate-900 transition">
                         <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white">
                             <Users size={18} />
                         </div>
                         <div className="text-left">
                             <h3 className="font-bold text-white text-sm">Create New Contact</h3>
                         </div>
                    </button>
                </div>
                
                <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">All Contacts</h3>

                {MOCK_CONTACTS.map((contact) => (
                    <div 
                        key={contact.id} 
                        onClick={() => startCall(contact)}
                        className="flex items-center justify-between p-4 border-b border-slate-900 hover:bg-slate-900/50 transition cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-white text-sm flex items-center gap-1">
                                    {contact.name}
                                    {contact.isVerified && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
                                </h3>
                                <p className="text-xs text-gray-500">{contact.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-green-600/20 text-green-500 rounded-full hover:bg-green-600 hover:text-white transition">
                                <Phone size={18} />
                            </button>
                            <button className="p-2 bg-blue-600/20 text-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition">
                                <Video size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default Dialer;
