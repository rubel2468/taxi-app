import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';
const SSLCommerzPayment = require('sslcommerz-lts');

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { trackingId } = await req.json();

        const booking = await Booking.findOne({ trackingId });
        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }

        // SSLCommerz configuration
        const store_id = process.env.STORE_ID;
        const store_passwd = process.env.STORE_PASS;
        const is_live = process.env.IS_LIVE === 'true';

        // determine app url
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const host = req.headers.get('host');
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

        const data = {
            total_amount: 50, // Static for now, can be dynamic based on vehicle type
            currency: 'BDT',
            tran_id: booking.trackingId, // use trackingId as transaction id
            success_url: `${appUrl}/api/payment/success?id=${booking.trackingId}`,
            fail_url: `${appUrl}/api/payment/fail?id=${booking.trackingId}`,
            cancel_url: `${appUrl}/api/payment/cancel?id=${booking.trackingId}`,
            ipn_url: `${appUrl}/api/payment/ipn`,
            shipping_method: 'Courier',
            product_name: 'Taxi Ride',
            product_category: 'Service',
            product_profile: 'general',
            cus_name: booking.customerName,
            cus_email: booking.customerEmail,
            cus_add1: booking.pickupAddress,
            cus_add2: booking.pickupAddress,
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: booking.customerPhone,
            cus_fax: booking.customerPhone,
            ship_name: booking.customerName,
            ship_add1: booking.pickupAddress,
            ship_add2: booking.pickupAddress,
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

        const apiResponse = await sslcz.init(data);

        if (apiResponse?.GatewayPageURL) {
            return NextResponse.json({ success: true, url: apiResponse.GatewayPageURL });
        } else {
            console.error('SSLCommerz Init Error:', apiResponse);
            return NextResponse.json({ success: false, error: 'Failed to initialize payment' }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Payment Init Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
