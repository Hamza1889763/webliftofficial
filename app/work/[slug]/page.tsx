import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/lib/work'
import CaseStudyClient from './CaseStudyClient'


export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug)
  if (!project) return {}

  return {
    title: `${project.name} — Work`,
    description: project.headline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — WebLifts`,
      description: project.headline,
      images: [project.cover],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const index = PROJECTS.findIndex((p) => p.slug === resolvedParams.slug)
  
  if (index === -1) notFound()

  console.log('resolvedParams.slug', resolvedParams.slug)
  const project = PROJECTS[index]
  // Wraps to the first project after the last one, so the "next" link never dead-ends.
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return <CaseStudyClient project={project} next={next} />
}