import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const url = body.url

    if (!url) {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 })
    }

    const slug = nanoid(6)

    const link = await prisma.link.create({
      data: { slug, originalUrl: url },
    })

    // Important: return slug and originalUrl
    return NextResponse.json({
      slug: link.slug,
      originalUrl: link.originalUrl,
    })
  } catch (err) {
    console.error('Error in /api/shorten:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}



