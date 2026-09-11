import { NextResponse } from 'next/server';

const PROMO_CODES: Record<string, number> = {
    'WELCOME10': 10,
    'SWIFT20': 20,
    'FIRST50': 50,
};

export async function POST(req: Request) {
    try {
        const { code, vehicleType, distance } = await req.json();
        const upperCode = code?.toUpperCase();

        if (!upperCode || !PROMO_CODES[upperCode]) {
            return NextResponse.json({ success: false, error: 'Invalid promo code' }, { status: 400 });
        }

        const VEHICLE_RATES: Record<string, number> = {
            standard: 1.5,
            premium: 3.5,
            van: 5.0,
        };

        const rate = VEHICLE_RATES[vehicleType] || 1.5;
        const baseFare = Math.round(rate * (distance || 5));
        const discountPercent = PROMO_CODES[upperCode];
        const discount = Math.round(baseFare * (discountPercent / 100));
        const finalFare = Math.max(baseFare - discount, 0);

        return NextResponse.json({
            success: true,
            data: {
                code: upperCode,
                discountPercent,
                discount,
                baseFare,
                finalFare,
            }
        });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
    }
}
