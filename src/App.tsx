import React, { useState } from 'react';
import { 
  User, 
  Post, 
  Story, 
  Reel, 
  ChatThread, 
  AppNotification, 
  ActiveTab 
} from './types/instagram';
import { 
  CURRENT_USER, 
  INITIAL_POSTS, 
  INITIAL_STORIES, 
  INITIAL_REELS, 
  INITIAL_EXPLORE_ITEMS, 
  INITIAL_THREADS, 
  INITIAL_NOTIFICATIONS, 
  USERS 
} from './data/mockData';

// Components
import { TopNavbar } from './components/Navigation/TopNavbar';
import { BottomTabBar } from './components/Navigation/BottomTabBar';
import { StoriesBar } from './components/Feed/StoriesBar';
import { PostCard } from './components/Feed/PostCard';
import { ExploreScreen } from './components/Explore/ExploreScreen';
import { ReelsScreen } from './components/Reels/ReelsScreen';
import { DirectMessagesScreen } from './components/DirectMessages/DirectMessagesScreen';
import { NotificationsDrawer } from './components/Notifications/NotificationsDrawer';
import { ProfileScreen } from './components/Profile/ProfileScreen';

// Modals
import { StoryViewerModal } from './components/Modals/StoryViewerModal';
import { CreatePostModal } from './components/Create/CreatePostModal';
import { PostDetailModal } from './components/Modals/PostDetailModal';
import { ShareModal } from './components/Modals/ShareModal';
import { EditProfileModal } from './components/Profile/EditProfileModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Core Data States
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set(['post_1', 'post_3']));

  // Modal States
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [shareItem, setShareItem] = useState<Post | Reel | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [suggestedFollows, setSuggestedFollows] = useState<Record<string, boolean>>({});

  // 1. Post Like Handler
  const handleLikeToggle = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );

    // Sync detail modal if open
    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likesCount: !prev.isLiked ? prev.likesCount + 1 : prev.likesCount - 1,
            }
          : null
      );
    }
  };

  // 2. Post Save / Bookmark Handler
  const handleSaveToggle = (postId: string) => {
    setSavedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );

    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  // 3. Add Comment to Post
  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );

    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
    }
  };

  // 4. Publish New Post
  const handlePublishPost = (newPostData: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'isLiked' | 'isSaved' | 'comments'>) => {
    const createdPost: Post = {
      ...newPostData,
      id: `post_${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 1,
      isLiked: false,
      isSaved: false,
      comments: [],
    };

    setPosts([createdPost, ...posts]);
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: prev.postsCount + 1,
    }));
    setActiveTab('feed');
  };

  // 5. Reel Like Handler
  const handleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const isLiked = !r.isLiked;
          return {
            ...r,
            isLiked,
            likesCount: isLiked ? r.likesCount + 1 : r.likesCount - 1,
          };
        }
        return r;
      })
    );
  };

  // 6. Reel Save Handler
  const handleSaveReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === reelId ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  // 7. Send Direct Message
  const handleSendMessage = (threadId: string, text: string) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
      isSender: true,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...t.messages, newMessage],
          };
        }
        return t;
      })
    );

    // Auto smart response simulation after 1.2 seconds!
    setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            const replies = [
              'Obsessed with the new studio pottery drop! 🏺',
              'Can’t wait to see your exhibit in person!',
              'Sending you so much creative inspiration today ✨',
              'Let’s grab coffee soon and catch up!',
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const autoMsg = {
              id: `msg_auto_${Date.now()}`,
              senderId: t.participant.id,
              text: randomReply,
              timestamp: 'Just now',
              isSender: false,
            };
            return {
              ...t,
              lastMessage: randomReply,
              lastTimestamp: 'Just now',
              messages: [...t.messages, autoMsg],
            };
          }
          return t;
        })
      );
    }, 1200);
  };

  const handleSendHeartInThread = (threadId: string) => {
    handleSendMessage(threadId, '❤️');
  };

  // 8. Story Reply
  const handleSendStoryReply = (story: Story, text: string) => {
    // Look up or find contact
    const matchingThread = threads.find((t) => t.participant.id === story.user.id);
    if (matchingThread) {
      handleSendMessage(matchingThread.id, `Story reply: ${text}`);
    }
  };

  // 9. Notifications Follow Toggle
  const handleToggleFollowNotification = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === notifId) {
          const isFollowing = !n.isFollowing;
          return { ...n, isFollowing };
        }
        return n;
      })
    );
  };

  // 10. Suggested follow toggle
  const toggleSuggestedFollow = (username: string) => {
    setSuggestedFollows((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const unreadMessagesCount = threads.reduce((acc, t) => acc + t.unreadCount, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const savedPosts = posts.filter((p) => savedPostIds.has(p.id));

  return (
    <div className={`min-h-screen bg-neutral-100 flex flex-col items-center justify-start ${isMobileFrame ? 'py-4 sm:py-8' : ''}`}>
      {/* Container: If mobile frame mode is on, wrap in smartphone border frame */}
      <div 
        className={`w-full bg-white flex flex-col transition-all duration-300 relative ${
          isMobileFrame 
            ? 'max-w-[430px] min-h-[880px] rounded-[48px] shadow-2xl border-[10px] border-neutral-900 overflow-hidden ring-1 ring-neutral-950/20'
            : 'max-w-5xl min-h-screen sm:shadow-sm sm:border-x sm:border-neutral-200'
        }`}
      >
        {/* Mobile Device Speaker Notch Indicator (when in phone frame) */}
        {isMobileFrame && (
          <div className="w-full pt-3 pb-1 bg-white flex items-center justify-center">
            <div className="w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 ml-auto mr-2" />
            </div>
          </div>
        )}

        {/* Top Navbar */}
        <TopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadMessagesCount={unreadMessagesCount}
          unreadNotificationsCount={unreadNotificationsCount}
          isMobileFrame={isMobileFrame}
          setIsMobileFrame={setIsMobileFrame}
          onOpenCreate={() => setIsCreateOpen(true)}
        />

        {/* Main Content Body */}
        <main className="flex-1 w-full overflow-y-auto no-scrollbar">
          {/* TAB 1: FEED */}
          {activeTab === 'feed' && (
            <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 pb-16">
              {/* Left/Center Column: Stories & Posts */}
              <div className="w-full max-w-lg mx-auto">
                {/* Stories Carousel */}
                <StoriesBar
                  stories={stories}
                  currentUser={currentUser}
                  onSelectStory={(s) => setSelectedStory(s)}
                  onAddStory={() => setIsCreateOpen(true)}
                />

                {/* Posts Feed */}
                <div className="space-y-4 pt-1 sm:pt-3">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      onLikeToggle={handleLikeToggle}
                      onSaveToggle={handleSaveToggle}
                      onAddComment={handleAddComment}
                      onSharePost={(p) => setShareItem(p)}
                      onOpenDetail={(p) => setDetailPost(p)}
                      onSelectUser={() => setActiveTab('profile')}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Suggested Accounts (visible on desktop view) */}
              {!isMobileFrame && (
                <div className="hidden lg:block w-72 sticky top-20 pt-4">
                  {/* Current User Row */}
                  <div className="flex items-center justify-between mb-5">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="flex items-center gap-3 text-left group"
                    >
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-neutral-200"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-900 block group-hover:underline">
                          {currentUser.username}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {currentUser.name}
                        </span>
                      </div>
                    </button>
                    <button 
                      onClick={() => setIsEditProfileOpen(true)}
                      className="text-xs font-semibold text-sky-500 hover:text-sky-700"
                    >
                      Switch
                    </button>
                  </div>

                  {/* Suggestions Header */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-neutral-500">
                      Suggested for you
                    </span>
                    <button className="font-semibold text-neutral-800 hover:text-neutral-500">
                      See All
                    </button>
                  </div>

                  {/* Suggested Creators */}
                  <div className="space-y-3">
                    {Object.values(USERS).slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-semibold text-neutral-900 truncate max-w-[120px]">
                              {user.username}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              Followed by maya + 4 more
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSuggestedFollow(user.username)}
                          className={`text-xs font-semibold transition-colors ${
                            suggestedFollows[user.username]
                              ? 'text-neutral-400'
                              : 'text-sky-500 hover:text-sky-700'
                          }`}
                        >
                          {suggestedFollows[user.username] ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Quiet Editorial Footer */}
                  <div className="mt-8 text-[11px] text-neutral-400 leading-normal space-y-3">
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      <span className="hover:underline cursor-pointer">About</span> ·
                      <span className="hover:underline cursor-pointer">Help</span> ·
                      <span className="hover:underline cursor-pointer">Press</span> ·
                      <span className="hover:underline cursor-pointer">API</span> ·
                      <span className="hover:underline cursor-pointer">Jobs</span> ·
                      <span className="hover:underline cursor-pointer">Privacy</span> ·
                      <span className="hover:underline cursor-pointer">Terms</span>
                    </div>
                    <p>© 2026 INSTAGRAM FROM META</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXPLORE */}
          {activeTab === 'explore' && (
            <ExploreScreen
              exploreItems={INITIAL_EXPLORE_ITEMS}
              allPosts={posts}
              onOpenDetail={(p) => setDetailPost(p)}
              currentUser={currentUser}
            />
          )}

          {/* TAB 3: REELS */}
          {activeTab === 'reels' && (
            <div className="py-2 pb-16 flex items-center justify-center">
              <ReelsScreen
                reels={reels}
                currentUser={currentUser}
                onLikeReel={handleLikeReel}
                onSaveReel={handleSaveReel}
                onShareReel={(r) => setShareItem(r)}
              />
            </div>
          )}

          {/* TAB 4: DIRECT MESSAGES */}
          {activeTab === 'messages' && (
            <DirectMessagesScreen
              threads={threads}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onSendHeart={handleSendHeartInThread}
            />
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <NotificationsDrawer
              notifications={notifications}
              onToggleFollow={handleToggleFollowNotification}
              onClearAll={() => setNotifications([])}
            />
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <ProfileScreen
              user={currentUser}
              posts={posts}
              reels={reels}
              savedPosts={savedPosts}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onOpenPostDetail={(p) => setDetailPost(p)}
              onOpenHighlight={() => setSelectedStory(stories[0])}
            />
          )}
        </main>

        {/* Bottom Tab Bar (Mobile/Touch Standard) */}
        <BottomTabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onOpenCreate={() => setIsCreateOpen(true)}
        />
      </div>

      {/* ============ MODALS ============ */}

      {/* 1. Fullscreen Story Viewer Modal */}
      {selectedStory && (
        <StoryViewerModal
          stories={stories}
          initialStory={selectedStory}
          onClose={() => setSelectedStory(null)}
          onSendStoryReply={handleSendStoryReply}
        />
      )}

      {/* 2. Create Post Modal with Filters */}
      {isCreateOpen && (
        <CreatePostModal
          currentUser={currentUser}
          onClose={() => setIsCreateOpen(false)}
          onPublishPost={handlePublishPost}
        />
      )}

      {/* 3. Post Detail / Comments Modal */}
      {detailPost && (
        <PostDetailModal
          post={detailPost}
          currentUser={currentUser}
          onClose={() => setDetailPost(null)}
          onLikeToggle={handleLikeToggle}
          onSaveToggle={handleSaveToggle}
          onAddComment={handleAddComment}
          onSharePost={(p) => setShareItem(p)}
        />
      )}

      {/* 4. Share to Contacts Modal */}
      {shareItem && (
        <ShareModal
          post={shareItem}
          onClose={() => setShareItem(null)}
          onSendToUser={(recipient) => {
            // Find or create thread
            const thread = threads.find((t) => t.participant.id === recipient.id);
            if (thread) {
              handleSendMessage(thread.id, `Shared a post with you!`);
            }
          }}
        />
      )}

      {/* 5. Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={(updated) => {
            setCurrentUser((prev) => ({ ...prev, ...updated }));
          }}
        />
      )}
    </div>
  );
}
