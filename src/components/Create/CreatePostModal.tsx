import React, { useState, useRef } from 'react';
import { X, Upload, MapPin, Smile, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { User, Post, FilterType } from '../../types/instagram';
import { PHOTO_FILTERS, IMAGES } from '../../data/mockData';

interface CreatePostModalProps {
  currentUser: User;
  onClose: () => void;
  onPublishPost: (newPost: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'isLiked' | 'isSaved' | 'comments'>) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  currentUser,
  onClose,
  onPublishPost,
}) => {
  const [step, setStep] = useState<'select' | 'filter' | 'details'>('select');
  const [selectedImage, setSelectedImage] = useState<string>(IMAGES.studioCeramics);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Ojai Studio, California');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick preset studio pictures
  const presetPhotos = [
    { label: 'Ceramics', url: IMAGES.studioCeramics },
    { label: 'Morning Coffee', url: IMAGES.morningCoffee },
    { label: 'Art Gallery', url: IMAGES.artGallery },
    { label: 'Elena Portrait', url: IMAGES.elenaPortrait },
    { label: 'Pottery Wheel', url: IMAGES.potteryWheel },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setStep('filter');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setSelectedImage(url);
    setStep('filter');
  };

  const activeFilterObj = PHOTO_FILTERS.find((f) => f.id === selectedFilter);
  const currentFilterCss = activeFilterObj ? activeFilterObj.filterStyle : 'none';

  const handleShare = () => {
    onPublishPost({
      userId: currentUser.id,
      user: currentUser,
      imageUrls: [selectedImage],
      caption: caption || 'New piece fresh from the studio ✨',
      location: location || undefined,
      filter: selectedFilter,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          {step === 'select' ? (
            <div className="w-8" />
          ) : (
            <button
              onClick={() => setStep(step === 'details' ? 'filter' : 'select')}
              className="p-1 text-neutral-600 hover:text-neutral-900 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <h2 className="text-sm font-semibold text-neutral-900">
            {step === 'select' && 'Create new post'}
            {step === 'filter' && 'Choose Filter'}
            {step === 'details' && 'Create Post'}
          </h2>

          <div className="flex items-center gap-2">
            {step === 'filter' && (
              <button
                onClick={() => setStep('details')}
                className="text-xs font-semibold text-sky-500 hover:text-sky-700"
              >
                Next
              </button>
            )}
            {step === 'details' && (
              <button
                onClick={handleShare}
                className="text-xs font-semibold text-sky-500 hover:text-sky-700"
              >
                Share
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row min-h-[420px] max-h-[70vh] overflow-y-auto">
          {/* STEP 1: SELECT IMAGE */}
          {step === 'select' && (
            <div className="w-full p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 mb-4">
                <Upload className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-1">
                Upload photos from your computer
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mb-6">
                Share what you're making, studio moments, or finished ceramic pieces.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors mb-6"
              >
                Select from Computer
              </button>

              {/* Or Pick from Studio Photos */}
              <div className="w-full max-w-md pt-4 border-t border-neutral-100">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                  Or select from Studio Gallery
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {presetPhotos.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handleSelectPreset(preset.url)}
                      className="group flex flex-col items-center gap-1 focus:outline-none"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-sky-500 transition-colors shadow-xs">
                        <img
                          src={preset.url}
                          alt={preset.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-neutral-600 truncate max-w-full font-medium">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FILTERS */}
          {step === 'filter' && (
            <div className="w-full flex flex-col md:flex-row">
              {/* Preview image */}
              <div className="flex-1 bg-neutral-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-lg bg-black">
                  <img
                    src={selectedImage}
                    alt="Filter Preview"
                    referrerPolicy="no-referrer"
                    style={{ filter: currentFilterCss }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Filters Sidebar */}
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-neutral-200 p-4 bg-neutral-50 flex flex-col gap-3">
                <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instagram Filters
                </span>
                <div className="grid grid-cols-3 md:grid-cols-2 gap-2 overflow-y-auto max-h-[360px] pr-1">
                  {PHOTO_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id as FilterType)}
                      className={`flex flex-col items-center gap-1 p-1 rounded-lg border transition-all ${
                        selectedFilter === f.id
                          ? 'border-sky-500 bg-sky-50/50 shadow-xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="w-16 h-16 rounded overflow-hidden">
                        <img
                          src={selectedImage}
                          alt={f.name}
                          referrerPolicy="no-referrer"
                          style={{ filter: f.filterStyle }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-800">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS */}
          {step === 'details' && (
            <div className="w-full flex flex-col md:flex-row">
              {/* Left preview thumbnail */}
              <div className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-md">
                  <img
                    src={selectedImage}
                    alt="Post media"
                    referrerPolicy="no-referrer"
                    style={{ filter: currentFilterCss }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right form details */}
              <div className="w-full md:w-1/2 p-5 flex flex-col gap-4">
                {/* Author row */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-neutral-900">
                    {currentUser.username}
                  </span>
                </div>

                {/* Caption input */}
                <div className="flex flex-col">
                  <textarea
                    rows={4}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full text-xs text-neutral-800 p-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 resize-none"
                  />
                  <div className="flex items-center justify-between mt-1 text-neutral-400">
                    <button
                      type="button"
                      onClick={() => setCaption((prev) => prev + ' 🌿')}
                      className="text-neutral-500 hover:text-neutral-700"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    <span className="text-[10px]">{caption.length}/2,200</span>
                  </div>
                </div>

                {/* Location Input */}
                <div className="flex items-center gap-2 px-3 py-2 border border-neutral-200 rounded-lg text-xs">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="w-full bg-transparent focus:outline-none text-neutral-800"
                  />
                </div>

                {/* Advanced Settings Checklist */}
                <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span>Tag people</span>
                    <span className="text-neutral-400 font-medium">Add tags</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Share to Facebook</span>
                    <Check className="w-4 h-4 text-sky-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
