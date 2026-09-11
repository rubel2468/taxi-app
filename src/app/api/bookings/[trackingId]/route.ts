import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ trackingId: string }> }
) {
    try {
        await dbConnect();
        const { trackingId } = await params;
        const booking = await Booking.findOne({ trackingId });

        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ trackingId: string }> }
) {
    try {
        await dbConnect();
        const { trackingId } = await params;
        const { paymentStatus, paymentMethod, transactionId, status } = await req.json();

        const booking = await Booking.findOneAndUpdate(
            { trackingId },
            { paymentStatus, paymentMethod, transactionId, status },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
