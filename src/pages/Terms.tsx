import LegalLayout from '../components/LegalLayout'

const TABS = [
  { path: '/privacy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
  { path: '/licenses', label: 'Licenses' },
]

const TOC = [
  { id: 'accept', label: 'Acceptance' },
  { id: 'account', label: 'Your account' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'acceptable', label: 'Acceptable use' },
  { id: 'content', label: 'Your content' },
  { id: 'ip', label: 'Our IP' },
  { id: 'third', label: 'Third-party services' },
  { id: 'health', label: 'Health disclaimer' },
  { id: 'warranty', label: 'Warranty & liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'disputes', label: 'Disputes' },
  { id: 'misc', label: 'Miscellaneous' },
]

export default function Terms() {
  return (
    <LegalLayout
      title={<>The rules of the <span className="serif">room.</span></>}
      subtitle="These terms govern your use of Repbeats — what we promise, what you agree to, and how we handle the rough edges. Written to be read, not just filed."
      effective="April 1, 2026"
      version="v3.2"
      thirdMeta={{ label: 'Governing law', value: 'State of New York, USA' }}
      tabs={TABS}
      activeTab="Terms"
      toc={TOC}
    >
      <h2 id="accept">1. Acceptance</h2>
      <p>By creating a Repbeats account or using the app, you agree to these Terms and to our <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the service. Material updates are notified in-app and by email 14 days in advance.</p>

      <h2 id="account">2. Your account</h2>
      <p>You must be at least 13 years old (16 in the EU). You are responsible for activity under your account and for keeping your credentials private. Notify us at <a href="mailto:security@repbeats.app">security@repbeats.app</a> if you suspect unauthorised access.</p>

      <h2 id="subscriptions">3. Subscriptions & billing</h2>
      <p>Repbeats offers a free tier and a paid subscription (monthly or annual). Paid plans auto-renew unless cancelled at least 24 hours before the end of the current period, via your App Store or Google Play account.</p>
      <ul>
        <li><strong>Free trial</strong> — 14 days on first sign-up. Cancel before the trial ends to avoid being charged.</li>
        <li><strong>Refunds</strong> — handled by Apple or Google under their store policies. We cannot issue refunds directly for store-mediated purchases.</li>
        <li><strong>Price changes</strong> — notified 30 days in advance; takes effect at your next renewal.</li>
      </ul>

      <div className="callout-box">
        <div className="ic">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M8 6h8M6 10h12M4 14h16M6 18h12" />
          </svg>
        </div>
        <div className="txt">
          <strong>Cancel anytime, two taps</strong>
          Settings → Subscription → Manage. You keep access until the period ends; no pro-rated refunds.
        </div>
      </div>

      <h2 id="acceptable">4. Acceptable use</h2>
      <p>Do not:</p>
      <ul>
        <li>Reverse-engineer, decompile, or tamper with the app beyond what applicable law allows.</li>
        <li>Use Repbeats to harass, defame, or infringe the rights of others.</li>
        <li>Resell, rent, or redistribute Repbeats content without a written license.</li>
        <li>Scrape, bulk-download or crawl our APIs beyond documented rate limits.</li>
        <li>Upload malware, illegal content, or content you don't have rights to.</li>
      </ul>
      <p>We may suspend or terminate accounts that violate these rules.</p>

      <h2 id="content">5. Your content</h2>
      <p>You own the custom playlists, tags and annotations you create. By uploading them to Repbeats, you grant us a worldwide, royalty-free license to host, display and process that content solely to provide the service. That license ends when you delete the content.</p>

      <h2 id="ip">6. Our intellectual property</h2>
      <p>The Repbeats name, logo, app, code, UI and training models are ours or our licensors'. Nothing in these Terms transfers ownership to you. You receive a limited, revocable, non-exclusive license to use the app for personal, non-commercial purposes.</p>

      <h2 id="third">7. Third-party services</h2>
      <p>Repbeats integrates with Apple Music, Spotify Premium, Apple Health and Fitbit. Your use of those services is subject to their own terms. We are not responsible for outages, content policies or price changes outside our control.</p>

      <h2 id="health">8. Health & safety disclaimer</h2>
      <p><strong>Repbeats is not a medical device.</strong> Heart-rate, effort and zone readings are informational. Consult a qualified physician before starting any exercise program, and stop immediately if you feel unwell. We disclaim liability for injury caused by over-exertion, equipment failure, or environmental hazards.</p>

      <h2 id="warranty">9. Warranty & liability</h2>
      <p>The service is provided <strong>"as is"</strong> and <strong>"as available"</strong>. We make no warranty that it will be uninterrupted, error-free, or meet your specific needs.</p>
      <p>To the maximum extent permitted by law, Repbeats's aggregate liability is limited to the greater of (a) the fees you paid in the 12 months before the claim, or (b) USD 100. We are not liable for indirect, incidental or consequential damages.</p>
      <p>Some jurisdictions do not allow these limitations, in which case they apply only to the extent permitted.</p>

      <h2 id="termination">10. Termination</h2>
      <p>You can close your account anytime in Settings → Account → Delete. We may suspend or terminate your access for breach of these Terms, with notice except in cases of fraud, security threats, or legal orders. Sections 5 (content license), 6 (IP), 9 (liability), and 11 (disputes) survive termination.</p>

      <h2 id="disputes">11. Dispute resolution</h2>
      <p>Governing law is the State of New York, USA. Before formal action, we'll try in good faith to resolve disputes at <a href="mailto:legal@repbeats.app">legal@repbeats.app</a> for 30 days. Unresolved disputes go to binding arbitration under JAMS rules, seated in New York, except you retain the right to bring claims in small-claims court.</p>
      <p>Class-action waiver: you agree to bring claims only in your individual capacity.</p>

      <h2 id="misc">12. Miscellaneous</h2>
      <ul>
        <li><strong>Entire agreement</strong> — these Terms plus the Privacy Policy are the full agreement between us.</li>
        <li><strong>Severability</strong> — if a clause is unenforceable, the rest remains in effect.</li>
        <li><strong>No waiver</strong> — our failure to enforce a right is not a waiver of it.</li>
        <li><strong>Assignment</strong> — you may not assign these Terms; we may assign them to a successor entity.</li>
        <li><strong>Contact</strong> — <a href="mailto:legal@repbeats.app">legal@repbeats.app</a>.</li>
      </ul>
    </LegalLayout>
  )
}
