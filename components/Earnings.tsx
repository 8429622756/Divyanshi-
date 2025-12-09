
import React, { useState, useRef, useEffect } from 'react';
import { IndianRupee, Coins, CreditCard, Landmark, Smartphone, Globe, ArrowRight, Settings, TrendingUp, BarChart3, PieChart, FileText, Briefcase, ChevronRight, ShieldCheck, HelpCircle, X, Zap, Award, Target, ChevronLeft, Info, Download, ExternalLink, ChevronDown, Eye, Users, Heart, MessageCircle, Play, Share2, DollarSign, Sliders, Layout, Image, MousePointerClick, ShieldAlert, Ban, Filter, RotateCcw, Gift, Star, Tag, CheckCircle2, Plus, MoreVertical, Clock, AlertCircle, Upload, FileCheck, CheckCircle, Building, Search, Book, MessageSquare, GraduationCap, PlayCircle, BookOpen, Trophy, Lock, Calendar, Hash, MousePointer, Lightbulb, Calculator, Percent, Scale, Radio, Trash2, History, CalendarDays, Settings2, Check, Send, EyeOff, Wallet, MapPin, AlertTriangle } from 'lucide-react';
import { COIN_CONVERSION_RATE } from '../constants';

interface EarningsProps {
  balance: number;
}

const Earnings: React.FC<EarningsProps> = ({ balance }) => {
  const rupees = (balance / COIN_CONVERSION_RATE).toFixed(2);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  // Navigation States
  const [showMainSettings, setShowMainSettings] = useState(false);
  const [showProSettings, setShowProSettings] = useState(false);
  const [showFullAnalytics, setShowFullAnalytics] = useState(false);
  const [showAdRevenue, setShowAdRevenue] = useState(false);
  const [showVideoGifts, setShowVideoGifts] = useState(false);
  const [showLiveGifts, setShowLiveGifts] = useState(false);
  const [showBrandCollabs, setShowBrandCollabs] = useState(false);
  const [showPayoutSettings, setShowPayoutSettings] = useState(false);
  const [showManageMethods, setShowManageMethods] = useState(false);
  const [showTaxInfo, setShowTaxInfo] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showCreatorAcademy, setShowCreatorAcademy] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [showContentStrategy, setShowContentStrategy] = useState(false);
  const [showMonetizationCourse, setShowMonetizationCourse] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState<'OVERVIEW' | 'CONTENT' | 'AUDIENCE'>('OVERVIEW');
  
  // Earnings Settings State
  const [hideBalance, setHideBalance] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState<'INR' | 'COINS'>('INR');
  const [emailDailyReport, setEmailDailyReport] = useState(true);
  const [pushPayoutAlert, setPushPayoutAlert] = useState(true);

  // Ad Settings State
  const [adSettings, setAdSettings] = useState({
      overlayAds: true,
      postLoopAds: true,
      sponsoredStickers: false,
      sensitiveCategories: true,
      adFrequency: 'Medium'
  });

  // Video Gifts State
  const [videoGiftsEnabled, setVideoGiftsEnabled] = useState(true);

  // Live Gifts State
  const [liveGiftsEnabled, setLiveGiftsEnabled] = useState(true);

  // Brand Collabs State
  const [collabsEnabled, setCollabsEnabled] = useState(true);
  const [baseRate, setBaseRate] = useState('5,000');

  // Payout Settings State
  const [autoPayout, setAutoPayout] = useState(false);
  const [minPayout, setMinPayout] = useState(500);
  const [payoutMethods, setPayoutMethods] = useState([
    { id: 'pm1', type: 'BANK', name: 'HDFC Bank', detail: '**** 8890', isPrimary: true },
    { id: 'pm2', type: 'UPI', name: 'Google Pay', detail: 'priya@okhdfcbank', isPrimary: false },
  ]);
  const [showWithdrawHelp, setShowWithdrawHelp] = useState(false);
  
  // Support Chat State
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [supportMessageInput, setSupportMessageInput] = useState('');
  const [supportChatHistory, setSupportChatHistory] = useState([
      { id: 1, text: "Hi there! I'm your support assistant. How can I help you with your withdrawal today?", sender: 'system', time: '10:00 AM' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Add New Payout Method State
  const [showAddPayoutMethod, setShowAddPayoutMethod] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'UPI' | 'BANK'>('UPI');
  const [newMethodForm, setNewMethodForm] = useState({
      accountName: '',
      accountNumber: '',
      ifsc: '',
      upiId: ''
  });

  // Tax Info State
  const [taxStatus, setTaxStatus] = useState<'VERIFIED' | 'PENDING' | 'MISSING' | 'REJECTED'>('MISSING');
  const [taxForm, setTaxForm] = useState({
      legalName: '',
      panNumber: '',
      gstin: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
  });
  const [panFile, setPanFile] = useState<File | null>(null);

  // Invoices State
  const [emailInvoices, setEmailInvoices] = useState(true);

  // History State
  const [historyFilter, setHistoryFilter] = useState<'ALL' | 'ADS' | 'GIFTS' | 'COLLABS'>('ALL');
  const [historyDateFilter, setHistoryDateFilter] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHistorySettings, setShowHistorySettings] = useState(false);
  const [historySettings, setHistorySettings] = useState({
      showPending: true,
      compactView: false,
      exportFormat: 'PDF'
  });

  // Monetization Calculator State
  const [calcViews, setCalcViews] = useState(100000);
  const [calcNiche, setCalcNiche] = useState('entertainment');

  const calculateProjectedEarnings = () => {
      let rpm = 15; // Base RPM
      if (calcNiche === 'tech') rpm = 45;
      if (calcNiche === 'finance') rpm = 80;
      if (calcNiche === 'education') rpm = 35;
      if (calcNiche === 'lifestyle') rpm = 25;
      
      const earnings = (calcViews / 1000) * rpm;
      return earnings.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const handleSaveMethod = () => {
      if (newMethodType === 'UPI') {
          if (!newMethodForm.upiId) return; // Add better validation in real app
          const newMethod = {
              id: `pm${Date.now()}`,
              type: 'UPI',
              name: 'UPI ID',
              detail: newMethodForm.upiId,
              isPrimary: payoutMethods.length === 0
          };
          setPayoutMethods([...payoutMethods, newMethod]);
      } else {
          if (!newMethodForm.accountNumber || !newMethodForm.ifsc || !newMethodForm.accountName) return;
          const newMethod = {
              id: `pm${Date.now()}`,
              type: 'BANK',
              name: 'Bank Account',
              detail: `**** ${newMethodForm.accountNumber.slice(-4)}`,
              isPrimary: payoutMethods.length === 0
          };
          setPayoutMethods([...payoutMethods, newMethod]);
      }
      setShowAddPayoutMethod(false);
      setNewMethodForm({ accountName: '', accountNumber: '', ifsc: '', upiId: '' });
  };

  const handleSetPrimaryMethod = (id: string) => {
    setPayoutMethods(prev => prev.map(m => ({
      ...m,
      isPrimary: m.id === id
    })));
  };

  const handleDeleteMethod = (id: string) => {
      setPayoutMethods(prev => prev.filter(m => m.id !== id));
  };

  const handleSendSupportMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(!supportMessageInput.trim()) return;
      
      const newMsg = { id: Date.now(), text: supportMessageInput, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setSupportChatHistory(prev => [...prev, newMsg]);
      setSupportMessageInput('');

      // Simulate system response
      setTimeout(() => {
          setSupportChatHistory(prev => [...prev, {
              id: Date.now() + 1,
              text: "Thanks for reaching out. A support agent will review your query and get back to you shortly.",
              sender: 'system',
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }]);
      }, 1500);
  };

  const handleTaxSubmit = () => {
      if (!taxForm.legalName || !taxForm.panNumber || !taxForm.address) return;
      
      setTaxStatus('PENDING');
      // Simulate verification process
      setTimeout(() => {
          // Keep as pending for demo, or could switch to VERIFIED to show success
      }, 2000);
  };

  const handlePanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setPanFile(e.target.files[0]);
      }
  };

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [supportChatHistory, showSupportChat]);

  const HISTORY_ITEMS = [
      { id: 1, type: 'ADS', title: 'Ad Revenue - Oct 25', date: 'Today, 10:30 AM', isoDate: '2023-10-25', amount: 450.50, status: 'PENDING' },
      { id: 2, type: 'GIFTS', title: 'Gift from @rahul', date: 'Yesterday, 8:15 PM', isoDate: '2023-10-24', amount: 100, status: 'CLEARED' },
      { id: 3, type: 'GIFTS', title: 'Gift from @sneha', date: 'Yesterday, 8:10 PM', isoDate: '2023-10-24', amount: 50, status: 'CLEARED' },
      { id: 4, type: 'COLLABS', title: 'Zara Campaign Milestone', date: 'Oct 24, 2023', isoDate: '2023-10-24', amount: 7500, status: 'CLEARED' },
      { id: 5, type: 'ADS', title: 'Ad Revenue - Oct 24', date: 'Oct 24, 2023', isoDate: '2023-10-24', amount: 320.00, status: 'CLEARED' },
      { id: 6, type: 'GIFTS', title: 'Live Stream Gifts', date: 'Oct 23, 2023', isoDate: '2023-10-23', amount: 1200, status: 'CLEARED' },
      { id: 7, type: 'ADS', title: 'Ad Revenue - Oct 23', date: 'Oct 23, 2023', isoDate: '2023-10-23', amount: 290.50, status: 'CLEARED' },
  ];

  const INVOICES = [
      { id: 'inv1', month: 'October 2023', date: 'Nov 01, 2023', amount: 14250, status: 'GENERATED' },
      { id: 'inv2', month: 'September 2023', date: 'Oct 01, 2023', amount: 12800, status: 'GENERATED' },
      { id: 'inv3', month: 'August 2023', date: 'Sep 01, 2023', amount: 15600, status: 'GENERATED' },
      { id: 'inv4', month: 'July 2023', date: 'Aug 01, 2023', amount: 11200, status: 'GENERATED' },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-pink-600' : 'bg-gray-600'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );

  const primaryMethod = payoutMethods.find(m => m.isPrimary);

  // --- Add Payout Method View ---
  if (showAddPayoutMethod) {
      return (
          <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300">
               {/* Header */}
               <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <button onClick={() => setShowAddPayoutMethod(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h2 className="text-xl font-bold text-white">Add Payout Method</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                     {/* Method Type Selector */}
                     <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                         <button 
                            onClick={() => setNewMethodType('UPI')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${newMethodType === 'UPI' ? 'bg-pink-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                         >
                             <Smartphone size={16} /> UPI ID
                         </button>
                         <button 
                            onClick={() => setNewMethodType('BANK')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${newMethodType === 'BANK' ? 'bg-pink-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                         >
                             <Landmark size={16} /> Bank Transfer
                         </button>
                     </div>

                     {/* Forms */}
                     {newMethodType === 'UPI' ? (
                         <div className="space-y-4 animate-in fade-in duration-300">
                             <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">UPI ID / VPA</label>
                                 <input 
                                    type="text" 
                                    value={newMethodForm.upiId}
                                    onChange={(e) => setNewMethodForm({...newMethodForm, upiId: e.target.value})}
                                    placeholder="e.g. mobile@upi"
                                    className="w-full bg-slate-800 text-white border-b border-slate-700 py-2 focus:border-pink-500 outline-none transition-colors"
                                 />
                                 <p className="text-[10px] text-gray-500 mt-2">
                                     Supports Google Pay, PhonePe, Paytm, and BHIM.
                                 </p>
                             </div>
                         </div>
                     ) : (
                         <div className="space-y-4 animate-in fade-in duration-300">
                             <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4">
                                 <div>
                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Account Holder Name</label>
                                     <input 
                                        type="text" 
                                        value={newMethodForm.accountName}
                                        onChange={(e) => setNewMethodForm({...newMethodForm, accountName: e.target.value})}
                                        placeholder="Name as per bank records"
                                        className="w-full bg-slate-800 text-white border-b border-slate-700 py-2 focus:border-pink-500 outline-none transition-colors"
                                     />
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Account Number</label>
                                     <input 
                                        type="text" 
                                        value={newMethodForm.accountNumber}
                                        onChange={(e) => setNewMethodForm({...newMethodForm, accountNumber: e.target.value.replace(/\D/g, '')})}
                                        placeholder="Enter account number"
                                        className="w-full bg-slate-800 text-white border-b border-slate-700 py-2 focus:border-pink-500 outline-none transition-colors"
                                     />
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">IFSC Code</label>
                                     <input 
                                        type="text" 
                                        value={newMethodForm.ifsc}
                                        onChange={(e) => setNewMethodForm({...newMethodForm, ifsc: e.target.value.toUpperCase()})}
                                        placeholder="e.g. HDFC0001234"
                                        maxLength={11}
                                        className="w-full bg-slate-800 text-white border-b border-slate-700 py-2 focus:border-pink-500 outline-none transition-colors uppercase"
                                     />
                                 </div>
                             </div>
                         </div>
                     )}

                     {/* Security Note */}
                     <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                        <ShieldCheck size={20} className="text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-blue-200">Secure Information</h4>
                            <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                                Your payment details are encrypted and stored securely. We perform a ₹1 test transaction to verify the account.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSaveMethod}
                        disabled={newMethodType === 'UPI' ? !newMethodForm.upiId : (!newMethodForm.accountNumber || !newMethodForm.ifsc || !newMethodForm.accountName)}
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-pink-900/20 active:scale-95 transition disabled:opacity-50 disabled:scale-100"
                    >
                        Verify & Save
                    </button>
                </div>
          </div>
      );
  }

  // --- Manage Methods View (Settings) ---
  if (showManageMethods) {
    return (
        <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300">
             <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <button onClick={() => setShowManageMethods(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                    <ChevronLeft size={24} className="text-white" />
                </button>
                <h2 className="text-xl font-bold text-white">Manage Payout Methods</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 <div className="space-y-3">
                    {payoutMethods.map((method) => (
                        <div key={method.id} className={`bg-slate-900 rounded-xl p-4 border flex justify-between items-center group ${method.isPrimary ? 'border-pink-600/50 bg-pink-900/10' : 'border-slate-800'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${method.type === 'BANK' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {method.type === 'BANK' ? <Landmark size={20} /> : <Smartphone size={20} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-white text-sm">{method.name}</h4>
                                        {method.isPrimary && <span className="bg-pink-600 text-[10px] px-1.5 py-0.5 rounded text-white font-bold flex items-center gap-1"><CheckCircle size={8}/> Primary</span>}
                                    </div>
                                    <p className="text-xs text-gray-500">{method.detail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {!method.isPrimary && (
                                    <button 
                                        onClick={() => handleSetPrimaryMethod(method.id)}
                                        className="p-2 text-gray-500 hover:text-pink-500 transition rounded-full hover:bg-pink-500/10"
                                        title="Set as Primary"
                                    >
                                        <Star size={18} />
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleDeleteMethod(method.id)}
                                    className="text-gray-500 hover:text-red-500 transition p-2 hover:bg-red-500/10 rounded-full"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={() => setShowAddPayoutMethod(true)}
                        className="w-full py-3 border-2 border-dashed border-slate-800 rounded-xl text-gray-400 font-bold text-sm hover:border-slate-600 hover:text-white transition flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Add New Method
                    </button>
                </div>
                
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white text-sm mb-2">Important Note</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Changes to your payout methods may take up to 24 hours to verify. Always ensure your primary method is up to date to avoid payout delays.
                    </p>
                </div>
            </div>
        </div>
    )
  }

  // --- Main Earnings Settings View ---
  if (showMainSettings) {
      return (
          <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300">
               {/* Header */}
               <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <button onClick={() => setShowMainSettings(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h2 className="text-xl font-bold text-white">Earnings Settings</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                    {/* Payment Management Section */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Payment Management</h4>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-white font-bold text-sm block">Active Payout Method</span>
                                    <span className="text-xs text-gray-400">
                                        {primaryMethod ? `${primaryMethod.name} (${primaryMethod.detail})` : 'No method selected'}
                                    </span>
                                </div>
                                <div className={`p-2 rounded-full ${primaryMethod ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {primaryMethod ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowManageMethods(true)} 
                                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold text-white transition flex items-center justify-center gap-2"
                            >
                                <Wallet size={16} /> Manage Methods
                            </button>
                        </div>
                    </div>

                    {/* Privacy Section */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Privacy & Display</h4>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                             <div>
                                 <span className="text-white font-medium block">Hide Balance</span>
                                 <span className="text-xs text-gray-500">Blur sensitive amounts on dashboard</span>
                             </div>
                             <Toggle checked={hideBalance} onChange={setHideBalance} />
                        </div>
                        <div className="flex items-center justify-between p-4">
                             <div>
                                 <span className="text-white font-medium block">Primary Currency</span>
                                 <span className="text-xs text-gray-500">Show {displayCurrency === 'INR' ? 'Rupees' : 'Coins'} first</span>
                             </div>
                             <div className="flex bg-slate-800 p-1 rounded-lg">
                                 <button 
                                    onClick={() => setDisplayCurrency('INR')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${displayCurrency === 'INR' ? 'bg-white text-black' : 'text-gray-400'}`}
                                 >
                                    ₹ INR
                                 </button>
                                 <button 
                                    onClick={() => setDisplayCurrency('COINS')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${displayCurrency === 'COINS' ? 'bg-white text-black' : 'text-gray-400'}`}
                                 >
                                    Coins
                                 </button>
                             </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Notifications</h4>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                             <div>
                                 <span className="text-white font-medium block">Daily Earning Report</span>
                                 <span className="text-xs text-gray-500">Receive daily summary via email</span>
                             </div>
                             <Toggle checked={emailDailyReport} onChange={setEmailDailyReport} />
                        </div>
                         <div className="flex items-center justify-between p-4">
                             <div>
                                 <span className="text-white font-medium block">Payout Alerts</span>
                                 <span className="text-xs text-gray-500">Instant push notification on payout</span>
                             </div>
                             <Toggle checked={pushPayoutAlert} onChange={setPushPayoutAlert} />
                        </div>
                    </div>

                    {/* Quick Access Section */}
                     <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Quick Access</h4>
                        </div>
                        <button onClick={() => setShowTaxInfo(true)} className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Update Tax Information</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                        <button onClick={() => setShowInvoices(true)} className="w-full flex items-center justify-between p-4 border-t border-slate-800 hover:bg-slate-800 transition">
                            <span className="text-white font-medium">Invoices & Statements</span>
                            <ChevronRight size={16} className="text-gray-500" />
                        </button>
                    </div>
                </div>
          </div>
      )
  }

  // --- Invoices View ---
  if (showInvoices) {
    return (
        <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300">
             <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <button onClick={() => setShowInvoices(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                    <ChevronLeft size={24} className="text-white" />
                </button>
                <h2 className="text-xl font-bold text-white">Invoices</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {INVOICES.map(inv => (
                    <div key={inv.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">{inv.month}</p>
                            <p className="text-xs text-gray-500">{inv.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                             <span className="font-bold">₹{inv.amount}</span>
                             <Download size={16} className="text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }

  // --- History View ---
  if (showHistory) {
      return (
          <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300 relative">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                      <button onClick={() => setShowHistory(false)} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                          <ChevronLeft size={24} className="text-white" />
                      </button>
                      <h2 className="text-xl font-bold text-white">History</h2>
                  </div>
                  <div className="flex items-center gap-2">
                      <button 
                          onClick={() => setShowCalendar(!showCalendar)}
                          className={`p-2 rounded-full transition ${showCalendar ? 'bg-pink-600 text-white' : 'hover:bg-gray-800 text-gray-400'}`}
                      >
                          <Calendar size={20} />
                      </button>
                      <button 
                          onClick={() => setShowHistorySettings(!showHistorySettings)}
                          className={`p-2 rounded-full transition ${showHistorySettings ? 'bg-pink-600 text-white' : 'hover:bg-gray-800 text-gray-400'}`}
                      >
                          <Settings2 size={20} />
                      </button>
                  </div>
              </div>

              {/* Calendar Filter Input */}
              {showCalendar && (
                  <div className="p-4 bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Filter by Date</label>
                      <input 
                          type="date" 
                          value={historyDateFilter}
                          onChange={(e) => setHistoryDateFilter(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                      />
                  </div>
              )}

              {/* History Settings Overlay */}
              {showHistorySettings && (
                   <div className="absolute top-16 right-4 z-30 w-64 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-4 animate-in zoom-in-95 origin-top-right">
                       <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                           <Settings2 size={16} /> View Settings
                       </h3>
                       
                       <div className="space-y-4">
                           <div className="flex items-center justify-between">
                               <span className="text-xs text-gray-300">Show Pending</span>
                               <Toggle 
                                  checked={historySettings.showPending} 
                                  onChange={(val) => setHistorySettings({...historySettings, showPending: val})} 
                               />
                           </div>
                           <div className="flex items-center justify-between">
                               <span className="text-xs text-gray-300">Compact View</span>
                               <Toggle 
                                  checked={historySettings.compactView} 
                                  onChange={(val) => setHistorySettings({...historySettings, compactView: val})} 
                               />
                           </div>
                           
                           <div className="pt-2 border-t border-slate-700">
                               <span className="text-xs text-gray-500 font-bold block mb-2">EXPORT FORMAT</span>
                               <div className="flex bg-slate-900 rounded-lg p-1">
                                   {['PDF', 'CSV'].map(fmt => (
                                       <button
                                          key={fmt}
                                          onClick={() => setHistorySettings({...historySettings, exportFormat: fmt})}
                                          className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition ${historySettings.exportFormat === fmt ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                       >
                                           {fmt}
                                       </button>
                                   ))}
                               </div>
                           </div>
                       </div>
                   </div>
              )}

              {/* Filters */}
              <div className="p-4 overflow-x-auto no-scrollbar">
                  <div className="flex gap-2">
                      {['ALL', 'ADS', 'GIFTS', 'COLLABS'].map(filter => (
                          <button
                              key={filter}
                              onClick={() => setHistoryFilter(filter as any)}
                              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition ${historyFilter === filter ? 'bg-white border-white text-black' : 'bg-transparent border-slate-700 text-gray-400'}`}
                          >
                              {filter}
                          </button>
                      ))}
                  </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
                  {HISTORY_ITEMS
                      .filter(item => {
                          if (historyFilter !== 'ALL' && item.type !== historyFilter) return false;
                          if (historyDateFilter && item.isoDate !== historyDateFilter) return false;
                          if (!historySettings.showPending && item.status === 'PENDING') return false;
                          return true;
                      })
                      .map(item => (
                          <div key={item.id} className={`bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center transition hover:bg-slate-800/80 ${historySettings.compactView ? 'p-3' : 'p-4'}`}>
                              <div className="flex items-center gap-3">
                                  <div className={`rounded-full flex items-center justify-center ${historySettings.compactView ? 'w-8 h-8' : 'w-10 h-10'} ${item.type === 'ADS' ? 'bg-blue-500/20 text-blue-500' : item.type === 'GIFTS' ? 'bg-pink-500/20 text-pink-500' : 'bg-purple-500/20 text-purple-500'}`}>
                                      {item.type === 'ADS' ? <Target size={historySettings.compactView ? 14 : 18} /> : item.type === 'GIFTS' ? <Gift size={historySettings.compactView ? 14 : 18} /> : <Briefcase size={historySettings.compactView ? 14 : 18} />}
                                  </div>
                                  <div>
                                      <h4 className={`font-bold text-white ${historySettings.compactView ? 'text-xs' : 'text-sm'}`}>{item.title}</h4>
                                      <div className="flex items-center gap-2">
                                          <span className="text-[10px] text-gray-500">{item.date}</span>
                                          {item.status === 'PENDING' && <span className="text-[8px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded font-bold">PENDING</span>}
                                      </div>
                                  </div>
                              </div>
                              <span className={`font-bold text-green-500 ${historySettings.compactView ? 'text-xs' : 'text-sm'}`}>+₹{item.amount}</span>
                          </div>
                      ))
                  }
                  
                  {/* Download Report Button at bottom */}
                  <button className="w-full py-3 mt-4 border border-dashed border-slate-700 rounded-xl text-gray-400 font-bold text-sm hover:border-white hover:text-white transition flex items-center justify-center gap-2">
                      <Download size={16} /> Download Statement ({historySettings.exportFormat})
                  </button>
              </div>
          </div>
      )
  }

  // --- Main Dashboard ---
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans overflow-y-auto pb-20">
         {/* Header */}
         <div className="p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
             <div className="flex items-center gap-2">
                 <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500">
                     <Coins size={20} />
                 </div>
                 <h1 className="text-xl font-bold">Earnings</h1>
             </div>
             <button onClick={() => setShowMainSettings(true)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                 <Settings size={20} />
             </button>
         </div>

         <div className="p-4 space-y-6">
             {/* Balance Card */}
             <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-6 shadow-xl shadow-pink-900/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                 
                 <div className="relative z-10">
                     <p className="text-pink-100 text-sm font-medium mb-1">Total Balance</p>
                     <h2 className="text-4xl font-bold text-white mb-2">
                         {hideBalance ? '••••••' : (displayCurrency === 'INR' ? `₹${rupees}` : balance.toLocaleString())}
                     </h2>
                     <p className="text-pink-200 text-xs mb-6">
                         {displayCurrency === 'INR' ? `${balance.toLocaleString()} Coins` : `₹${rupees}`}
                     </p>

                     <div className="flex gap-3">
                         <button onClick={() => setShowManageMethods(true)} className="flex-1 bg-white text-pink-600 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition shadow-lg">
                             Withdraw
                         </button>
                         <button onClick={() => setShowHistory(true)} className="flex-1 bg-pink-800/50 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-pink-800/70 transition backdrop-blur-sm">
                             History
                         </button>
                     </div>
                 </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-3">
                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <div className="flex items-center gap-2 mb-2 text-gray-400">
                         <TrendingUp size={16} />
                         <span className="text-xs font-bold uppercase">Today</span>
                     </div>
                     <p className="text-xl font-bold text-white">+₹450</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <div className="flex items-center gap-2 mb-2 text-gray-400">
                         <BarChart3 size={16} />
                         <span className="text-xs font-bold uppercase">This Month</span>
                     </div>
                     <p className="text-xl font-bold text-white">+₹12,450</p>
                 </div>
             </div>

             {/* Recent Activity */}
             <div>
                 <div className="flex justify-between items-center mb-3 px-1">
                     <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Recent Activity</h3>
                     <button onClick={() => setShowHistory(true)} className="text-pink-500 text-xs font-bold">See All</button>
                 </div>
                 <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                     {HISTORY_ITEMS.slice(0, 5).map((item) => (
                         <div key={item.id} className="p-4 border-b border-slate-800 last:border-none flex justify-between items-center hover:bg-slate-800/50 transition">
                             <div className="flex items-center gap-3">
                                 <div className={`p-2 rounded-full ${item.type === 'ADS' ? 'bg-blue-500/20 text-blue-500' : item.type === 'GIFTS' ? 'bg-pink-500/20 text-pink-500' : 'bg-purple-500/20 text-purple-500'}`}>
                                     {item.type === 'ADS' ? <Target size={16} /> : item.type === 'GIFTS' ? <Gift size={16} /> : <Briefcase size={16} />}
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                     <p className="text-xs text-gray-500">{item.date}</p>
                                 </div>
                             </div>
                             <span className="font-bold text-green-500 text-sm">+₹{item.amount}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
    </div>
  );
};

export default Earnings;
