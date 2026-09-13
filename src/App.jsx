import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Centralized Gradient Theme Config (Change in ONE place to re-theme the entire app)
const BRAND_GRADIENT = "from-orange-500 via-pink-500 to-purple-600";
const BRAND_GRADIENT_HOVER = "hover:from-orange-600 hover:via-pink-600 hover:to-purple-700";

// Load all image modules eagerly from the src/picture directory
const imageModules = import.meta.glob('./picture/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG}', { eager: true });

// Pre-process modules into a normalized key map
const imageMap = {};
Object.keys(imageModules).forEach((path) => {
  const fileName = path.split(/[/\\]/).pop();
  if (fileName) {
    const module = imageModules[path];
    imageMap[fileName.toLowerCase()] = module.default || module;
  }
});

// Resolution function with fuzzy pattern matching for icons
const getImageUrl = (path) => {
  if (!path) return '';

  const rawFileName = path.split(/[/\\]/).pop();
  if (!rawFileName) return '';

  const lowerName = rawFileName.toLowerCase();

  if (imageMap[lowerName]) return imageMap[lowerName];

  if (lowerName.includes('postgres') || lowerName.includes('psql')) {
    const psqlKey = Object.keys(imageMap).find((k) => k.includes('postgres'));
    if (psqlKey) return imageMap[psqlKey];
  }

  if (lowerName.includes('spring')) {
    const springKey = Object.keys(imageMap).find((k) => k.includes('spring'));
    if (springKey) return imageMap[springKey];
  }

  if (lowerName.includes('express')) {
    const expressKey = Object.keys(imageMap).find((k) => k.includes('express'));
    if (expressKey) return imageMap[expressKey];
  }

  const cleanSearch = lowerName.replace(/[^a-z0-9]/g, '');
  const matchedKey = Object.keys(imageMap).find((key) => {
    const cleanKey = key.replace(/[^a-z0-9]/g, '');
    return cleanKey.includes(cleanSearch) || cleanSearch.includes(cleanKey);
  });

  return matchedKey ? imageMap[matchedKey] : '';
};

// Badge style mapper
const getBadgeStyles = (badge, providedColor) => {
  if (providedColor) return providedColor;

  switch (badge) {
    case 'Popular':
      return 'text-pink-500 bg-pink-50 border-pink-100';
    case 'Versatile':
      return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    case 'Fast':
      return 'text-orange-500 bg-orange-50 border-orange-100';
    case 'Fullstack':
      return 'text-purple-500 bg-purple-50 border-purple-100';
    case 'Standard':
      return 'text-green-500 bg-green-50 border-green-100';
    case 'Minimal':
      return 'text-sky-500 bg-sky-50 border-sky-100';
    case 'Batteries-Included':
      return 'text-rose-500 bg-rose-50 border-rose-100';
    case 'Enterprise':
      return 'text-teal-500 bg-teal-50 border-teal-100';
    case 'Top SQL':
      return 'text-indigo-500 bg-indigo-50 border-indigo-100';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

export default function App() {
  const [techs, setTechs] = useState([]);
  const [savedTechs, setSavedTechs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/technologies.json')
      .then((res) => res.json())
      .then((data) => {
        setTechs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching technologies JSON:', err);
        toast.error('Failed to load technologies data!');
        setIsLoading(false);
      });
  }, []);

  const handleAddStack = (tech) => {
    if (savedTechs.some((item) => item.id === tech.id)) {
      toast.warning(`${tech.name} is already added to your stack!`);
    } else {
      setSavedTechs((prev) => [...prev, tech]);
      toast.success(`${tech.name} added successfully!`);
    }
  };

  const handleRemoveSingle = (id, name) => {
    setSavedTechs((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${name} removed from your stack.`);
  };

  const handleRemoveAll = () => {
    setSavedTechs([]);
    toast.error('Cleared all items from stack.');
  };

  const logoUrl = getImageUrl("logo-text.png");
  const bannerUrl = getImageUrl("banner-stack.png");

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-pink-100 selection:text-pink-600">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header Bar */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 h-20 flex items-center justify-between">
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="flex items-center">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="DevStack Logo" 
                className="h-7 sm:h-8 object-contain cursor-pointer"
              />
            ) : (
              <span className={`text-xl font-bold bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                DevStack
              </span>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#" className="text-pink-500 font-semibold border-b-2 border-pink-500 pb-1">Home</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Technologies</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Projects</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-medium">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Sign In</a>
            <button className={`px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r ${BRAND_GRADIENT} ${BRAND_GRADIENT_HOVER} text-white font-semibold rounded-full shadow-md shadow-pink-500/20 hover:shadow-lg transition-all active:scale-95`}>
              Sign Up
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 flex flex-col space-y-3 text-sm font-medium shadow-lg">
            <a href="#" className="text-pink-500 font-semibold">Home</a>
            <a href="#" className="text-slate-600 hover:text-slate-900">Technologies</a>
            <a href="#" className="text-slate-600 hover:text-slate-900">Projects</a>
            <a href="#" className="text-slate-600 hover:text-slate-900">About</a>
            <a href="#" className="text-slate-600 hover:text-slate-900">Contact</a>
            <hr className="my-1 border-slate-100" />
            <a href="#" className="text-slate-600 hover:text-slate-900">Sign In</a>
            <button className={`w-full py-2 bg-gradient-to-r ${BRAND_GRADIENT} text-white font-semibold rounded-full shadow-md`}>
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-8 sm:py-12 w-full">
        
        {/* Banner Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16 sm:mb-20 pt-2 sm:pt-4">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight">
              Build Your Ideal <br className="hidden sm:block" />
              <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                Development Stack
              </span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-base mb-8 leading-relaxed">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <button className={`px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r ${BRAND_GRADIENT} ${BRAND_GRADIENT_HOVER} text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/25`}>
                Explore Technologies
              </button>
              <button className="px-5 py-3 sm:px-6 sm:py-3.5 border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm rounded-xl hover:border-slate-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="w-full md:w-[450px] flex justify-center">
            {bannerUrl && (
              <img 
                src={bannerUrl} 
                alt="Banner Illustration" 
                className="w-full max-w-xs sm:max-w-md object-contain filter drop-shadow-2xl"
              />
            )}
          </div>
        </section>

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            Explore the <span className="text-pink-500">Technologies</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Pick one technology per category to build your ideal stack.
          </p>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-sm font-medium">Loading technologies...</p>
          </div>
        ) : (
          /* Grid and Sidebar Container */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Main Technology Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techs.map((tech) => {
                const isAdded = savedTechs.some((item) => item.id === tech.id);
                const iconUrl = getImageUrl(tech.icon);
                const badgeClass = getBadgeStyles(tech.badge, tech.badgeColor);

                return (
                  <div
                    key={tech.id}
                    className={`bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                      isAdded 
                        ? 'border-pink-200 bg-pink-50/10' 
                        : 'border-slate-100 hover:shadow-2xl hover:border-pink-200 hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-pink-50/50 transition-colors flex items-center justify-center w-12 h-12">
                          {iconUrl ? (
                            <img 
                              src={iconUrl} 
                              alt={tech.name} 
                              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-lg font-bold text-pink-500">
                              {tech.name ? tech.name.charAt(0) : 'T'}
                            </span>
                          )}
                        </div>
                        
                        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${badgeClass}`}>
                          {tech.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                        {tech.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-4 pt-3 border-t border-slate-50">
                        <div className="flex items-center space-x-2">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-semibold">{tech.category}</span>
                          <span>{tech.experience}</span>
                        </div>
                        <span className="text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">★ {tech.rating}</span>
                      </div>

                      {isAdded ? (
                        <button
                          onClick={() => handleRemoveSingle(tech.id, tech.name)}
                          className="w-full py-2.5 bg-pink-50 text-pink-600 border border-pink-100 text-xs font-bold rounded-xl flex items-center justify-center space-x-1 hover:bg-pink-100 transition-all"
                        >
                          <span>✓</span>
                          <span>Added to Stack</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddStack(tech)}
                          className={`w-full py-2.5 bg-slate-900 hover:bg-gradient-to-r ${BRAND_GRADIENT} text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-pink-500/25 active:scale-[0.98]`}
                        >
                          Add to Stack
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Sidebar Stack */}
            <div className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-slate-900">Your Stack</h3>
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{savedTechs.length} Technology Selected</p>

              {savedTechs.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                  No item added yet
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-[420px] overflow-y-auto pr-1">
                  {savedTechs.map((item) => {
                    const itemIconUrl = getImageUrl(item.icon);

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          {itemIconUrl ? (
                            <img 
                              src={itemIconUrl} 
                              alt={item.name} 
                              className="w-6 h-6 object-contain" 
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-md bg-pink-100 text-pink-600 font-bold text-xs flex items-center justify-center">
                              {item.name ? item.name.charAt(0) : 'T'}
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition-colors">{item.name}</h4>
                            <p className="text-[10px] text-slate-400">{item.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSingle(item.id, item.name)}
                          className="text-slate-300 hover:text-red-500 text-xs font-bold w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-all"
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {savedTechs.length > 0 && (
                <button
                  onClick={handleRemoveAll}
                  className="w-full py-2.5 border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Remove All
                </button>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white mt-20 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center text-xs text-slate-400">
          © DevStack Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}