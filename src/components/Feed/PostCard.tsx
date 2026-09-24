import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Check, Share2, Link as LinkIcon, UserMinus } from 'lucide-react';
import { Post, User } from '../../types/instagram';
import { PHOTO_FILTERS } from '../../data/mockData';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLikeToggle: (postId: string) => void;
  onSaveToggle: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onSharePost: (post: Post) => void;
  onOpenDetail: (post: Post) => void;
  onSelectUser?: (user: User) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onSharePost,
  onOpenDetail,
  onSelectUser,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Filter style
  const activeFilter = PHOTO_FILTERS.find((f) => f.id === post.filter);
  const filterStyleCss = activeFilter ? activeFilter.filterStyle : 'none';

  // Double tap to like
  const handlePhotoClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (!post.isLiked) {
        onLikeToggle(post.id);
      }
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 900);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setIsMenuOpen(false);
    }, 1500);
  };

  return (
    <article className="w-full bg-white border-b border-neutral-200 sm:border sm:rounded-xl sm:my-3 sm:shadow-xs overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectUser && onSelectUser(post.user)}
            className="w-9 h-9 rounded-full story-ring-gradient p-[1.5px] cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-white p-[1.5px]">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </button>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSelectUser && onSelectUser(post.user)}
                className="text-sm font-semibold text-neutral-900 hover:underline cursor-pointer"
              >
                {post.user.username}
              </button>
              {post.user.isVerified && (
                <span className="w-3.5 h-3.5 bg-sky-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                  ✓
                </span>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-neutral-500 truncate max-w-[200px]">
                {post.location}
              </span>
            )}
          </div>
        </div>

        {/* 3-dots Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-20">
              <button
                onClick={() => {
                  onSharePost(post);
                  setIsMenuOpen(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5"
              >
                <Share2 className="w-4 h-4 text-neutral-500" />
                Share to...
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 text-neutral-500" />
                    Copy link
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  onSaveToggle(post.id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5"
              >
                <Bookmark className="w-4 h-4 text-neutral-500" />
                {post.isSaved ? 'Remove from Saved' : 'Save post'}
              </button>
              <div className="h-px bg-neutral-100 my-1" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
              >
                <UserMinus className="w-4 h-4 text-rose-500" />
                Unfollow @{post.user.username}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image Container */}
      <div 
        className="relative w-full aspect-square bg-neutral-100 cursor-pointer select-none overflow-hidden"
        onClick={handlePhotoClick}
      >
        <img
          src={post.imageUrls[0]}
          alt={post.caption}
          referrerPolicy="no-referrer"
          style={{ filter: filterStyleCss }}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {/* Double-tap heart animation overlay */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-28 h-28 text-white fill-white drop-shadow-2xl animate-heart-burst" />
          </div>
        )}
      </div>

      {/* Actions Row */}
      <div className="px-3.5 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            {/* Like */}
            <button
              onClick={() => onLikeToggle(post.id)}
              className="group p-0.5 focus:outline-none transition-transform active:scale-125"
              aria-label={post.isLiked ? 'Unlike' : 'Like'}
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  post.isLiked
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-neutral-800 hover:text-neutral-500'
                }`}
              />
            </button>

            {/* Comment */}
            <button
              onClick={() => onOpenDetail(post)}
              className="p-0.5 text-neutral-800 hover:text-neutral-500 transition-colors focus:outline-none"
              aria-label="Comment"
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            {/* Share */}
            <button
              onClick={() => onSharePost(post)}
              className="p-0.5 text-neutral-800 hover:text-neutral-500 transition-colors focus:outline-none"
              aria-label="Share"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onSaveToggle(post.id)}
            className="p-0.5 focus:outline-none transition-transform active:scale-125"
            aria-label={post.isSaved ? 'Remove from saved' : 'Save post'}
          >
            <Bookmark
              className={`w-6 h-6 transition-colors ${
                post.isSaved
                  ? 'text-neutral-900 fill-neutral-900'
                  : 'text-neutral-800 hover:text-neutral-500'
              }`}
            />
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-semibold text-neutral-900 mb-1">
          {post.likesCount.toLocaleString()} {post.likesCount === 1 ? 'like' : 'likes'}
        </p>

        {/* Caption */}
        <div className="text-sm text-neutral-900 mb-1.5 leading-relaxed">
          <button
            onClick={() => onSelectUser && onSelectUser(post.user)}
            className="font-semibold mr-1.5 hover:underline"
          >
            {post.user.username}
          </button>
          <span>
            {isCaptionExpanded || post.caption.length <= 90
              ? post.caption
              : `${post.caption.slice(0, 90)}... `}
          </span>
          {post.caption.length > 90 && (
            <button
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className="text-neutral-500 text-xs font-medium ml-1 hover:text-neutral-800"
            >
              {isCaptionExpanded ? 'less' : 'more'}
            </button>
          )}
        </div>

        {/* View all comments */}
        {post.comments.length > 0 && (
          <button
            onClick={() => onOpenDetail(post)}
            className="text-xs text-neutral-500 font-medium mb-1 hover:text-neutral-800 block"
          >
            View all {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
          </button>
        )}

        {/* Preview latest comments */}
        <div className="space-y-1 mb-2">
          {post.comments.slice(-2).map((comment) => (
            <div key={comment.id} className="text-xs flex items-baseline justify-between">
              <div>
                <span className="font-semibold text-neutral-900 mr-1.5">
                  {comment.username}
                </span>
                <span className="text-neutral-800">{comment.text}</span>
              </div>
              <button className="text-neutral-400 hover:text-rose-500 transition-colors">
                <Heart className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-2 font-medium">
          {post.timestamp}
        </span>
      </div>

      {/* Inline Comment Composer */}
      <form
        onSubmit={handleCommentSubmit}
        className="border-t border-neutral-100 px-3.5 py-2.5 flex items-center gap-2"
      >
        <div className="flex items-center gap-1.5 text-base">
          <button
            type="button"
            onClick={() => setCommentInput((prev) => prev + '❤️')}
            className="hover:scale-125 transition-transform"
          >
            ❤️
          </button>
          <button
            type="button"
            onClick={() => setCommentInput((prev) => prev + '🏺')}
            className="hover:scale-125 transition-transform"
          >
            🏺
          </button>
          <button
            type="button"
            onClick={() => setCommentInput((prev) => prev + '✨')}
            className="hover:scale-125 transition-transform"
          >
            ✨
          </button>
        </div>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 text-xs bg-transparent focus:outline-none placeholder:text-neutral-400 text-neutral-900"
        />
        {commentInput.trim() && (
          <button
            type="submit"
            className="text-xs font-semibold text-sky-500 hover:text-sky-700 transition-colors"
          >
            Post
          </button>
        )}
      </form>
    </article>
  );
};
