import LegalLayout from '../components/LegalLayout'

const TABS = [
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
  { path: '/licenses', label: 'Licenses' },
]

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'app', label: 'App license' },
  { id: 'oss', label: 'Open-source' },
  { id: 'audio', label: 'Audio content' },
  { id: 'fonts', label: 'Fonts & icons' },
  { id: 'trademarks', label: 'Trademarks' },
  { id: 'contact', label: 'Contact' },
]

const OSS_LIBS = [
  { name: 'React', version: '18.3', license: 'MIT', url: 'https://reactjs.org' },
  { name: 'React Native', version: '0.74', license: 'MIT', url: 'https://reactnative.dev' },
  { name: 'framer-motion', version: '11.x', license: 'MIT', url: 'https://framer.com/motion' },
  { name: 'react-router-dom', version: '6.x', license: 'MIT', url: 'https://reactrouter.com' },
  { name: 'Vite', version: '5.x', license: 'MIT', url: 'https://vitejs.dev' },
  { name: 'TypeScript', version: '5.x', license: 'Apache-2.0', url: 'https://typescriptlang.org' },
  { name: 'SoundTouch', version: '2.3', license: 'LGPL-2.1', url: 'https://surina.net/soundtouch' },
  { name: 'aubio', version: '0.4.9', license: 'GPL-3.0', url: 'https://aubio.org' },
  { name: 'Lottie', version: '6.x', license: 'Apache-2.0', url: 'https://airbnb.io/lottie' },
  { name: 'Stripe React Native', version: '0.37', license: 'MIT', url: 'https://stripe.com/docs/stripe-js/react' },
]

export default function Licenses() {
  return (
    <LegalLayout
      title={<>Built on great <span className="serif">shoulders.</span></>}
      subtitle="Repbeats is made possible by a stack of incredible open-source libraries, licensed audio content, and trusted third-party services. We credit them all here."
      effective="April 1, 2026"
      version="v3.2"
      thirdMeta={{ label: 'Scope', value: 'iOS · Android · Web' }}
      tabs={TABS}
      activeTab="Licenses"
      toc={TOC}
    >
      <h2 id="overview">Overview</h2>
      <p>This page lists the licenses for software libraries, audio content, fonts, and third-party integrations used in Repbeats. We are committed to complying fully with every open-source license we rely on.</p>
      <p>If you believe we have mis-attributed or omitted a license, please contact us at <a href="mailto:legal@repbeats.app">legal@repbeats.app</a> — we will correct it within 5 business days.</p>

      <div className="callout-box">
        <div className="ic">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <div className="txt">
          <strong>Machine-readable SBOM</strong>
          A full Software Bill of Materials in SPDX format is available at <a href="#">repbeats.app/sbom.json</a>.
        </div>
      </div>

      <h2 id="app">App license</h2>
      <p>The Repbeats application (including its source code, compiled binaries, assets, and UI) is proprietary software owned by Repbeats Audio Inc. You are granted a limited, non-exclusive, non-transferable license to install and use the app on devices you own or control, for personal, non-commercial purposes.</p>
      <p>You may not: copy, modify, distribute, sell, or lease any part of the app; reverse-engineer or attempt to extract source code; or remove proprietary notices.</p>

      <h2 id="oss">Open-source libraries</h2>
      <p>Repbeats uses the following open-source libraries. Full license texts are available in the app under Settings → Legal → Open Source.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Library</th>
            <th>Version</th>
            <th>License</th>
          </tr>
        </thead>
        <tbody>
          {OSS_LIBS.map(lib => (
            <tr key={lib.name}>
              <td><a href={lib.url} target="_blank" rel="noopener noreferrer">{lib.name}</a></td>
              <td><code>{lib.version}</code></td>
              <td>{lib.license}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="audio">Audio content</h2>
      <p>Repbeats streams music through licensed integrations with:</p>
      <ul>
        <li><strong>Apple Music</strong> — via MusicKit. Your Apple Music subscription grants playback rights; Repbeats does not store or re-distribute tracks.</li>
        <li><strong>Spotify Premium</strong> — via the Spotify iOS/Android SDK. Your Spotify subscription governs track access.</li>
        <li><strong>Our own stems library</strong> — original compositions and sound design elements licensed exclusively to Repbeats Audio Inc., used for BPM-bridge transitions and ambient fill layers.</li>
      </ul>
      <p>Repbeats applies time-stretching and pitch-shifting to licensed tracks in real time. This use is covered by our agreements with Apple and Spotify respectively; no separate synchronisation license is required.</p>

      <h2 id="fonts">Fonts & icons</h2>
      <ul>
        <li><strong>Baloo 2</strong> — SIL Open Font License 1.1. Designed by Ek Type.</li>
        <li><strong>Instrument Serif</strong> — SIL Open Font License 1.1. Designed by Google Fonts.</li>
        <li><strong>JetBrains Mono</strong> — SIL Open Font License 1.1. Designed by JetBrains.</li>
        <li><strong>Lucide Icons</strong> — ISC License. SVG icon set used in UI.</li>
      </ul>

      <h2 id="trademarks">Trademarks</h2>
      <p>REPBEATS and the Repbeats logo are trademarks of Repbeats Audio Inc. registered in the United States and other jurisdictions. Use of these marks requires written permission.</p>
      <p>Apple, Apple Health, Apple Music, App Store, and related marks are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC. Fitbit is a trademark of Google LLC. Spotify is a registered trademark of Spotify AB. These marks are used solely to describe compatibility and integration, not to imply endorsement.</p>

      <h2 id="contact">Contact</h2>
      <p>For licensing enquiries:</p>
      <ul>
        <li><strong>General</strong> — <a href="mailto:legal@repbeats.app">legal@repbeats.app</a></li>
        <li><strong>Open-source compliance</strong> — <a href="mailto:oss@repbeats.app">oss@repbeats.app</a></li>
        <li><strong>Media / press kit</strong> — <a href="mailto:press@repbeats.app">press@repbeats.app</a></li>
      </ul>
    </LegalLayout>
  )
}
