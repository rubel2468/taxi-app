import mongoose, { Schema, model, models } from 'mongoose';

export interface IBooking {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    pickupAddress: string;
    dropoffAddress: string;
    pickupDate: string;
    pickupTime: string;
    vehicleType: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'unpaid' | 'paid' | 'failed';
    paymentMethod?: string;
    transactionId?: string;
    trackingId: string;
    promoCode?: string;
    discount: number;
    estimatedFare: number;
    otp: string;
    rating?: number;
    review?: string;
    driverId?: string;
    stops?: string[];
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    dropoffAddress: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    vehicleType: { type: String, required: true, default: 'Standard' },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'failed'],
        default: 'unpaid'
    },
    paymentMethod: { type: String },
    transactionId: { type: String },
    trackingId: { type: String, required: true, unique: true },
    promoCode: { type: String },
    discount: { type: Number, default: 0 },
    estimatedFare: { type: Number, required: true },
    otp: { type: String, required: true },
    rating: { type: Number },
    review: { type: String },
    driverId: { type: String },
    stops: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
