import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const trackingId = new URL(req.url).searchParams.get('id');

        const status = formData.get('status');
        const tran_id = formData.get('tran_id');

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
        if (status === 'VALID' || status === 'VALIDATED') {
            await Booking.findOneAndUpdate(
                { trackingId },
                {
                    paymentStatus: 'paid',
                    status: 'confirmed',
                    paymentMethod: formData.get('card_type') || 'SSLCommerz',
                    transactionId: formData.get('bank_tran_id') || tran_id
                }
            );

            // Redirect to tracking page
            return NextResponse.redirect(
                `${baseUrl}/track/${trackingId}?payment=success`,
                { status: 303 }
            );
        } else {
            return NextResponse.redirect(
                `${baseUrl}/checkout/${trackingId}?payment=failed`,
                { status: 303 }
            );
        }
    } catch (error) {
        console.error('Payment Success Callback Error:', error);
        return NextResponse.json({ success: false, error: 'Payment processing failed' }, { status: 500 });
    }
}
