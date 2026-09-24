import React, { useState } from 'react';
import { X, Search, Check, Link, Send } from 'lucide-react';
import { Post, Reel, User } from '../../types/instagram';
import { USERS } from '../../data/mockData';

interface ShareModalProps {
  post: Post | Reel;
  onClose: () => void;
  onSendToUser: (recipient: User, note?: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  post,
  onClose,
  onSendToUser,
}) => {
  const [copied, setCopied] = useState(false);
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  const contactsList = Object.values(USERS);

  const handleSend = (user: User) => {
    setSentMap((prev) => ({ ...prev, [user.id]: true }));
    onSendToUser(user);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-900">Share</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-neutral-100">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="p-2 max-h-60 overflow-y-auto divide-y divide-neutral-50">
          {contactsList.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-neutral-900">
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    @{contact.username}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSend(contact)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  sentMap[contact.id]
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-sky-500 hover:bg-sky-600 text-white'
                }`}
              >
                {sentMap[contact.id] ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Sent
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Copy Link Footer */}
        <div className="p-3 border-t border-neutral-100 bg-neutral-50">
          <button
            onClick={handleCopy}
            className="w-full py-2 px-3 bg-white border border-neutral-200 hover:bg-neutral-100 rounded-xl text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Link className="w-4 h-4 text-neutral-500" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
