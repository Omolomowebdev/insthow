import React from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Check } from 'lucide-react';
import { AppNotification } from '../../types/instagram';

interface NotificationsDrawerProps {
  notifications: AppNotification[];
  onToggleFollow: (notifId: string) => void;
  onClearAll: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onToggleFollow,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-neutral-200 sm:rounded-xl shadow-xs overflow-hidden my-2 pb-16 sm:pb-4">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-base font-bold text-neutral-900">Notifications</h2>
        <span className="text-xs text-neutral-500 font-medium">Activity</span>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-neutral-100">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
              !n.isRead ? 'bg-sky-50/40' : 'hover:bg-neutral-50'
            }`}
          >
            {/* Left: Avatar with type badge */}
            <div className="relative shrink-0">
              <img
                src={n.user.avatar}
                alt={n.user.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-xs">
                {n.type === 'like' && (
                  <span className="w-full h-full rounded-full bg-rose-500 flex items-center justify-center">
                    <Heart className="w-3 h-3 fill-white" />
                  </span>
                )}
                {n.type === 'comment' && (
                  <span className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 fill-white" />
                  </span>
                )}
                {n.type === 'follow' && (
                  <span className="w-full h-full rounded-full bg-sky-500 flex items-center justify-center">
                    <UserPlus className="w-3 h-3" />
                  </span>
                )}
                {n.type === 'mention' && (
                  <span className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center">
                    <AtSign className="w-3 h-3" />
                  </span>
                )}
              </span>
            </div>

            {/* Middle: Text info */}
            <div className="flex-1 min-w-0 text-xs">
              <p className="text-neutral-800 leading-snug">
                <span className="font-bold text-neutral-900 mr-1">
                  {n.user.username}
                </span>
                {n.type === 'like' && 'liked your photo.'}
                {n.type === 'comment' && `commented: "${n.commentText}"`}
                {n.type === 'follow' && 'started following you.'}
                {n.type === 'mention' && 'mentioned you in a post.'}
              </p>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {n.timestamp}
              </span>
            </div>

            {/* Right: Post Thumbnail or Follow Button */}
            <div className="shrink-0">
              {n.type === 'follow' ? (
                <button
                  onClick={() => onToggleFollow(n.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    n.isFollowing
                      ? 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      : 'bg-sky-500 text-white hover:bg-sky-600'
                  }`}
                >
                  {n.isFollowing ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Following
                    </span>
                  ) : (
                    'Follow Back'
                  )}
                </button>
              ) : n.postImage ? (
                <div className="w-10 h-10 rounded-md overflow-hidden bg-neutral-100">
                  <img
                    src={n.postImage}
                    alt="Post thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
