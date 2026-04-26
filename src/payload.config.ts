import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Events } from './collections/Events'
import { ClubDates } from './collections/ClubDates'
import { Galleries } from './collections/Galleries'
import { Services } from './collections/Services'
import { Packages } from './collections/Packages'
import { Equipment } from './collections/Equipment'
import { Testimonials } from './collections/Testimonials'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Mixes } from './collections/Mixes'

import { SiteSettings } from './globals/SiteSettings'
import { Menu } from './globals/Menu'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Services,
    Packages,
    Equipment,
    Galleries,
    Mixes,
    Events,
    ClubDates,
    Testimonials,
    ContactSubmissions,
  ],
  globals: [SiteSettings, Menu, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'contact@lawredj.ro',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Lawre DJ',
      })
    : undefined,
  sharp,
  plugins: [],
})
