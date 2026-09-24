import React from 'react';
import { Home, Search, PlusSquare, Film } from 'lucide-react';
import { ActiveTab, User } from '../../types/instagram';

interface BottomTabBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: User;
  onOpenCreate: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenCreate,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200">
      <div className="max-w-md mx-auto grid grid-cols-5 h-14 items-center px-2">
        {/* Home */}
        <button
          onClick={() => setActiveTab('feed')}
          className="flex flex-col items-center justify-center h-full text-neutral-800 transition-transform active:scale-90"
          aria-label="Home"
        >
          <Home
            className={`w-6 h-6 transition-all ${
              activeTab === 'feed' ? 'stroke-[2.5] text-neutral-900 fill-neutral-900' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Explore */}
        <button
          onClick={() => setActiveTab('explore')}
          className="flex flex-col items-center justify-center h-full text-neutral-800 transition-transform active:scale-90"
          aria-label="Explore"
        >
          <Search
            className={`w-6 h-6 transition-all ${
              activeTab === 'explore' ? 'stroke-[3] text-neutral-900' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Create */}
        <button
          onClick={onOpenCreate}
          className="flex flex-col items-center justify-center h-full text-neutral-800 transition-transform active:scale-90"
          aria-label="Create Post"
        >
          <div className="w-7 h-7 border-2 border-neutral-800 rounded-lg flex items-center justify-center">
            <PlusSquare className="w-5 h-5 text-neutral-800" />
          </div>
        </button>

        {/* Reels */}
        <button
          onClick={() => setActiveTab('reels')}
          className="flex flex-col items-center justify-center h-full text-neutral-800 transition-transform active:scale-90"
          aria-label="Reels"
        >
          <Film
            className={`w-6 h-6 transition-all ${
              activeTab === 'reels' ? 'stroke-[2.5] text-neutral-900 fill-neutral-900' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex flex-col items-center justify-center h-full transition-transform active:scale-90"
          aria-label="Profile"
        >
          <div
            className={`w-7 h-7 rounded-full p-[1.5px] transition-all ${
              activeTab === 'profile' ? 'ring-2 ring-neutral-900' : 'hover:opacity-80'
            }`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </button>
      </div>
    </nav>
  );
};
