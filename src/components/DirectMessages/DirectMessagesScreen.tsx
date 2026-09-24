import React, { useState } from 'react';
import { Search, Send, Heart, Phone, Video, Info, Smile } from 'lucide-react';
import { ChatThread, User, Message } from '../../types/instagram';

interface DirectMessagesScreenProps {
  threads: ChatThread[];
  currentUser: User;
  onSendMessage: (threadId: string, text: string) => void;
  onSendHeart: (threadId: string) => void;
}

export const DirectMessagesScreen: React.FC<DirectMessagesScreenProps> = ({
  threads,
  currentUser,
  onSendMessage,
  onSendHeart,
}) => {
  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  const filteredThreads = threads.filter((t) =>
    t.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-120px)] min-h-[550px] bg-white border border-neutral-200 rounded-none sm:rounded-xl shadow-xs overflow-hidden flex my-2">
      {/* Thread list (Sidebar) */}
      <div className={`w-full sm:w-80 border-r border-neutral-200 flex flex-col ${selectedThreadId && 'hidden sm:flex'}`}>
        {/* User Handle & Edit Icon */}
        <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between">
          <span className="font-bold text-sm text-neutral-900">
            {currentUser.username}
          </span>
          <span className="text-xs text-neutral-500 font-medium">Messages</span>
        </div>

        {/* Search */}
        <div className="p-2.5 border-b border-neutral-100">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search direct messages"
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Active Online Row */}
        <div className="py-2.5 px-3 border-b border-neutral-100 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3">
            {threads.map((t) => (
              <button
                key={`bubble_${t.id}`}
                onClick={() => setSelectedThreadId(t.id)}
                className="flex flex-col items-center gap-1 min-w-[56px] focus:outline-none"
              >
                <div className="relative">
                  <img
                    src={t.participant.avatar}
                    alt={t.participant.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                  />
                  {t.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <span className="text-[10px] text-neutral-600 truncate max-w-[56px]">
                  {t.participant.username.split('.')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Thread items */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThread?.id;
            return (
              <button
                key={thread.id}
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full p-3 flex items-center gap-3 text-left transition-colors ${
                  isSelected ? 'bg-neutral-100/80' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.participant.avatar}
                    alt={thread.participant.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {thread.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-900 truncate">
                      {thread.participant.name}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {thread.lastTimestamp}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate ${
                      thread.unreadCount > 0
                        ? 'font-semibold text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {thread.lastMessage}
                  </p>
                </div>
                {thread.unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation Window */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Conversation Header */}
          <div className="h-14 px-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedThreadId('')}
                className="sm:hidden text-xs text-neutral-600 font-medium"
              >
                ← Back
              </button>
              <img
                src={activeThread.participant.avatar}
                alt={activeThread.participant.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-900">
                  {activeThread.participant.name}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {activeThread.isOnline ? 'Active now' : 'Active 2h ago'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-700">
              <button className="p-1.5 hover:bg-neutral-100 rounded-full">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-neutral-100 rounded-full">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-neutral-100 rounded-full">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/50">
            {/* Contact Card Header in chat */}
            <div className="flex flex-col items-center py-6 text-center">
              <img
                src={activeThread.participant.avatar}
                alt={activeThread.participant.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover shadow-sm mb-2"
              />
              <span className="text-sm font-bold text-neutral-900">
                {activeThread.participant.name}
              </span>
              <span className="text-xs text-neutral-500 mb-2">
                @{activeThread.participant.username} · Instagram
              </span>
              <span className="text-[11px] text-neutral-400 max-w-xs">
                {activeThread.participant.bio}
              </span>
            </div>

            {/* Bubble list */}
            {activeThread.messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.isSender ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.isSender
                      ? 'bg-sky-500 text-white rounded-br-xs'
                      : 'bg-neutral-200 text-neutral-900 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-neutral-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-neutral-200 flex items-center gap-2 bg-white"
          >
            <button
              type="button"
              onClick={() => setInputText((prev) => prev + ' ✨')}
              className="text-neutral-500 hover:text-neutral-800"
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message..."
              className="flex-1 py-2 px-3 bg-neutral-100 rounded-full text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
            {inputText.trim() ? (
              <button
                type="submit"
                className="p-2 text-sky-500 hover:text-sky-700 font-semibold text-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSendHeart(activeThread.id)}
                className="p-2 text-rose-500 hover:scale-125 transition-transform"
              >
                <Heart className="w-5 h-5 fill-rose-500" />
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="flex-1 hidden sm:flex flex-col items-center justify-center text-center p-8 text-neutral-500">
          <Send className="w-12 h-12 stroke-[1] mb-2 text-neutral-400" />
          <h4 className="text-base font-semibold text-neutral-800">Your Messages</h4>
          <p className="text-xs text-neutral-500">
            Send private photos, studio messages, and posts to a friend.
          </p>
        </div>
      )}
    </div>
  );
};
