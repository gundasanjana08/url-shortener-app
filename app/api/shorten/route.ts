import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const slug = nanoid(6)

    const link = await prisma.link.create({
      data: { slug, originalUrl: url },
    })

    return NextResponse.json(link)
  } catch (err) {
    console.error('Error in /api/shorten:', err)
    return NextResponse.json({ error: 'Failed to shorten link' }, { status: 500 })
  }
}

