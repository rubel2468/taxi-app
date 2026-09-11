'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, Shield, CheckCircle2, Loader2, MapPin, Calendar, Clock, Car, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const { trackingId } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [booking, setBooking] = useState<Record<string, unknown> | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submittedRating, setSubmittedRating] = useState(false);
    const paymentStatus = searchParams.get('payment');

    useEffect(() => {
        const fetchBooking = async () => {
            const res = await fetch(`/api/bookings/${trackingId}`);
            const data = await res.json();
            if (data.success) {
                setBooking(data.data);
                if (data.data.paymentStatus === 'paid') {
                    setIsPaid(true);
                }
                if (data.data.rating) {
                    setSubmittedRating(true);
                    setRating(data.data.rating);
                }
            }
        };
        fetchBooking();
    }, [trackingId]);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch('/api/payment/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackingId }),
            });

            const data = await res.json();
            if (data.success && data.url) {
                window.location.href = data.url;
            } else {
                alert('Payment initialization failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Payment initialization error:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const submitRating = async () => {
        try {
            await fetch(`/api/bookings/${trackingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, review }),
            });
            setSubmittedRating(true);
        } catch (error) {
            console.error('Failed to submit rating', error);
        }
    };

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
            </div>
        );
    }

    const b = booking as any;

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />
            <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Booking Summary</h1>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Tracking ID</span>
                                <span className="font-mono font-bold text-gray-900 dark:text-white uppercase">{b.trackingId}</span>
                            </div>
                            <div className="border-t dark:border-gray-800 pt-4 space-y-3">
                                <div className="flex items-start space-x-3">
                                    <MapPin size={18} className="text-yellow-500 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Pickup</p>
                                        <p className="font-medium">{b.pickupAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin size={18} className="text-red-500 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Drop-off</p>
                                        <p className="font-medium">{b.dropoffAddress}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t dark:border-gray-800 pt-4 flex justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{b.pickupDate}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{b.pickupTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex items-center space-x-4">
                            <div className="bg-yellow-500 p-3 rounded-xl text-white">
                                <Car size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold">{b.vehicleType} Class</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Professional service guaranteed</p>
                            </div>
                        </div>

                        {b.status === 'completed' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                            >
                                <h3 className="text-xl font-bold mb-4">Rate Your Ride</h3>
                                <div className="flex items-center space-x-2 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            whileTap={{ scale: 1.2 }}
                                            onClick={() => !submittedRating && setRating(star)}
                                            disabled={submittedRating}
                                        >
                                            <Star
                                                size={32}
                                                className={star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                                <textarea
                                    placeholder="Share your experience..."
                                    value={review}
                                    onChange={(e) => !submittedRating && setReview(e.target.value)}
                                    disabled={submittedRating}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-yellow-500 rounded-2xl p-4 outline-none transition-all font-bold text-sm mb-4"
                                    rows={3}
                                />
                                {!submittedRating && (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={submitRating}
                                        disabled={rating === 0}
                                        className="w-full yellow-gradient text-white font-black py-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Submit Review
                                    </motion.button>
                                )}
                                {submittedRating && (
                                    <p className="text-green-600 font-bold text-center">Thank you for your feedback!</p>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Payment</h2>
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                            {isPaid ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                                    <p className="text-gray-500 mb-6">Redirecting to your tracking dashboard...</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-6">
                                    {paymentStatus && paymentStatus !== 'success' && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center space-x-2">
                                            <span>Payment {paymentStatus === 'failed' ? 'Failed' : 'Cancelled'}. Please try again.</span>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="p-6 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
                                                    <CreditCard className="text-yellow-500" />
                                                </div>
                                                <div>
                                                    <span className="font-black block">SSLCommerz</span>
                                                    <span className="text-xs text-gray-500 font-medium">Secure Payment Gateway</span>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t dark:border-gray-800">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="space-y-1">
                                                <span className="text-gray-500 font-bold block">Total Amount</span>
                                                {b.discount > 0 && (
                                                    <span className="text-xs text-green-600 font-black uppercase tracking-widest">Promo Applied: -${b.discount}</span>
                                                )}
                                            </div>
                                            <span className="text-3xl font-black">${b.estimatedFare}</span>
                                        </div>
                                        <button
                                            onClick={handlePayment}
                                            disabled={isProcessing}
                                            className="w-full yellow-gradient text-white font-black py-5 rounded-2xl shadow-2xl shadow-yellow-500/40 transition-all flex justify-center items-center space-x-3 uppercase tracking-tighter text-lg"
                                        >
                                            {isProcessing ? <Loader2 className="animate-spin" /> : (
                                                <>
                                                    <span>Pay via SSLCommerz</span>
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-widest pt-4">
                                        <Shield size={14} />
                                        <span>Official Secure Payment</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main >
    );
}
