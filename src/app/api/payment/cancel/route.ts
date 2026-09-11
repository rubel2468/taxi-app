import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const trackingId = new URL(req.url).searchParams.get('id');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    return NextResponse.redirect(
        `${baseUrl}/checkout/${trackingId}?payment=cancelled`,
        { status: 303 }
    );
}
