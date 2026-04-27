import { Link } from 'react-router-dom'
import './Footer.css'

interface FooterProps {
  basePath?: string
}

export default function Footer({ basePath = '' }: FooterProps) {
  return (
    <footer>
      <div className="foot">
        <div style={{ maxWidth: 320 }}>
          <Link className="logo logo-footer" to="/" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="logo-mark"><img src="/logo.png" alt="Repbeats" /></span>
            <span>Repbeats</span>
          </Link>
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>Music engineered to the rhythm of your body. Built in Bangkok and New York.</p>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <h5>Product</h5>
            <a href={`${basePath}/#home`}>Home</a>
            <a href={`${basePath}/#library`}>Library</a>
            <a href={`${basePath}/#stats`}>Stats</a>
            <a href={`${basePath}/#discover`}>Discover</a>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/licenses">Licenses</Link>
          </div>
        </div>
      </div>
      <div className="foot-bot">
        <span>© 2026 Repbeats Audio Inc.</span>
        <span>Made for movement.</span>
      </div>
    </footer>
  )
}
