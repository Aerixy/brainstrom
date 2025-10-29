'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SEARCH_INDEX from '../../lib/searchIndex';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  // Avatar fallback
  const userInitials = 'BR';
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  

  // close profile dropdown on outside click or ESC
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsProfileOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);
  // Mobile overlay effect
  useEffect(() => {
    setShowMobileOverlay(isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const navItems = useMemo(
    () => [
      { name: 'Memory Training', href: '/features/memory-training' },
      { name: 'Sentence Builder', href: '/features/sentence-builder' },
      { name: 'Visual Memory', href: '/features/visual-memory' },
      { name: 'Story Time', href: '/features/story-time' },
    ],
    []
  );

  // use central search index (expandable in lib/searchIndex.ts)
  const index = useMemo(() => SEARCH_INDEX, []);

  // derive results from the query (pure computation during render)
  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.trim().toLowerCase();
    return index.filter((i) => i.title.toLowerCase().includes(q) || (i.keywords || []).some(k => k.includes(q))).slice(0, 8);
  }, [searchQuery, index]);

  // focus input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    return;
  }, [isSearchOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-linear-to-r from-black via-zinc-900/95 to-black backdrop-blur-md">
      {/* Mobile Menu Overlay */}
      {showMobileOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="group flex items-center space-x-2">
              <motion.span
                className="text-3xl font-bold bg-linear-to-r from-emerald-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-500 group-hover:from-purple-500 group-hover:via-cyan-400 group-hover:to-emerald-400 animate-gradient"
                animate={{
                  translateY: [0, -2, 0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                BrainRot
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'relative text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-cyan-400 after:to-purple-500'
                      : 'text-gray-300 hover:text-white'
                  } group relative px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50`}
                  tabIndex={0}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 z-0 scale-75 rounded-lg bg-white/0 transition-all duration-300 group-hover:scale-100 group-hover:bg-white/5"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => {
                setIsSearchOpen((s) => {
                  const next = !s;
                  if (!next) {
                    // clearing when closing
                    setSearchQuery('');
                    setActiveIndex(-1);
                  }
                  return next;
                });
              }}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((s) => !s)}
                className="group relative h-8 w-8 overflow-hidden rounded-full bg-linear-to-r from-purple-500 to-cyan-400 p-0.5 transition-all duration-300 hover:from-cyan-400 hover:to-purple-500"
                title="Profile"
              >
                <div className="h-full w-full rounded-full bg-zinc-900 p-1 flex items-center justify-center">
                  {/* Avatar fallback with initials */}
                  <span className="text-gray-400 group-hover:text-white font-bold text-lg select-none">{userInitials}</span>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-zinc-900/95 ring-1 ring-black/40 backdrop-blur-md p-1 shadow-lg z-50 transition ease-out duration-150 transform scale-100 opacity-100">
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="mt-1 block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      console.log('logout');
                      setIsProfileOpen(false);
                      // placeholder logout action
                      router.push('/');
                    }}
                    className="mt-1 w-full text-left rounded-md px-3 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-full p-2 
                         text-gray-400 hover:text-cyan-400 hover:bg-white/5 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                         transition-all duration-300 ease-out"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Toggle menu</span>
                <div className="relative w-6 h-6">
                  <div
                    className={`absolute top-1/2 left-1/2 w-5 h-0.5 rounded-full transform -translate-x-1/2 
                             transition-all duration-300 ease-out
                             ${isMobileMenuOpen 
                               ? 'rotate-45 bg-cyan-400' 
                               : '-translate-y-1 bg-current'
                             }`}
                  />
                  <div
                    className={`absolute top-1/2 left-1/2 w-5 h-0.5 rounded-full transform -translate-x-1/2 
                             transition-all duration-300 ease-out
                             ${isMobileMenuOpen 
                               ? 'opacity-0' 
                               : 'opacity-100 bg-current'
                             }`}
                  />
                  <div
                    className={`absolute top-1/2 left-1/2 w-5 h-0.5 rounded-full transform -translate-x-1/2 
                             transition-all duration-300 ease-out
                             ${isMobileMenuOpen 
                               ? '-rotate-45 bg-cyan-400' 
                               : 'translate-y-1 bg-current'
                             }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar (desktop only) */}
        {isSearchOpen && (
          <div className="hidden md:block fixed inset-x-0 top-20 z-50 animate-fadeIn">
            <div className="max-w-3xl mx-auto px-4">
              <div className="rounded-xl bg-zinc-900/95 p-4 shadow-2xl border border-zinc-800/50 backdrop-blur-md
                           animate-slideDown">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 group">
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setActiveIndex(0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setActiveIndex((i) => Math.min(i + 1, filteredResults.length - 1));
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setActiveIndex((i) => Math.max(i - 1, 0));
                        } else if (e.key === 'Enter') {
                          e.preventDefault();
                          const item = filteredResults[activeIndex] || filteredResults[0];
                          if (item) {
                            setSearchQuery('');
                            setIsSearchOpen(false);
                            setActiveIndex(-1);
                            router.push(item.href);
                          }
                        } else if (e.key === 'Escape') {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                          setActiveIndex(-1);
                        }
                      }}
                      type="text"
                      placeholder="Search exercises... (↑↓ Enter)"
                      className="w-full rounded-lg bg-zinc-800/90 px-4 py-3.5 pl-10 text-gray-200 
                               placeholder-gray-500 border border-zinc-700/50
                               focus:bg-zinc-800/95 focus:outline-none focus:ring-2 
                               focus:ring-cyan-500/50 focus:border-cyan-500/50
                               transition-all duration-300 ease-in-out
                               shadow-lg shadow-black/10"
                      aria-label="Search exercises"
                      autoFocus
                    />
                    <svg
                      className="absolute left-3 top-4 h-5 w-5 text-cyan-500/50 transition-colors duration-300 group-hover:text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setActiveIndex(-1);
                    }}
                    className="rounded-lg px-4 py-3.5 text-sm font-medium text-cyan-400 
                             border border-cyan-500/20 hover:bg-cyan-500/10 
                             transition-all duration-300 ease-in-out
                             flex items-center gap-2"
                  >
                    <span>Close</span>
                    <span className="text-xs text-cyan-500/70 bg-zinc-900/90 px-2 py-0.5 rounded-md
                                 border border-cyan-500/20">ESC</span>
                  </button>
                </div>
                {searchQuery && filteredResults.length > 0 && (
                  <ul className="mt-3 max-h-[60vh] overflow-auto rounded-lg bg-zinc-800/50 p-1.5
                               border border-zinc-700/50 backdrop-blur-md animate-fadeIn">
                    {filteredResults.map((res, idx) => (
                      <li
                        key={res.href}
                        className={`cursor-pointer rounded-md px-4 py-3.5 text-base 
                                  transition-all duration-200 ease-out
                                  ${activeIndex === idx 
                                    ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 font-medium' 
                                    : 'text-gray-300 hover:bg-white/5 hover:text-cyan-300'
                                  }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                          setActiveIndex(-1);
                          router.push(res.href);
                        }}
                      >
                        {res.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Background overlay */}
            <div 
              className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm -z-10"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
                setActiveIndex(-1);
              }}
            />
          </div>
        )}
        {/* Mobile Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex items-start pt-20 px-4 animate-fadeIn">
            <div className="w-full">
              <div className="rounded-xl bg-zinc-900/95 p-4 shadow-2xl border border-zinc-800/50 backdrop-blur-md
                            animate-slideDown">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 group">
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setActiveIndex(0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setActiveIndex((i) => Math.min(i + 1, filteredResults.length - 1));
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setActiveIndex((i) => Math.max(i - 1, 0));
                        } else if (e.key === 'Enter') {
                          e.preventDefault();
                          const item = filteredResults[activeIndex] || filteredResults[0];
                          if (item) {
                            setSearchQuery('');
                            setIsSearchOpen(false);
                            setActiveIndex(-1);
                            router.push(item.href);
                          }
                        } else if (e.key === 'Escape') {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                          setActiveIndex(-1);
                        }
                      }}
                      type="text"
                      placeholder="Search exercises..."
                      className="w-full rounded-lg bg-zinc-800/90 px-4 py-3.5 pl-10 text-gray-200 
                               placeholder-gray-500 border border-zinc-700/50
                               focus:bg-zinc-800/95 focus:outline-none focus:ring-2 
                               focus:ring-cyan-500/50 focus:border-cyan-500/50
                               transition-all duration-300 ease-in-out
                               shadow-lg shadow-black/10"
                      aria-label="Search exercises"
                      autoFocus
                    />
                    <svg
                      className="absolute left-3 top-4 h-5 w-5 text-cyan-500/50 transition-colors duration-300 group-hover:text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setActiveIndex(-1);
                    }}
                    className="rounded-lg px-4 py-3.5 text-sm font-medium text-cyan-400 
                             border border-cyan-500/20 hover:bg-cyan-500/10 
                             transition-all duration-300 ease-in-out"
                  >
                    Close
                  </button>
                </div>
                {searchQuery && filteredResults.length > 0 && (
                  <ul className="mt-3 max-h-[60vh] overflow-auto rounded-lg bg-zinc-800/50 p-1.5
                               border border-zinc-700/50 backdrop-blur-md animate-fadeIn">
                    {filteredResults.map((res, idx) => (
                      <li
                        key={res.href}
                        className={`cursor-pointer rounded-md px-4 py-3.5 text-base 
                                  transition-all duration-200 ease-out
                                  ${activeIndex === idx 
                                    ? 'bg-linear-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 font-medium' 
                                    : 'text-gray-300 hover:bg-white/5 hover:text-cyan-300'
                                  }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                          setActiveIndex(-1);
                          router.push(res.href);
                        }}
                      >
                        {res.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Container */}
      <div 
        className={`fixed inset-0 top-20 bottom-0 md:hidden
                   transition-all duration-300 ease-in-out
                   ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm
                     transition-opacity duration-300 ease-in-out
                     ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer */}
        <div 
          className={`fixed right-0 top-20 h-[calc(100vh-5rem)] w-full max-w-md 
                     bg-zinc-900/95 border-l border-zinc-800/50
                     transition-transform duration-300 ease-out transform-gpu
                     ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="h-full overflow-y-auto">
            <div className="px-4 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="rounded-full p-2 text-gray-400 hover:text-cyan-400 
                         hover:bg-white/5 transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item) => {
                // Icons for each navigation item
                const icon = {
                  'Memory Training': (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  'Sentence Builder': (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  ),
                  'Visual Memory': (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                  'Story Time': (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                }[item.name];

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block relative rounded-xl p-4 text-base font-medium
                             transition-all duration-300 ease-out transform group
                             ${isActive(item.href)
                               ? 'bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/20'
                               : 'hover:bg-zinc-800/50 hover:border hover:border-cyan-500/10'
                             }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    tabIndex={0}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`${isActive(item.href) ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'}`}>
                          {icon}
                        </span>
                        <span className={`${isActive(item.href) ? 'text-cyan-400' : 'text-gray-200 group-hover:text-cyan-300'}`}>
                          {item.name}
                        </span>
                      </div>
                      {isActive(item.href) && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-cyan-500/70 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                            Active
                          </span>
                          <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={`absolute inset-0 rounded-xl transition-opacity duration-300
                                 ${isActive(item.href) 
                                   ? 'opacity-100' 
                                   : 'opacity-0 group-hover:opacity-100'
                                 }`}>
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions Section */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              {/* Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-xl bg-zinc-900/80
                         border border-cyan-500/20 p-4 text-left text-cyan-300
                         transition-all duration-300 hover:bg-cyan-500/10
                         flex items-center justify-between"
              >
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search Exercises
                </span>
                <span className="text-sm text-cyan-500/70">⌘K</span>
              </button>

              {/* Profile Section */}
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-r from-purple-500 to-cyan-400 p-0.5">
                    <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-gray-300 font-bold text-lg">{userInitials}</span>
                    </div>
                  </div>
                  <div>
                  </div>
                    <h3 className="text-gray-200 font-medium">Guest User</h3>
                    <p className="text-sm text-gray-400">Free Plan</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link 
                    href="/profile" 
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-200 
                             hover:text-cyan-300 hover:bg-white/5 transition-all duration-300
                             group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3 text-gray-400 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      View Profile
                    </span>
                    <svg className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/progress" 
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-200 
                             hover:text-cyan-300 hover:bg-white/5 transition-all duration-300
                             group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3 text-gray-400 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M16 8v8m-4-5v5M8 8v8m8 0h1M3 20h18M3 10h18M3 4h18"/>
                      </svg>
                      Your Progress
                    </span>
                    <span className="text-sm text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      Level 3
                    </span>
                  </Link>
                </div>
              </div>

              {/* Settings Section */}
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3 px-4">Settings</h3>
                <div className="space-y-1">
                  <Link 
                    href="/settings/preferences" 
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-200 
                             hover:text-cyan-300 hover:bg-white/5 transition-all duration-300
                             group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3 text-gray-400 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                      </svg>
                      Preferences
                    </span>
                  </Link>

                  <Link 
                    href="/settings/notifications" 
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-200 
                             hover:text-cyan-300 hover:bg-white/5 transition-all duration-300
                             group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3 text-gray-400 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                      </svg>
                      Notifications
                    </span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                  </Link>

                  <Link 
                    href="/settings/accessibility" 
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-200 
                             hover:text-cyan-300 hover:bg-white/5 transition-all duration-300
                             group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3 text-gray-400 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      Accessibility
                    </span>
                  </Link>

                  <button 
                    onClick={() => {
                      console.log('logout');
                      setIsMobileMenuOpen(false);
                      router.push('/');
                    }}
                    className="w-full flex items-center rounded-lg px-4 py-3 text-red-400 
                             hover:text-red-300 hover:bg-red-500/5 transition-all duration-300
                             group"
                  >
                    <svg className="h-5 w-5 mr-3 text-red-400/70 group-hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Version and Help */}
            <div className="pt-4 flex items-center justify-between text-sm text-gray-500">
              <p>BrainRot v1.0.0</p>
              <Link 
                href="/help"
                className="text-cyan-500/70 hover:text-cyan-400 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { };