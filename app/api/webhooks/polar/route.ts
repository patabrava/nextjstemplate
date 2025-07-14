
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Polar from '@polar-sh/sdk'

const polar = new Polar()

export async function POST(request: Request) {
  const body = await request.text()
  const sig = headers().get('polar-webhook-signature') as string

  let event

  try {
    event = polar.webhooks.constructEvent(
      body,
      sig,
      process.env.POLAR_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const supabase = createClient()

  // Handle the event
  switch (event.type) {
    case 'subscription.created':
    case 'subscription.updated':
      const sub = event.payload
      await supabase.from('subscription').upsert({
        id: sub.id,
        user_id: sub.customer_id,
        created_at: sub.created_at,
        modified_at: sub.modified_at,
        amount: sub.amount,
        currency: sub.currency,
        recurring_interval: sub.recurring_interval,
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
        cancel_at_period_end: sub.cancel_at_period_end,
        canceled_at: sub.canceled_at,
        started_at: sub.started_at,
        ends_at: sub.ends_at,
        ended_at: sub.ended_at,
        customer_id: sub.customer_id,
        product_id: sub.product_id,
        discount_id: sub.discount_id,
        checkout_id: sub.checkout_id,
        customer_cancellation_reason: sub.customer_cancellation_reason,
        customer_cancellation_comment: sub.customer_cancellation_comment,
        metadata: sub.metadata,
        custom_field_data: sub.custom_field_data,
      }, { onConflict: 'id' })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
}
