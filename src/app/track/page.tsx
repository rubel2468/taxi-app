'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Navigation, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackSearchPage() {
    const [trackingId, setTrackingId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/bookings/${trackingId.toUpperCase()}`);
            const data = await res.json();

            if (data.success) {
                router.push(`/track/${trackingId.toUpperCase()}`);
            } else {
                setError('Tracking ID not found. Please check and try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <div className="pt-40 pb-24 max-w-2xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl shadow-yellow-500/5 text-center"
                >
                    <div className="bg-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 text-white shadow-lg shadow-yellow-500/30">
                        <Navigation size={32} />
                    </div>

                    <h1 className="text-4xl font-bold mb-4">Track Your Ride</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Enter your tracking ID to see your driver's real-time location.
                    </p>

                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="TRK-XXXXXXXXX"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-yellow-500 rounded-2xl outline-none transition-all font-mono font-bold text-lg uppercase"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center justify-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-yellow-500/20 transition-all flex justify-center items-center space-x-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <span>Track Now</span>}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t dark:border-gray-800">
                        <p className="text-sm text-gray-500">
                            Can't find your tracking ID? Check your confirmation email.
                        </p>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
