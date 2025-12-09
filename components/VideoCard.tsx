import React, { useRef, useEffect, useState } from 'react';
import { VideoModel } from '../types';
import { Heart, MessageCircle, Share2, Music2, Disc, AlertCircle, ThumbsDown, Download, Check, Coins, Plus } from 'lucide-react';
import { COINS_PER_LIKE, COINS_PER_VIEW } from '../constants';

interface VideoCardProps {
  video: VideoModel;
  isActive: boolean;
  onEarnView: () => void;
  onEarnLike: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onEarnView, onEarnLike }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  
  // Follow State
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Earning State
  const viewRegistered = useRef(false);

  useEffect(() => {
    if (isActive) {
      // Reset view registration when video becomes active again
      viewRegistered.current = false;

      const playVideo = async () => {
        if (!videoRef.current) return;
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay failed:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            try {
              await videoRef.current.play();
              setIsPlaying(true);
            } catch (retryErr) {
              setIsPlaying(false);
            }
          }
        }
      };
      playVideo();
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);

      // Check for View Earning (e.g., watched for 3 seconds)
      if (isActive && !viewRegistered.current && videoRef.current.currentTime > 3) {
          viewRegistered.current = true;
          onEarnView();
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
        if (isMuted) {
           videoRef.current.muted = false;
           setIsMuted(false);
        }
      }
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
        setLiked(false);
    } else {
        setLiked(true);
        setDisliked(false);
        // Earn on Like
        onEarnLike();
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disliked) {
        setDisliked(false);
    } else {
        setDisliked(true);
        setLiked(false);
    }
  };

  const handleFollow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFollowing(true);
      // Simulate API call delay then hide button if needed, 
      // but for now we keep the checkmark visible
  };

  const handleDownload = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDownloading || downloadComplete) return;

      setIsDownloading(true);
      try {
          const response = await fetch(video.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `divyanshi_video_${video.id}.mp4`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          
          setDownloadComplete(true);
          setTimeout(() => setDownloadComplete(false), 3000);
      } catch (err) {
          console.error("Download failed", err);
          window.open(video.url, '_blank');
      } finally {
          setIsDownloading(false);
      }
  };

  if (hasError) {
    return (
        <div className="relative w-full h-full bg-gray-900 snap-start shrink-0 flex flex-col items-center justify-center text-white p-6">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Video Unavailable</h3>
            <button onClick={() => setHasError(false)} className="px-4 py-2 bg-slate-800 rounded-full text-sm font-medium">Retry</button>
        </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black snap-start shrink-0">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onError={() => setHasError(true)}
      />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700/50 z-20">
        <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 pb-20 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10">
        <div className="flex justify-between items-end">
          
          {/* Left Side: Info */}
          <div className="flex-1 mr-12 pointer-events-auto">
            <h3 className="text-white font-bold text-lg mb-2">@{video.username}</h3>
            <p className="text-white/90 text-sm mb-4 line-clamp-2">{video.description}</p>
            <div className="flex items-center space-x-2 text-white/80 animate-pulse-slow">
              <Music2 size={16} />
              <span className="text-xs marquee">{video.songName}</span>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-col items-center space-y-4 pointer-events-auto">
            
            {/* Profile Pic & Follow */}
            <div className="relative mb-2">
              <img src={video.thumbnail} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              {!isFollowing && (
                <button 
                  onClick={handleFollow}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-white hover:scale-110 transition-transform"
                >
                  <Plus size={10} strokeWidth={4} />
                </button>
              )}
              {isFollowing && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-pink-500 animate-in zoom-in duration-300">
                     <Check size={10} strokeWidth={4} />
                  </div>
              )}
            </div>

            {/* Like */}
            <div className="flex flex-col items-center relative">
              <button 
                onClick={handleLike}
                className={`p-2 rounded-full transition-transform active:scale-75 ${liked ? 'text-red-500' : 'text-white'}`}
              >
                <Heart size={28} fill={liked ? "currentColor" : "none"} />
              </button>
              <span className="text-white text-[10px] font-medium">{liked ? video.likes + 1 : video.likes}</span>
            </div>

             {/* Dislike */}
             <div className="flex flex-col items-center">
              <button 
                onClick={handleDislike}
                className={`p-2 rounded-full transition-transform active:scale-75 ${disliked ? 'text-white' : 'text-white/80'}`}
              >
                <ThumbsDown size={28} fill={disliked ? "currentColor" : "none"} />
              </button>
              <span className="text-white text-[10px] font-medium">Dislike</span>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center">
              <button className="p-2 rounded-full text-white transition-transform active:scale-75">
                <MessageCircle size={28} />
              </button>
              <span className="text-white text-[10px] font-medium">{video.comments}</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <button className="p-2 rounded-full text-white transition-transform active:scale-75">
                <Share2 size={28} />
              </button>
              <span className="text-white text-[10px] font-medium">{video.shares}</span>
            </div>

            {/* Download */}
            <div className="flex flex-col items-center">
                <button onClick={handleDownload} className="p-2 rounded-full text-white transition-transform active:scale-75">
                    {isDownloading ? <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : downloadComplete ? <Check size={28} className="text-green-500" /> : <Download size={28} />}
                </button>
                <span className="text-white text-[10px] font-medium">Save</span>
            </div>

            {/* Disc Animation */}
            <div className={`mt-2 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border-4 border-gray-800">
                 <Disc size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Play/Pause Icon overlay */}
      {!isPlaying && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm">
             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;