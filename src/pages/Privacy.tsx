import LegalLayout from '../components/LegalLayout'

const TABS = [
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
  { path: '/licenses', label: 'Licenses' },
]

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'collect', label: 'What we collect' },
  { id: 'biometrics', label: 'Biometric signals' },
  { id: 'music', label: 'Music & listening' },
  { id: 'share', label: 'Sharing' },
  { id: 'retain', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
]

export default function Privacy() {
  return (
    <LegalLayout
      title={<>Your body data is <span className="serif">yours.</span></>}
      subtitle="Repbeats is built on a simple rule: biometric signals stay on your device unless you choose otherwise. This page explains — in plain language — what we collect, why, and how you stay in control."
      effective="April 1, 2026"
      version="v3.2"
      thirdMeta={{ label: 'Jurisdiction', value: 'Global · GDPR · CCPA' }}
      tabs={TABS}
      activeTab="Privacy"
      toc={TOC}
    >
      <h2 id="overview">Overview</h2>
      <p>Repbeats is a mobile app that syncs music tempo to your workout. To do that, we read signals from your phone and wearables — heart-rate, motion, cadence — and use them to pick and time-stretch tracks in real time.</p>
      <p>By default, everything we read is processed <strong>on-device</strong>. Your raw biometric stream never reaches our servers. When we do need something in the cloud (account basics, purchases, your custom playlists), we keep it minimal and encrypted.</p>

      <div className="callout-box">
        <div className="ic">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="txt">
          <strong>The short version</strong>
          On-device by default. No biometric sale, ever. Export or delete your data in two taps from Settings → Privacy.
        </div>
      </div>

      <h2 id="collect">What we collect</h2>
      <p>We group data into three buckets:</p>
      <ul>
        <li><strong>Account data</strong> — email, display name, password hash, subscription status. Stored on our servers so you can sign in across devices.</li>
        <li><strong>Biometric signals</strong> — heart-rate, steps, cadence, effort. Processed locally. Only aggregated session summaries (e.g. average BPM, duration) leave the device, and only if you enable cloud sync.</li>
        <li><strong>App telemetry</strong> — crash logs, anonymised feature counters. Used to fix bugs. No advertising identifiers.</li>
      </ul>

      <h2 id="biometrics">Biometric signals</h2>
      <p>This is the sensitive stuff, so we treat it separately. Repbeats reads from:</p>
      <ul>
        <li><strong>Apple Health</strong> — heart-rate, steps, workouts. Permission is requested once and revocable any time in iOS Settings.</li>
        <li><strong>Fitbit</strong> — via their OAuth flow; we request the narrowest scopes needed.</li>
        <li><strong>Your phone's motion sensors</strong> — cadence and step-frequency during a session.</li>
      </ul>
      <p>Raw samples exist only in RAM during a session. When the session ends, we persist a summary (duration, zones, average HR) to local storage. Nothing biometric goes to us without cloud sync turned on, and even then: encrypted at rest, never shared with third parties, never used to train general-purpose models.</p>

      <h2 id="music">Music & listening</h2>
      <p>Repbeats connects to <strong>Apple Music</strong> and <strong>Spotify Premium</strong> through their official SDKs. Listening events (which track, for how long, what BPM it hit) stay on-device for the Auto-DJ engine. If you opt into recommendations, we share a hashed track-ID and your session's target BPM — nothing else — with the matcher service.</p>

      <h2 id="share">Sharing</h2>
      <p>We do not sell data. Ever. We share in three narrow cases:</p>
      <ol>
        <li><strong>Service providers</strong> that host our infrastructure (AWS, Stripe for payments). Contractually bound, processors only.</li>
        <li><strong>Legal obligation</strong> — valid court order, subpoena, or to prevent imminent harm.</li>
        <li><strong>With your consent</strong> — e.g. if you post a session to a social feed.</li>
      </ol>

      <h2 id="retain">Retention</h2>
      <p>Account data lives as long as your account does. Session summaries default to a 12-month rolling window; you can change this to 3, 6, or unlimited in Settings → Data. Telemetry is aged out at 30 days.</p>
      <p>Delete your account in Settings → Account → Delete, or email <a href="mailto:privacy@repbeats.app">privacy@repbeats.app</a>. We confirm within 72 hours and purge within 30 days.</p>

      <h2 id="rights">Your rights</h2>
      <p>Wherever you are, you can:</p>
      <ul>
        <li><strong>Access</strong> — export everything we hold as a JSON bundle.</li>
        <li><strong>Correct</strong> — edit profile data in-app.</li>
        <li><strong>Delete</strong> — wipe your account and all associated data.</li>
        <li><strong>Object</strong> — opt out of telemetry and recommendations.</li>
        <li><strong>Port</strong> — hand your export to any other service you like.</li>
      </ul>
      <p>EU/UK residents can contact our Data Protection Officer at <a href="mailto:dpo@repbeats.app">dpo@repbeats.app</a>. California residents have specific CCPA rights, detailed at <a href="#">repbeats.app/ccpa</a>.</p>

      <h2 id="children">Children</h2>
      <p>Repbeats is not directed at children under 13 (under 16 in the EU). We do not knowingly collect their data. If you believe a child has signed up, email <a href="mailto:privacy@repbeats.app">privacy@repbeats.app</a> and we will remove the account.</p>

      <h2 id="changes">Changes to this policy</h2>
      <p>We will notify you in-app and by email at least <strong>14 days</strong> before any material change. Non-material updates (typos, clarifications) are versioned above. The full change log lives on our <a href="#">GitHub</a>.</p>

      <h2 id="contact">Contact</h2>
      <p>Questions about this policy? Reach us at:</p>
      <ul>
        <li><strong>Email</strong> — <a href="mailto:privacy@repbeats.app">privacy@repbeats.app</a></li>
        <li><strong>Post</strong> — Repbeats Audio Inc., 228 Park Ave S, New York, NY 10003</li>
        <li><strong>EU Representative</strong> — Rep-EU GmbH, Kurfürstendamm 11, 10719 Berlin</li>
      </ul>
    </LegalLayout>
  )
}
