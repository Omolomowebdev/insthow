import { User, Post, Story, Reel, ChatThread, AppNotification } from '../types/instagram';

// Local generated assets
export const IMAGES = {
  elenaPortrait: '/src/assets/images/elena_portrait_1790233375660.jpg',
  studioCeramics: '/src/assets/images/studio_ceramic_vessels_1790233386340.jpg',
  morningCoffee: '/src/assets/images/botanical_morning_coffee_1790233395984.jpg',
  artGallery: '/src/assets/images/editorial_art_gallery_1790233406192.jpg',
  potteryWheel: '/src/assets/images/reels_pottery_wheel_1790233417826.jpg',
};

// Current logged in user (Elena Vance)
export const CURRENT_USER: User = {
  id: 'user_elena',
  username: 'elena.vance',
  name: 'Elena Vance',
  avatar: IMAGES.elenaPortrait,
  bio: 'Ceramicist & studio artist 🌿\nDocumenting messy clay processes, reduction firings & slow living in Ojai & SoHo.\nNew collection drops Friday 10am PST.',
  website: 'https://elenavance.studio',
  postsCount: 38,
  followersCount: 28400,
  followingCount: 542,
  isVerified: true,
  isCurrentUser: true,
  highlights: [
    { id: 'hl_1', title: 'Studio', coverImage: IMAGES.studioCeramics },
    { id: 'hl_2', title: 'Kiln Firings', coverImage: IMAGES.potteryWheel },
    { id: 'hl_3', title: 'Journal', coverImage: IMAGES.morningCoffee },
    { id: 'hl_4', title: 'Exhibits', coverImage: IMAGES.artGallery },
    { id: 'hl_5', title: 'Ojai Life', coverImage: IMAGES.elenaPortrait },
  ]
};

// Other users
export const USERS: Record<string, User> = {
  maya: {
    id: 'user_maya',
    username: 'maya.botanics',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Florist & botanical sculptor. Designing living installations across Brooklyn.',
    website: 'https://mayabotanics.com',
    postsCount: 142,
    followersCount: 19800,
    followingCount: 420,
    isVerified: true,
    isFollowed: true,
  },
  lucas: {
    id: 'user_lucas',
    username: 'lucas.nordic',
    name: 'Lucas Lindqvist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Architectural photographer based in Copenhagen. Chasing Scandinavian light & timber form.',
    website: 'https://lucasnordic.photo',
    postsCount: 89,
    followersCount: 43200,
    followingCount: 310,
    isVerified: false,
    isFollowed: false,
  },
  sophia: {
    id: 'user_sophia',
    username: 'sophia.atelier',
    name: 'Sophia Laurent',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Textile artisan & natural indigo dyer. Provence & Paris.',
    postsCount: 215,
    followersCount: 31500,
    followingCount: 680,
    isVerified: true,
    isFollowed: true,
  },
  julian: {
    id: 'user_julian',
    username: 'julian.roasts',
    name: 'Julian Thorne',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Pour over alchemist & micro-batch roaster. Melbourne coffee culture.',
    postsCount: 310,
    followersCount: 15400,
    followingCount: 290,
    isVerified: false,
    isFollowed: true,
  }
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    userId: CURRENT_USER.id,
    user: CURRENT_USER,
    imageUrls: [IMAGES.studioCeramics],
    caption: 'Fresh out of the reduction kiln at sunrise. These earthy ribbed vases and unglazed terra-cotta pieces represent 4 weeks of hand-throwing and testing raw local clay slips. Which silhouette is your favorite? ✨🏺',
    location: 'Ojai Studio Sanctuary, California',
    timestamp: '2 hours ago',
    likesCount: 1842,
    isLiked: false,
    isSaved: true,
    comments: [
      {
        id: 'c_1',
        userId: USERS.maya.id,
        username: USERS.maya.username,
        userAvatar: USERS.maya.avatar,
        text: 'The tall ribbed pitcher in the center is an absolute dream! Saving for my fall floral shoots 🌾',
        timestamp: '1h ago',
        likesCount: 24,
        isLiked: true,
      },
      {
        id: 'c_2',
        userId: USERS.sophia.id,
        username: USERS.sophia.username,
        userAvatar: USERS.sophia.avatar,
        text: 'That raw texture has so much depth Elena! Truly your finest series yet.',
        timestamp: '45m ago',
        likesCount: 8,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_2',
    userId: CURRENT_USER.id,
    user: CURRENT_USER,
    imageUrls: [IMAGES.morningCoffee],
    caption: 'Quiet studio rituals before the clay dust begins to fly. A warm oat flat white, fresh eucalyptus from the garden, and sketch notes for the upcoming gallery installation. Taking things slow this autumn.',
    location: 'Elena Vance Studio • SoHo',
    timestamp: '5 hours ago',
    likesCount: 934,
    isLiked: true,
    isSaved: false,
    comments: [
      {
        id: 'c_3',
        userId: USERS.julian.id,
        username: USERS.julian.username,
        userAvatar: USERS.julian.avatar,
        text: 'Pour looks silky! What beans are you brewing today?',
        timestamp: '3h ago',
        likesCount: 5,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_3',
    userId: CURRENT_USER.id,
    user: CURRENT_USER,
    imageUrls: [IMAGES.artGallery],
    caption: 'Opening night preview at Gallery No. 8. Seeing these monumental textured canvases hung alongside the sculptural vessels feels surreal. Thank you to everyone who walked in the rain to celebrate with us tonight 🕯️🤍',
    location: 'NoHo Contemporary Arts, New York',
    timestamp: '1 day ago',
    likesCount: 3218,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: 'c_4',
        userId: USERS.lucas.id,
        username: USERS.lucas.username,
        userAvatar: USERS.lucas.avatar,
        text: 'Incredible spatial lighting! The scale of those canvas pieces is striking.',
        timestamp: '18h ago',
        likesCount: 14,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_4',
    userId: CURRENT_USER.id,
    user: CURRENT_USER,
    imageUrls: [IMAGES.elenaPortrait],
    caption: 'A messy linen shirt, clay on my nose, and pure joy after finishing a 30-piece bespoke dinnerware commission. Grateful for this little studio corner and every single one of you who supports independent craft.',
    location: 'The Loft Studio, Ojai',
    timestamp: '3 days ago',
    likesCount: 4620,
    isLiked: true,
    isSaved: false,
    comments: [
      {
        id: 'c_5',
        userId: USERS.sophia.id,
        username: USERS.sophia.username,
        userAvatar: USERS.sophia.avatar,
        text: 'That smile says everything! You deserve all the blossoms and light 🌸',
        timestamp: '2d ago',
        likesCount: 39,
        isLiked: true,
      }
    ]
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_self',
    user: CURRENT_USER,
    mediaUrl: IMAGES.elenaPortrait,
    timestamp: '30m ago',
    hasViewed: false,
  },
  {
    id: 'story_1',
    user: USERS.maya,
    mediaUrl: IMAGES.morningCoffee,
    timestamp: '1h ago',
    hasViewed: false,
  },
  {
    id: 'story_2',
    user: USERS.lucas,
    mediaUrl: IMAGES.artGallery,
    timestamp: '3h ago',
    hasViewed: false,
  },
  {
    id: 'story_3',
    user: USERS.sophia,
    mediaUrl: IMAGES.studioCeramics,
    timestamp: '4h ago',
    hasViewed: true,
  },
  {
    id: 'story_4',
    user: USERS.julian,
    mediaUrl: IMAGES.potteryWheel,
    timestamp: '6h ago',
    hasViewed: true,
  }
];

export const INITIAL_REELS: Reel[] = [
  {
    id: 'reel_1',
    user: CURRENT_USER,
    mediaUrl: IMAGES.potteryWheel,
    caption: 'Centering 8lbs of grogged stoneware on the wheel. The sound of water, slip, and wet clay is the best form of meditation 🌀🎧',
    audioTitle: 'Elena Vance • Studio Ambient Sounds (Original Audio)',
    likesCount: 14200,
    commentsCount: 382,
    sharesCount: 1490,
    isLiked: true,
    isSaved: true,
    tags: ['#potterywheel', '#ceramics', '#studiolife', '#satisfyingcraft']
  },
  {
    id: 'reel_2',
    user: USERS.maya,
    mediaUrl: IMAGES.morningCoffee,
    caption: 'Arranging wild foraged dogwood and Japanese anemones for an autumn centerpiece 🍂🌿',
    audioTitle: 'Leon Bridges • Texas Sun (Acoustic Edit)',
    likesCount: 8930,
    commentsCount: 144,
    sharesCount: 520,
    isLiked: false,
    isSaved: false,
    tags: ['#botanicals', '#floralart', '#slowliving']
  },
  {
    id: 'reel_3',
    user: USERS.lucas,
    mediaUrl: IMAGES.artGallery,
    caption: 'Shadow studies at the modern wing. When 4pm sunlight cuts through brutalist concrete columns.',
    audioTitle: 'Max Richter • On The Nature of Daylight',
    likesCount: 22100,
    commentsCount: 419,
    sharesCount: 3120,
    isLiked: true,
    isSaved: false,
    tags: ['#architecture', '#minimalism', '#copenhagen']
  }
];

export const INITIAL_EXPLORE_ITEMS = [
  { id: 'exp_1', type: 'image' as const, url: IMAGES.studioCeramics, likes: 2310, comments: 45, isLarge: true },
  { id: 'exp_2', type: 'image' as const, url: IMAGES.elenaPortrait, likes: 4520, comments: 92, isLarge: false },
  { id: 'exp_3', type: 'image' as const, url: IMAGES.morningCoffee, likes: 1105, comments: 28, isLarge: false },
  { id: 'exp_4', type: 'image' as const, url: IMAGES.artGallery, likes: 3890, comments: 77, isLarge: false },
  { id: 'exp_5', type: 'reel' as const, url: IMAGES.potteryWheel, likes: 14200, comments: 382, isLarge: false },
  { id: 'exp_6', type: 'image' as const, url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', likes: 1820, comments: 33, isLarge: false },
  { id: 'exp_7', type: 'image' as const, url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', likes: 950, comments: 19, isLarge: false },
  { id: 'exp_8', type: 'image' as const, url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', likes: 2740, comments: 64, isLarge: false },
  { id: 'exp_9', type: 'image' as const, url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80', likes: 3410, comments: 85, isLarge: true },
  { id: 'exp_10', type: 'image' as const, url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', likes: 1420, comments: 31, isLarge: false },
  { id: 'exp_11', type: 'image' as const, url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', likes: 2190, comments: 42, isLarge: false },
  { id: 'exp_12', type: 'image' as const, url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80', likes: 1840, comments: 50, isLarge: false },
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'thread_maya',
    participant: USERS.maya,
    lastMessage: 'Are we still visiting the Ojai pottery fair this Saturday?',
    lastTimestamp: '12m ago',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm1', senderId: USERS.maya.id, text: 'Elena! Loved your new ceramic drop photo 🤍', timestamp: '10:14 AM', isSender: false },
      { id: 'm2', senderId: CURRENT_USER.id, text: 'Thank you Maya! It took so many glaze tests to get that matte sand tone.', timestamp: '10:18 AM', isSender: true },
      { id: 'm3', senderId: USERS.maya.id, text: 'Are we still visiting the Ojai pottery fair this Saturday?', timestamp: '10:22 AM', isSender: false },
    ]
  },
  {
    id: 'thread_sophia',
    participant: USERS.sophia,
    lastMessage: 'Sending the indigo linen swatches your way today!',
    lastTimestamp: '2h ago',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm4', senderId: CURRENT_USER.id, text: 'Sophia, did the linen samples arrive safely?', timestamp: 'Yesterday', isSender: true },
      { id: 'm5', senderId: USERS.sophia.id, text: 'Sending the indigo linen swatches your way today!', timestamp: '2h ago', isSender: false },
    ]
  },
  {
    id: 'thread_lucas',
    participant: USERS.lucas,
    lastMessage: 'The lighting in your new studio space is sublime.',
    lastTimestamp: '1d ago',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: 'm6', senderId: USERS.lucas.id, text: 'The lighting in your new studio space is sublime.', timestamp: '1d ago', isSender: false },
    ]
  },
  {
    id: 'thread_julian',
    participant: USERS.julian,
    lastMessage: 'Let me know when the custom espresso mugs are ready ☕',
    lastTimestamp: '2d ago',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm7', senderId: USERS.julian.id, text: 'Let me know when the custom espresso mugs are ready ☕', timestamp: '2d ago', isSender: false },
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'like',
    user: USERS.maya,
    postImage: IMAGES.studioCeramics,
    timestamp: '15m ago',
    isRead: false,
  },
  {
    id: 'notif_2',
    type: 'comment',
    user: USERS.sophia,
    postImage: IMAGES.studioCeramics,
    commentText: 'That raw texture has so much depth Elena!',
    timestamp: '45m ago',
    isRead: false,
  },
  {
    id: 'notif_3',
    type: 'follow',
    user: USERS.lucas,
    timestamp: '2h ago',
    isRead: true,
    isFollowing: false,
  },
  {
    id: 'notif_4',
    type: 'like',
    user: USERS.julian,
    postImage: IMAGES.morningCoffee,
    timestamp: '4h ago',
    isRead: true,
  },
  {
    id: 'notif_5',
    type: 'mention',
    user: USERS.maya,
    postImage: IMAGES.artGallery,
    commentText: 'Elena Vance and I collaborated on these organic vessels...',
    timestamp: '1d ago',
    isRead: true,
  }
];

export const PHOTO_FILTERS: { id: string; name: string; filterStyle: string }[] = [
  { id: 'none', name: 'Normal', filterStyle: 'none' },
  { id: 'clarendon', name: 'Clarendon', filterStyle: 'contrast(1.2) saturate(1.25)' },
  { id: 'juno', name: 'Juno', filterStyle: 'contrast(1.15) saturate(1.4) hue-rotate(-5deg)' },
  { id: 'ludwig', name: 'Ludwig', filterStyle: 'brightness(1.05) contrast(1.1) saturate(1.1)' },
  { id: 'valencia', name: 'Valencia', filterStyle: 'sepia(0.25) contrast(1.08) brightness(1.08)' },
  { id: 'gingham', name: 'Gingham', filterStyle: 'brightness(1.05) hue-rotate(-10deg)' },
  { id: 'lark', name: 'Lark', filterStyle: 'contrast(0.9) brightness(1.1) saturate(1.2)' },
  { id: 'slumber', name: 'Slumber', filterStyle: 'saturate(0.66) brightness(1.05) sepia(0.35)' },
  { id: 'mono', name: 'Moon', filterStyle: 'grayscale(1) contrast(1.1) brightness(1.1)' },
];
