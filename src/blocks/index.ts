import { CTA } from './CTA'
import { FAQ } from './FAQ'
import { FeatureGrid } from './FeatureGrid'
import { GalleryStrip } from './GalleryStrip'
import { Hero } from './Hero'
import { Packages } from './Packages'
import { ProcessSteps } from './ProcessSteps'
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
  FeatureGrid,
  ProcessSteps,
  FAQ,
  CTA,
] as const

export {
  CTA,
  FAQ,
  FeatureGrid,
  GalleryStrip,
  Hero,
  Packages,
  ProcessSteps,
  RichText,
  ServicesGrid,
  Testimonials,
}
