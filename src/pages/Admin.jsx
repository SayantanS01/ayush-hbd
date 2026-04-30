import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Save, LogOut, Image as ImageIcon, Type, Palette, Music, Sparkles, Gift } from 'lucide-react';

const Admin = () => {
  const { content, updateContent, isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Wrong password, little villain!');
    }
  };

  const updateWish = (index, value) => {
    const newWishes = [...content.wishes];
    newWishes[index] = value;
    updateContent({ wishes: newWishes });
  };

  if (!isAdmin) {
    return (
      <div className="pt-32 pb-32 px-6 min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-cartoon max-w-md w-full bg-white p-8"
        >
          <div className="text-6xl text-center mb-6">🔒</div>
          <h2 className="text-3xl text-center mb-8 font-comic">SECRET HQ LOGIN</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-comic mb-2">SECRET CODE</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full comic-input"
                placeholder="Enter password..."
              />
            </div>
            {error && <p className="text-cartoon-red font-comic text-sm">{error}</p>}
            <button type="submit" className="w-full btn-cartoon bg-cartoon-blue text-white">
              ACCESS DASHBOARD
            </button>
            <p className="text-center text-xs text-gray-400">Hint: ayush2026</p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-5xl text-cartoon-blue hero-text">MISSION CONTROL</h1>
          <button onClick={logout} className="btn-cartoon bg-cartoon-red text-white text-sm">
            <LogOut size={18} /> LOGOUT
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 shrink-0">
            {[
              { id: 'home', icon: Type, label: 'Home Page' },
              { id: 'gallery', icon: ImageIcon, label: 'Super Gallery' },
              { id: 'games-wishes', icon: Sparkles, label: 'Games & Wishes' },
              { id: 'surprise', icon: Gift, label: 'Surprise Reveal' },
              { id: 'settings', icon: Palette, label: 'Theme & Music' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-comic transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-cartoon-yellow shadow-cartoon translate-x-1' : 'hover:bg-gray-200'
                }`}
              >
                <tab.icon size={20} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-grow">
            <div className="card-cartoon bg-white p-8">
              
              {/* HOME PAGE TAB */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  <h3 className="text-3xl text-cartoon-red mb-6">Home Hero Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-comic mb-2">Birthday Child's Name</label>
                      <input 
                        type="text" 
                        value={content.birthdayName}
                        onChange={(e) => updateContent({ birthdayName: e.target.value })}
                        className="w-full comic-input"
                      />
                    </div>
                    <div>
                      <label className="block font-comic mb-2">Hero Subtitle (Top)</label>
                      <input 
                        type="text" 
                        value={content.heroSubtitle}
                        onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                        className="w-full comic-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-comic mb-2">Hero Main Title</label>
                    <input 
                      type="text" 
                      value={content.heroTitle}
                      onChange={(e) => updateContent({ heroTitle: e.target.value })}
                      className="w-full comic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-comic mb-2">Hero Welcome Message</label>
                    <textarea 
                      value={content.mainMessage}
                      onChange={(e) => updateContent({ mainMessage: e.target.value })}
                      className="w-full comic-input h-24"
                    />
                  </div>
                </div>
              )}

              {/* GALLERY TAB */}
              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  <h3 className="text-3xl text-cartoon-blue mb-6">Gallery Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b-2 border-dashed border-gray-200">
                    <div>
                      <label className="block font-comic mb-2">Gallery Title</label>
                      <input 
                        type="text" 
                        value={content.galleryTitle}
                        onChange={(e) => updateContent({ galleryTitle: e.target.value })}
                        className="w-full comic-input"
                      />
                    </div>
                    <div>
                      <label className="block font-comic mb-2">Gallery Subtitle</label>
                      <input 
                        type="text" 
                        value={content.gallerySubtitle}
                        onChange={(e) => updateContent({ gallerySubtitle: e.target.value })}
                        className="w-full comic-input"
                      />
                    </div>
                  </div>

                  <h4 className="text-xl font-comic">Manage 20 Images</h4>
                  <div className="columns-2 sm:columns-3 lg:columns-5 gap-4 space-y-4">
                    {content.images.map((img, idx) => (
                      <div key={img.id} className="relative group border-2 border-black rounded-xl overflow-hidden bg-white break-inside-avoid">
                        <img src={img.url} className="w-full h-auto block" />
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white">
                          <p className="text-[10px] mb-1">Image #{idx + 1}</p>
                          
                          {/* File Upload Button */}
                          <label className="w-full mb-2">
                            <div className="btn-cartoon bg-cartoon-blue text-[8px] py-1 px-2 cursor-pointer text-center">
                              UPLOAD FILE
                            </div>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                // Show local preview immediately
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const newImages = [...content.images];
                                  newImages[idx].url = event.target.result;
                                  updateContent({ images: newImages });
                                };
                                reader.readAsDataURL(file);

                                // If Supabase is connected, upload to storage
                                if (supabase) {
                                  try {
                                    const fileName = `photo-${Date.now()}-${file.name}`;
                                    const { data, error } = await supabase.storage
                                      .from('photos')
                                      .upload(fileName, file);
                                    
                                    if (error) throw error;

                                    const { data: { publicUrl } } = supabase.storage
                                      .from('photos')
                                      .getPublicUrl(data.path);

                                    const newImages = [...content.images];
                                    newImages[idx].url = publicUrl;
                                    updateContent({ images: newImages });
                                  } catch (err) {
                                    console.error("Supabase upload failed:", err);
                                    alert("Cloud upload failed. Using local preview only.");
                                  }
                                }
                              }}
                            />
                          </label>

                          <div className="w-full text-center text-[8px] mb-1">-- OR --</div>

                          <input 
                            type="text" 
                            placeholder="Paste URL..." 
                            className="w-full text-[8px] p-1 rounded mb-2 text-black"
                            value={img.url.startsWith('data:') ? 'Local File' : img.url}
                            onChange={(e) => {
                              const newImages = [...content.images];
                              newImages[idx].url = e.target.value;
                              updateContent({ images: newImages });
                            }}
                          />
                          <select 
                            className="w-full text-[10px] p-1 rounded text-black"
                            value={img.page}
                            onChange={(e) => {
                              const newImages = [...content.images];
                              newImages[idx].page = e.target.value;
                              updateContent({ images: newImages });
                            }}
                          >
                            <option value="gallery">Gallery</option>
                            <option value="home">Home</option>
                            <option value="wishes">Wishes</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GAMES & WISHES TAB */}
              {activeTab === 'games-wishes' && (
                <div className="space-y-10">
                  <section>
                    <h3 className="text-3xl text-cartoon-purple mb-6">Games Page Text</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-comic mb-2">Games Title</label>
                        <input 
                          type="text" 
                          value={content.gamesTitle}
                          onChange={(e) => updateContent({ gamesTitle: e.target.value })}
                          className="w-full comic-input"
                        />
                      </div>
                      <div>
                        <label className="block font-comic mb-2">Games Subtitle</label>
                        <input 
                          type="text" 
                          value={content.gamesSubtitle}
                          onChange={(e) => updateContent({ gamesSubtitle: e.target.value })}
                          className="w-full comic-input"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="pt-8 border-t-2 border-dashed border-gray-200">
                    <h3 className="text-3xl text-cartoon-pink mb-6">Wishes Page Content</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block font-comic mb-2">Wishes Page Title</label>
                        <input 
                          type="text" 
                          value={content.wishesTitle}
                          onChange={(e) => updateContent({ wishesTitle: e.target.value })}
                          className="w-full comic-input"
                        />
                      </div>
                      <div>
                        <label className="block font-comic mb-2">Emotional Typed Message</label>
                        <textarea 
                          value={content.wishesLongText}
                          onChange={(e) => updateContent({ wishesLongText: e.target.value })}
                          className="w-full comic-input h-32"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="block font-comic">Three Short Wishes (Cards)</label>
                        {content.wishes.map((wish, idx) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <span className="font-comic text-cartoon-pink">#{idx+1}</span>
                            <input 
                              type="text" 
                              value={wish}
                              onChange={(e) => updateWish(idx, e.target.value)}
                              className="w-full comic-input"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* SURPRISE TAB */}
              {activeTab === 'surprise' && (
                <div className="space-y-6">
                  <h3 className="text-3xl text-cartoon-red mb-6">Surprise Sequence</h3>
                  <div>
                    <label className="block font-comic mb-2">Surprise Page Heading (Dark Screen)</label>
                    <input 
                      type="text" 
                      value={content.surprisePreText}
                      onChange={(e) => updateContent({ surprisePreText: e.target.value })}
                      className="w-full comic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-comic mb-2">Button Text</label>
                    <input 
                      type="text" 
                      value={content.surpriseButtonText}
                      onChange={(e) => updateContent({ surpriseButtonText: e.target.value })}
                      className="w-full comic-input"
                    />
                  </div>
                  <div>
                    <label className="block font-comic mb-2">Final Reveal Title</label>
                    <input 
                      type="text" 
                      value={content.surpriseFinalTitle}
                      onChange={(e) => updateContent({ surpriseFinalTitle: e.target.value })}
                      className="w-full comic-input"
                    />
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h3 className="text-3xl text-gray-700 mb-6">Theme & Media Settings</h3>
                  
                  <section>
                    <label className="block font-comic mb-4">Primary Theme Color</label>
                    <div className="flex flex-wrap gap-4">
                      {['#3BA9F5', '#EF4444', '#F5D300', '#A855F7', '#EC4899', '#22C55E'].map(color => (
                        <button
                          key={color}
                          onClick={() => updateContent({ themeColor: color })}
                          className={`w-14 h-14 rounded-2xl border-[4px] shadow-cartoon transition-transform hover:scale-110 ${
                            content.themeColor === color ? 'border-black' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <label className="block font-comic mb-2">Background Music</label>
                    <div className="space-y-4">
                      {/* File Upload Option */}
                      <div className="p-4 bg-gray-100 rounded-xl border-2 border-dashed border-black">
                        <label className="block font-comic text-sm mb-2">Upload MP3 File (Max 5MB)</label>
                        <input 
                          type="file" 
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                alert("File too big! Keep it under 5MB for local storage magic.");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                updateContent({ musicUrl: event.target.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cartoon-blue file:text-white hover:file:bg-cartoon-blue/80"
                        />
                      </div>

                      <div className="text-center font-comic text-gray-400">-- OR --</div>

                      {/* URL Option */}
                      <div className="flex gap-4">
                        <div className="flex-grow">
                          <input 
                            type="text" 
                            value={content.musicUrl.startsWith('data:') ? 'Local File Uploaded' : content.musicUrl}
                            onChange={(e) => updateContent({ musicUrl: e.target.value })}
                            className="w-full comic-input"
                            placeholder="https://example.com/audio.mp3"
                          />
                        </div>
                        <div className={`p-3 rounded-xl border-2 border-black ${content.musicUrl ? 'bg-cartoon-green' : 'bg-gray-200'}`}>
                          <Music className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 italic">
                      Tip: For Google Drive, use a direct link converter or upload the file directly above.
                    </p>
                  </section>

                  <section className="flex items-center gap-4 bg-cartoon-yellow/10 p-6 rounded-2xl border-[3px] border-cartoon-yellow border-dashed">
                    <input 
                      type="checkbox" 
                      id="anim-toggle"
                      checked={content.enableAnimations}
                      onChange={(e) => updateContent({ enableAnimations: e.target.checked })}
                      className="w-8 h-8 rounded border-black text-cartoon-blue focus:ring-0"
                    />
                    <label htmlFor="anim-toggle" className="font-comic text-xl cursor-pointer">
                      Enable Magical Animations & Effects
                    </label>
                  </section>
                </div>
              )}

              {/* SAVE STATUS */}
              <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cartoon-green/10 p-6 rounded-2xl flex items-center gap-4 border-[3px] border-cartoon-green"
                >
                  <div className="w-10 h-10 bg-cartoon-green rounded-full flex items-center justify-center text-white">
                    <Save size={20} />
                  </div>
                  <div>
                    <p className="font-comic text-xl text-cartoon-green leading-none">AUTO-SYNC ACTIVE</p>
                    <p className="text-sm text-cartoon-green/80 mt-1">Every change you make is instantly saved to your secret vault!</p>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
