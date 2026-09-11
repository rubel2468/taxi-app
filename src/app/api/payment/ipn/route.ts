import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const status = formData.get('status');
        const tran_id = formData.get('tran_id');

        if (status === 'VALID' || status === 'VALIDATED') {
            await Booking.findOneAndUpdate(
                { trackingId: tran_id }, // use transaction id as trackingId search
                {
                    paymentStatus: 'paid',
                    status: 'confirmed',
                    paymentMethod: formData.get('card_type') || 'SSLCommerz',
                    transactionId: formData.get('bank_tran_id') || tran_id
                }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('IPN Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
