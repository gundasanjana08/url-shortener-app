'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [origin, setOrigin] = useState('')
  const [links, setLinks] = useState<any[]>([])   // ✅ declare links state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
    fetchLinks()
  }, [])

  async function fetchLinks() {
    const res = await fetch('/api/links')
    const data = await res.json()
    setLinks(data)
  }

  async function handleShorten(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setShortUrl(`${origin}/${data.slug}`)
    setUrl('')
    fetchLinks()
  }

  async function handleDelete(slug: string) {
    await fetch('/api/links', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    fetchLinks()
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Short Link</h2>
        <form onSubmit={handleShorten} className="flex gap-2">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Shorten
          </button>
        </form>
        {shortUrl && (
          <p className="mt-4">
            Short URL:{' '}
            <a href={shortUrl} className="text-blue-600 underline" target="_blank">
              {shortUrl}
            </a>
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Manage Links</h2>
        {links.length === 0 ? (
          <p className="text-gray-500">No links yet.</p>
        ) : (
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.slug} className="flex items-center justify-between border-b pb-2">
                <div>
                  <a
                    href={`${origin}/${link.slug}`}
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    {link.slug}
                  </a>{' '}
                  →{' '}
                  <span className="text-gray-700 break-all">{link.originalUrl}</span>{' '}
                  <span className="text-sm text-gray-500">({link.clicks} clicks)</span>
                </div>
                <button
                  onClick={() => handleDelete(link.slug)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}





