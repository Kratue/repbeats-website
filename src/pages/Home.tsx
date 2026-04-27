import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './Home.css'

const MARQUEE_ITEMS = [
  { t: 'Run further', s: 'locked' },
  { t: 'Lift heavier', s: 'in tempo' },
  { t: 'Cycle longer', s: 'in phase' },
  { t: 'Breathe easier', s: 'in key' },
  { t: 'Recover faster', s: 'in rhythm' },
]

function FadeIn({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function LiveChip({ id, label, color }: { id: string; label: string; color: string }) {
  const [val, setVal] = useState(148)
  useEffect(() => {
    const t = setInterval(() => setVal(146 + Math.round(Math.random() * 6)), 1300)
    return () => clearInterval(t)
  }, [])
  return (
    <div className={`float-chip ${id}`}>
      <span className="dot" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      <div>
        <div className="n">{id === 'chip-hr' ? val - Math.round(Math.random() * 3) : val}</div>
        <div className="l">{label}</div>
      </div>
    </div>
  )
}

function DeviceStack() {
  const stageRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)
  const txRef = useRef(-16)
  const tyRef = useRef(6)
  const targetRef = useRef({ mx: 0, my: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const stage = stageRef.current
    const stack = stackRef.current
    if (!stage || !stack) return

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      targetRef.current.mx = (e.clientX - r.left) / r.width - 0.5
      targetRef.current.my = (e.clientY - r.top) / r.height - 0.5
    }
    stage.addEventListener('mousemove', onMove)

    function frame() {
      const { mx, my } = targetRef.current
      txRef.current += ((-16 + mx * -14) - txRef.current) * 0.06
      tyRef.current += ((6 + my * 10) - tyRef.current) * 0.06
      if (stack) stack.style.transform = `rotateX(${tyRef.current}deg) rotateY(${txRef.current}deg)`
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      stage.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setShift(s => (s + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  const ORDER = ['d-back', 'd-mid', 'd-front'] as const
  const screens = ['/screen-stats.png', '/screen-library.png', '/screen-home.png']

  return (
    <div className="stack-stage" ref={stageRef}>
      <div className="stack" ref={stackRef}>
        {screens.map((src, i) => (
          <div key={src} className={`device ${ORDER[(i + shift) % 3]}`}>
            <div className="screen"><img src={src} alt="" /></div>
          </div>
        ))}
      </div>
      <LiveChip id="chip-bpm" label="TRACK BPM" color="var(--accent)" />
      <LiveChip id="chip-hr" label="HEART · LIVE" color="var(--hot)" />
    </div>
  )
}

function PhoneFrame({ src, callouts, reverse = false }: { src: string; callouts: { top: string; label: string; side: 'left' | 'right' }[]; reverse?: boolean }) {
  return (
    <div className="feat-phone">
      <div className={`pframe${reverse ? ' pframe-reverse' : ''}`}>
        <div className="pscreen"><img src={src} alt="" /></div>
        {callouts.map((c, i) => (
          <div key={i} className={`callout ${c.side}`} style={{ top: c.top, [c.side === 'right' ? 'right' : 'left']: c.side === 'right' ? '-210px' : '-220px' }}>
            {c.side === 'right' ? `· ${c.label}` : <><span className="pt">{c.label.split('·')[0].trim()}</span>{c.label.includes('·') ? ` · ${c.label.split('·')[1].trim()}` : ''}</>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <div>
      <Nav />

      {/* HERO */}
      <section className="hero" id="hero">
        <motion.div className="hero-bg" style={{ opacity: bgOpacity }}>
          <div className="hero-grid-lines" />
        </motion.div>

        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 3 }}
          >
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span className="mono" style={{ fontSize: 11, letterSpacing: '.14em', color: '#cfcfc9' }}>NOW WITH APPLE HEALTH · FITBIT</span>
            </div>

            <h1>
              Your body,<br />
              <span className="serif">scored</span> to the beat.
            </h1>

            <p className="lede">Repbeats listens to your heart, your steps and your pace — then plays music that locks onto your cadence. Pick a mode, press start, and every rep, sprint and cooldown lands on the beat.</p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="#cta">Start 14 days free →</a>
              <a className="btn btn-ghost" href="#home">See the app</a>
            </div>

            <div className="hero-meta">
              <div><div className="num">48M+</div><div className="lbl">Reps synced</div></div>
              <div><div className="num">128 <span style={{ fontSize: 16, color: 'var(--muted)' }}>avg bpm</span></div><div className="lbl">This week</div></div>
              <div><div className="num">4.9 ★</div><div className="lbl">App Store</div></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
          >
            <DeviceStack />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div className="item" key={i}>
              <span>{item.t}</span>
              <span className="serif">{item.s}</span>
              <span className="star">✺</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOME FEATURE */}
      <section id="home">
        <div className="container">
          <FadeIn className="section-head">
            <div>
              <div className="eyebrow">· The home screen</div>
              <h2>Everything for today's <span className="serif">session</span>, one tap away.</h2>
            </div>
            <p>The home dashboard pulls together what you did, what's suggested, and the six modes you'll actually use. No scroll-hunting for a playlist — just hit Start.</p>
          </FadeIn>

          <FadeIn className="feat" delay={0.1}>
            <div className="feat-phone">
              <div className="pframe">
                <div className="pscreen"><img src="/screen-home.png" alt="Home screen" /></div>
                <div className="callout right" style={{ top: '22%', right: -210 }}>· 726 KCAL <span className="pt">live from watch</span></div>
                <div className="callout right" style={{ top: '48%', right: -210 }}>· FITNESS SKILLS <span className="pt">+17 vs last month</span></div>
                <div className="callout right" style={{ top: '74%', right: -210 }}>· 6 MODES <span className="pt">one-tap</span></div>
              </div>
            </div>
            <div className="feat-copy">
              <div className="eyebrow">· Home</div>
              <h3>A dashboard that reads like a <span className="serif">warm-up.</span></h3>
              <p>Your latest workout up top with live calories, duration and steps. Fitness skills trending above last month. A suggested playlist cued to today's energy. Then: six mode chips, colour-coded, ready to go.</p>
              <div className="feat-points">
                <div className="fp"><span className="k">01</span><span className="v">Start workout from the card — no menu diving.<small>One tap launches with the matching playlist.</small></span></div>
                <div className="fp"><span className="k">02</span><span className="v">Fitness-skills score trends against your last 30 days.<small>+17 this month means pace, cadence and HR variability are all up.</small></span></div>
                <div className="fp"><span className="k">03</span><span className="v">Suggestions learn from what you actually finish.<small>Skip a track twice and we drop its family from rotation.</small></span></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LIBRARY */}
      <section id="library" style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeIn className="feat feat-reverse" delay={0.1}>
            <div className="feat-phone">
              <div className="pframe pframe-reverse">
                <div className="pscreen"><img src="/screen-library.png" alt="Library screen" /></div>
                <div className="callout left" style={{ top: '26%', left: -220 }}><span className="pt">140 BPM RUN</span> · 3 songs · 30 min</div>
                <div className="callout left" style={{ top: '46%', left: -220 }}><span className="pt">HIIT BURN</span> · Interval-aware</div>
                <div className="callout left" style={{ top: '66%', left: -220 }}><span className="pt">POWER LIFTS</span> · 4 songs · 50 min</div>
              </div>
            </div>
            <div className="feat-copy">
              <div className="eyebrow">· Library</div>
              <h3>Playlists <span className="serif">built</span> around a BPM — not a vibe.</h3>
              <p>Every playlist is indexed by its tempo range and its purpose. 140 BPM Run. HIIT Burn. Power Lifts. Cardio Flow. When you pick one, Repbeats promises it'll hold that tempo within ±3 BPM of your heart, for as long as you move.</p>
              <div className="feat-points">
                <div className="fp"><span className="k">TAGGED</span><span className="v">Every track has true BPM, key, and intensity.<small>Not the label's marketing metadata — our model's, re-analysed on upload.</small></span></div>
                <div className="fp"><span className="k">LIKED</span><span className="v">A separate Liked tab keeps favourites across modes.<small>Thumbs-up here, it gets priority in any mode that fits.</small></span></div>
                <div className="fp"><span className="k">YOURS</span><span className="v">Build custom playlists with a BPM target.<small>Drop in any track — we time-stretch to fit.</small></span></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeIn className="feat" delay={0.1}>
            <div className="feat-phone">
              <div className="pframe">
                <div className="pscreen"><img src="/screen-stats.png" alt="Stats screen" /></div>
                <div className="callout right" style={{ top: '24%', right: -220 }}><span className="pt">APPLE HEALTH</span> · LIVE</div>
                <div className="callout right" style={{ top: '52%', right: -220 }}><span className="pt">FITBIT</span> · connected</div>
                <div className="callout right" style={{ top: '76%', right: -220 }}><span className="pt">BPM</span> · updates every second</div>
              </div>
            </div>
            <div className="feat-copy">
              <div className="eyebrow">· Wearable stats</div>
              <h3>Pairs with the watch <span className="serif">already</span> on your wrist.</h3>
              <p>Repbeats reads from Apple Health and Fitbit simultaneously. Steps, heart-rate and BPM land in one view — no separate account, no third app, no lag.</p>
              <div className="feat-points">
                <div className="fp"><span className="k">TODAY</span><span className="v">5,430 steps, pulled live from Apple Health.<small>Historical comparison against yesterday in the same card.</small></span></div>
                <div className="fp"><span className="k">LIVE BPM</span><span className="v">Heart-rate streams at 1Hz into the DJ engine.<small>Every beat adjusts the next track's tempo target.</small></span></div>
                <div className="fp"><span className="k">PRIVACY</span><span className="v">All biometric data stays on-device by default.<small>Turn on cloud sync only if you want multi-device history.</small></span></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DISCOVER */}
      <section id="discover" style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeIn className="feat feat-reverse" delay={0.1}>
            <div className="feat-phone">
              <div className="pframe pframe-reverse">
                <div className="pscreen"><img src="/screen-search.png" alt="Discover screen" /></div>
                <div className="callout left" style={{ top: '22%', left: -220 }}><span className="pt">BROWSE</span> · by workout mode</div>
                <div className="callout left" style={{ top: '44%', left: -220 }}><span className="pt">TRENDING</span> · this week</div>
                <div className="callout left" style={{ top: '66%', left: -220 }}><span className="pt">130 BPM</span> · on every card</div>
              </div>
            </div>
            <div className="feat-copy">
              <div className="eyebrow">· Discover</div>
              <h3>Find the track that'll <span className="serif">carry</span> your next set.</h3>
              <p>Discover is sorted by workout, not by mood. Browse Heavy Lift, Running, HIIT, Cardio, Warmup or Cooldown. Trending cards surface what your community's running to this week — every one stamped with its actual BPM.</p>
              <div className="feat-points">
                <div className="fp"><span className="k">CHIPS</span><span className="v">Filter by mode in a single tap.<small>Chips match the same colors used on the Home screen.</small></span></div>
                <div className="fp"><span className="k">BPM TAG</span><span className="v">Every trending tile shows its tempo up front.<small>Know before you tap whether it fits your session.</small></span></div>
                <div className="fp"><span className="k">FOR YOU</span><span className="v">Playlists for you adapt to your last 7 days.<small>More lifts? More 90–110 BPM. More runs? More 140s.</small></span></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MODES */}
      <section id="modes">
        <div className="container">
          <FadeIn className="section-head">
            <div>
              <div className="eyebrow">· Six modes</div>
              <h2>One tap — the <span className="serif">whole</span> session changes.</h2>
            </div>
            <p>Every mode picks a tempo curve, a track palette, and an energy arc. They're the same chips you see inside the app — designed so a sweaty thumb can hit them mid-workout.</p>
          </FadeIn>

          <FadeIn style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' } as React.CSSProperties} delay={0.1}>
            <div className="modes-pills">
              {[
                { cls: 'lift', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 10v4M20 10v4M8 8v8M16 8v8M4 12h16" /></svg>, label: 'Heavy Lift' },
                { cls: 'run', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="13" cy="4" r="2" /><path d="M7 12l3-3 3 3 2 4 3-2M5 18l3-4 3 2" /></svg>, label: 'Running' },
                { cls: 'hiit', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>, label: 'HIIT' },
                { cls: 'cardio', icon: <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" /></svg>, label: 'Cardio' },
                { cls: 'warm', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12l4-3 3 2 3-3 4 4M5 17l4-3 3 2 3-3 4 4" /></svg>, label: 'Warmup' },
                { cls: 'cool', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg>, label: 'Cooldown' },
              ].map(m => (
                <motion.span
                  key={m.cls}
                  className={`mp ${m.cls}`}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className="ic">{m.icon}</span>
                  {m.label}
                </motion.span>
              ))}
            </div>
            <div style={{ color: '#b5b5af', fontSize: 16, lineHeight: 1.6 }}>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '.2em' }}>· LIFT · 90–110 BPM</div>
              <div style={{ marginTop: 10 }}>Explosive low-tempo tracks that time with your breath between sets.</div>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '.2em', marginTop: 24 }}>· HIIT · 160–180 BPM</div>
              <div style={{ marginTop: 10 }}>Drops land on work phase, ambient floors fill rest. You won't need a timer.</div>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '.2em', marginTop: 24 }}>· COOLDOWN · 60–80 BPM</div>
              <div style={{ marginTop: 10 }}>Tracks that walk your heart-rate back down. Doubles as sleep.</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <FadeIn><div className="eyebrow">· The whole app</div></FadeIn>
          <FadeIn delay={0.05}><h2 style={{ fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-.03em', lineHeight: 1, margin: '14px 0 40px', fontWeight: 500 }}>Four screens. One <span className="serif">rhythm.</span></h2></FadeIn>
        </div>
        <div className="gallery">
          {[
            { src: '/screen-home.png', num: '01', label: 'HOME', name: "Today's session + six modes" },
            { src: '/screen-library.png', num: '02', label: 'LIBRARY', name: 'Playlists tagged by BPM' },
            { src: '/screen-stats.png', num: '03', label: 'STATS', name: 'Wearable data, unified' },
            { src: '/screen-search.png', num: '04', label: 'DISCOVER', name: 'Browse by workout' },
            { src: '/screen-home.png', num: '05', label: 'LOOP', name: 'Back where you started' },
          ].map((card, i) => (
            <motion.div
              className="gcard"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.08 }}
            >
              <div className="gphone"><div className="gscreen"><img src={card.src} alt="" /></div></div>
              <div className="glabel">{card.num} · {card.label}</div>
              <div className="gname">{card.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <FadeIn className="section-head">
            <div>
              <div className="eyebrow">· Mechanics</div>
              <h2>Three signals. <br />One <span className="serif">track</span>.</h2>
            </div>
            <p>Repbeats fuses biometric, motion and audio data into a single tempo — then hands it to the DJ engine in under 120ms.</p>
          </FadeIn>
        </div>
        <div className="container">
          <FadeIn>
            <div className="steps">
              {[
                {
                  num: '01 / CAPTURE', title: 'Listen to the body.',
                  desc: 'Heart-rate from your watch, cadence from the phone\'s IMU, effort from our model. All on-device, 10 samples a second.',
                  glyph: <svg width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="#c6ff3d" strokeWidth="1" /><path d="M18 35 L28 35 L31 22 L36 48 L41 28 L45 35 L52 35" stroke="#ff3854" strokeWidth="1.5" fill="none" /></svg>
                },
                {
                  num: '02 / DECIDE', title: 'Decide the tempo.',
                  desc: 'A lightweight model blends signals with your mode goal to pick the next target BPM — updated every bar, not every song.',
                  glyph: <svg width="70" height="70" viewBox="0 0 70 70"><rect x="10" y="15" width="50" height="40" rx="3" fill="none" stroke="#c6ff3d" strokeWidth="1" /><line x1="10" y1="30" x2="60" y2="30" stroke="#c6ff3d" strokeWidth="1" /><circle cx="22" cy="22" r="2" fill="#c6ff3d" /><circle cx="30" cy="22" r="2" fill="#c6ff3d" /><line x1="18" y1="42" x2="52" y2="42" stroke="#fff" strokeWidth="1" /><line x1="18" y1="48" x2="42" y2="48" stroke="#fff" strokeWidth="1" opacity=".4" /></svg>
                },
                {
                  num: '03 / DELIVER', title: 'Deliver the mix.',
                  desc: 'Our auto-DJ time-stretches and crossfades between licensed tracks. You hear one continuous song that happens to change.',
                  glyph: <svg width="70" height="70" viewBox="0 0 70 70"><circle cx="25" cy="35" r="18" fill="none" stroke="#c6ff3d" strokeWidth="1" /><circle cx="45" cy="35" r="18" fill="none" stroke="#c6ff3d" strokeWidth="1" /><circle cx="25" cy="35" r="4" fill="#c6ff3d" /><circle cx="45" cy="35" r="4" fill="#fff" /></svg>
                },
              ].map((step, i) => (
                <motion.div
                  className="step"
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.12 }}
                >
                  <div className="num">{step.num}</div>
                  <div className="glyph">{step.glyph}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <div id="cta" className="cta">
          <div className="eyebrow">· Start moving</div>
          <h2>Let the music <br /><span className="serif">catch up</span> to you.</h2>
          <p>14 days free. Full library. Works with Apple Music, Spotify Premium and the watch already on your wrist.</p>
          <div className="appstores">
            <motion.a className="store" href="#" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 13.03c-.02-2.18 1.78-3.24 1.86-3.29-1.02-1.48-2.6-1.69-3.16-1.71-1.34-.14-2.62.79-3.3.79-.69 0-1.73-.77-2.85-.75-1.47.02-2.82.85-3.58 2.16-1.53 2.64-.39 6.55 1.09 8.7.72 1.05 1.58 2.23 2.7 2.19 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.68.7 2.83.67 1.17-.02 1.91-1.07 2.63-2.12.83-1.22 1.17-2.4 1.19-2.46-.03-.01-2.28-.87-2.3-3.48zm-2.18-6.4c.6-.73 1-1.75.89-2.76-.86.04-1.9.57-2.52 1.3-.55.64-1.04 1.67-.91 2.67.96.07 1.94-.48 2.54-1.21z" /></svg>
              <div><small>DOWNLOAD ON</small><strong>App Store</strong></div>
            </motion.a>
            <motion.a className="store" href="#" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M3.6 2.25c-.35.36-.55.93-.55 1.66v16.17c0 .74.2 1.3.55 1.66l.09.08L13.5 12l-9.81-9.83-.09.08zM17.1 15.6l-3.27-3.27 3.27-3.27 3.85 2.19c1.1.62 1.1 1.65 0 2.27l-3.85 2.08zM4.7 22.42c.42.13.9.07 1.43-.23l11.5-6.53-3.29-3.29-9.64 10.05z" /></svg>
              <div><small>GET IT ON</small><strong>Google Play</strong></div>
            </motion.a>
          </div>
        </div>
      </FadeIn>

      <Footer />
    </div>
  )
}
