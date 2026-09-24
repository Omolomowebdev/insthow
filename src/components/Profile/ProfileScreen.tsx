import React, { useState } from 'react';
import { Grid, Film, Bookmark, UserCheck, Settings, Heart, MessageCircle, Plus, ExternalLink } from 'lucide-react';
import { User, Post, Reel } from '../../types/instagram';

interface ProfileScreenProps {
  user: User;
  posts: Post[];
  reels: Reel[];
  savedPosts: Post[];
  onOpenEditProfile: () => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenHighlight: (highlightId: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  posts,
  savedPosts,
  onOpenEditProfile,
  onOpenPostDetail,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts');

  const userPosts = posts.filter((p) => p.userId === user.id);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 pb-6 border-b border-neutral-200">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full story-ring-gradient p-[3px] shadow-sm">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bio & Actions */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Top row: username & action buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                {user.username}
              </h1>
              {user.isVerified && (
                <span className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenEditProfile}
                className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold rounded-lg transition-colors"
              >
                Edit profile
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Profile link copied to clipboard!');
                }}
                className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold rounded-lg transition-colors"
              >
                Share profile
              </button>
              <button
                onClick={onOpenEditProfile}
                className="p-1.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stat counters */}
          <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 mb-4 text-sm">
            <div>
              <span className="font-bold text-neutral-900 mr-1">
                {userPosts.length}
              </span>
              <span className="text-neutral-600">posts</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900 mr-1">
                {(user.followersCount / 1000).toFixed(1)}k
              </span>
              <span className="text-neutral-600">followers</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900 mr-1">
                {user.followingCount}
              </span>
              <span className="text-neutral-600">following</span>
            </div>
          </div>

          {/* User Full Name & Bio */}
          <div className="space-y-1 text-xs sm:text-sm text-neutral-800 leading-relaxed max-w-md">
            <h2 className="font-bold text-neutral-900">{user.name}</h2>
            <p className="whitespace-pre-line text-neutral-700">
              {user.bio}
            </p>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline pt-0.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {user.website.replace('https://', '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Story Highlights */}
      {user.highlights && (
        <div className="py-5 overflow-x-auto no-scrollbar border-b border-neutral-200">
          <div className="flex items-center gap-5 min-w-max px-2">
            {user.highlights.map((hl) => (
              <div
                key={hl.id}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full p-[2px] border border-neutral-300 group-hover:border-neutral-500 transition-colors">
                  <img
                    src={hl.coverImage}
                    alt={hl.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs font-medium text-neutral-700 truncate max-w-[70px]">
                  {hl.title}
                </span>
              </div>
            ))}

            {/* Add New Highlight */}
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 group-hover:border-neutral-500 group-hover:text-neutral-900 transition-colors">
                <Plus className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-xs font-medium text-neutral-700">
                New
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center border-b border-neutral-200">
        <div className="flex gap-12 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveSubTab('posts')}
            className={`flex items-center gap-1.5 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeSubTab === 'posts'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Posts</span>
          </button>
          <button
            onClick={() => setActiveSubTab('reels')}
            className={`flex items-center gap-1.5 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeSubTab === 'reels'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Film className="w-4 h-4" />
            <span className="hidden sm:inline">Reels</span>
          </button>
          <button
            onClick={() => setActiveSubTab('saved')}
            className={`flex items-center gap-1.5 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeSubTab === 'saved'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tagged')}
            className={`flex items-center gap-1.5 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeSubTab === 'tagged'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Tagged</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="mt-4">
        {activeSubTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {userPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenPostDetail(post)}
                className="relative aspect-square group bg-neutral-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={post.imageUrls[0]}
                  alt={post.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay with likes & comments */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likesCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'saved' && (
          <div>
            {savedPosts.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                <Bookmark className="w-12 h-12 mx-auto stroke-[1] mb-2" />
                <p className="text-sm font-semibold text-neutral-700">No saved posts yet</p>
                <p className="text-xs text-neutral-500">
                  Save photos and videos that inspire you to your private collection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {savedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onOpenPostDetail(post)}
                    className="relative aspect-square group bg-neutral-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={post.imageUrls[0]}
                      alt={post.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 fill-white" />
                        <span>{post.likesCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'reels' && (
          <div className="py-16 text-center text-neutral-400">
            <Film className="w-12 h-12 mx-auto stroke-[1] mb-2" />
            <p className="text-sm font-semibold text-neutral-700">Studio Reels & Behind the Scenes</p>
            <p className="text-xs text-neutral-500">
              Watch Elena's throwing tutorials, kiln unboxings, and studio tours.
            </p>
          </div>
        )}

        {activeSubTab === 'tagged' && (
          <div className="py-16 text-center text-neutral-400">
            <UserCheck className="w-12 h-12 mx-auto stroke-[1] mb-2" />
            <p className="text-sm font-semibold text-neutral-700">Photos of You</p>
            <p className="text-xs text-neutral-500">
              When friends tag you in their photos, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
