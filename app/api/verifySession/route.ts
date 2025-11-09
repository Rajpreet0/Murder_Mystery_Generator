import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "No session id provided" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return NextResponse.json({ success: false });
        }

        const secret = process.env.STRIPE_SECRET_KEY!;
        const premiumToken = crypto.createHmac("sha256", secret).update(sessionId).digest("hex");


        return NextResponse.json({ success: true, premiumToken });
    } catch (err) {
        console.error("[VERIFY_SESSION_ERROR]:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}