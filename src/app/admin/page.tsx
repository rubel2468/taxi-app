'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, Phone, MapPin, Search, Loader2 } from 'lucide-react';

export default function AdminPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
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

    const filteredBookings = bookings.filter(b =>
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400">Review and manage all taxi bookings.</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or address..."
                            className="pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-80 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                        <p className="text-gray-500">Loading bookings...</p>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-20 text-center shadow-sm">
                        <div className="text-5xl mb-6">🚖</div>
                        <h3 className="text-2xl font-bold mb-2">No bookings found</h3>
                        <p className="text-gray-500">New bookings will appear here when customers schedule rides.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full w-fit text-sm font-semibold">
                                                <span>{booking.vehicleType.toUpperCase()}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <User size={18} className="text-gray-400" />
                                                <span className="font-bold">{booking.customerName}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-gray-500 text-sm">
                                                <Phone size={16} />
                                                <span>{booking.customerPhone}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-start space-x-3">
                                                <MapPin size={18} className="text-green-500 mt-1" />
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Pickup</p>
                                                    <p className="font-medium">{booking.pickupAddress}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <MapPin size={18} className="text-red-500 mt-1" />
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Drop-off</p>
                                                    <p className="font-medium">{booking.dropoffAddress}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-6 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar size={18} className="text-yellow-500" />
                                                    <span className="font-medium">{booking.pickupDate}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Clock size={18} className="text-yellow-500" />
                                                    <span className="font-medium">{booking.pickupTime}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-400">Status:</span>
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold rounded-full uppercase">
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-400">Payment:</span>
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${booking.paymentStatus === 'paid'
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'bg-yellow-100 text-yellow-600'
                                                        }`}>
                                                        {booking.paymentStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 pt-6 lg:pt-0 lg:pl-8 flex lg:flex-col gap-3">
                                        <button
                                            onClick={() => window.open(`/track/${booking.trackingId}`, '_blank')}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
                                        >
                                            Track Ride
                                        </button>
                                        <button className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-xl text-sm font-bold transition-all">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
