import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/technologies.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch technologies');
        return res.json();
      })
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error loading technology data');
        setLoading(false);
      });
  }, []);

  const handleAddToStack = (tech) => {
    const exists = stack.some((item) => item.id === tech.id);
    if (exists) {
      toast.warning(`${tech.name} is already in your stack!`);
      return;
    }
    setStack([...stack, tech]);
    toast.success(`Added ${tech.name} to your stack!`);
  };

  const handleRemoveFromStack = (techId, techName) => {
    setStack(stack.filter((item) => item.id !== techId));
    toast.info(`Removed ${techName} from your stack`);
  };

  const handleRemoveAll = () => {
    if (stack.length === 0) return;
    setStack([]);
    toast.info('Cleared all items from your stack');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <ToastContainer position="bottom-right" autoClose={2500} />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight">Dev Stack</span>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-sm">
                D
              </div>
              <span className="text-lg font-bold tracking-tight">Dev Stack</span>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-pink-600 transition">Home</a>
              <a href="#technologies" className="hover:text-pink-600 transition">Technologies</a>
              <a href="#projects" className="hover:text-pink-600 transition">Projects</a>
              <a href="#about" className="hover:text-pink-600 transition">About</a>
              <a href="#contact" className="hover:text-pink-600 transition">Contact</a>
            </nav>

            <div className="flex items-center space-x-3">
              <button className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition">
                Sign In
              </button>
              <button className="text-sm font-semibold text-white brand-gradient px-4 py-1.5 rounded-full shadow-sm hover:opacity-95 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 text-slate-600 font-medium text-sm">
            <a href="#home" className="block py-1 hover:text-pink-600">Home</a>
            <a href="#technologies" className="block py-1 hover:text-pink-600">Technologies</a>
            <a href="#projects" className="block py-1 hover:text-pink-600">Projects</a>
            <a href="#about" className="block py-1 hover:text-pink-600">About</a>
            <a href="#contact" className="block py-1 hover:text-pink-600">Contact</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Build Your Ideal <br className="hidden sm:inline" />
              <span className="brand-gradient-text">Development Stack</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#technologies"
                className="w-full sm:w-auto text-center brand-gradient text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-95 transition"
              >
                Explore Technologies
              </a>
              <button className="w-full sm:w-auto border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md p-6 bg-white border border-slate-100 rounded-3xl shadow-xl flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Development Stack Illustration"
                className="rounded-2xl object-cover h-64 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main id="technologies" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Explore the <span className="brand-gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Pick and choose technologies to build your ideal stack.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 space-x-3">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600 font-medium">Loading Technologies...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech) => {
                const isAdded = stack.some((item) => item.id === tech.id);
                return (
                  <div
                    key={tech.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                        <span className="bg-pink-50 text-pink-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-pink-100">
                          {tech.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{tech.name}</h3>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-3 leading-relaxed">
                        {tech.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {tech.category}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {tech.difficulty}
                        </span>
                        <span className="flex items-center text-amber-500 font-semibold ml-auto">
                          ★ {tech.rating}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToStack(tech)}
                      disabled={isAdded}
                      className={`mt-6 w-full py-2 px-4 rounded-xl text-sm font-semibold transition ${
                        isAdded
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                      }`}
                    >
                      {isAdded ? '✓ Added to Stack' : 'Add to Stack'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-20 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Your Stack</h3>
                    <p className="text-xs text-slate-500">{stack.length} Technology Selected</p>
                  </div>
                  {stack.length > 0 && (
                    <button
                      onClick={handleRemoveAll}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 transition"
                    >
                      Remove All
                    </button>
                  )}
                </div>

                {stack.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm rounded-xl border border-dashed border-slate-200 bg-slate-50">
                    Your Stack is empty
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {stack.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                          <div>
                            <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                            <div className="text-[10px] text-slate-400">{item.category}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromStack(item.id, item.name)}
                          className="text-slate-400 hover:text-red-500 text-sm font-bold px-1 transition"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-8 text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center text-white font-bold text-sm">
                  D
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">Dev Stack</span>
              </div>
              <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                Empowering developers to discover, aggregate, and architect their ultimate technical ecosystem.
              </p>
              <div className="flex space-x-4 text-xs text-slate-500 font-medium">
                <a href="#github" className="hover:text-slate-900">GitHub</a>
                <a href="#twitter" className="hover:text-slate-900">Twitter</a>
                <a href="#linkedin" className="hover:text-slate-900">LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><a href="#home" className="hover:text-slate-900">Home</a></li>
                <li><a href="#tech" className="hover:text-slate-900">Technologies</a></li>
                <li><a href="#projects" className="hover:text-slate-900">Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><a href="#about" className="hover:text-slate-900">About Us</a></li>
                <li><a href="#careers" className="hover:text-slate-900">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><a href="#privacy" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
            <p>© 2026 Dev Stack. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#privacy" className="hover:text-slate-600">Privacy</a>
              <a href="#terms" className="hover:text-slate-600">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}