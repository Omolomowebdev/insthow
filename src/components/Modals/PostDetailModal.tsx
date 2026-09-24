import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from 'lucide-react';
import { Post, User, Comment } from '../../types/instagram';
import { PHOTO_FILTERS } from '../../data/mockData';

interface PostDetailModalProps {
  post: Post;
  currentUser: User;
  onClose: () => void;
  onLikeToggle: (postId: string) => void;
  onSaveToggle: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onSharePost: (post: Post) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onSharePost,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>(post.comments);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const activeFilter = PHOTO_FILTERS.find((f) => f.id === post.filter);
  const filterStyleCss = activeFilter ? activeFilter.filterStyle : 'none';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const toggleCommentLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      {/* Close button outside */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 z-60"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Modal Container */}
      <div 
        className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Photo */}
        <div className="w-full md:w-[58%] bg-black flex items-center justify-center select-none overflow-hidden aspect-square md:aspect-auto">
          <img
            src={post.imageUrls[0]}
            alt={post.caption}
            referrerPolicy="no-referrer"
            style={{ filter: filterStyleCss }}
            className="w-full h-full object-cover max-h-[85vh]"
          />
        </div>

        {/* Right Side: Details & Comments */}
        <div className="w-full md:w-[42%] flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-neutral-200">
          {/* Top Author Header */}
          <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full story-ring-gradient p-[1.5px]">
                <div className="w-full h-full rounded-full bg-white p-[1px]">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-900">
                    {post.user.username}
                  </span>
                  {post.user.isVerified && (
                    <span className="w-3.5 h-3.5 bg-sky-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                {post.location && (
                  <span className="text-[10px] text-neutral-500 block truncate">
                    {post.location}
                  </span>
                )}
              </div>
            </div>

            <button className="text-neutral-500 hover:text-neutral-800 p-1">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Middle: Scrollable Comments List */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-4 max-h-[360px] md:max-h-none text-xs">
            {/* Main Caption row */}
            <div className="flex items-start gap-3">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <p className="leading-relaxed">
                  <span className="font-bold text-neutral-900 mr-1.5">
                    {post.user.username}
                  </span>
                  <span className="text-neutral-800">{post.caption}</span>
                </p>
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  {post.timestamp}
                </span>
              </div>
            </div>

            {/* Comments list */}
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-3">
                  <img
                    src={c.userAvatar}
                    alt={c.username}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="leading-relaxed">
                      <span className="font-bold text-neutral-900 mr-1.5">
                        {c.username}
                      </span>
                      <span className="text-neutral-800">{c.text}</span>
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-1">
                      <span>{c.timestamp}</span>
                      <button className="font-semibold hover:text-neutral-700">Reply</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleCommentLike(c.id)}
                  className="pt-1 text-neutral-400 hover:text-rose-500"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedComments[c.id] || c.isLiked
                        ? 'text-rose-500 fill-rose-500'
                        : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Actions & Composer */}
          <div className="border-t border-neutral-200 p-3.5 bg-neutral-50/50">
            {/* Action icons */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLikeToggle(post.id)}
                  className="p-1 focus:outline-none transition-transform active:scale-125"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      post.isLiked
                        ? 'text-rose-500 fill-rose-500'
                        : 'text-neutral-800 hover:text-neutral-500'
                    }`}
                  />
                </button>
                <button
                  className="p-1 text-neutral-800 hover:text-neutral-500"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onSharePost(post)}
                  className="p-1 text-neutral-800 hover:text-neutral-500"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={() => onSaveToggle(post.id)}
                className="p-1 focus:outline-none transition-transform active:scale-125"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    post.isSaved
                      ? 'text-neutral-900 fill-neutral-900'
                      : 'text-neutral-800 hover:text-neutral-500'
                  }`}
                />
              </button>
            </div>

            {/* Likes count */}
            <span className="text-xs font-bold text-neutral-900 block mb-1">
              {post.likesCount.toLocaleString()} likes
            </span>
            <span className="text-[10px] text-neutral-400 block mb-3 uppercase tracking-wider">
              {post.timestamp}
            </span>

            {/* Comment form */}
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setCommentInput((p) => p + ' 🤍')}
                className="text-neutral-500 hover:text-neutral-800"
              >
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              {commentInput.trim() && (
                <button
                  type="submit"
                  className="text-xs font-semibold text-sky-500 hover:text-sky-700"
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
