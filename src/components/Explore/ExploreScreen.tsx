import React, { useState } from 'react';
import { Search, X, Heart, MessageCircle, Film } from 'lucide-react';
import { Post, User } from '../../types/instagram';

interface ExploreScreenProps {
  exploreItems: Array<{ id: string; type: 'image' | 'reel'; url: string; likes: number; comments: number; isLarge: boolean }>;
  allPosts: Post[];
  onOpenDetail: (post: Post) => void;
  currentUser: User;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  exploreItems,
  allPosts,
  onOpenDetail,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ceramics', 'Studio', 'Architecture', 'Interior', 'Botanicals', 'Travel'];

  const filteredItems = exploreItems.filter(() => {
    // If search is empty, show all or filter by category
    if (!searchQuery.trim()) return true;
    return true;
  });

  const handleTileClick = (item: typeof exploreItems[0]) => {
    // Check if item corresponds to an existing post
    const matchedPost = allPosts.find((p) => p.imageUrls.includes(item.url));
    if (matchedPost) {
      onOpenDetail(matchedPost);
    } else {
      // Create a temporary post for the modal
      const tempPost: Post = {
        id: item.id,
        userId: currentUser.id,
        user: {
          id: 'art_collective',
          username: 'artisan.collective',
          name: 'Artisan Collective',
          avatar: item.url,
          bio: 'Curated craft, timeless ceramics and organic forms.',
          postsCount: 120,
          followersCount: 54000,
          followingCount: 300,
        },
        imageUrls: [item.url],
        caption: 'Exploration of natural light, sculptural texture, and slow craftsmanship in everyday spaces ✨',
        location: 'California Coast',
        timestamp: '1 day ago',
        likesCount: item.likes,
        isLiked: false,
        isSaved: false,
        comments: [
          {
            id: 'tc1',
            userId: currentUser.id,
            username: currentUser.username,
            userAvatar: currentUser.avatar,
            text: 'Such beautiful tones and composition!',
            timestamp: '3h ago',
            likesCount: 3,
          }
        ]
      };
      onOpenDetail(tempPost);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Search Header */}
      <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-neutral-200">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts, audio, tags..."
            className="w-full pl-9 pr-8 py-2 bg-neutral-100 rounded-lg text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout (Instagram 3-column explore grid) */}
      <div className="grid grid-cols-3 gap-1 p-1 max-w-4xl mx-auto">
        {filteredItems.map((item, index) => {
          // Instagram pattern: every few items can span 2 cols and 2 rows
          const isLargeSpan = index === 0 || index === 8;

          return (
            <div
              key={item.id}
              onClick={() => handleTileClick(item)}
              className={`relative group bg-neutral-200 overflow-hidden cursor-pointer ${
                isLargeSpan ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              <img
                src={item.url}
                alt="Explore item"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Reel indicator icon if reel */}
              {item.type === 'reel' && (
                <div className="absolute top-2 right-2 p-1 bg-black/40 rounded-full text-white backdrop-blur-xs">
                  <Film className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{item.likes > 999 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
