import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Image imports (সঠিক পাথ: ./picture/)
import logoImg from './picture/logo-text.png';
import bannerImg from './picture/banner-stack.png';

export default function App() {
  const [techs, setTechs] = useState([]);
  const [savedTechs, setSavedTechs] = useState([]);

  useEffect(() => {
    fetch('/technologies.json')
      .then((res) => res.json())
      .then((data) => setTechs(data))
      .catch((err) => console.error('Error loading JSON:', err));
  }, []);

  const handleAddStack = (tech) => {
    if (savedTechs.some((item) => item.id === tech.id)) {
      toast.warning(`${tech.name} is already in your stack!`);
    } else {
      setSavedTechs([...savedTechs, tech]);
      toast.success(`${tech.name} added to stack!`);
    }
  };

  const handleRemoveSingle = (id) => {
    setSavedTechs(savedTechs.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setSavedTechs([]);
    toast.info('Cleared all technologies from stack.');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-pink-100 selection:text-pink-600">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* 1. Header / Navbar */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoImg} 
              alt="DevStack Logo" 
              className="h-8 object-contain cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#" className="text-pink-500 font-semibold border-b-2 border-pink-500 pb-1">Home</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Technologies</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Projects</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Sign In
            </a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Sign Up
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        
        {/* 2. Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 pt-4">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight">
              Build Your Ideal <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Development Stack
              </span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Explore Technologies
              </button>
              <button className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs">
                Learn More
              </button>
            </div>
          </div>

          {/* 3D Banner Image */}
          <div className="w-full md:w-[450px] flex justify-center">
            <img 
              src={bannerImg} 
              alt="Development Stack Illustration" 
              className="w-full max-w-md object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </section>

        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-1">
            Explore the <span className="text-pink-500">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Pick one technology per category to build your ideal stack.
          </p>
        </div>

        {/* 3. Cards Grid + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Technologies Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techs.map((tech) => (
              <div
                key={tech.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-pink-200 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Card Header & Theme Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-pink-50/50 transition-colors">
                      <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Dynamic Theme Color Badge */}
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border ${tech.badgeColor}`}>
                      {tech.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                    {tech.description}
                  </p>
                </div>

                {/* Footer Info & Action */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-4 pt-3 border-t border-slate-50">
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-semibold">{tech.category}</span>
                      <span>{tech.experience}</span>
                    </div>
                    <span className="text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">★ {tech.rating}</span>
                  </div>

                  <button
                    onClick={() => handleAddStack(tech)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-pink-500/25 active:scale-[0.98]"
                  >
                    Add to Stack
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Your Stack */}
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
                {savedTechs.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-50/80 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition-colors">{item.name}</h4>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSingle(item.id)}
                      className="text-slate-300 hover:text-red-500 text-xs font-bold w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
      </div>

      {/* 4. Multi-Column Footer */}
      <footer className="border-t border-slate-100 bg-white mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            
            {/* Brand Logo & Info */}
            <div className="md:col-span-2">
              <img 
                src={logoImg} 
                alt="DevStack Logo" 
                className="h-7 object-contain mb-4" 
              />
              <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                Curated tools, technologies, and resources for developers building modern software.
              </p>
              <div className="flex space-x-4 text-xs font-medium text-slate-400">
                <a href="#" className="hover:text-pink-500 transition-colors">GitHub</a>
                <a href="#" className="hover:text-pink-500 transition-colors">Twitter</a>
                <a href="#" className="hover:text-pink-500 transition-colors">LinkedIn</a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Technologies</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400">
            <p>© 2026 DevStack. All rights reserved.</p>
            <div className="flex space-x-6 mt-3 sm:mt-0">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}