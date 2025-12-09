
import React, { useState } from 'react';
import { Smartphone, ArrowRight, ShieldCheck, Edit2, Play } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile.length !== 10) return;
        setLoading(true);
        // Simulate OTP sending
        setTimeout(() => {
            setLoading(false);
            setStep('OTP');
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate Verification
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 1500);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black p-8 relative overflow-hidden font-sans">
             {/* Background Effects */}
             <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

             <div className="z-10 w-full max-w-sm">
                 
                 {/* Logo Section with Fade/Zoom Animation */}
                 <div className="flex flex-col items-center justify-center mb-10 animate-in fade-in zoom-in duration-1000 slide-in-from-top-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-700 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-pink-500/30 rotate-6 mb-6 ring-4 ring-white/5 backdrop-blur-md relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Play size={40} className="text-white fill-white drop-shadow-md" />
                    </div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-tight drop-shadow-sm pb-2">
                        Divyanshi
                    </h1>
                    <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        Watch • Create • Earn
                    </p>
                 </div>
                 
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
                     <h2 className="text-2xl font-bold text-center text-white mb-2">
                        {step === 'MOBILE' ? 'Get Started' : 'Verify OTP'}
                     </h2>
                     <p className="text-gray-400 text-center mb-8 text-sm px-4 leading-relaxed">
                        {step === 'MOBILE' 
                            ? 'Login to start watching trending videos and earning rewards.' 
                            : `Enter the 4-digit code sent to +91 ${mobile}`
                        }
                     </p>

                     {step === 'MOBILE' && (
                        <>
                            {/* 1. Google Login (Primary) */}
                            <button 
                                onClick={onLogin}
                                className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-3 mb-6 hover:bg-gray-100 transition-all active:scale-95 group"
                            >
                                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Continue with Google</span>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
                                <span className="px-4 text-[10px] text-gray-500 tracking-wider font-bold uppercase">Or use mobile number</span>
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
                            </div>
                        </>
                     )}

                     {/* 2. Mobile Login (Secondary) */}
                     {step === 'MOBILE' ? (
                         <form onSubmit={handleSendOtp} className="space-y-4">
                             <div className="relative group">
                                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 border-r border-gray-700 pr-3 font-bold select-none group-focus-within:text-pink-500 transition-colors">
                                     +91
                                 </div>
                                 <input 
                                     type="tel" 
                                     value={mobile}
                                     onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                     placeholder="Enter Mobile Number" 
                                     className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-16 pr-4 py-4 text-lg text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder:text-gray-600 font-bold tracking-wide"
                                     required
                                 />
                             </div>
                             
                             <button 
                                 type="submit"
                                 disabled={loading || mobile.length !== 10}
                                 className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed hover:shadow-pink-600/30"
                             >
                                 {loading ? (
                                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                 ) : (
                                     <>
                                         <span>Get OTP</span>
                                         <ArrowRight size={20} />
                                     </>
                                 )}
                             </button>
                         </form>
                     ) : (
                         <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                             <div>
                                 <input 
                                     type="text" 
                                     maxLength={4}
                                     value={otp}
                                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                     placeholder="• • • •" 
                                     className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-5 text-center text-3xl tracking-[1em] text-white focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none transition-all placeholder:text-gray-700 font-bold"
                                     autoFocus
                                     required
                                 />
                             </div>
                             
                             <button 
                                 type="submit"
                                 disabled={loading || otp.length < 4}
                                 className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 hover:shadow-pink-600/30"
                             >
                                 {loading ? (
                                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                 ) : (
                                     <>
                                         <span>Verify & Login</span>
                                         <ShieldCheck size={20} />
                                     </>
                                 )}
                             </button>
                             
                             <button 
                                type="button" 
                                onClick={() => {
                                    setStep('MOBILE');
                                    setOtp('');
                                }}
                                className="w-full flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-white transition-colors py-2"
                             >
                                 <Edit2 size={12} />
                                 <span>Change Mobile Number</span>
                             </button>
                         </form>
                     )}
                 </div>
             </div>
             
             <div className="absolute bottom-6 text-center w-full px-8 animate-in fade-in duration-1000 delay-700">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2 font-bold">Secure Login by Divyanshi</p>
                <p className="text-xs text-gray-500">
                    By continuing, you agree to our <span className="text-gray-400 cursor-pointer hover:text-pink-500 transition-colors hover:underline">Terms</span> & <span className="text-gray-400 cursor-pointer hover:text-pink-500 transition-colors hover:underline">Privacy Policy</span>
                </p>
             </div>
        </div>
    )
}

export default Login;
