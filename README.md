<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SkyWatch Africa — Empowering Citizen Scientists</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg-deep:       #03060f;
    --bg-mid:        #060d1f;
    --bg-card:       rgba(255,255,255,0.03);
    --border:        rgba(255,255,255,0.07);
    --orange:        #ff6b35;
    --gold:          #ffd166;
    --green:         #06d6a0;
    --blue-glow:     #0af0ff;
    --text:          #e8eaf0;
    --muted:         #7a8499;
    --font-head:     'Orbitron', monospace;
    --font-body:     'Barlow', sans-serif;
    --font-cond:     'Barlow Condensed', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg-deep);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    font-weight: 400;
    line-height: 1.7;
  }

  /* ── CANVAS STARFIELD ─────────────────────────────── */
  #starfield {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* ── GRADIENT MESH ────────────────────────────────── */
  .mesh {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,107,53,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 70% at 80% 80%, rgba(6,214,160,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 50% 50%, rgba(10,240,255,0.04) 0%, transparent 60%);
  }

  /* ── LAYOUT ───────────────────────────────────────── */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
  }

  section { position: relative; z-index: 2; }

  /* ── NAV ──────────────────────────────────────────── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(3,6,15,0.75);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: background .3s;
  }

  .nav-logo {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: .15em;
    background: linear-gradient(90deg, var(--orange), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: .6rem;
  }

  .nav-logo svg { width: 28px; height: 28px; flex-shrink: 0; }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-family: var(--font-cond);
    font-size: .9rem;
    letter-spacing: .08em;
    text-transform: uppercase;
    transition: color .25s;
  }

  .nav-links a:hover { color: var(--gold); }

  .nav-cta {
    background: linear-gradient(135deg, var(--orange), #ff4500);
    color: #fff !important;
    padding: .5rem 1.4rem;
    border-radius: 4px;
    font-weight: 600;
  }

  .nav-cta:hover { color: #fff !important; opacity: .9; }

  /* ── HERO ─────────────────────────────────────────── */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 8rem 0 4rem;
    overflow: hidden;
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-eyebrow {
    font-family: var(--font-cond);
    font-size: .8rem;
    letter-spacing: .25em;
    text-transform: uppercase;
    color: var(--green);
    display: flex;
    align-items: center;
    gap: .6rem;
    margin-bottom: 1.2rem;
    opacity: 0;
    animation: fadeUp .6s .2s forwards;
  }

  .hero-eyebrow::before {
    content: '';
    width: 32px; height: 1px;
    background: var(--green);
  }

  .hero-title {
    font-family: var(--font-head);
    font-size: clamp(2.2rem, 4vw, 3.6rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -.01em;
    opacity: 0;
    animation: fadeUp .7s .35s forwards;
  }

  .hero-title .line1 { display: block; }
  .hero-title .accent {
    background: linear-gradient(90deg, var(--orange) 0%, var(--gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    margin-top: 1.5rem;
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 480px;
    opacity: 0;
    animation: fadeUp .7s .5s forwards;
  }

  .hero-actions {
    margin-top: 2.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp .7s .65s forwards;
  }

  .btn-primary {
    padding: .85rem 2rem;
    background: linear-gradient(135deg, var(--orange), #e55a00);
    border: none;
    border-radius: 5px;
    color: #fff;
    font-family: var(--font-cond);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 30px rgba(255,107,53,0.3);
  }

  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.15), transparent);
    opacity: 0;
    transition: opacity .2s;
  }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(255,107,53,0.5); }
  .btn-primary:hover::after { opacity: 1; }

  .btn-ghost {
    padding: .85rem 2rem;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 5px;
    color: var(--text);
    font-family: var(--font-cond);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    transition: border-color .2s, background .2s;
  }

  .btn-ghost:hover { border-color: var(--gold); background: rgba(255,209,102,0.05); }

  /* ── SATELLITE ANIMATION ──────────────────────────── */
  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: fadeIn 1s .4s forwards;
  }

  .globe-wrap {
    position: relative;
    width: 420px;
    height: 420px;
  }

  .globe {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 35%, #1a3a6e 0%, #0a1f4a 40%, #03060f 100%);
    box-shadow:
      0 0 60px rgba(10,240,255,0.15),
      inset -20px -20px 60px rgba(0,0,0,0.5),
      inset 10px 10px 40px rgba(10,240,255,0.1);
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: globePulse 4s ease-in-out infinite;
    overflow: hidden;
  }

  .globe::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 14px,
      rgba(10,240,255,0.08) 14px,
      rgba(10,240,255,0.08) 15px
    );
    mask-image: radial-gradient(circle, white 30%, transparent 80%);
  }

  .globe::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 18px,
      rgba(6,214,160,0.06) 18px,
      rgba(6,214,160,0.06) 19px
    );
  }

  .continent {
    position: absolute;
    background: rgba(6,214,160,0.3);
    border-radius: 40% 60% 50% 55%;
    animation: continentPulse 4s ease-in-out infinite;
  }
  .continent-1 { width: 90px; height: 120px; top: 40px; left: 70px; border-radius: 35% 50% 60% 40%; }
  .continent-2 { width: 50px; height: 60px; top: 110px; left: 155px; border-radius: 50% 40% 45% 55%; }
  .continent-3 { width: 40px; height: 55px; top: 60px; left: 140px; border-radius: 45% 55% 40% 60%; }

  .orbit {
    position: absolute;
    top: 50%; left: 50%;
    border: 1px solid rgba(10,240,255,0.2);
    border-radius: 50%;
    transform-origin: center center;
  }

  .orbit-1 {
    width: 340px; height: 200px;
    margin-top: -100px; margin-left: -170px;
    animation: orbit1 6s linear infinite;
    border-color: rgba(255,107,53,0.25);
  }
  .orbit-2 {
    width: 380px; height: 380px;
    margin-top: -190px; margin-left: -190px;
    animation: orbit2 10s linear infinite;
    border-color: rgba(10,240,255,0.15);
  }
  .orbit-3 {
    width: 420px; height: 160px;
    margin-top: -80px; margin-left: -210px;
    animation: orbit3 14s linear infinite;
    border-color: rgba(6,214,160,0.2);
  }

  .satellite {
    position: absolute;
    width: 14px; height: 14px;
    border-radius: 50%;
    top: -7px; left: 50%;
    transform: translateX(-50%);
  }

  .sat-1 {
    background: var(--orange);
    box-shadow: 0 0 12px var(--orange), 0 0 4px var(--orange);
  }
  .sat-2 {
    background: var(--blue-glow);
    box-shadow: 0 0 12px var(--blue-glow), 0 0 4px var(--blue-glow);
    width: 10px; height: 10px; top: -5px;
  }
  .sat-3 {
    background: var(--green);
    box-shadow: 0 0 12px var(--green), 0 0 4px var(--green);
    width: 12px; height: 12px; top: -6px;
  }

  /* SCAN BEAM */
  .scan-beam {
    position: absolute;
    top: 50%; left: 50%;
    width: 140px; height: 2px;
    transform-origin: left center;
    background: linear-gradient(90deg, rgba(10,240,255,0.6), transparent);
    margin-top: -1px;
    animation: scanRotate 3s linear infinite;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(10,240,255,0.4);
  }

  /* SIGNAL RINGS */
  .signal-ring {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    border: 1px solid rgba(10,240,255,0.4);
    transform: translate(-50%,-50%) scale(0);
    pointer-events: none;
  }

  .signal-ring:nth-child(1) { animation: ringExpand 3s 0s infinite; width: 300px; height: 300px; }
  .signal-ring:nth-child(2) { animation: ringExpand 3s .8s infinite; width: 360px; height: 360px; }
  .signal-ring:nth-child(3) { animation: ringExpand 3s 1.6s infinite; width: 420px; height: 420px; }

  /* ── STATS BAR ────────────────────────────────────── */
  .stats-bar {
    padding: 3rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,0.015);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  .stat-item {
    text-align: center;
    padding: 0 2rem;
    border-right: 1px solid var(--border);
    opacity: 0;
    animation: fadeUp .6s forwards;
  }

  .stat-item:last-child { border-right: none; }
  .stat-item:nth-child(1) { animation-delay: .1s; }
  .stat-item:nth-child(2) { animation-delay: .2s; }
  .stat-item:nth-child(3) { animation-delay: .3s; }
  .stat-item:nth-child(4) { animation-delay: .4s; }

  .stat-number {
    font-family: var(--font-head);
    font-size: 2.2rem;
    font-weight: 900;
    background: linear-gradient(90deg, var(--orange), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }

  .stat-label {
    font-family: var(--font-cond);
    font-size: .8rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: .3rem;
  }

  /* ── SECTION HEADERS ──────────────────────────────── */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-tag {
    font-family: var(--font-cond);
    font-size: .75rem;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: var(--orange);
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1rem;
  }

  .section-tag::before,
  .section-tag::after {
    content: '';
    width: 24px; height: 1px;
    background: var(--orange);
  }

  .section-title {
    font-family: var(--font-head);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -.01em;
  }

  .section-sub {
    color: var(--muted);
    font-size: 1rem;
    max-width: 560px;
    margin: 1rem auto 0;
  }

  /* ── FEATURES ─────────────────────────────────────── */
  .features { padding: 7rem 0; }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .feature-card {
    background: var(--bg-mid);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: background .3s;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent, var(--orange)), transparent);
    opacity: 0;
    transition: opacity .3s;
  }

  .feature-card:hover { background: rgba(255,255,255,0.045); }
  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 52px; height: 52px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .feature-icon::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    border: 1px solid var(--accent, var(--orange));
    opacity: .4;
  }

  .feature-name {
    font-family: var(--font-head);
    font-size: .85rem;
    font-weight: 700;
    letter-spacing: .06em;
    margin-bottom: .75rem;
    color: #fff;
  }

  .feature-desc {
    font-size: .9rem;
    color: var(--muted);
    line-height: 1.7;
  }

  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: .4rem;
    margin-top: 1.2rem;
  }

  .tag {
    font-family: var(--font-cond);
    font-size: .72rem;
    letter-spacing: .08em;
    padding: .25rem .6rem;
    border-radius: 3px;
    border: 1px solid;
    text-transform: uppercase;
  }

  /* ── TECH STACK ───────────────────────────────────── */
  .tech { padding: 5rem 0; }

  .tech-table {
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  .tech-row {
    display: grid;
    grid-template-columns: 180px 80px 1fr;
    align-items: center;
    padding: 1.2rem 2rem;
    border-bottom: 1px solid var(--border);
    transition: background .2s;
  }

  .tech-row:last-child { border-bottom: none; }
  .tech-row:hover { background: rgba(255,255,255,0.025); }

  .tech-row-header {
    background: rgba(255,255,255,0.025);
    font-family: var(--font-cond);
    font-size: .75rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .tech-name {
    font-family: var(--font-cond);
    font-weight: 600;
    font-size: .95rem;
    letter-spacing: .03em;
  }

  .tech-version {
    font-family: var(--font-head);
    font-size: .72rem;
    color: var(--green);
    text-align: center;
  }

  .tech-purpose { font-size: .9rem; color: var(--muted); }

  .tech-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: .6rem;
    animation: blink 2s ease-in-out infinite;
  }

  /* ── ARCHITECTURE ─────────────────────────────────── */
  .arch { padding: 5rem 0; }

  .flow-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
    padding: 3rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--bg-mid);
    overflow-x: auto;
  }

  .flow-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.2rem 1.5rem;
    border-radius: 8px;
    min-width: 120px;
    position: relative;
    transition: transform .25s;
  }

  .flow-node:hover { transform: translateY(-4px); }

  .node-icon {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: .8rem;
  }

  .node-label {
    font-family: var(--font-head);
    font-size: .65rem;
    letter-spacing: .08em;
    font-weight: 700;
  }

  .node-sub {
    font-size: .72rem;
    color: var(--muted);
    margin-top: .2rem;
    letter-spacing: .03em;
  }

  .flow-arrow {
    font-size: 1.2rem;
    color: var(--muted);
    margin: 0 .5rem;
    margin-bottom: 1.5rem;
    animation: pulse 2s ease-in-out infinite;
  }

  /* ── DATA SOURCES ─────────────────────────────────── */
  .sources { padding: 5rem 0; }

  .sources-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .source-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 2rem;
    background: var(--bg-card);
    position: relative;
    overflow: hidden;
    transition: border-color .3s, transform .3s;
  }

  .source-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 0%, var(--glow, rgba(255,107,53,0.1)), transparent 60%);
    opacity: 0;
    transition: opacity .3s;
  }

  .source-card:hover { border-color: var(--accent, var(--orange)); transform: translateY(-4px); }
  .source-card:hover::before { opacity: 1; }

  .source-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    padding: .35rem .9rem;
    border-radius: 20px;
    font-family: var(--font-cond);
    font-size: .75rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 1.2rem;
  }

  .source-name {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: .6rem;
  }

  .source-desc { font-size: .9rem; color: var(--muted); margin-bottom: 1rem; }

  .source-freq {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-family: var(--font-cond);
    font-size: .8rem;
    color: var(--green);
    letter-spacing: .05em;
  }

  /* ── API ENDPOINTS ────────────────────────────────── */
  .api-section { padding: 5rem 0; }

  .api-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

  .endpoint-card {
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    background: var(--bg-mid);
    transition: border-color .25s;
  }

  .endpoint-card:hover { border-color: rgba(255,255,255,0.15); }

  .endpoint-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,0.025);
  }

  .method {
    font-family: var(--font-head);
    font-size: .72rem;
    font-weight: 700;
    padding: .25rem .7rem;
    border-radius: 3px;
    letter-spacing: .05em;
  }

  .method.post { background: rgba(6,214,160,0.15); color: var(--green); border: 1px solid rgba(6,214,160,0.3); }
  .method.get { background: rgba(10,240,255,0.1); color: var(--blue-glow); border: 1px solid rgba(10,240,255,0.25); }

  .endpoint-path {
    font-family: monospace;
    font-size: .9rem;
    color: var(--text);
  }

  .endpoint-body {
    padding: 1.2rem 1.5rem;
    font-size: .88rem;
    color: var(--muted);
    line-height: 1.65;
  }

  .endpoint-desc {
    margin-bottom: .8rem;
  }

  .code-snippet {
    background: rgba(0,0,0,.4);
    border-radius: 6px;
    padding: .75rem 1rem;
    font-family: monospace;
    font-size: .8rem;
    color: #8be9fd;
    border-left: 3px solid var(--green);
    overflow-x: auto;
    white-space: pre;
  }

  /* ── SECURITY ─────────────────────────────────────── */
  .security { padding: 5rem 0; }

  .checklist {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-card);
    transition: border-color .25s, background .25s;
  }

  .check-item:hover { border-color: rgba(6,214,160,.3); background: rgba(6,214,160,.02); }

  .check-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(6,214,160,.15);
    border: 1px solid rgba(6,214,160,.4);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: .8rem;
    color: var(--green);
  }

  .check-title {
    font-family: var(--font-cond);
    font-weight: 600;
    font-size: .9rem;
    letter-spacing: .03em;
    margin-bottom: .25rem;
  }

  .check-desc { font-size: .82rem; color: var(--muted); }

  /* ── CONTRIBUTE ───────────────────────────────────── */
  .contribute { padding: 5rem 0; }

  .contrib-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .contrib-card {
    padding: 1.5rem 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-align: center;
    background: var(--bg-card);
    transition: border-color .25s, transform .25s;
    cursor: pointer;
  }

  .contrib-card:hover { border-color: var(--orange); transform: translateY(-3px); }

  .contrib-emoji { font-size: 1.8rem; margin-bottom: .6rem; display: block; }
  .contrib-name {
    font-family: var(--font-cond);
    font-weight: 600;
    font-size: .85rem;
    letter-spacing: .05em;
  }

  /* ── CTA ──────────────────────────────────────────── */
  .cta-section {
    padding: 8rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-title {
    font-family: var(--font-head);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 900;
    margin-bottom: 1.2rem;
  }

  .cta-sub {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 520px;
    margin: 0 auto 2.5rem;
  }

  .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  /* ── FOOTER ───────────────────────────────────────── */
  footer {
    border-top: 1px solid var(--border);
    padding: 3rem 0 2rem;
    position: relative;
    z-index: 2;
  }

  .footer-inner {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-brand .brand-logo {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 900;
    background: linear-gradient(90deg, var(--orange), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    margin-bottom: .8rem;
    letter-spacing: .1em;
  }

  .footer-brand p { font-size: .88rem; color: var(--muted); max-width: 260px; }

  .footer-col h4 {
    font-family: var(--font-cond);
    font-size: .75rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
  }

  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: .5rem; }
  .footer-col a {
    color: var(--text);
    text-decoration: none;
    font-size: .88rem;
    transition: color .2s;
  }
  .footer-col a:hover { color: var(--gold); }

  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .82rem;
    color: var(--muted);
  }

  /* ── SCROLL REVEAL ────────────────────────────────── */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity .7s, transform .7s;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── TICKER ───────────────────────────────────────── */
  .ticker-wrap {
    overflow: hidden;
    padding: .7rem 0;
    background: rgba(255,107,53,0.06);
    border-top: 1px solid rgba(255,107,53,.15);
    border-bottom: 1px solid rgba(255,107,53,.15);
    position: relative;
    z-index: 2;
  }

  .ticker {
    display: flex;
    gap: 3rem;
    width: max-content;
    animation: tickerScroll 30s linear infinite;
  }

  .ticker-item {
    font-family: var(--font-cond);
    font-size: .8rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--orange);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: .6rem;
  }

  .ticker-item::before {
    content: '●';
    font-size: .4rem;
  }

  /* ── KEYFRAMES ────────────────────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes orbit1 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(45deg); }
    to   { transform: rotate(405deg); }
  }
  @keyframes orbit3 {
    from { transform: rotate(-30deg); }
    to   { transform: rotate(330deg); }
  }

  @keyframes globePulse {
    0%, 100% { box-shadow: 0 0 60px rgba(10,240,255,.15), inset -20px -20px 60px rgba(0,0,0,.5), inset 10px 10px 40px rgba(10,240,255,.1); }
    50%       { box-shadow: 0 0 90px rgba(10,240,255,.25), inset -20px -20px 60px rgba(0,0,0,.5), inset 10px 10px 40px rgba(10,240,255,.18); }
  }

  @keyframes continentPulse {
    0%, 100% { opacity: .35; }
    50%       { opacity: .55; }
  }

  @keyframes scanRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes ringExpand {
    0%   { transform: translate(-50%,-50%) scale(0); opacity: .6; }
    100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: .4; }
    50%       { opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: .4; }
  }

  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── RESPONSIVE ───────────────────────────────────── */
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .sources-grid { grid-template-columns: 1fr; }
    .api-grid { grid-template-columns: 1fr; }
    .checklist { grid-template-columns: 1fr; }
    .contrib-grid { grid-template-columns: repeat(3, 1fr); }
    .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    .nav-links { display: none; }
  }

  @media (max-width: 600px) {
    .features-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .contrib-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
</head>
<body>

<!-- Starfield Canvas -->
<canvas id="starfield"></canvas>
<div class="mesh"></div>

<!-- ── NAV ─────────────────────────────────────────── -->
<nav>
  <div class="nav-logo">
    <svg viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="7" stroke="url(#g1)" stroke-width="1.5"/>
      <path d="M14 7 Q20 14 14 21 Q8 14 14 7Z" stroke="url(#g1)" stroke-width="1" fill="none" opacity=".5"/>
      <circle cx="14" cy="5" r="2.5" fill="#ff6b35"/>
      <circle cx="23" cy="14" r="2" fill="#06d6a0"/>
      <circle cx="5" cy="20" r="2" fill="#ffd166"/>
      <defs>
        <linearGradient id="g1" x1="7" y1="7" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ff6b35"/>
          <stop offset="100%" stop-color="#ffd166"/>
        </linearGradient>
      </defs>
    </svg>
    SKYWATCH AFRICA
  </div>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#data-sources">Data</a></li>
    <li><a href="#api">API</a></li>
    <li><a href="#contribute">Contribute</a></li>
    <li><a href="#" class="nav-cta">Get Started</a></li>
  </ul>
</nav>

<!-- ── TICKER ─────────────────────────────────────── -->
<div class="ticker-wrap" style="margin-top:70px;">
  <div class="ticker">
    <span class="ticker-item">Landsat 8 imagery active</span>
    <span class="ticker-item">Sentinel-2 data integration</span>
    <span class="ticker-item">Real-time NDVI processing</span>
    <span class="ticker-item">54 countries monitored</span>
    <span class="ticker-item">Change detection live</span>
    <span class="ticker-item">MODIS daily coverage</span>
    <span class="ticker-item">Open-source MIT license</span>
    <span class="ticker-item">Landsat 8 imagery active</span>
    <span class="ticker-item">Sentinel-2 data integration</span>
    <span class="ticker-item">Real-time NDVI processing</span>
    <span class="ticker-item">54 countries monitored</span>
    <span class="ticker-item">Change detection live</span>
    <span class="ticker-item">MODIS daily coverage</span>
    <span class="ticker-item">Open-source MIT license</span>
  </div>
</div>

<!-- ── HERO ─────────────────────────────────────────── -->
<section class="hero">
  <div class="container">
    <div class="hero-inner">
      <div class="hero-content">
        <div class="hero-eyebrow">🛰️ Satellite Environmental Intelligence</div>
        <h1 class="hero-title">
          <span class="line1">Track Africa's</span>
          <span class="line1 accent">Environmental Pulse</span>
          <span class="line1">From Orbit.</span>
        </h1>
        <p class="hero-sub">
          SkyWatch Africa empowers citizen scientists, researchers, and NGOs with real-time satellite imagery analysis — NDVI, change detection, and land-use classification across the entire continent.
        </p>
        <div class="hero-actions">
          <a href="#" class="btn-primary">🚀 Launch Platform</a>
          <a href="#features" class="btn-ghost">Explore Features →</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="globe-wrap">
          <!-- Signal rings -->
          <div class="signal-ring"></div>
          <div class="signal-ring"></div>
          <div class="signal-ring"></div>

          <!-- Orbits -->
          <div class="orbit orbit-1">
            <div class="satellite sat-1"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="satellite sat-2"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="satellite sat-3"></div>
          </div>

          <!-- Globe -->
          <div class="globe">
            <div class="continent continent-1"></div>
            <div class="continent continent-2"></div>
            <div class="continent continent-3"></div>
            <div class="scan-beam"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── STATS ─────────────────────────────────────────── -->
<div class="stats-bar">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number" data-target="54">0</span>
        <span class="stat-label">Countries Monitored</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="3">0</span>
        <span class="stat-label">Satellite Sources</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="5">0</span>
        <span class="stat-label">Day Refresh (Sentinel)</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="30">0</span>
        <span class="stat-label">Meter Resolution</span>
      </div>
    </div>
  </div>
</div>

<!-- ── FEATURES ─────────────────────────────────────── -->
<section class="features" id="features">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Core Capabilities</div>
      <h2 class="section-title">Everything you need to<br/>monitor the continent</h2>
      <p class="section-sub">From raw satellite data to actionable environmental insights — all in your browser.</p>
    </div>

    <div class="features-grid reveal">
      <div class="feature-card" style="--accent: var(--orange);">
        <div class="feature-icon" style="background: rgba(255,107,53,0.1);">🛰️</div>
        <div class="feature-name">Multi-Source Data</div>
        <p class="feature-desc">Ingest and fuse Landsat 8/9, Sentinel-2, and MODIS imagery through a unified pipeline with automatic cloud masking.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">Landsat</span>
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">Sentinel-2</span>
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">MODIS</span>
        </div>
      </div>

      <div class="feature-card" style="--accent: var(--green);">
        <div class="feature-icon" style="background: rgba(6,214,160,0.1);">🗺️</div>
        <div class="feature-name">Interactive Mapping</div>
        <p class="feature-desc">Explore imagery on a real-time Leaflet map with GPS integration, dynamic layer overlays, and time-series scrubbing.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">Leaflet</span>
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">GPS</span>
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">GeoJSON</span>
        </div>
      </div>

      <div class="feature-card" style="--accent: var(--blue-glow);">
        <div class="feature-icon" style="background: rgba(10,240,255,0.1);">📊</div>
        <div class="feature-name">Advanced Analytics</div>
        <p class="feature-desc">NDVI vegetation health, land-use classification, change detection algorithms, and ML-powered temporal trend analysis.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--blue-glow); border-color:rgba(10,240,255,.3)">NDVI</span>
          <span class="tag" style="color:var(--blue-glow); border-color:rgba(10,240,255,.3)">ML Models</span>
          <span class="tag" style="color:var(--blue-glow); border-color:rgba(10,240,255,.3)">Change Detection</span>
        </div>
      </div>

      <div class="feature-card" style="--accent: var(--gold);">
        <div class="feature-icon" style="background: rgba(255,209,102,0.1);">🔐</div>
        <div class="feature-name">Enterprise Security</div>
        <p class="feature-desc">JWT authentication, bcrypt hashing, rate limiting via SlowAPI, and strict CORS policies for production deployments.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--gold); border-color:rgba(255,209,102,.3)">JWT</span>
          <span class="tag" style="color:var(--gold); border-color:rgba(255,209,102,.3)">Rate Limiting</span>
          <span class="tag" style="color:var(--gold); border-color:rgba(255,209,102,.3)">CORS</span>
        </div>
      </div>

      <div class="feature-card" style="--accent: var(--orange);">
        <div class="feature-icon" style="background: rgba(255,107,53,0.1);">⚡</div>
        <div class="feature-name">FastAPI Backend</div>
        <p class="feature-desc">High-performance async REST API with automatic Swagger docs, Pydantic validation, and Redis-backed caching.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">FastAPI</span>
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">Redis</span>
          <span class="tag" style="color:var(--orange); border-color:rgba(255,107,53,.3)">PostgreSQL</span>
        </div>
      </div>

      <div class="feature-card" style="--accent: var(--green);">
        <div class="feature-icon" style="background: rgba(6,214,160,0.1);">🐳</div>
        <div class="feature-name">Docker Ready</div>
        <p class="feature-desc">Full docker-compose setup for local dev and production. Deploy entire stack — frontend, backend, DB, Redis — in minutes.</p>
        <div class="feature-tags">
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">Docker</span>
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">Compose</span>
          <span class="tag" style="color:var(--green); border-color:rgba(6,214,160,.3)">CI/CD Ready</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── DATA SOURCES ─────────────────────────────────── -->
<section class="sources" id="data-sources">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Data Sources</div>
      <h2 class="section-title">Three orbital eyes<br/>over every African landscape</h2>
    </div>

    <div class="sources-grid reveal">
      <div class="source-card" style="--accent:var(--orange); --glow:rgba(255,107,53,0.12);">
        <div class="source-badge" style="background:rgba(255,107,53,0.12); color:var(--orange); border:1px solid rgba(255,107,53,.25);">
          🛰️ NASA
        </div>
        <div class="source-name">Landsat 8 / 9</div>
        <p class="source-desc">High-resolution multispectral imagery at 30m, covering the full spectrum from coastal aerosol to SWIR bands for deep land analysis.</p>
        <div class="source-freq">
          <span class="tech-dot" style="background:var(--orange);"></span>
          Updates every 16 days
        </div>
      </div>

      <div class="source-card" style="--accent:var(--green); --glow:rgba(6,214,160,0.1);">
        <div class="source-badge" style="background:rgba(6,214,160,0.1); color:var(--green); border:1px solid rgba(6,214,160,.25);">
          🌍 ESA
        </div>
        <div class="source-name">Sentinel-2</div>
        <p class="source-desc">European Space Agency's workhorse with 10m resolution and 13 spectral bands. Ideal for vegetation mapping, urban monitoring, and water bodies.</p>
        <div class="source-freq">
          <span class="tech-dot" style="background:var(--green);"></span>
          Updates every 5 days
        </div>
      </div>

      <div class="source-card" style="--accent:var(--blue-glow); --glow:rgba(10,240,255,0.08);">
        <div class="source-badge" style="background:rgba(10,240,255,0.08); color:var(--blue-glow); border:1px solid rgba(10,240,255,.2);">
          🔭 NASA
        </div>
        <div class="source-name">MODIS</div>
        <p class="source-desc">Terra & Aqua satellites providing daily global coverage at 250–1000m. Perfect for fire detection, atmospheric monitoring, and large-scale trend analysis.</p>
        <div class="source-freq">
          <span class="tech-dot" style="background:var(--blue-glow);"></span>
          Daily global coverage
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── TECH STACK ───────────────────────────────────── -->
<section class="tech" id="tech">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Technology Stack</div>
      <h2 class="section-title">Built on proven,<br/>production-grade tools</h2>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem;" class="reveal">
      <!-- Backend -->
      <div>
        <div class="section-tag" style="margin-bottom:1rem; justify-content:flex-start; gap:.4rem;">
          <span style="width:0;"></span>Backend
        </div>
        <div class="tech-table">
          <div class="tech-row tech-row-header">
            <span>Technology</span><span style="text-align:center">Version</span><span>Purpose</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#3776AB;"></span>Python</span>
            <span class="tech-version">3.9+</span>
            <span class="tech-purpose">Core backend language</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#009688;"></span>FastAPI</span>
            <span class="tech-version">0.100+</span>
            <span class="tech-purpose">Async REST framework</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#336791;"></span>PostgreSQL</span>
            <span class="tech-version">15+</span>
            <span class="tech-purpose">Metadata storage</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#DC382D;"></span>Redis</span>
            <span class="tech-version">7+</span>
            <span class="tech-purpose">Cache & rate limiting</span>
          </div>
        </div>
      </div>

      <!-- Frontend -->
      <div>
        <div class="section-tag" style="margin-bottom:1rem; justify-content:flex-start; gap:.4rem;">
          <span style="width:0;"></span>Frontend
        </div>
        <div class="tech-table">
          <div class="tech-row tech-row-header">
            <span>Technology</span><span style="text-align:center">Version</span><span>Purpose</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#61DAFB;"></span>React</span>
            <span class="tech-version">18+</span>
            <span class="tech-purpose">UI framework</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#3178C6;"></span>TypeScript</span>
            <span class="tech-version">5+</span>
            <span class="tech-purpose">Type safety</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#199900;"></span>Leaflet</span>
            <span class="tech-version">1.9+</span>
            <span class="tech-purpose">Interactive maps</span>
          </div>
          <div class="tech-row">
            <span class="tech-name"><span class="tech-dot" style="background:#06B6D4;"></span>TailwindCSS</span>
            <span class="tech-version">3+</span>
            <span class="tech-purpose">Utility styling</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── ARCHITECTURE ────────────────────────────────── -->
<section class="arch" id="arch">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Architecture</div>
      <h2 class="section-title">The data journey<br/>from orbit to insights</h2>
    </div>

    <div class="flow-diagram reveal">
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(97,218,251,.12); border:1px solid rgba(97,218,251,.25);">🌐</div>
        <div class="node-label" style="color:#61DAFB;">Browser</div>
        <div class="node-sub">React Frontend</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(255,107,53,.12); border:1px solid rgba(255,107,53,.3);">🔐</div>
        <div class="node-label" style="color:var(--orange);">Auth</div>
        <div class="node-sub">JWT Gateway</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(0,150,136,.15); border:1px solid rgba(0,150,136,.3);">⚡</div>
        <div class="node-label" style="color:#009688;">FastAPI</div>
        <div class="node-sub">REST Backend</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(220,56,45,.12); border:1px solid rgba(220,56,45,.3);">📡</div>
        <div class="node-label" style="color:#DC382D;">Satellite</div>
        <div class="node-sub">Data Fetch</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(6,214,160,.12); border:1px solid rgba(6,214,160,.3);">🔬</div>
        <div class="node-label" style="color:var(--green);">Analysis</div>
        <div class="node-sub">ML Pipeline</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-node">
        <div class="node-icon" style="background:rgba(255,209,102,.1); border:1px solid rgba(255,209,102,.3);">🗺️</div>
        <div class="node-label" style="color:var(--gold);">Viz</div>
        <div class="node-sub">Map Layer</div>
      </div>
    </div>
  </div>
</section>

<!-- ── API SECTION ─────────────────────────────────── -->
<section class="api-section" id="api">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">API Reference</div>
      <h2 class="section-title">Clean REST endpoints<br/>with full Swagger docs</h2>
      <p class="section-sub">All endpoints require Bearer token auth. Interactive docs at <code style="color:var(--green); font-family:monospace;">/docs</code>.</p>
    </div>

    <div class="api-grid reveal">
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method post">POST</span>
          <span class="endpoint-path">/api/v1/satellite/query</span>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-desc">Fetch satellite imagery for a coordinate pair and date range from Landsat or Sentinel-2.</div>
          <div class="code-snippet">{ "coordinates": { "lat": -1.29, "lon": 36.82 },
  "date_range": { "start": "2024-01-01", "end": "2024-01-31" },
  "sources": ["landsat8", "sentinel2"],
  "bands": ["red", "green", "nir"] }</div>
        </div>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method post">POST</span>
          <span class="endpoint-path">/api/v1/analysis/ndvi</span>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-desc">Calculate Normalized Difference Vegetation Index for a given image and polygon region.</div>
          <div class="code-snippet">{ "image_id": "img_12345",
  "region": {
    "type": "Polygon",
    "coordinates": [[...]]
  } }</div>
        </div>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method post">POST</span>
          <span class="endpoint-path">/api/v1/analysis/change-detection</span>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-desc">Compare two time periods to detect land-cover changes using spectral difference algorithms.</div>
          <div class="code-snippet">{ "before_date": "2023-01-01",
  "after_date": "2024-01-01",
  "coordinates": {...},
  "threshold": 0.15 }</div>
        </div>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method get">GET</span>
          <span class="endpoint-path">/api/v1/health</span>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-desc">System health check returning uptime, DB status, Redis connectivity, and satellite API latency.</div>
          <div class="code-snippet">curl http://127.0.0.1:8000/health \
  -H "Authorization: Bearer YOUR_API_KEY"</div>
        </div>
      </div>
    </div>

    <!-- Rate limit table -->
    <div style="margin-top:2rem;" class="reveal">
      <div class="tech-table">
        <div class="tech-row tech-row-header">
          <span>Plan</span><span style="text-align:center">Req / Min</span><span>Req / Day</span>
        </div>
        <div class="tech-row">
          <span class="tech-name"><span class="tech-dot" style="background:var(--muted);"></span>Free</span>
          <span class="tech-version">60</span>
          <span class="tech-purpose">1,000 requests/day</span>
        </div>
        <div class="tech-row">
          <span class="tech-name"><span class="tech-dot" style="background:var(--green);"></span>Pro</span>
          <span class="tech-version">300</span>
          <span class="tech-purpose">10,000 requests/day</span>
        </div>
        <div class="tech-row">
          <span class="tech-name"><span class="tech-dot" style="background:var(--orange);"></span>Enterprise</span>
          <span class="tech-version">Custom</span>
          <span class="tech-purpose">Unlimited — SLA guaranteed</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── SECURITY ────────────────────────────────────── -->
<section class="security" id="security">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Security</div>
      <h2 class="section-title">Production-grade security<br/>baked in from day one</h2>
    </div>

    <div class="checklist reveal">
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">CORS Configuration</div>
          <div class="check-desc">Strict origin allowlist via ALLOWED_ORIGINS env var. No wildcards in production.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">JWT Authentication</div>
          <div class="check-desc">Bearer tokens with bcrypt hashing and refresh token rotation mechanism.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">Input Validation</div>
          <div class="check-desc">Pydantic models enforce strict types and coordinate bounds on every request.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">Rate Limiting</div>
          <div class="check-desc">SlowAPI middleware throttles by IP. Configurable per endpoint and per plan.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">Environment Secrets</div>
          <div class="check-desc">All keys in .env, never committed. Compatible with Vault and AWS Secrets Manager.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">SQL Injection Prevention</div>
          <div class="check-desc">SQLAlchemy ORM with parameterized queries. Zero raw SQL strings in the codebase.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">HTTPS Enforced</div>
          <div class="check-desc">Redirect all HTTP → HTTPS in production. HSTS headers configured.</div>
        </div>
      </div>
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <div class="check-title">Request Logging</div>
          <div class="check-desc">Structured JSON logs with correlation IDs for every request, error, and audit event.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CONTRIBUTE ──────────────────────────────────── -->
<section class="contribute" id="contribute">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Open Source</div>
      <h2 class="section-title">Built by the community,<br/>for the continent</h2>
      <p class="section-sub">We welcome contributions from researchers, developers, and environmental scientists across Africa and beyond.</p>
    </div>

    <div class="contrib-grid reveal">
      <div class="contrib-card">
        <span class="contrib-emoji">🐛</span>
        <div class="contrib-name">Bug Fixes</div>
      </div>
      <div class="contrib-card">
        <span class="contrib-emoji">✨</span>
        <div class="contrib-name">UI Improvements</div>
      </div>
      <div class="contrib-card">
        <span class="contrib-emoji">🚀</span>
        <div class="contrib-name">API Features</div>
      </div>
      <div class="contrib-card">
        <span class="contrib-emoji">📚</span>
        <div class="contrib-name">Documentation</div>
      </div>
      <div class="contrib-card">
        <span class="contrib-emoji">🔬</span>
        <div class="contrib-name">Research Algorithms</div>
      </div>
    </div>

    <!-- Steps -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;" class="reveal">
      <div style="padding:2rem; border:1px solid var(--border); border-radius:10px; background:var(--bg-card); position:relative; padding-top:3rem;">
        <div style="position:absolute; top:-14px; left:1.5rem; background:var(--orange); color:#fff; font-family:var(--font-head); font-size:.8rem; font-weight:900; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center;">1</div>
        <div style="font-family:var(--font-cond); font-weight:700; font-size:.95rem; margin-bottom:.5rem; letter-spacing:.03em;">Fork & Clone</div>
        <div style="font-size:.85rem; color:var(--muted);">Fork on GitHub and clone your fork locally with Git.</div>
      </div>
      <div style="padding:2rem; border:1px solid var(--border); border-radius:10px; background:var(--bg-card); position:relative; padding-top:3rem;">
        <div style="position:absolute; top:-14px; left:1.5rem; background:var(--green); color:#03060f; font-family:var(--font-head); font-size:.8rem; font-weight:900; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center;">2</div>
        <div style="font-family:var(--font-cond); font-weight:700; font-size:.95rem; margin-bottom:.5rem; letter-spacing:.03em;">Feature Branch</div>
        <div style="font-size:.85rem; color:var(--muted);">Create a branch: <code style="color:var(--green); font-size:.82rem;">git checkout -b feature/my-feature</code></div>
      </div>
      <div style="padding:2rem; border:1px solid var(--border); border-radius:10px; background:var(--bg-card); position:relative; padding-top:3rem;">
        <div style="position:absolute; top:-14px; left:1.5rem; background:var(--gold); color:#03060f; font-family:var(--font-head); font-size:.8rem; font-weight:900; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center;">3</div>
        <div style="font-family:var(--font-cond); font-weight:700; font-size:.95rem; margin-bottom:.5rem; letter-spacing:.03em;">Open a PR</div>
        <div style="font-size:.85rem; color:var(--muted);">Push, describe your changes, and open a Pull Request for review.</div>
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ─────────────────────────────────────────── -->
<section class="cta-section">
  <div class="container">
    <div class="reveal">
      <h2 class="cta-title">
        Start monitoring<br/><span style="background:linear-gradient(90deg,var(--orange),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Africa from space today.</span>
      </h2>
      <p class="cta-sub">Free to use. Open source. Built for the scientists and guardians of Africa's environment.</p>
      <div class="cta-buttons">
        <a href="#" class="btn-primary">🚀 Get Started Free</a>
        <a href="#" class="btn-ghost">⭐ Star on GitHub</a>
        <a href="#" class="btn-ghost">📚 Read Docs</a>
      </div>
    </div>
  </div>
</section>

<!-- ── FOOTER ──────────────────────────────────────── -->
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="brand-logo">🛰️ SKYWATCH AFRICA</span>
        <p>Empowering citizen scientists across Africa to track environmental changes through satellite imagery.</p>
        <div style="display:flex; gap:1rem; margin-top:1.5rem;">
          <a href="#" style="color:var(--muted); text-decoration:none; font-size:1.1rem; transition:color .2s;" onmouseover="this.style.color='var(--orange)'" onmouseout="this.style.color='var(--muted)'">𝕏</a>
          <a href="#" style="color:var(--muted); text-decoration:none; font-size:1.1rem; transition:color .2s;" onmouseover="this.style.color='var(--orange)'" onmouseout="this.style.color='var(--muted)'">GitHub</a>
          <a href="#" style="color:var(--muted); text-decoration:none; font-size:1.1rem; transition:color .2s;" onmouseover="this.style.color='var(--orange)'" onmouseout="this.style.color='var(--muted)'">Discord</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Platform</h4>
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">API Reference</a></li>
          <li><a href="#">Data Sources</a></li>
          <li><a href="#">Pricing</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Developers</h4>
        <ul>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Quick Start</a></li>
          <li><a href="#">Contributing</a></li>
          <li><a href="#">Changelog</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Community</h4>
        <ul>
          <li><a href="#">Forum</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">support@skywatch.africa</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>SkyWatch Africa © 2024 — MIT License</span>
      <span style="display:flex; align-items:center; gap:.5rem;">
        <span class="tech-dot" style="background:var(--green); width:8px; height:8px; display:inline-block;"></span>
        All systems operational
      </span>
    </div>
  </div>
</footer>

<script>
// ── STARFIELD ────────────────────────────────────────
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 4500);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.1,
      a: Math.random(),
      speed: Math.random() * 0.3 + 0.1,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });
}

let frame = 0;
function animate() {
  drawStars(frame++);
  requestAnimationFrame(animate);
}

resize();
initStars();
animate();
window.addEventListener('resize', () => { resize(); initStars(); });

// ── SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────
const counters = document.querySelectorAll('[data-target]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.getAttribute('data-target');
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 20);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ── NAV SCROLL ────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(3,6,15,0.92)'
    : 'rgba(3,6,15,0.75)';
});
</script>
</body>
</html>




