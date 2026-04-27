import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from './Nav'
import Footer from './Footer'
import './LegalLayout.css'

interface TocItem { id: string; label: string }
interface Tab { path: string; label: string }

interface LegalLayoutProps {
  title: React.ReactNode
  subtitle: string
  effective: string
  version: string
  thirdMeta: { label: string; value: string }
  tabs: Tab[]
  activeTab: string
  toc: TocItem[]
  children: React.ReactNode
}

export default function LegalLayout({
  title, subtitle, effective, version, thirdMeta, tabs, activeTab, toc, children,
}: LegalLayoutProps) {
  const tocLinksRef = useRef<NodeListOf<HTMLAnchorElement> | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]')
    tocLinksRef.current = links
    const sections = Array.from(links)
      .map(a => document.querySelector<HTMLElement>(a.getAttribute('href')!))
      .filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'))
          const a = document.querySelector<HTMLAnchorElement>(`.toc a[href="#${e.target.id}"]`)
          if (a) a.classList.add('active')
        }
      })
    }, { rootMargin: '-30% 0px -60% 0px' })

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [children])

  return (
    <div>
      <Nav basePath="" />

      <section className="legal-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="eyebrow">· Legal · {activeTab}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="meta">
              <span>Effective<strong>{effective}</strong></span>
              <span>Version<strong>{version}</strong></span>
              <span>{thirdMeta.label}<strong>{thirdMeta.value}</strong></span>
            </div>
            <div className="legal-tabs">
              {tabs.map(tab => (
                <Link key={tab.path} to={tab.path} className={activeTab === tab.label ? 'active' : ''}>
                  {tab.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-grid">
          <aside className="toc">
            <h6>On this page</h6>
            {toc.map((item, i) => (
              <a key={item.id} href={`#${item.id}`} className={i === 0 ? 'active' : ''}>
                {item.label}
              </a>
            ))}
          </aside>
          <div className="prose">{children}</div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
