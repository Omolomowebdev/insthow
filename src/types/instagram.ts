export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  website?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  isFollowed?: boolean;
  isCurrentUser?: boolean;
  highlights?: Highlight[];
}

export interface Highlight {
  id: string;
  title: string;
  coverImage: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrls: string[];
  caption: string;
  location?: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
  filter?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface Story {
  id: string;
  user: User;
  mediaUrl: string;
  timestamp: string;
  hasViewed: boolean;
}

export interface Reel {
  id: string;
  user: User;
  mediaUrl: string;
  caption: string;
  audioTitle: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  tags?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSender: boolean;
}

export interface ChatThread {
  id: string;
  participant: User;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  isOnline?: boolean;
  messages: Message[];
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  postImage?: string;
  commentText?: string;
  timestamp: string;
  isRead: boolean;
  isFollowing?: boolean;
}

export type ActiveTab = 'feed' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'create';

export type FilterType = 
  | 'none' 
  | 'clarendon' 
  | 'juno' 
  | 'ludwig' 
  | 'valencia' 
  | 'gingham' 
  | 'lark' 
  | 'slumber'
  | 'mono';
