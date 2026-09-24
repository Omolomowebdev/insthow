import React from 'react';
import { Plus } from 'lucide-react';
import { Story, User } from '../../types/instagram';

interface StoriesBarProps {
  stories: Story[];
  currentUser: User;
  onSelectStory: (story: Story) => void;
  onAddStory: () => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  currentUser,
  onSelectStory,
  onAddStory,
}) => {
  return (
    <div className="w-full bg-white border-b border-neutral-200 py-3.5 px-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 min-w-max">
        {/* Current user's story / Add Story */}
        <div className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={onAddStory}>
          <div className="relative">
            <div className="w-16 h-16 rounded-full p-[2px] border-2 border-neutral-200 group-hover:border-neutral-400 transition-colors">
              <img
                src={currentUser.avatar}
                alt="Your story"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-xs text-neutral-600 font-medium truncate max-w-[70px]">
            Your story
          </span>
        </div>

        {/* Other stories */}
        {stories
          .filter((s) => s.user.id !== currentUser.id)
          .map((story) => (
            <button
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group focus:outline-none"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 active:scale-95 ${
                  story.hasViewed
                    ? 'border-2 border-neutral-300'
                    : 'story-ring-gradient shadow-xs'
                }`}
              >
                <div className="w-full h-full rounded-full p-[2px] bg-white">
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-neutral-800 font-medium truncate max-w-[72px]">
                {story.user.username}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};
