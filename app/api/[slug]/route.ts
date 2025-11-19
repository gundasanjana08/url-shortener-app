import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Find the link by slug
    const link = await prisma.link.findUnique({
      where: { slug },
    })

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    // Increment click count
    await prisma.link.update({
      where: { slug },
      data: { clicks: { increment: 1 } },
    })

    // Redirect to original URL
    return NextResponse.redirect(link.originalUrl)
  } catch (err) {
    console.error('Error in redirect route:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
