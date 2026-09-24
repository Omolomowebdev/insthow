import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { User } from '../../types/instagram';
import { IMAGES } from '../../data/mockData';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website || '');
  const [avatar, setAvatar] = useState(user.avatar);

  const avatarsList = [
    { label: 'Elena (Studio Portrait)', url: IMAGES.elenaPortrait },
    { label: 'Ceramics Focus', url: IMAGES.studioCeramics },
    { label: 'Morning Flatlay', url: IMAGES.morningCoffee },
    { label: 'Exhibition', url: IMAGES.artGallery },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      username,
      bio,
      website,
      avatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>
          <h2 className="text-sm font-semibold text-neutral-900">
            Edit profile
          </h2>
          <button
            onClick={handleSubmit}
            className="text-xs font-semibold text-sky-500 hover:text-sky-700"
          >
            Done
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Avatar Change */}
          <div className="flex flex-col items-center gap-3 py-2 bg-neutral-50 rounded-xl p-4 border border-neutral-100">
            <div className="w-20 h-20 rounded-full story-ring-gradient p-[2px]">
              <div className="w-full h-full rounded-full bg-white p-[1px]">
                <img
                  src={avatar}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs font-bold text-neutral-800">
              Change Profile Photo
            </span>

            {/* Quick avatar selection */}
            <div className="flex items-center gap-2">
              {avatarsList.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setAvatar(item.url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform ${
                    avatar === item.url
                      ? 'border-sky-500 scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  title={item.label}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
            />
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
            />
          </div>

          {/* Website Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Website
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://elenavance.studio"
              className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Bio
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 resize-none leading-relaxed"
            />
            <span className="text-[10px] text-neutral-400 block mt-1">
              {bio.length} / 150 characters
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
