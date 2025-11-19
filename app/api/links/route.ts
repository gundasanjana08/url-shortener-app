import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const links = await prisma.link.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(links)
}

export async function DELETE(req: Request) {
  const { slug } = await req.json()
  await prisma.link.delete({ where: { slug } })
  return NextResponse.json({ success: true })
}


