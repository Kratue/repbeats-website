import { Link } from 'react-router-dom'
import './Nav.css'

interface NavProps {
  basePath?: string
}

export default function Nav({ basePath = '' }: NavProps) {
  return (
    <nav className="top">
      <Link className="logo" to="/">
        <span className="logo-mark">
          <img src="/logo.png" alt="Repbeats" />
        </span>
        <span>Repbeats</span>
      </Link>
      <div className="nav-links">
        <a href={`${basePath}/#home`}>Home</a>
        <a href={`${basePath}/#library`}>Library</a>
        <a href={`${basePath}/#stats`}>Stats</a>
        <a href={`${basePath}/#discover`}>Discover</a>
        <a href={`${basePath}/#modes`}>Modes</a>
      </div>
      <div className="nav-cta">
        <a href={`${basePath}/#cta`} className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: '13px' }}>Sign in</a>
        <a href={`${basePath}/#cta`} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '13px' }}>Get the app →</a>
      </div>
    </nav>
  )
}
