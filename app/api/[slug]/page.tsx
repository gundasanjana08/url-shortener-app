import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const link = await prisma.link.findUnique({
    where: { slug: params.slug },
  })

  if (!link) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">404 – Link not found</h1>
      </div>
    )
  }

  await prisma.link.update({
    where: { slug: params.slug },
    data: { clicks: { increment: 1 } },
  })

  redirect(link.originalUrl)
}





