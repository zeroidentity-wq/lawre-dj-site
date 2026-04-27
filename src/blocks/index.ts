import { CTA } from './CTA'
import { FAQ } from './FAQ'
import { GalleryStrip } from './GalleryStrip'
import { Hero } from './Hero'
import { Packages } from './Packages'
import { RichText } from './RichText'
import { ServicesGrid } from './ServicesGrid'
import { Testimonials } from './Testimonials'

export const layoutBlocks = [
  Hero,
  RichText,
  ServicesGrid,
  Packages,
  GalleryStrip,
  Testimonials,
  FAQ,
  CTA,
] as const

export { CTA, FAQ, GalleryStrip, Hero, Packages, RichText, ServicesGrid, Testimonials }
