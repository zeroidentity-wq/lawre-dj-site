/**
 * On-demand ISR invalidation triggered from Payload `afterChange` / `afterDelete`
 * collection & global hooks. Maps each entity to the public routes that depend
 * on it and calls `revalidatePath` so admin saves are reflected immediately
 * (without waiting for the time-based `export const revalidate` window).
 *
 * Defensive by design: in non-Next runtimes (e.g. seed scripts) `next/cache`
 * may throw. We swallow and log so a failure here never breaks the actual save.
 */

type DocLike = { slug?: string | null } & Record<string, unknown>

async function safeRevalidatePath(
  path: string,
  type?: 'page' | 'layout',
): Promise<void> {
  try {
    const { revalidatePath } = await import('next/cache')
    if (type) {
      revalidatePath(path, type)
    } else {
      revalidatePath(path)
    }
  } catch (err) {
    // Non-Next context (seed scripts, tests) — silently no-op.
    if (process.env.PAYLOAD_REVALIDATE_DEBUG) {
      console.warn(`[revalidate] skipped ${path}:`, err)
    }
  }
}

function getSlug(doc: unknown): string | undefined {
  if (doc && typeof doc === 'object' && 'slug' in doc) {
    const s = (doc as DocLike).slug
    return typeof s === 'string' ? s : undefined
  }
  return undefined
}

export async function revalidateForCollection(
  collection: string,
  doc: unknown,
  previousDoc?: unknown,
): Promise<void> {
  const slug = getSlug(doc)
  const prevSlug = getSlug(previousDoc)
  const paths = new Set<string>()

  switch (collection) {
    case 'pages':
      paths.add('/')
      if (slug) paths.add(`/${slug}`)
      if (prevSlug && prevSlug !== slug) paths.add(`/${prevSlug}`)
      break

    case 'posts':
      paths.add('/')
      paths.add('/blog')
      if (slug) paths.add(`/blog/${slug}`)
      if (prevSlug && prevSlug !== slug) paths.add(`/blog/${prevSlug}`)
      break

    case 'services':
      paths.add('/')
      if (slug) paths.add(`/servicii/${slug}`)
      if (prevSlug && prevSlug !== slug) paths.add(`/servicii/${prevSlug}`)
      break

    case 'packages':
      paths.add('/')
      paths.add('/pachete')
      if (slug) paths.add(`/pachete/${slug}`)
      if (prevSlug && prevSlug !== slug) paths.add(`/pachete/${prevSlug}`)
      break

    case 'galleries':
      paths.add('/')
      paths.add('/galerie')
      break

    case 'mixes':
      paths.add('/')
      paths.add('/mixuri')
      break

    case 'testimonials':
      // Testimonialele apar pe homepage, /testimoniale, și filtrate pe pagini servicii.
      // Folosim layout-level revalidation pe `/` ca să prindem toate consumatoarele
      // care fetch-uiesc testimoniale, plus paginile dedicate.
      paths.add('/testimoniale')
      await safeRevalidatePath('/', 'layout')
      break

    case 'club-dates':
      paths.add('/')
      paths.add('/club-dates')
      break

    case 'equipment':
      paths.add('/echipament')
      break

    default:
      // Collections care nu apar în pagini publice (Users, ContactSubmissions, Events, Media).
      return
  }

  await Promise.all([...paths].map((p) => safeRevalidatePath(p)))
}

export async function revalidateForGlobal(global: string): Promise<void> {
  // SiteSettings/Menu/Footer afectează layout-ul (header + footer) — invalidăm
  // întreg arborele de la root.
  if (global === 'site-settings' || global === 'menu' || global === 'footer') {
    await safeRevalidatePath('/', 'layout')
  }
}
