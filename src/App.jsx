import React, { useState, useEffect, useRef } from "react";

const Ck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Arr = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
);

const LogoSvg = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="#1D4ED8"></polygon>
    <polygon points="50,18 79,33.5 79,66.5 50,82 21,66.5 21,33.5" fill="none" stroke="#93C5FD" strokeWidth="1.5" opacity=".5"></polygon>
    <path d="M50,28 L34,68 L42,68 L46,56 L54,56 L58,68 L66,68 Z" fill="#EFF6FF" opacity=".95"></path>
    <line x1="40" y1="50" x2="60" y2="50" stroke="#1D4ED8" strokeWidth="4"></line>
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.08 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, d = 0 }) {
  const [ref, v] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(22px)",
        transition: `all .65s cubic-bezier(.16,1,.3,1) ${d}s`,
      }}
    >
      {children}
    </div>
  );
}

function Modal({ open, close }) {
  if (!open) return null;
  return (
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
        backdropFilter: "blur(8px)", zIndex: 10001, display: "flex",
        alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, padding: "36px 28px",
          maxWidth: 400, width: "100%", textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,.1)", position: "relative",
        }}
      >
        <button
          onClick={close}
          style={{
            position: "absolute", top: 14, right: 14, width: 32, height: 32,
            borderRadius: 8, background: "#F3F4F6", border: "none",
            color: "#6B7280", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", fontSize: "1rem",
          }}
        >
          ✕
        </button>
        <div style={{ fontSize: "2rem", marginBottom: 16 }}>💬</div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 4 }}>
          Let's Connect
        </h3>
        <p style={{ fontSize: ".88rem", color: "#6B7280", marginBottom: 24 }}>
          Our team responds within 5 minutes.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=917873767676&text=Hi%2C+I+need+Facebook+Ad+Accounts"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, padding: 14, background: "#25D366", color: "#fff",
            borderRadius: 12, fontWeight: 600, fontSize: ".9rem", marginBottom: 12,
          }}
        >
          📱 WhatsApp — +91 7873767676
        </a>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 12, margin: "12px 0",
            color: "#D1D5DB", fontSize: ".7rem",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "#E5E7EB" }}></span>
          or
          <span style={{ flex: 1, height: 1, background: "#E5E7EB" }}></span>
        </div>
        <a
          href="https://t.me/Adsmitagencyofficial"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, padding: 14, background: "#0088CC", color: "#fff",
            borderRadius: 12, fontWeight: 600, fontSize: ".9rem",
          }}
        >
          ✈️ Telegram — @Adsmitagencyofficial
        </a>
      </div>
    </div>
  );
}

function Calc({ go }) {
  const [s, setS] = useState(2500000);
  const r = s <= 5e5 ? 8 : s <= 25e5 ? 6 : s <= 1e7 ? 5 : s <= 5e7 ? 4 : 3;
  const c = Math.round((s * r) / 100);
  const f = (n) =>
    n >= 1e7 ? "₹" + (n / 1e7).toFixed(1) + "Cr" :
    n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + "L" :
    n >= 1e3 ? "₹" + (n / 1e3).toFixed(1) + "K" : "₹" + n;
  const results = [
    { label: "Rate", value: r + "%", color: "#2563EB" },
    { label: "Commission", value: f(c), color: "#2563EB" },
    { label: "Total", value: f(s + c), color: "#111827" },
  ];
  return (
    <div className="calc-card">
      <label className="calc-lbl">Monthly Ad Spend</label>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <span className="calc-cur">₹</span>
        <input
          className="calc-in"
          value={s.toLocaleString("en-IN")}
          onChange={(e) => {
            const v = parseInt(e.target.value.replace(/\D/g, "")) || 0;
            setS(Math.min(v, 5e7));
          }}
        />
      </div>
      <input
        type="range"
        className="calc-range"
        min={100000}
        max={50000000}
        step={100000}
        value={s}
        onChange={(e) => setS(+e.target.value)}
      />
      <div className="calc-grid">
        {results.map((item) => (
          <div key={item.label} className="calc-box">
            <div className="calc-box-lbl">{item.label}</div>
            <div className="calc-box-val" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <button onClick={go} className="btn-primary" style={{ width: "100%", marginTop: 18 }}>
        Get This Rate <Arr />
      </button>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [o, setO] = useState(false);
  return (
    <div className={"faq-item" + (o ? " open" : "")}>
      <button className="faq-q" onClick={() => setO(!o)}>
        {q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">
        <p>{a}</p>
      </div>
    </div>
  );
}

function ResCard({ icon, title, desc, items }) {
  const [o, setO] = useState(false);
  return (
    <div className={"res-card" + (o ? " open" : "")} onClick={() => setO(!o)}>
      <div className="res-front">
        <div style={{ flex: 1 }}>
          <h4 className="res-title">{title}</h4>
          <p className="res-desc">{desc}</p>
        </div>
        <div className="res-icon">{icon}</div>
      </div>
      <div className="res-body">
        <div className="res-inner">
          {items.map((t, i) => (
            <div key={i} className="res-li">
              <span className="res-arrow">→</span>
              <span dangerouslySetInnerHTML={{ __html: t }}></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
:root{--fd:'Bricolage Grotesque',sans-serif;--fb:'DM Sans',sans-serif;--fm:'IBM Plex Mono',monospace;--b1:#EFF6FF;--b2:#DBEAFE;--b3:#BFDBFE;--b5:#60A5FA;--b6:#2563EB;--b7:#1D4ED8;--b8:#1E40AF;--g1:#F9FAFB;--g2:#F3F4F6;--g3:#E5E7EB;--g4:#D1D5DB;--g5:#6B7280;--g6:#4B5563;--g7:#374151;--g8:#111827;--grn:#16A34A;--grnl:#DCFCE7;--amber:#F59E0B;--amberl:#FEF3C7;--rad:16px;--sh:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);--shm:0 4px 6px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.03);--shl:0 10px 25px rgba(0,0,0,.06),0 4px 10px rgba(0,0,0,.04)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:#fff;color:var(--g8);font-family:var(--fb);line-height:1.6;overflow-x:hidden}::selection{background:var(--b6);color:#fff}a{text-decoration:none;color:inherit}button{font-family:inherit;cursor:pointer;border:none}.c{max-width:1120px;margin:0 auto;padding:0 20px}
.btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;background:var(--b7);color:#fff;font-size:.92rem;font-weight:600;border-radius:12px;border:none;cursor:pointer;transition:all .25s;box-shadow:0 1px 3px rgba(29,78,216,.25),0 4px 12px rgba(29,78,216,.15)}.btn-primary:hover{background:var(--b8);transform:translateY(-1px)}.btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;background:#fff;color:var(--g7);font-size:.9rem;font-weight:500;border-radius:12px;border:1px solid var(--g3);transition:all .25s}.btn-ghost:hover{border-color:var(--b5);color:var(--b7);background:var(--b1)}
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:all .3s}.nav.sc{border-color:var(--g3);box-shadow:var(--sh)}.nav-brand{display:flex;align-items:center;gap:8px;font-family:var(--fd);font-weight:700;font-size:1rem}.nav-brand em{color:var(--b6);font-style:normal}.nav-cta{padding:8px 18px;background:var(--b7);color:#fff;font-size:.78rem;font-weight:600;border-radius:8px;border:none;cursor:pointer}.nav-cta:hover{background:var(--b8)}
.ticker{overflow:hidden;border-bottom:1px solid var(--g2);margin-top:60px;background:var(--g1)}.ticker-inner{display:flex;gap:36px;animation:scroll 22s linear infinite;width:max-content;padding:10px 0}.ticker-chip{display:flex;align-items:center;gap:6px;font-size:.72rem;font-weight:500;color:var(--g5);white-space:nowrap}.ticker-dot{width:5px;height:5px;border-radius:50%;background:var(--grn);animation:pulse 2s ease infinite;display:inline-block}.ticker-val{font-family:var(--fd);font-weight:700;color:var(--grn)}
.hero{padding:48px 0 56px;position:relative;overflow:hidden;background:linear-gradient(180deg,#fff 0%,var(--b1) 100%)}.hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(37,99,235,.06),transparent);pointer-events:none}
.hero-badges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.hero-pill{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:100px;font-family:var(--fm);font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em}.pill-amber{background:var(--amberl);color:#B45309;border:1px solid #FDE68A}.pill-green{background:var(--grnl);color:#15803D;border:1px solid #BBF7D0}
.hero h1{font-family:var(--fd);font-size:clamp(2rem,6.5vw,3.6rem);font-weight:800;line-height:1.08;letter-spacing:-.03em;margin-bottom:16px}.hero h1 .acc{color:var(--b6)}.hero-sub{font-size:.95rem;line-height:1.65;color:var(--g5);margin-bottom:24px;max-width:460px}.hero-btns{display:flex;flex-direction:column;gap:10px;margin-bottom:22px}
.hero-trust{display:flex;align-items:center;flex-wrap:wrap}.hero-trust-item{display:flex;align-items:center;gap:4px;font-size:.72rem;color:var(--g5);padding:0 10px;border-right:1px solid var(--g3)}.hero-trust-item:first-child{padding-left:0}.hero-trust-item:last-child{border:none}
.hero-social{display:flex;align-items:center;gap:10px;margin-top:18px;padding:12px;background:#fff;border:1px solid var(--g2);border-radius:12px;box-shadow:var(--sh)}.hero-avatars{display:flex}.hero-av{width:26px;height:26px;border-radius:50%;border:2px solid #fff;background:var(--b6);display:flex;align-items:center;justify-content:center;font-size:.45rem;font-weight:700;color:#fff;margin-left:-6px}.hero-av:first-child{margin-left:0}.hero-social-txt{font-size:.75rem;color:var(--g5);line-height:1.3}
.trust-bar{padding:16px 0;border-bottom:1px solid var(--g2)}.trust-bar-inner{display:flex;flex-wrap:wrap;justify-content:center;gap:16px}.trust-chip{display:flex;align-items:center;gap:6px;font-size:.72rem;font-weight:600;color:var(--g5)}
.sec{padding:clamp(56px,8vw,100px) 0}.sec-alt{background:var(--g1)}.eyebrow{font-family:var(--fm);font-size:.62rem;font-weight:600;color:var(--b6);text-transform:uppercase;letter-spacing:.18em;margin-bottom:8px}.sec-title{font-family:var(--fd);font-size:clamp(1.6rem,4.5vw,2.5rem);font-weight:800;letter-spacing:-.02em;line-height:1.1;margin-bottom:10px}.sec-sub{font-size:.9rem;color:var(--g5);max-width:460px;line-height:1.6}.sec-head{text-align:center;margin-bottom:40px}.sec-head .sec-sub{margin:0 auto}
.svc-grid{display:grid;grid-template-columns:1fr;gap:16px}.svc{background:#fff;border:1px solid var(--g2);border-radius:var(--rad);padding:28px 22px;transition:all .3s;box-shadow:var(--sh)}.svc:hover{border-color:var(--b3);box-shadow:var(--shl);transform:translateY(-3px)}.svc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.svc-ico{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem}.svc-badge{padding:4px 10px;border-radius:6px;font-family:var(--fm);font-size:.55rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em}.svc h3{font-family:var(--fd);font-size:1.2rem;font-weight:700;margin-bottom:6px}.svc-desc{font-size:.86rem;color:var(--g5);line-height:1.6;margin-bottom:18px}.svc-list{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:22px}.svc-list li{display:flex;align-items:center;gap:7px;font-size:.84rem;color:var(--g6)}.svc-cta{display:flex;width:100%;align-items:center;justify-content:center;gap:7px;padding:12px;background:var(--b7);color:#fff;font-size:.86rem;font-weight:600;border-radius:10px;border:none;cursor:pointer}
.calc-card{max-width:520px;margin:32px auto 0;background:#fff;border:1px solid var(--g2);border-radius:var(--rad);padding:28px 22px;box-shadow:var(--shm)}.calc-lbl{font-family:var(--fm);font-size:.65rem;font-weight:600;color:var(--g5);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:block}.calc-cur{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-family:var(--fd);font-weight:700;color:var(--g4)}.calc-in{width:100%;padding:13px 13px 13px 30px;background:var(--g1);border:1px solid var(--g3);border-radius:10px;font-family:var(--fd);font-size:1.15rem;font-weight:700;color:var(--g8);outline:none}.calc-range{width:100%;margin:0 0 20px;accent-color:var(--b6)}.calc-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.calc-box{background:var(--g1);border:1px solid var(--g2);border-radius:10px;padding:14px 10px;text-align:center}.calc-box-lbl{font-family:var(--fm);font-size:.55rem;color:var(--g5);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px}.calc-box-val{font-family:var(--fd);font-size:1.15rem;font-weight:800}
.ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ind-card{background:#fff;border:1px solid var(--g2);border-radius:var(--rad);padding:24px 16px;text-align:center;transition:all .3s;box-shadow:var(--sh)}.ind-card:hover{transform:translateY(-3px);box-shadow:var(--shl)}.ind-ico{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 10px}.ind-card h4{font-family:var(--fd);font-size:.95rem;font-weight:700;margin-bottom:2px}.ind-card .sub{font-size:.7rem;color:var(--g5)}
.res-grid{display:grid;grid-template-columns:1fr;gap:12px}.res-card{background:#fff;border:1px solid var(--g2);border-radius:var(--rad);overflow:hidden;cursor:pointer;transition:all .3s;box-shadow:var(--sh)}.res-card:hover{border-color:var(--b3)}.res-card.open{border-color:var(--b5);box-shadow:var(--shm)}.res-front{display:flex;align-items:center;justify-content:space-between;padding:18px 16px;gap:12px}.res-title{font-family:var(--fd);font-size:.92rem;font-weight:700;margin-bottom:3px;line-height:1.25}.res-desc{font-size:.76rem;color:var(--g5);line-height:1.4}.res-icon{width:42px;height:42px;border-radius:10px;background:var(--b1);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}.res-body{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.16,1,.3,1)}.res-card.open .res-body{max-height:400px}.res-inner{padding:0 16px 18px;border-top:1px solid var(--g2);margin:0 16px;padding-top:14px}.res-li{display:flex;gap:8px;font-size:.8rem;color:var(--g5);line-height:1.5;margin-bottom:8px}.res-arrow{color:var(--b6);font-weight:700;flex-shrink:0}
.guar-box{background:var(--grnl);border:1px solid #BBF7D0;border-radius:var(--rad);padding:28px 22px}.guar-box h3{font-family:var(--fd);font-size:1.15rem;font-weight:800;color:#15803D;margin-bottom:6px}.guar-box>p{font-size:.86rem;color:#166534;line-height:1.6;margin-bottom:14px}.guar-feat{display:flex;align-items:center;gap:6px;font-size:.8rem;font-weight:500;color:#15803D;margin-bottom:6px}
.card-grid{display:grid;grid-template-columns:1fr;gap:12px}.card{background:#fff;border:1px solid var(--g2);border-radius:12px;padding:18px 16px;display:flex;align-items:flex-start;gap:14px;box-shadow:var(--sh)}.card-ico{width:38px;height:38px;border-radius:9px;background:var(--b1);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}.card h4{font-family:var(--fd);font-size:.88rem;font-weight:700;margin-bottom:2px}.card p{font-size:.78rem;color:var(--g5);line-height:1.5}
.step-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.step{background:#fff;border:1px solid var(--g2);border-radius:12px;padding:20px 14px;text-align:center;box-shadow:var(--sh)}.step-num{width:40px;height:40px;border-radius:10px;background:var(--b1);border:2px solid var(--b6);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-weight:800;font-size:.9rem;color:var(--b7);margin:0 auto 10px}.step h4{font-family:var(--fd);font-size:.88rem;font-weight:700;margin-bottom:2px}.step p{font-size:.74rem;color:var(--g5)}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;text-align:center}.stat-val{font-family:var(--fd);font-size:clamp(1.5rem,4vw,2.4rem);font-weight:800;color:var(--b7);line-height:1.1;margin-bottom:2px}.stat-lbl{font-size:.7rem;color:var(--g5)}
.test-grid{display:grid;grid-template-columns:1fr;gap:14px}.test-card{background:#fff;border:1px solid var(--g2);border-radius:var(--rad);padding:22px 18px;box-shadow:var(--sh)}.test-stars{color:var(--amber);font-size:.85rem;margin-bottom:10px}.test-q{font-size:.88rem;line-height:1.6;color:var(--g6);margin-bottom:18px;font-style:italic}.test-author{display:flex;align-items:center;gap:10px;padding-top:14px;border-top:1px solid var(--g2)}.test-av{width:32px;height:32px;border-radius:8px;background:var(--b6);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-weight:700;font-size:.7rem;color:#fff}.test-name{font-weight:600;font-size:.82rem}.test-role{font-size:.68rem;color:var(--g5)}
.faq-item{background:#fff;border:1px solid var(--g2);border-radius:12px;overflow:hidden;margin-bottom:10px;box-shadow:var(--sh)}.faq-item.open{border-color:var(--b5)}.faq-q{width:100%;padding:16px;background:none;color:var(--g8);font-size:.86rem;font-weight:600;font-family:var(--fb);text-align:left;display:flex;justify-content:space-between;align-items:center;gap:8px;cursor:pointer;border:none}.faq-icon{color:var(--b6);transition:transform .3s;font-size:1rem}.faq-item.open .faq-icon{transform:rotate(45deg)}.faq-a{max-height:0;overflow:hidden;transition:max-height .4s ease}.faq-item.open .faq-a{max-height:160px}.faq-a p{padding:0 16px 16px;font-size:.82rem;color:var(--g5);line-height:1.6}
.cta-box{background:var(--g8);border-radius:20px;padding:clamp(36px,6vw,64px) clamp(22px,4vw,48px);text-align:center;position:relative;overflow:hidden}.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top,rgba(37,99,235,.15),transparent 60%);pointer-events:none}.cta-box>*{position:relative;z-index:1}.cta-box h2{font-family:var(--fd);font-size:clamp(1.6rem,5vw,2.5rem);font-weight:800;color:#fff;margin-bottom:10px}.cta-box .acc{color:#93C5FD}.cta-box p{font-size:.9rem;color:var(--g4);max-width:380px;margin:0 auto 24px;line-height:1.6}
.stk-bar{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px}.stk-btn{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.18);transition:transform .2s}.stk-btn:hover{transform:scale(1.1)}.stk-wa{background:#25D366}.stk-tg{background:#0088CC}.stk-btn svg{width:22px;height:22px;fill:#fff}
footer{padding:36px 0 20px;border-top:1px solid var(--g2);background:var(--g1)}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
@media(min-width:768px){.c{padding:0 32px}.nav{padding:0 32px;height:64px}.ticker{margin-top:64px}.hero{padding:56px 0 72px}.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}.hero-card{display:block!important}.hero-btns{flex-direction:row}.btn-primary,.btn-ghost{width:auto}.svc-grid,.res-grid{grid-template-columns:1fr 1fr}.ind-grid{grid-template-columns:repeat(4,1fr)}.card-grid{grid-template-columns:repeat(3,1fr)}.step-grid{grid-template-columns:repeat(4,1fr)}.stat-grid{grid-template-columns:repeat(4,1fr)}.test-grid{grid-template-columns:repeat(3,1fr)}.guar-box{display:flex;align-items:center;gap:28px}}
@media(max-width:767px){.btn-primary,.btn-ghost{width:100%}}
`;

const services = [
  { icon: "💳", title: "VCC Facebook Accounts", badge: "Popular", bc: "#FEF3C7", bco: "#B45309", ico: "#EFF6FF", desc: "Virtual Credit Card ad accounts for testing, scaling, and multiple campaigns.", feats: ["Pre-verified & ready instantly", "Flexible daily spending limits", "All ad objectives & niches", "Quick replacement guarantee"] },
  { icon: "🏦", title: "Creditline Accounts", badge: "Premium", bc: "#DCFCE7", bco: "#15803D", ico: "#DCFCE7", desc: "High-limit credit line for enterprise advertisers. Unlimited scaling.", feats: ["Massive credit limits", "Spend now, pay later", "Premium account longevity", "Dedicated account manager"] },
];

const industries = [
  ["🎰", "iGaming", "Casino / Betting", "#EDE9FE"],
  ["💹", "Fintech", "Forex / Crypto", "#DCFCE7"],
  ["💊", "Nutra", "Supplements", "#FFF7ED"],
  ["❤️", "Dating", "Relationships", "#FEE2E2"],
];

const resources = [
  { icon: "🎰", title: "How to Advertise iGaming on Meta", desc: "What causes rejections and how to build compliant funnels.", items: ["<strong>Landing Pages:</strong> Bridge pages with disclaimers and age verification.", "<strong>Ad Copy:</strong> Frame around entertainment, not gambling.", "<strong>Warm-up:</strong> Start small, scale 20%/day over 5-7 days.", "<strong>Creatives:</strong> Refresh every 3-5 days to avoid re-reviews."] },
  { icon: "🎨", title: "Creative Testing for High-Risk Ads", desc: "A/B testing without triggering reviews.", items: ["<strong>3-Phase:</strong> Static then carousels then video.", "<strong>Hooks:</strong> Test 5-8 per concept. First 2 seconds matter.", "<strong>Scale:</strong> At 2x+ ROAS, duplicate across ad sets."] },
  { icon: "🔒", title: "Safe Browser & Anti-Detect Setup", desc: "Maximize account longevity.", items: ["<strong>Tools:</strong> Multilogin, GoLogin, AdsPower.", "<strong>Proxies:</strong> Unique residential proxy per profile.", "<strong>Warming:</strong> Browse organically 2-3 days before ads."] },
  { icon: "🚀", title: "Campaign Launch & Scaling", desc: "Multi-account setups with automation.", items: ["<strong>Multi-Account:</strong> Spread across 3-5 accounts.", "<strong>Budget:</strong> Max 20-30% increase per day.", "<strong>Backup:</strong> Warm accounts and spare creatives ready."] },
];

const features = [
  ["🛡️", "Verified Accounts", "Pre-warmed, high-spend ready."],
  ["📈", "Unlimited Scaling", "₹10K to ₹10L+ daily."],
  ["🔄", "Instant Replacements", "Fresh account within hours."],
  ["👤", "Account Manager", "Dedicated contact for you."],
  ["📊", "Live Dashboard", "Real-time spend and health."],
  ["🧾", "GST Invoicing", "Claim input tax credits."],
];

const reviews = [
  ["Creditline accounts handle ₹5L/day without hiccups. Support responds within minutes. Best provider I've worked with in 3 years.", "RK", "Rahul Kapoor", "iGaming"],
  ["VCC accounts rock solid for crypto. 15+ accounts running. GST billing huge plus for our agency books.", "PS", "Priya Sharma", "Fintech Agency"],
  ["Quick delivery, high limits, instant replacements. Calculator showed exact cost. No hidden surprises.", "AM", "Arjun Mehta", "Nutra"],
  ["Was struggling with account bans for months. Switched to Adsmit and haven't lost a single campaign day since. Their replacement speed is unreal.", "DV", "Deepak Verma", "Sports Betting"],
  ["Managing ₹2Cr monthly ad spend across 8 accounts. Zero downtime in 4 months. The dedicated manager actually understands our vertical.", "NK", "Neha Kulkarni", "Forex Trading"],
  ["Tested 5 different providers before Adsmit. None came close on account quality and longevity. Our CPMs dropped 30% on their accounts.", "SJ", "Suresh Jain", "E-commerce"],
  ["The % based pricing is fair and transparent. No other provider gives GST invoices. Makes accounting so much easier for our agency.", "VR", "Vikram Rao", "Digital Agency"],
  ["Started with 1 VCC account to test. Now running 12 creditline accounts. They scaled with us without any issues. True partnership.", "AP", "Ananya Patel", "Dating Apps"],
  ["24/7 support is not just a claim — I messaged at 3AM and got a replacement account in 40 minutes. That saved our weekend campaign.", "MK", "Mohit Kumar", "Supplements"],
];

const faqs = [
  ["What is a VCC Account?", "Uses a Virtual Credit Card for payments. Run ads without personal methods."],
  ["What is a Creditline Account?", "Pre-approved credit from Meta. Spend first, pay later."],
  ["How does % pricing work?", "Commission on monthly spend. Higher spends = lower rates."],
  ["High-risk niche support?", "Yes — iGaming, Fintech, Nutra, Dating. Our specialty."],
  ["How fast is delivery?", "2-6 hours typically. Max 24 hours."],
  ["Account got restricted?", "Instant free replacement. Priority support."],
];

export default function App() {
  const [modal, setModal] = useState(false);
  const [sc, setSc] = useState(false);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = () => setModal(true);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      <Modal open={modal} close={() => setModal(false)} />

      <nav className={"nav" + (sc ? " sc" : "")}>
        <div className="nav-brand"><LogoSvg /> ADSMIT <em>Solutions</em></div>
        <button className="nav-cta" onClick={go}>Get Started →</button>
      </nav>

      <div className="ticker">
        <div className="ticker-inner">
          {[1, 2].map((k) =>
            [["1,283", "Active Accounts"], ["₹500Cr+", "Managed"], ["99.2%", "Satisfaction"], ["2,000+", "Delivered"]].map(([v, l], j) => (
              <div key={k + "-" + j} className="ticker-chip">
                <span className="ticker-dot"></span>
                <span className="ticker-val">{v}</span>
                <span>{l}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <section className="hero">
        <div className="c">
          <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>
            <div>
              <Reveal>
                <div className="hero-badges">
                  <span className="hero-pill pill-amber">🔥 12 accounts left</span>
                  <span className="hero-pill pill-green">
                    <span className="ticker-dot" style={{ width: 5, height: 5 }}></span> ₹500Cr+ Managed
                  </span>
                </div>
              </Reveal>
              <Reveal d={0.05}>
                <h1>Scale Your Ads with<br /><span className="acc">Premium Facebook</span><br />Ad Accounts</h1>
              </Reveal>
              <Reveal d={0.1}>
                <p className="hero-sub">Verified VCC and Creditline Facebook Ad Accounts for high-risk industries. Instant delivery. No restrictions.</p>
              </Reveal>
              <Reveal d={0.15}>
                <div className="hero-btns">
                  <button className="btn-primary" onClick={go}><span>Get Your Account Now</span> <Arr /></button>
                  <a href="#services" className="btn-ghost">View Plans ↓</a>
                </div>
              </Reveal>
              <Reveal d={0.2}>
                <div className="hero-trust">
                  {["100% Verified", "Instant Delivery", "GST Invoice"].map((t, i, a) => (
                    <div key={t} className="hero-trust-item" style={i === a.length - 1 ? { borderRight: "none" } : {}}>
                      <Ck /> {t}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal d={0.25}>
                <div className="hero-social">
                  <div className="hero-avatars">
                    {["RK", "PS", "AM", "VK", "+"].map((n, i) => (
                      <div key={i} className="hero-av" style={{ marginLeft: i > 0 ? -6 : 0 }}>{n}</div>
                    ))}
                  </div>
                  <div className="hero-social-txt"><b style={{ color: "#111827" }}>500+ advertisers</b> trust Adsmit. Join them.</div>
                </div>
              </Reveal>
            </div>

            <div className="hero-card" style={{ display: "none" }}>
              <Reveal d={0.15}>
                <div style={{ background: "#fff", border: "1px solid #F3F4F6", borderRadius: 20, padding: 24, boxShadow: "0 10px 25px rgba(0,0,0,.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: ".95rem" }}>Dashboard</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: "#DCFCE7", borderRadius: 100, fontSize: ".6rem", fontWeight: 600, color: "#16A34A" }}>
                      <span className="ticker-dot" style={{ width: 5, height: 5 }}></span> Active
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[["Daily Spend", "₹2.4L", "↑24%"], ["ROAS", "4.8x", "↑12%"], ["Impressions", "1.2M", ""], ["Conversions", "8,432", ""]].map(([l, v, t]) => (
                      <div key={l} style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 10, padding: 12 }}>
                        <div style={{ fontSize: ".55rem", color: "#D1D5DB", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>{l}</div>
                        <div style={{ fontFamily: "var(--fd)", fontSize: "1.1rem", fontWeight: 700 }}>{v} {t && <span style={{ fontSize: ".6rem", color: "#16A34A" }}>{t}</span>}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="c">
          <div className="trust-bar-inner">
            {[["📘", "Meta Partner"], ["🔒", "SSL Secured"], ["💳", "UPI / Razorpay"], ["🛡️", "Stripe"], ["⭐", "500+ Clients"]].map(([ic, nm]) => (
              <div key={nm} className="trust-chip"><span>{ic}</span> {nm}</div>
            ))}
          </div>
        </div>
      </div>

      <section id="services" className="sec">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">Our Services</div><h2 className="sec-title">Two Powerful Account Types</h2><p className="sec-sub">Choose the account for your campaign goals.</p></div></Reveal>
          <div className="svc-grid">
            {services.map((s, i) => (
              <Reveal key={i} d={i * 0.08}>
                <div className="svc">
                  <div className="svc-top">
                    <div className="svc-ico" style={{ background: s.ico }}>{s.icon}</div>
                    <span className="svc-badge" style={{ background: s.bc, color: s.bco }}>{s.badge}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <ul className="svc-list">{s.feats.map((f) => <li key={f}><Ck /> {f}</li>)}</ul>
                  <button className="svc-cta" onClick={go}>Get {s.title.split(" ")[0]} Account →</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="sec sec-alt">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">Spend Calculator</div><h2 className="sec-title">Calculate Your Cost</h2><p className="sec-sub">Enter monthly spend to see your rate.</p></div></Reveal>
          <Reveal d={0.08}><Calc go={go} /></Reveal>
        </div>
      </section>

      <section id="industries" className="sec">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">Industries</div><h2 className="sec-title">High-Risk Specialists</h2></div></Reveal>
          <div className="ind-grid">
            {industries.map(([ic, t, s, bg], i) => (
              <Reveal key={t} d={i * 0.05}>
                <div className="ind-card">
                  <div className="ind-ico" style={{ background: bg }}>{ic}</div>
                  <h4>{t}</h4><div className="sub">{s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="sec sec-alt">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">Knowledge Base</div><h2 className="sec-title">Scale High-Risk Campaigns</h2></div></Reveal>
          <div className="res-grid">
            {resources.map((r, i) => (
              <Reveal key={i} d={i * 0.05}><ResCard {...r} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <Reveal>
            <div className="guar-box">
              <div style={{ fontSize: "2rem", marginBottom: 12, flexShrink: 0 }}>🛡️</div>
              <div>
                <h3>100% Money-Back Guarantee</h3>
                <p>Non-delivery within 24hrs or specs not met = full refund.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {["Full Refund", "Free Replacements", "No Hidden Charges"].map((t) => (
                    <div key={t} className="guar-feat"><Ck /> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">What You Get</div><h2 className="sec-title">Everything to Scale</h2></div></Reveal>
          <div className="card-grid">
            {features.map(([ic, t, d], i) => (
              <Reveal key={t} d={i * 0.04}>
                <div className="card">
                  <div className="card-ico">{ic}</div>
                  <div><h4>{t}</h4><p>{d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">How It Works</div><h2 className="sec-title">4 Simple Steps</h2></div></Reveal>
          <div className="step-grid">
            {[["01", "Contact", "WhatsApp or Telegram"], ["02", "Choose", "VCC or Creditline"], ["03", "Pay", "UPI / Bank transfer"], ["04", "Scale", "Get account, run ads"]].map(([n, t, d], i) => (
              <Reveal key={n} d={i * 0.05}>
                <div className="step"><div className="step-num">{n}</div><h4>{t}</h4><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="sec sec-alt">
        <div className="c">
          <div className="stat-grid">
            {[["500+", "Advertisers"], ["₹500Cr+", "Managed"], ["2,000+", "Delivered"], ["99.2%", "Satisfaction"]].map(([v, l]) => (
              <Reveal key={l}><div><div className="stat-val">{v}</div><div className="stat-lbl">{l}</div></div></Reveal>
            ))}
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="c">
          <Reveal><div className="sec-head"><div className="eyebrow">Reviews</div><h2 className="sec-title">Trusted Across India</h2></div></Reveal>
          <div className="test-grid">
            {reviews.map(([q, init, name, role], i) => (
              <Reveal key={i} d={i * 0.05}>
                <div className="test-card">
                  <div className="test-stars">★★★★★</div>
                  <p className="test-q">"{q}"</p>
                  <div className="test-author">
                    <div className="test-av">{init}</div>
                    <div><div className="test-name">{name}</div><div className="test-role">{role}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="sec sec-alt">
        <div className="c" style={{ maxWidth: 680 }}>
          <Reveal><div className="sec-head"><div className="eyebrow">FAQ</div><h2 className="sec-title">Common Questions</h2></div></Reveal>
          {faqs.map(([q, a], i) => (
            <Reveal key={i} d={i * 0.03}><FaqItem q={q} a={a} /></Reveal>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="c">
          <Reveal>
            <div className="cta-box">
              <h2>Ready to Scale<br /><span className="acc">Facebook Ads?</span></h2>
              <p>Join 500+ advertisers. Get started in minutes.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300, margin: "0 auto" }}>
                <button onClick={go} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, background: "#2563EB", color: "#fff", fontSize: ".9rem", fontWeight: 600, borderRadius: 12, border: "none", cursor: "pointer" }}>
                  Get Started Now <Arr />
                </button>
                <a href="mailto:Help@adsmit.in" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 13, color: "#D1D5DB", fontSize: ".86rem", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)" }}>Email Us</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 22, fontSize: ".76rem", color: "#D1D5DB" }}>
                <span>+91 7873767676</span>
                <span>Help@adsmit.in</span>
                <span>@Adsmitagencyofficial</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="c">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <LogoSvg s={22} />
            <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: ".88rem" }}>ADSMIT <em style={{ color: "#2563EB", fontStyle: "normal" }}>Solutions</em></span>
          </div>
          <p style={{ fontSize: ".78rem", color: "#6B7280", lineHeight: 1.5, marginBottom: 16, maxWidth: 260 }}>India's most trusted Facebook Ad Account provider. ₹500Cr+ managed.</p>
          <div style={{ fontSize: ".74rem", color: "#6B7280", marginBottom: 4 }}>+91 7873767676</div>
          <div style={{ fontSize: ".74rem", color: "#6B7280", marginBottom: 4 }}>Help@adsmit.in</div>
          <div style={{ fontSize: ".74rem", color: "#6B7280", marginBottom: 4 }}>@Adsmitagencyofficial</div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, paddingTop: 16, borderTop: "1px solid #F3F4F6", marginTop: 20 }}>
            <span style={{ fontSize: ".65rem", color: "#D1D5DB" }}>© 2024 Adsmit Solutions</span>
            <span style={{ fontSize: ".62rem", color: "#D1D5DB", fontFamily: "var(--fm)" }}>GST: 24GFNPB5488F1Z7</span>
          </div>
        </div>
      </footer>

      <div className="stk-bar">
        <a href="https://api.whatsapp.com/send/?phone=917873767676&text=Hi%2C+I+need+Facebook+Ad+Accounts" target="_blank" rel="noreferrer" className="stk-btn stk-wa"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>
        <a href="https://t.me/Adsmitagencyofficial" target="_blank" rel="noreferrer" className="stk-btn stk-tg"><svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg></a>
      </div>
    </div>
  );
}
