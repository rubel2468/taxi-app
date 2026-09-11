import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';
import { sendBookingEmail } from '@/lib/email';

const VEHICLE_RATES: Record<string, number> = {
    standard: 1.5,
    premium: 3.5,
    van: 5.0,
};

const PROMO_CODES: Record<string, number> = {
    'WELCOME10': 10,
    'SWIFT20': 20,
    'FIRST50': 50,
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function calculateFare(vehicleType: string, distanceKm: number) {
    const rate = VEHICLE_RATES[vehicleType] || 1.5;
    return Math.round(rate * distanceKm);
}

function applyPromo(code: string, baseFare: number) {
    if (!code) return { discount: 0, finalFare: baseFare };
    const discountPercent = PROMO_CODES[code.toUpperCase()];
    if (!discountPercent) return { discount: 0, finalFare: baseFare };
    const discount = Math.round(baseFare * (discountPercent / 100));
    const finalFare = Math.max(baseFare - discount, 0);
    return { discount, finalFare };
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        console.log('Received booking request:', body);

        const trackingId = 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const otp = generateOTP();

        const distance = body.distance || 5;
        const baseFare = calculateFare(body.vehicleType || 'standard', distance);
        const { discount, finalFare } = applyPromo(body.promoCode, baseFare);

        const bookingData = {
            ...body,
            trackingId,
            otp,
            estimatedFare: finalFare,
            discount,
            stops: body.stops || [],
            promoCode: body.promoCode || undefined,
        };

        const booking = await Booking.create(bookingData);

        try {
            await sendBookingEmail({ ...body, trackingId, estimatedFare: finalFare, otp });
        } catch (emailError) {
            console.error('Email sending failed but booking was saved:', emailError);
        }

        return NextResponse.json({ success: true, data: booking }, { status: 201 });
    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
