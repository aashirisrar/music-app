import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe"

import { upsertPriceRecord, upsertProductRecord, manageSubscriptionStatusChange } from "@/libs/supabaseAdmin"

const relevantEvent = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
])

export async function POST(request: Request) {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature");

    const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (!signature || !webhook_secret) return;

        event = stripe.webhooks.constructEvent(body, signature, webhook_secret)
    } catch (error: any) {
        console.log("Error message: " + error.message)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    if (relevantEvent.has(event.type)) {
        try {
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object as Stripe.Product);
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object as Stripe.Price)
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object as Stripe.Subscription;
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer as string,
                        event.type === 'customer.subscription.created'
                    )
                    break;
                case 'checkout.session.completed':
                    const checkOutSession = event.data.object as Stripe.Checkout.Session;
                    if (checkOutSession.mode === 'subscription') {
                        const subscriptionId = checkOutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkOutSession.customer as string,
                            true
                        );
                    }
                    break;
                default:
                    throw new Error('Unhandled relevant event!')
            }
        } catch (error) {
            console.log(error)
            return new NextResponse('Webhook error', { status: 400 })
        }
    }

    return NextResponse.json({ recieved: true }, { status: 200 })
}

