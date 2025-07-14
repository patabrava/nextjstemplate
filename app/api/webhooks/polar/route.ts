
import { db } from '@/db/drizzle'
import { subscription } from '@/db/schema'
import { eq } from 'drizzle-orm'
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

  // Handle the event
  switch (event.type) {
    case 'subscription.created':
    case 'subscription.updated':
      const sub = event.payload
      await db.insert(subscription).values({
        id: sub.id,
        userId: sub.customer_id,
        ...sub,
      }).onConflictDoUpdate({ target: subscription.id, set: { ...sub } })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
}
