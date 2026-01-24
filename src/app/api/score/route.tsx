// app/api/score/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    try {
        const res = await fetch(`https://api.fairscale.xyz/score?wallet=${wallet}`, {
            headers: {
                'fairkey': '1582cfee47d73f1d72455af8fbf0c9752b22f3e69a720eda6d95616e7a007ddc'
            }
        });

        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        console.log(data, "data load");

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch score' }, { status: 500 });
    }
}