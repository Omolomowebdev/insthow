import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, Music2, ChevronUp, ChevronDown } from 'lucide-react';
import { Reel, User } from '../../types/instagram';

interface ReelsScreenProps {
  reels: Reel[];
  currentUser: User;
  onLikeReel: (reelId: string) => void;
  onSaveReel: (reelId: string) => void;
  onShareReel: (reel: Reel) => void;
}

export const ReelsScreen: React.FC<ReelsScreenProps> = ({
  reels,
  onLikeReel,
  onSaveReel,
  onShareReel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>({});

  const currentReel = reels[currentIndex] || reels[0];

  const handleNextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDoubleTap = () => {
    if (!currentReel.isLiked) {
      onLikeReel(currentReel.id);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const toggleFollow = (userId: string) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[calc(100vh-112px)] min-h-[580px] bg-neutral-950 sm:rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center my-1">
      {/* Background Media */}
      <div
        className="relative w-full h-full cursor-pointer select-none"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={currentReel.mediaUrl}
          alt={currentReel.caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />

        {/* Shading scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

        {/* Double-tap heart animation */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-heart-burst" />
          </div>
        )}

        {/* Top Sound and Reels Title */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
          <span className="font-semibold text-lg drop-shadow-md tracking-tight">Reels</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Up / Down Navigation Controls (floating on desktop) */}
        <div className="absolute right-3 top-16 z-20 flex flex-col gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevReel();
            }}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full bg-black/40 backdrop-blur-md text-white transition-opacity ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/60'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextReel();
            }}
            disabled={currentIndex === reels.length - 1}
            className={`p-2 rounded-full bg-black/40 backdrop-blur-md text-white transition-opacity ${
              currentIndex === reels.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/60'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Rail */}
        <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-5">
          {/* Like Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLikeReel(currentReel.id);
              }}
              className="p-2 focus:outline-none transition-transform active:scale-125"
            >
              <Heart
                className={`w-7 h-7 drop-shadow-md ${
                  currentReel.isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'
                }`}
              />
            </button>
            <span className="text-[11px] font-semibold text-white drop-shadow">
              {currentReel.likesCount > 999
                ? `${(currentReel.likesCount / 1000).toFixed(1)}k`
                : currentReel.likesCount}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 text-white hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="w-7 h-7 drop-shadow-md" />
            </button>
            <span className="text-[11px] font-semibold text-white drop-shadow">
              {currentReel.commentsCount}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShareReel(currentReel);
              }}
              className="p-2 text-white hover:opacity-80 transition-opacity"
            >
              <Send className="w-6 h-6 drop-shadow-md" />
            </button>
            <span className="text-[11px] font-semibold text-white drop-shadow">
              {currentReel.sharesCount}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveReel(currentReel.id);
            }}
            className="p-2 focus:outline-none transition-transform active:scale-125"
          >
            <Bookmark
              className={`w-6 h-6 drop-shadow-md ${
                currentReel.isSaved ? 'text-white fill-white' : 'text-white'
              }`}
            />
          </button>

          {/* Spinning Audio Disc */}
          <div className="w-8 h-8 rounded-full border-2 border-white/80 p-0.5 animate-spin duration-3000">
            <img
              src={currentReel.user.avatar}
              alt="Audio creator"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Details (Creator & Caption) */}
        <div className="absolute left-4 right-16 bottom-6 z-20 flex flex-col gap-2 text-white text-left">
          {/* Creator & Follow button */}
          <div className="flex items-center gap-2.5">
            <img
              src={currentReel.user.avatar}
              alt={currentReel.user.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-white/60 object-cover"
            />
            <span className="text-sm font-bold drop-shadow">
              {currentReel.user.username}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFollow(currentReel.user.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
                followedUsers[currentReel.user.id]
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'bg-white text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {followedUsers[currentReel.user.id] ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Caption */}
          <p className="text-xs text-white/95 leading-relaxed drop-shadow line-clamp-2">
            {currentReel.caption}
          </p>

          {/* Music track ticker */}
          <div className="flex items-center gap-2 text-xs text-white/90 drop-shadow">
            <Music2 className="w-3.5 h-3.5 animate-pulse" />
            <span className="truncate max-w-[220px] font-medium text-[11px]">
              {currentReel.audioTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
