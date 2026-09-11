'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Car, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HistoryPage() {
    const [bookings, setBookings] = useState<Array<Record<string, unknown>>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (data.success) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBookings = bookings.filter((b) => {
        if (filter === 'all') return true;
        return b.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-600 dark:bg-green-900/30';
            case 'confirmed': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
            case 'pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30';
            case 'cancelled': return 'bg-red-100 text-red-600 dark:bg-red-900/30';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800';
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl font-black tracking-tight">Ride <span className="text-yellow-500">History</span></h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Track all your past and upcoming rides</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                        <motion.button
                            key={status}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(status)}
                            className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider transition-all ${filter === status
                                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-yellow-500'
                                }`}
                        >
                            {status}
                        </motion.button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                        <p className="text-gray-500">Loading ride history...</p>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-[40px] p-20 text-center shadow-sm">
                        <div className="text-6xl mb-6">🚖</div>
                        <h3 className="text-3xl font-bold mb-4">No rides yet</h3>
                        <p className="text-gray-500 mb-8">Your ride history will appear here once you book a trip.</p>
                        <motion.a
                            href="/#booking-section"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block yellow-gradient text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl"
                        >
                            Book Your First Ride
                        </motion.a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredBookings.map((booking: any, i) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white dark:bg-gray-900 rounded-[30px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-500 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-2 font-mono">{booking.trackingId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-yellow-600">${booking.estimatedFare}</p>
                                        {booking.discount > 0 && (
                                            <p className="text-xs text-green-600 font-bold">-${booking.discount} promo applied</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <MapPin size={18} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Pickup</p>
                                            <p className="font-medium text-sm">{booking.pickupAddress}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                            <MapPin size={18} className="text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Drop-off</p>
                                            <p className="font-medium text-sm">{booking.dropoffAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Calendar size={14} className="text-yellow-500" />
                                            <span className="font-medium">{booking.pickupDate}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock size={14} className="text-yellow-500" />
                                            <span className="font-medium">{booking.pickupTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Car size={16} className="text-gray-400" />
                                        <span className="text-xs font-black uppercase">{booking.vehicleType}</span>
                                    </div>
                                </div>

                                {booking.status === 'completed' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 pt-4 border-t dark:border-gray-800"
                                    >
                                        {booking.rating ? (
                                            <div className="flex items-center space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        className={star <= (booking.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                                    />
                                                ))}
                                                <span className="text-xs text-gray-500 ml-2">Rated</span>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">Rate this ride</p>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
