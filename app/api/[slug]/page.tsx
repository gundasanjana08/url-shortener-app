import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function SlugPage({ params }: { params: { slug: string } }) {
  // Look up the slug in the database
  const link = await prisma.link.findUnique({
    where: { slug: params.slug },
  })

  // If not found, show 404
  if (!link) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">404 – Link not found</h1>
      </div>
    )
  }

  // Increment click count
  await prisma.link.update({
    where: { slug: params.slug },
    data: { clicks: { increment: 1 } },
  })

  // Redirect to original URL
  redirect(link.originalUrl)
}




