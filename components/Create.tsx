
import React, { useState, useRef, useEffect } from 'react';
import { generateViralScript, generateVideoIdeas } from '../services/geminiService';
import { Sparkles, Video, Wand2, Loader2, Copy, Check, Radio, Camera, Settings, Zap, RotateCcw, Clock, Image as ImageIcon, Sun, X, Mic, Music2, ChevronRight, Grid, Monitor, ZapOff, Layers, Gauge, Upload, Trash2, Send, Globe, Lock, MessageCircle, Download, Users, ChevronLeft, FileVideo } from 'lucide-react';
import LiveRoom from './LiveRoom';

interface CreateProps {
    onUpdateBalance?: (amount: number) => void;
}

const Create: React.FC<CreateProps> = ({ onUpdateBalance }) => {
  const [mode, setMode] = useState<'STUDIO' | 'CAMERA' | 'LIVE' | 'UPLOAD_PREVIEW'>('STUDIO');
  
  // Studio State
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [uploadSettings, setUploadSettings] = useState({
      privacy: 'Public',
      allowComments: true,
      allowDuet: true,
      saveToDevice: false
  });

  // Camera State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState<15 | 60 | 180>(15);
  const [timer, setTimer] = useState<0 | 3 | 10>(0);
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isRetouch, setIsRetouch] = useState(false);
  const [isGreenScreen, setIsGreenScreen] = useState(false);
  const [cameraType, setCameraType] = useState<'user' | 'environment'>('user');

  // New Camera Features State
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState<'NONE' | 'FILTERS' | 'SPEED'>('NONE');
  const [cameraGrid, setCameraGrid] = useState(false);
  const [cameraStabilization, setCameraStabilization] = useState(false);
  const [cameraQuality, setCameraQuality] = useState('1080p');
  const [selectedFilter, setSelectedFilter] = useState('Normal');
  const [recordingSpeed, setRecordingSpeed] = useState(1);
  const [mirrorFrontCamera, setMirrorFrontCamera] = useState(true);

  const FILTERS = [
      { name: 'Normal', class: '' },
      { name: 'Vivid', class: 'contrast-125 saturate-150' },
      { name: 'Warm', class: 'sepia-[0.3] contrast-110' },
      { name: 'Cool', class: 'hue-rotate-15 contrast-110' },
      { name: 'B&W', class: 'grayscale' },
      { name: 'Vintage', class: 'sepia contrast-125 brightness-90' },
      { name: 'Cyber', class: 'hue-rotate-180 contrast-125' },
  ];

  // AI Handlers
  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setScript('');
    const result = await generateViralScript(topic);
    setScript(result);
    setLoading(false);
  };

  const handleGetIdeas = async () => {
    setLoading(true);
    const result = await generateVideoIdeas();
    setIdeas(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Upload Handlers
  const handleUploadClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setIsUploading(true);
          setUploadProgress(0);
          
          // Simulate upload progress
          const interval = setInterval(() => {
              setUploadProgress(prev => {
                  if (prev >= 100) {
                      clearInterval(interval);
                      // Completed
                      setTimeout(() => {
                          setIsUploading(false);
                          setUploadedFile(file);
                          setPreviewUrl(URL.createObjectURL(file));
                          setMode('UPLOAD_PREVIEW');
                          setUploadProgress(0);
                      }, 500);
                      return 100;
                  }
                  return prev + 10;
              });
          }, 150);
      }
  };

  const handleDiscardPost = () => {
      setUploadedFile(null);
      setPreviewUrl(null);
      setCaption('');
      setMode('STUDIO');
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePostVideo = () => {
      // Simulate posting
      alert("Video Posted Successfully! 🚀");
      handleDiscardPost();
  };

  // Camera Handlers
  const startCamera = async () => {
      setMode('CAMERA');
      setCameraActive(true);
      setShowCameraSettings(false);
      setActiveSidePanel('NONE');
  };

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (mode === 'CAMERA' && videoRef.current) {
        const initCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { 
                        facingMode: cameraType,
                        width: { ideal: cameraQuality === '4K' ? 3840 : cameraQuality === '1080p' ? 1920 : 1280 }
                    },
                    audio: true
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera Access Error:", err);
            }
        };
        initCamera();
    }

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [mode, cameraType, cameraQuality]);

  const toggleRecording = () => {
      if (recording) {
          setRecording(false);
          // Stop recording logic here
      } else {
          // Timer logic
          if (timer > 0) {
              let count = timer;
              // Visual countdown could go here
              setTimeout(() => setRecording(true), count * 1000);
          } else {
              setRecording(true);
          }
      }
  };

  const closeCamera = () => {
      setMode('STUDIO');
      setCameraActive(false);
  };

  const getFilterClass = () => {
      return FILTERS.find(f => f.name === selectedFilter)?.class || '';
  };

  // Helper for Toggle Switch
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-pink-600' : 'bg-gray-600'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );

  // --- RENDER UPLOAD PREVIEW INTERFACE ---
  if (mode === 'UPLOAD_PREVIEW') {
      return (
          <div className="flex flex-col h-full bg-slate-950 text-white font-sans animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                      <button onClick={handleDiscardPost} className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition">
                          <ChevronLeft size={24} className="text-white" />
                      </button>
                      <h2 className="text-xl font-bold text-white">New Post</h2>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Content Preview */}
                  <div className="flex gap-4">
                      <div className="w-1/3 aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg border border-slate-800 relative group">
                          {previewUrl && (
                              <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                          <button className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition">
                              <Trash2 size={16} onClick={handleDiscardPost} />
                          </button>
                      </div>
                      <div className="flex-1">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Caption</label>
                          <textarea 
                              value={caption}
                              onChange={(e) => setCaption(e.target.value)}
                              placeholder="Write a caption... #hashtags"
                              className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none transition-colors text-sm"
                          ></textarea>
                      </div>
                  </div>

                  {/* Settings */}
                  <div className="space-y-4">
                      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                          <div className="p-4 border-b border-slate-800">
                              <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                  <Globe size={16} className="text-blue-400" /> Who can watch?
                              </h4>
                              <div className="flex gap-2">
                                  {['Public', 'Friends', 'Private'].map((opt) => (
                                      <button 
                                          key={opt}
                                          onClick={() => setUploadSettings({...uploadSettings, privacy: opt})}
                                          className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${uploadSettings.privacy === opt ? 'bg-white text-black border-white' : 'bg-slate-800 text-gray-400 border-slate-700'}`}
                                      >
                                          {opt}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          <div className="p-4 flex items-center justify-between border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                  <MessageCircle size={18} className="text-gray-400" />
                                  <span className="text-sm font-medium">Allow Comments</span>
                              </div>
                              <Toggle checked={uploadSettings.allowComments} onChange={(v) => setUploadSettings({...uploadSettings, allowComments: v})} />
                          </div>

                          <div className="p-4 flex items-center justify-between border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                  <Users size={18} className="text-gray-400" />
                                  <span className="text-sm font-medium">Allow Duet/Stitch</span>
                              </div>
                              <Toggle checked={uploadSettings.allowDuet} onChange={(v) => setUploadSettings({...uploadSettings, allowDuet: v})} />
                          </div>

                          <div className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <Download size={18} className="text-gray-400" />
                                  <span className="text-sm font-medium">Save to Device</span>
                              </div>
                              <Toggle checked={uploadSettings.saveToDevice} onChange={(v) => setUploadSettings({...uploadSettings, saveToDevice: v})} />
                          </div>
                      </div>
                  </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-gray-800 bg-slate-900/80 backdrop-blur-md flex gap-3">
                  <button 
                      onClick={handleDiscardPost}
                      className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-gray-300 transition"
                  >
                      Drafts
                  </button>
                  <button 
                      onClick={handlePostVideo}
                      className="flex-[2] py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-pink-900/30 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                      <Send size={18} /> Post
                  </button>
              </div>
          </div>
      );
  }

  // --- RENDER CAMERA INTERFACE ---
  if (mode === 'CAMERA') {
      return (
          <div className="fixed inset-0 z-50 bg-black text-white flex flex-col font-sans">
              {/* Camera Feed */}
              <div className="absolute inset-0 z-0 bg-gray-900">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover transform transition-all duration-300 ${cameraType === 'user' && mirrorFrontCamera ? 'scale-x-[-1]' : ''} ${isRetouch ? 'brightness-110 contrast-90 saturate-110 blur-[0.5px]' : ''} ${getFilterClass()}`}
                  />
                  {/* Fallback Image if camera fails or waiting */}
                  {!videoRef.current?.srcObject && (
                      <div className="absolute inset-0 flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80" className={`w-full h-full object-cover opacity-60 ${getFilterClass()}`} />
                          <p className="absolute text-sm text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Camera Preview</p>
                      </div>
                  )}

                  {/* Green Screen Overlay Simulation */}
                  {isGreenScreen && (
                      <div className="absolute inset-0 pointer-events-none opacity-30 bg-green-500 mix-blend-overlay"></div>
                  )}

                  {/* Grid Lines Overlay */}
                  {cameraGrid && (
                      <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3">
                          <div className="border-r border-white/20"></div>
                          <div className="border-r border-white/20"></div>
                          <div></div>
                          <div className="border-t border-r border-white/20 col-span-1 row-start-2"></div>
                          <div className="border-t border-r border-white/20 col-span-1 row-start-2"></div>
                          <div className="border-t border-white/20 row-start-2"></div>
                          <div className="border-t border-r border-white/20 col-span-1 row-start-3"></div>
                          <div className="border-t border-r border-white/20 col-span-1 row-start-3"></div>
                          <div className="border-t border-white/20 row-start-3"></div>
                      </div>
                  )}
              </div>

              {/* Top Controls */}
              <div className="relative z-20 pt-4 px-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pb-8">
                  <button onClick={closeCamera} className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 transition">
                      <X size={24} />
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/60 transition">
                      <Music2 size={16} />
                      <span className="text-xs font-bold">Add Sound</span>
                  </button>

                  <div className="flex flex-col space-y-4 items-end">
                       {/* Flip */}
                       <button onClick={() => setCameraType(prev => prev === 'user' ? 'environment' : 'user')} className="flex flex-col items-center group">
                          <div className="p-2 bg-black/20 rounded-full mb-1 group-active:scale-90 transition hover:bg-black/40"><RotateCcw size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Flip</span>
                       </button>

                       {/* Speed */}
                       <button onClick={() => setActiveSidePanel(activeSidePanel === 'SPEED' ? 'NONE' : 'SPEED')} className="flex flex-col items-center group">
                          <div className={`p-2 rounded-full mb-1 transition hover:bg-black/40 ${activeSidePanel === 'SPEED' ? 'bg-white text-black' : 'bg-black/20 text-white'}`}><Gauge size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Speed</span>
                       </button>

                       {/* Beauty / Retouch */}
                       <button onClick={() => setIsRetouch(!isRetouch)} className="flex flex-col items-center group">
                          <div className={`p-2 rounded-full mb-1 transition hover:bg-black/40 ${isRetouch ? 'bg-pink-600' : 'bg-black/20'}`}><Sparkles size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Retouch</span>
                       </button>

                       {/* Filters */}
                       <button onClick={() => setActiveSidePanel(activeSidePanel === 'FILTERS' ? 'NONE' : 'FILTERS')} className="flex flex-col items-center group">
                          <div className={`p-2 rounded-full mb-1 transition hover:bg-black/40 ${activeSidePanel === 'FILTERS' ? 'bg-white text-black' : 'bg-black/20 text-white'}`}><Wand2 size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Filters</span>
                       </button>

                        {/* Timer */}
                       <button onClick={() => setTimer(prev => prev === 0 ? 3 : prev === 3 ? 10 : 0)} className="flex flex-col items-center group">
                          <div className={`p-2 rounded-full mb-1 transition relative hover:bg-black/40 ${timer > 0 ? 'bg-pink-600' : 'bg-black/20'}`}>
                              <Clock size={24} />
                              {timer > 0 && <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] w-3 h-3 flex items-center justify-center rounded-full font-bold">{timer}s</span>}
                          </div>
                          <span className="text-[10px] drop-shadow-md">Timer</span>
                       </button>
                       
                       {/* Flash */}
                       <button onClick={() => setFlash(prev => prev === 'off' ? 'on' : prev === 'on' ? 'auto' : 'off')} className="flex flex-col items-center group">
                          <div className="p-2 bg-black/20 rounded-full mb-1 hover:bg-black/40">
                              {flash === 'off' ? <ZapOff size={24} className="text-white"/> : flash === 'on' ? <Zap size={24} fill="gold" className="text-yellow-400"/> : <Zap size={24} className="text-blue-400"/>}
                          </div>
                          <span className="text-[10px] drop-shadow-md capitalize">{flash}</span>
                       </button>
                       
                       {/* Green Screen */}
                       <button onClick={() => setIsGreenScreen(!isGreenScreen)} className="flex flex-col items-center group">
                          <div className={`p-2 rounded-full mb-1 transition hover:bg-black/40 ${isGreenScreen ? 'bg-green-600' : 'bg-black/20'}`}><ImageIcon size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Green Screen</span>
                       </button>

                       {/* Settings */}
                       <button onClick={() => setShowCameraSettings(true)} className="flex flex-col items-center group">
                          <div className="p-2 bg-black/20 rounded-full mb-1 hover:bg-black/40"><Settings size={24} /></div>
                          <span className="text-[10px] drop-shadow-md">Settings</span>
                       </button>
                  </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 w-full z-20 pb-8 pt-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                  
                  {/* Feature Panels */}
                  {activeSidePanel === 'SPEED' && (
                      <div className="absolute top-0 left-0 right-0 flex justify-center -mt-10 animate-in fade-in slide-in-from-bottom-4">
                          <div className="bg-black/50 backdrop-blur-md rounded-lg p-1 flex gap-1 border border-white/10">
                              {[0.3, 0.5, 1, 2, 3].map((spd) => (
                                  <button 
                                      key={spd}
                                      onClick={() => setRecordingSpeed(spd)}
                                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${recordingSpeed === spd ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}
                                  >
                                      {spd}x
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {activeSidePanel === 'FILTERS' && (
                      <div className="absolute top-0 left-0 w-full overflow-x-auto no-scrollbar -mt-20 px-4 animate-in fade-in slide-in-from-bottom-4">
                          <div className="flex gap-4">
                              {FILTERS.map((f) => (
                                  <button 
                                    key={f.name} 
                                    onClick={() => setSelectedFilter(f.name)}
                                    className="flex flex-col items-center gap-1 min-w-[50px]"
                                  >
                                      <div className={`w-12 h-12 rounded-full border-2 overflow-hidden ${selectedFilter === f.name ? 'border-pink-500 scale-110' : 'border-transparent'}`}>
                                           <div className={`w-full h-full bg-gray-500 ${f.class} bg-[url('https://picsum.photos/100/100')] bg-cover`}></div>
                                      </div>
                                      <span className={`text-[10px] font-medium shadow-black drop-shadow-md ${selectedFilter === f.name ? 'text-pink-500' : 'text-white'}`}>{f.name}</span>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Duration Selector */}
                  <div className="flex justify-center space-x-6 mb-8 text-sm font-semibold text-gray-400">
                      <button onClick={() => setDuration(15)} className={`${duration === 15 ? 'text-white bg-gray-800 px-3 py-1 rounded-full' : ''} transition-all`}>15s</button>
                      <button onClick={() => setDuration(60)} className={`${duration === 60 ? 'text-white bg-gray-800 px-3 py-1 rounded-full' : ''} transition-all`}>60s</button>
                      <button onClick={() => setDuration(180)} className={`${duration === 180 ? 'text-white bg-gray-800 px-3 py-1 rounded-full' : ''} transition-all`}>3m</button>
                  </div>

                  <div className="flex justify-around items-center px-8">
                      {/* Upload from Gallery (Within Camera) */}
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 active:scale-95 transition" onClick={handleUploadClick}>
                          <div className="w-10 h-10 rounded-lg bg-gray-200 border-2 border-white overflow-hidden mb-1">
                              <img src="https://picsum.photos/100/100" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px]">Upload</span>
                      </div>

                      {/* Record Button */}
                      <button 
                        onClick={toggleRecording}
                        className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-200 ${recording ? 'scale-110 border-red-500' : 'hover:scale-105'}`}
                      >
                          <div className={`rounded-full transition-all duration-200 ${recording ? 'w-8 h-8 bg-red-600 rounded-sm' : 'w-16 h-16 bg-red-500'}`}></div>
                      </button>

                      {/* Effects */}
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 active:scale-95 transition">
                          <div className="w-10 h-10 rounded-full bg-gray-800/80 border border-white/50 flex items-center justify-center mb-1">
                              <Sparkles size={20} />
                          </div>
                          <span className="text-[10px]">Effects</span>
                      </div>
                  </div>
              </div>

              {/* Camera Settings Overlay */}
              {showCameraSettings && (
                  <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end animate-in fade-in duration-200">
                      <div className="w-full bg-slate-900 rounded-t-2xl p-6 border-t border-gray-800 animate-in slide-in-from-bottom duration-300">
                          <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                  <Settings size={20} /> Camera Settings
                              </h3>
                              <button onClick={() => setShowCameraSettings(false)} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                                  <X size={20} className="text-gray-400" />
                              </button>
                          </div>

                          <div className="space-y-6">
                              {/* Resolution */}
                              <div>
                                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Video Quality</label>
                                  <div className="flex gap-2 bg-black/50 p-1 rounded-xl">
                                      {['720p', '1080p', '4K'].map((res) => (
                                          <button 
                                            key={res}
                                            onClick={() => setCameraQuality(res)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${cameraQuality === res ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                          >
                                              {res}
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              {/* Toggles Grid */}
                              <div className="grid grid-cols-2 gap-4">
                                  <button onClick={() => setCameraGrid(!cameraGrid)} className="flex items-center justify-between p-4 bg-black/50 rounded-xl hover:bg-black/70 transition">
                                      <div className="flex items-center gap-3">
                                          <Grid size={20} className={cameraGrid ? "text-pink-500" : "text-gray-400"} />
                                          <span className="text-sm font-medium">Grid Lines</span>
                                      </div>
                                      <div className={`w-10 h-6 rounded-full relative transition-colors ${cameraGrid ? 'bg-pink-600' : 'bg-gray-700'}`}>
                                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cameraGrid ? 'left-5' : 'left-1'}`} />
                                      </div>
                                  </button>

                                  <button onClick={() => setCameraStabilization(!cameraStabilization)} className="flex items-center justify-between p-4 bg-black/50 rounded-xl hover:bg-black/70 transition">
                                      <div className="flex items-center gap-3">
                                          <Monitor size={20} className={cameraStabilization ? "text-blue-500" : "text-gray-400"} />
                                          <span className="text-sm font-medium">Stabilization</span>
                                      </div>
                                      <div className={`w-10 h-6 rounded-full relative transition-colors ${cameraStabilization ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cameraStabilization ? 'left-5' : 'left-1'}`} />
                                      </div>
                                  </button>
                                  
                                  <button onClick={() => setMirrorFrontCamera(!mirrorFrontCamera)} className="flex items-center justify-between p-4 bg-black/50 rounded-xl hover:bg-black/70 transition col-span-2">
                                      <div className="flex items-center gap-3">
                                          <RotateCcw size={20} className={mirrorFrontCamera ? "text-green-500" : "text-gray-400"} />
                                          <span className="text-sm font-medium">Mirror Front Camera</span>
                                      </div>
                                      <div className={`w-10 h-6 rounded-full relative transition-colors ${mirrorFrontCamera ? 'bg-green-600' : 'bg-gray-700'}`}>
                                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${mirrorFrontCamera ? 'left-5' : 'left-1'}`} />
                                      </div>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  // --- RENDER STUDIO HUB ---
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white p-4 overflow-y-auto pb-24 font-sans">
      <div className="flex items-center justify-center space-x-2 mb-6">
         <Sparkles className="text-pink-500" />
         <h1 className="text-xl font-bold">Creator Studio</h1>
      </div>

      <div className="space-y-4">
        
        <div className="grid grid-cols-2 gap-3">
            {/* Create Video Button */}
            <button 
                onClick={startCamera}
                className="col-span-1 bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform h-32 flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Camera size={40} className="text-white rotate-12" />
                </div>
                <div className="p-2 bg-white/20 w-fit rounded-lg">
                    <Video size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-none">Camera</h3>
                    <p className="text-[10px] text-white/80 mt-1">Record, Filters, Beauty</p>
                </div>
            </button>

            {/* Go Live Button */}
            <button 
                onClick={() => setMode('LIVE')}
                className="col-span-1 bg-gradient-to-br from-red-600 to-pink-600 p-4 rounded-2xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform h-32 flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Radio size={40} className="text-white -rotate-12" />
                </div>
                <div className="p-2 bg-white/20 w-fit rounded-lg">
                    <Radio size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-none">Go Live</h3>
                    <p className="text-[10px] text-white/80 mt-1">Stream & Earn Gifts</p>
                </div>
            </button>
        </div>

        {/* AI Input Section */}
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 mt-4">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-1.5 bg-purple-500/20 rounded-lg">
                <Wand2 size={18} className="text-purple-400" />
             </div>
             <h3 className="font-bold text-gray-200">AI Script Generator</h3>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., Funny cat video ideas..."
              className="flex-1 bg-slate-800 border-none rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 rounded-xl text-white disabled:opacity-50 shadow-lg shadow-pink-900/20"
            >
              {loading && topic ? <Loader2 className="animate-spin" /> : <Wand2 />}
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
                onClick={handleGetIdeas}
                className="text-xs font-medium bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full whitespace-nowrap border border-slate-700 transition-colors flex items-center gap-1"
            >
              <Sparkles size={12} className="text-yellow-400"/> Suggest Ideas
            </button>
            {ideas.map((idea, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setTopic(idea)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full whitespace-nowrap border border-slate-700 transition-colors"
                >
                    {idea}
                </button>
            ))}
          </div>
        </div>

        {/* Script Output */}
        {script && (
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 relative animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-purple-400 flex items-center gap-2"><Settings size={14}/> Viral Script</h3>
              <button onClick={handleCopy} className="text-gray-400 hover:text-white bg-slate-800 p-2 rounded-lg transition-colors">
                {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
              {script}
            </pre>
          </div>
        )}

        {/* Traditional Upload Area */}
        <div 
          onClick={handleUploadClick}
          className="border-2 border-dashed border-slate-800 hover:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 transition-colors cursor-pointer bg-slate-900/30 relative overflow-hidden group"
        >
          <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="video/*" 
          />
          
          {isUploading ? (
              <div className="absolute inset-0 bg-slate-900/90 z-10 flex flex-col items-center justify-center">
                   <div className="w-16 h-16 relative">
                       <svg className="animate-spin w-full h-full text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{uploadProgress}%</span>
                   </div>
                   <p className="text-sm font-bold text-white mt-4">Uploading Video...</p>
                   <p className="text-xs text-gray-500">Please do not close the app</p>
              </div>
          ) : (
             <>
                 <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition">
                    <FileVideo className="text-gray-400 group-hover:text-pink-500 transition" size={32} />
                 </div>
                 <div>
                    <p className="font-bold text-white">Upload from Gallery</p>
                    <p className="text-xs text-gray-500 mt-1">MP4, MKV up to 3 mins</p>
                 </div>
             </>
          )}
        </div>
      </div>
      
      {/* Live Stream Overlay */}
      {mode === 'LIVE' && (
          <LiveRoom 
             mode="STREAMER" 
             onClose={() => setMode('STUDIO')} 
             onUpdateBalance={onUpdateBalance}
          />
      )}
    </div>
  );
};

export default Create;
