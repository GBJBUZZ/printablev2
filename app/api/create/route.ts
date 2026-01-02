import { NextResponse, NextRequest } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { log } from 'node:console'

export async function GET(req: NextRequest) {


  const params = { firstName: 'John', lastName: 'Wick' }

  const client = await clerkClient()
try {
    const user = await client.users.createUser({    emailAddress: ["piyushcodes07@gmail.com"],phoneNumber:["9970634782"],password:"sajdbkajbdksab"})

    return NextResponse.json({ user })
} catch (error:any) {
    console.log(error.errors);
    
}

}