'use client';

import Link from 'next/link';
import { Car, Menu, X, Navigation, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`glass border border-white/10 rounded-full px-6 transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/10' : ''}`}>
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="yellow-gradient p-2 rounded-xl shadow-lg shadow-yellow-500/20"
                                >
                                    <Car className="text-white w-6 h-6" />
                                </motion.div>
                                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                    Swift<span className="text-yellow-500">Cab</span>
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Services', href: '#services' },
                                { name: 'History', href: '/history' },
                                { name: 'Driver', href: '/driver' },
                                { name: 'Track Ride', href: '/track', special: true },
                                { name: 'Admin', href: '/admin' }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-yellow-500/10 ${link.special ? 'text-yellow-600 dark:text-yellow-400 underline underline-offset-4 decoration-2' : 'text-gray-700 dark:text-gray-300'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="yellow-gradient text-white px-8 py-3 rounded-full font-black text-sm shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all ml-4 flex items-center space-x-2"
                            >
                                <span>BOOK NOW</span>
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="md:hidden absolute top-full left-4 right-4 mt-2 z-50"
                    >
                        <div className="glass border border-white/10 rounded-[30px] p-6 shadow-2xl">
                            <div className="flex flex-col space-y-2">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Services', href: '#services' },
                                    { name: 'History', href: '/history' },
                                    { name: 'Driver', href: '/driver' },
                                    { name: 'Track Ride', href: '/track', special: true },
                                    { name: 'Admin', href: '/admin' }
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-4 rounded-2xl text-lg font-bold transition-all ${link.special ? 'bg-yellow-500/10 text-yellow-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full mt-4 yellow-gradient text-white px-6 py-5 rounded-2xl font-black text-lg shadow-xl"
                                >
                                    BOOK NOW
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
