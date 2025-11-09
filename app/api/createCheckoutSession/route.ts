import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(){
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Murder Mystery Premium Access",
                            description: "Einmaliger Kauf für Premium-Funktionen",
                        },
                        unit_amount: 299,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/wizard`,
        }); 

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("[STRIPE_CREATE_SESSION_ERROR]:", err);
        return NextResponse.json({ error: "Fehler beim Erstellen der Zahlung" }, { status: 500 });
    }
}
