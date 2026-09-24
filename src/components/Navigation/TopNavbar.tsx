import React from 'react';
import { Heart, Send, PlusSquare, Compass, Film, Smartphone, Monitor } from 'lucide-react';
import { ActiveTab } from '../../types/instagram';

interface TopNavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenCreate: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  unreadMessagesCount,
  unreadNotificationsCount,
  isMobileFrame,
  setIsMobileFrame,
  onOpenCreate,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-1.5 focus:outline-none group text-left"
          >
            <span className="font-logo text-3xl font-bold tracking-tight text-neutral-900 group-hover:opacity-80 transition-opacity">
              Instagram
            </span>
          </button>
        </div>

        {/* Desktop Quick Nav (Visible when on wide view) */}
        {!isMobileFrame && (
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('feed')}
              className={`text-sm font-semibold transition-colors ${
                activeTab === 'feed' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'explore' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'reels' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Film className="w-4 h-4" />
              Reels
            </button>
            <button
              onClick={onOpenCreate}
              className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              <PlusSquare className="w-4 h-4" />
              Create
            </button>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Frame View Toggle (Mobile Device vs Fluid Desktop) */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Switch to Desktop Canvas View' : 'Switch to Mobile Phone View'}
            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            {isMobileFrame ? (
              <Monitor className="w-5 h-5 text-neutral-700" />
            ) : (
              <Smartphone className="w-5 h-5 text-neutral-700" />
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setActiveTab(activeTab === 'notifications' ? 'feed' : 'notifications')}
            className={`p-2 relative rounded-full hover:bg-neutral-100 transition-colors ${
              activeTab === 'notifications' ? 'text-neutral-900' : 'text-neutral-700'
            }`}
            title="Notifications"
          >
            <Heart className={`w-6 h-6 ${activeTab === 'notifications' ? 'fill-neutral-900' : ''}`} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Direct Messages Button */}
          <button
            onClick={() => setActiveTab(activeTab === 'messages' ? 'feed' : 'messages')}
            className={`p-2 relative rounded-full hover:bg-neutral-100 transition-colors ${
              activeTab === 'messages' ? 'text-neutral-900' : 'text-neutral-700'
            }`}
            title="Direct Messages"
          >
            <Send className={`w-6 h-6 ${activeTab === 'messages' ? 'fill-neutral-900' : ''}`} />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.2 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
