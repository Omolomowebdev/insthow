import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Story } from '../../types/instagram';

interface StoryViewerModalProps {
  stories: Story[];
  initialStory: Story;
  onClose: () => void;
  onSendStoryReply: (story: Story, text: string) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStory,
  onClose,
  onSendStoryReply,
}) => {
  const currentIndex = stories.findIndex((s) => s.id === initialStory.id);
  const [index, setIndex] = useState(currentIndex >= 0 ? currentIndex : 0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [reactionSent, setReactionSent] = useState<string | null>(null);

  const currentStory = stories[index];
  const timerRef = useRef<number | null>(null);

  const STORY_DURATION = 5000; // 5 seconds
  const INTERVAL = 50;

  // Auto progression
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (INTERVAL / STORY_DURATION) * 100;
      });
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, isPaused]);

  const handleNext = () => {
    setProgress(0);
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSendReaction = (emoji: string) => {
    setReactionSent(emoji);
    onSendStoryReply(currentStory, `Reacted with ${emoji}`);
    setTimeout(() => setReactionSent(null), 1500);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendStoryReply(currentStory, replyText.trim());
    setReplyText('');
    setReactionSent('Sent!');
    setTimeout(() => setReactionSent(null), 1500);
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 flex items-center justify-center backdrop-blur-md">
      {/* Mobile/Desktop story frame */}
      <div 
        className="relative w-full max-w-sm h-full max-h-[820px] bg-neutral-900 rounded-none sm:rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background media */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.mediaUrl}
            alt="Story media"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Reaction animated floating feedback */}
        {reactionSent && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <span className="text-6xl animate-bounce drop-shadow-lg">
              {reactionSent}
            </span>
          </div>
        )}

        {/* Top Controls & Story Progress */}
        <div className="relative z-10 p-3 pt-4">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 mb-3">
            {stories.map((s, i) => (
              <div
                key={s.id}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width:
                      i < index
                        ? '100%'
                        : i === index
                        ? `${progress}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* User info & Close */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.user.avatar}
                alt={currentStory.user.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-white/80 object-cover"
              />
              <span className="text-xs font-semibold drop-shadow-md">
                {currentStory.user.username}
              </span>
              <span className="text-xs text-white/70">
                {currentStory.timestamp}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Left & Right Tap Zones */}
        <div className="absolute inset-y-16 inset-x-0 z-10 flex">
          <div
            className="w-1/3 h-full cursor-pointer flex items-center justify-start pl-2 opacity-0 hover:opacity-80 transition-opacity"
            onClick={handlePrev}
          >
            {index > 0 && (
              <div className="bg-black/40 p-1.5 rounded-full text-white">
                <ChevronLeft className="w-5 h-5" />
              </div>
            )}
          </div>
          <div
            className="w-2/3 h-full cursor-pointer flex items-center justify-end pr-2 opacity-0 hover:opacity-80 transition-opacity"
            onClick={handleNext}
          >
            <div className="bg-black/40 p-1.5 rounded-full text-white">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Reply & Quick Reactions */}
        <div className="relative z-20 p-3 pb-6 flex flex-col gap-2.5">
          {/* Quick emoji reactions */}
          <div className="flex items-center justify-around px-2 text-2xl">
            {['❤️', '🔥', '👏', '😍', '🏺', '🌿'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSendReaction(emoji)}
                className="hover:scale-130 active:scale-95 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply input */}
          <form onSubmit={handleReplySubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentStory.user.username}...`}
              className="flex-1 bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:bg-white/30 backdrop-blur-md"
            />
            {replyText.trim() ? (
              <button
                type="submit"
                className="p-2.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSendReaction('❤️')}
                className="p-2.5 rounded-full text-white hover:text-rose-500 transition-colors"
              >
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
