import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const payload = await req.json()
  const body = JSON.stringify(payload)

  console.log('Webhook payload:', payload)

  return new Response('Webhook received', { status: 200 })
}