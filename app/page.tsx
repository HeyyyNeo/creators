"use client";
import { useEffect, useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,700&family=Instrument+Serif:ital@0;1&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --mint:#C8F5DC;
  --mint-mid:#7EDBA0;
  --green:#22A95B;
  --green-dark:#166B39;
  --peach:#FFE8D6;
  --peach-mid:#FFBF99;
  --lemon:#FFF6C2;
  --sky:#D4EDFF;
  --lavender:#EBE4FF;
  --ink:#111210;
  --ink2:#3A3D38;
  --muted:#8A9087;
  --white:#FFFEFB;
  --card-r:28px;
  --ease-bounce:cubic-bezier(.34,1.56,.64,1);
  --ease-out:cubic-bezier(.16,1,.3,1);
}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--white);color:var(--ink);overflow-x:hidden;}

/* NAV */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:1.1rem 3.5rem;
  transition:background .4s,backdrop-filter .4s;
}
.nav.stuck{background:rgba(255,254,251,.9);backdrop-filter:blur(20px);box-shadow:0 1px 0 rgba(0,0,0,.07);}
.logo{font-family:'Instrument Serif',serif;font-size:1.4rem;color:var(--ink);text-decoration:none;display:flex;align-items:center;gap:.5rem;}
.logo-dot{width:10px;height:10px;border-radius:50%;background:var(--green);display:inline-block;animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.4);}}
.nav-links{display:flex;gap:2rem;list-style:none;}
.nav-links a{font-size:.82rem;font-weight:600;color:var(--ink2);text-decoration:none;letter-spacing:.04em;transition:color .2s;}
.nav-links a:hover{color:var(--green);}
.nav-btn{
  background:var(--ink);color:var(--white);border:none;border-radius:100px;
  padding:.65rem 1.5rem;font-family:inherit;font-size:.8rem;font-weight:700;
  cursor:pointer;letter-spacing:.03em;
  transition:transform .3s var(--ease-bounce),background .2s,box-shadow .3s;
}
.nav-btn:hover{transform:scale(1.08) translateY(-2px);background:var(--green);box-shadow:0 8px 24px rgba(34,169,91,.4);}

/* HERO */
.hero{
  min-height:100svh;display:grid;grid-template-columns:1.1fr 1fr;
  align-items:center;overflow:hidden;position:relative;
  background:var(--white);padding-top:80px;
}
.hero-left{padding:4rem 3rem 4rem 7rem;position:relative;z-index:2;}
.hero-right{position:relative;height:100svh;overflow:hidden;}

.hero-chip{
  display:inline-flex;align-items:center;gap:.5rem;
  background:var(--mint);color:var(--green-dark);
  border-radius:100px;padding:.4rem 1rem .4rem .55rem;
  font-size:.75rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  margin-bottom:1.75rem;
  animation:popIn .6s var(--ease-bounce) .1s both;
}
.hero-chip-dot{width:8px;height:8px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease-in-out infinite;}

.hero-h1{
  font-family:'Instrument Serif',serif;
  font-size:clamp(3rem,5.2vw,4.8rem);line-height:1.05;
  color:var(--ink);margin-bottom:1.4rem;
  animation:slideUp .7s var(--ease-out) .25s both;
}
.hero-h1 em{font-style:italic;color:var(--green);}
.hero-h1 .pill{
  display:inline-block;background:var(--mint);
  border-radius:10px;padding:0 .3em .05em;
}
.hero-sub{
  font-size:1rem;line-height:1.8;color:var(--muted);font-weight:400;
  max-width:400px;margin-bottom:2.5rem;
  animation:slideUp .7s var(--ease-out) .38s both;
}
.hero-actions{display:flex;gap:1rem;align-items:center;animation:slideUp .7s var(--ease-out) .5s both;flex-wrap:wrap;}

.btn-big{
  background:var(--green);color:#fff;border:none;border-radius:100px;
  padding:.92rem 2.2rem;font-family:inherit;font-size:.9rem;font-weight:700;
  cursor:pointer;letter-spacing:.02em;text-decoration:none;display:inline-block;
  transition:transform .3s var(--ease-bounce),box-shadow .3s;
}
.btn-big:hover{transform:scale(1.08) translateY(-3px);box-shadow:0 14px 36px rgba(34,169,91,.45);}

.btn-ghost{
  background:transparent;color:var(--ink);border:2px solid rgba(0,0,0,.13);
  border-radius:100px;padding:.9rem 1.8rem;font-family:inherit;font-size:.9rem;
  font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;
  transition:border-color .2s,transform .3s var(--ease-bounce),background .2s,color .2s;
}
.btn-ghost:hover{border-color:var(--ink);background:var(--ink);color:#fff;transform:scale(1.05) translateY(-2px);}

/* floating cards */
.stat-float{
  position:absolute;background:var(--white);border-radius:20px;
  padding:.9rem 1.2rem;box-shadow:0 8px 30px rgba(0,0,0,.12);
  display:flex;align-items:center;gap:.75rem;
}
.sf1{bottom:26%;left:1.5rem;animation:popIn .7s var(--ease-bounce) .5s both,floatA 4s ease-in-out 1.2s infinite;}
.sf2{top:22%;right:1.5rem;animation:popIn .7s var(--ease-bounce) .9s both,floatB 4.5s ease-in-out 1.6s infinite;}
.sf3{bottom:10%;right:2rem;animation:popIn .7s var(--ease-bounce) 1.1s both,floatA 3.8s ease-in-out 1.9s infinite;}
@keyframes floatA{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes floatB{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}

.stat-icon{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.stat-num{font-family:'Instrument Serif',serif;font-size:1.3rem;color:var(--ink);line-height:1;}
.stat-label{font-size:.71rem;color:var(--muted);font-weight:600;margin-top:2px;letter-spacing:.03em;}

.hero-img{width:100%;height:100%;object-fit:cover;object-position:center top;}
.hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(100deg,rgba(255,254,251,.65) 0%,transparent 45%),
             linear-gradient(0deg,rgba(255,254,251,.25) 0%,transparent 25%);
}

/* blobs */
.blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:.5;pointer-events:none;}
.b1{width:480px;height:480px;background:var(--mint);top:-80px;right:-60px;animation:blobDrift 10s ease-in-out infinite;z-index:0;}
.b2{width:280px;height:280px;background:var(--peach);bottom:-40px;left:5%;animation:blobDrift 14s ease-in-out infinite reverse;z-index:0;}
@keyframes blobDrift{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(28px,-18px) scale(1.06);}}

@keyframes popIn{from{opacity:0;transform:scale(.65);}to{opacity:1;transform:scale(1);}}
@keyframes slideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}

/* TRUST BAR */
.trust{
  background:var(--ink);padding:1.4rem 7rem;
  display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
  overflow:hidden;flex-wrap:wrap;
}
.trust-item{display:flex;align-items:center;gap:.75rem;color:rgba(255,255,255,.5);font-size:.8rem;font-weight:500;white-space:nowrap;}
.trust-item strong{color:rgba(255,255,255,.9);font-size:.95rem;font-family:'Instrument Serif',serif;}
.tdivider{width:1px;height:26px;background:rgba(255,255,255,.1);flex-shrink:0;}

/* ABOUT */
.about{padding:7rem 7rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
.about-img-wrap{position:relative;}
.about-img-card{border-radius:32px;overflow:hidden;aspect-ratio:4/5;box-shadow:0 28px 72px rgba(0,0,0,.15);}
.about-img-card img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .6s var(--ease-out);}
.about-img-card:hover img{transform:scale(1.04);}
.about-badge{
  position:absolute;bottom:-1.5rem;right:-1.5rem;
  background:var(--lemon);border-radius:20px;padding:1.1rem 1.3rem;
  box-shadow:0 10px 28px rgba(0,0,0,.1);text-align:center;
  animation:floatB 5s ease-in-out infinite;
}
.about-badge-num{font-family:'Instrument Serif',serif;font-size:2.2rem;color:var(--ink);line-height:1;}
.about-badge-label{font-size:.7rem;font-weight:700;color:var(--ink2);text-transform:uppercase;letter-spacing:.06em;}
.about-tag{
  position:absolute;top:1.5rem;left:-1.5rem;
  background:var(--lavender);border-radius:14px;padding:.65rem 1rem;
  box-shadow:0 6px 20px rgba(0,0,0,.09);font-size:.78rem;font-weight:700;color:#5B4AE8;
  animation:floatA 4.2s ease-in-out .3s infinite;
}

.sec-chip{
  display:inline-flex;align-items:center;gap:.4rem;background:var(--mint);color:var(--green-dark);
  border-radius:100px;padding:.3rem .9rem;font-size:.72rem;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;margin-bottom:1.25rem;
}
.sec-h{font-family:'Instrument Serif',serif;font-size:clamp(1.9rem,3.5vw,2.9rem);line-height:1.15;color:var(--ink);margin-bottom:1.2rem;}
.sec-h em{font-style:italic;color:var(--green);}
.about-body{font-size:.93rem;line-height:1.85;color:var(--muted);margin-bottom:1.2rem;}
.creds{display:flex;flex-direction:column;gap:.6rem;margin-top:1.4rem;}
.cred{
  display:flex;align-items:center;gap:.75rem;font-size:.82rem;
  background:var(--white);border:1.5px solid rgba(0,0,0,.07);border-radius:12px;
  padding:.55rem .9rem;color:var(--ink2);font-weight:500;
  transition:border-color .25s,transform .3s var(--ease-bounce);
}
.cred:hover{border-color:var(--green);transform:translateX(5px);}
.cred-dot{width:7px;height:7px;border-radius:50%;background:var(--green);flex-shrink:0;}

/* SERVICES */
.services{padding:5rem 7rem;background:var(--ink);}
.svc-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;}
.svc-head .sec-h{color:#fff;margin:0;}
.svc-head .sec-h em{color:var(--mint-mid);}
.svc-head .sec-chip{background:rgba(200,245,220,.12);color:var(--mint-mid);}
.svc-link{color:rgba(255,255,255,.4);font-size:.83rem;font-weight:600;text-decoration:none;transition:color .2s;}
.svc-link:hover{color:#fff;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.svc-card{
  background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);
  border-radius:var(--card-r);padding:2rem;
  transition:background .3s,border-color .3s,transform .4s var(--ease-bounce);cursor:default;
}
.svc-card:hover{background:rgba(255,255,255,.09);border-color:rgba(200,245,220,.3);transform:translateY(-10px) scale(1.03);}
.svc-icon{
  width:52px;height:52px;border-radius:16px;
  display:flex;align-items:center;justify-content:center;font-size:1.5rem;
  margin-bottom:1.25rem;
  animation:floatA 4s ease-in-out infinite;
}
.svc-card:nth-child(2) .svc-icon{animation-delay:.35s;}
.svc-card:nth-child(3) .svc-icon{animation-delay:.7s;}
.svc-card:nth-child(4) .svc-icon{animation-delay:.15s;}
.svc-card:nth-child(5) .svc-icon{animation-delay:.55s;}
.svc-card:nth-child(6) .svc-icon{animation-delay:.9s;}
.svc-name{font-family:'Instrument Serif',serif;font-size:1.15rem;color:#fff;margin-bottom:.5rem;}
.svc-desc{font-size:.81rem;line-height:1.75;color:rgba(255,255,255,.44);}

/* PROCESS */
.process{padding:7rem 7rem;background:var(--lemon);}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-top:3.5rem;}
.step-card{
  background:var(--white);border-radius:var(--card-r);padding:2rem 1.5rem;
  position:relative;overflow:hidden;
  transition:transform .4s var(--ease-bounce),box-shadow .4s;
}
.step-card:hover{transform:translateY(-12px) scale(1.04);box-shadow:0 24px 56px rgba(0,0,0,.12);}
.step-num{font-family:'Instrument Serif',serif;font-size:3.5rem;color:rgba(0,0,0,.07);line-height:1;margin-bottom:.7rem;}
.step-title{font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:.45rem;}
.step-desc{font-size:.79rem;line-height:1.7;color:var(--muted);}
.step-bar{position:absolute;bottom:0;left:0;right:0;height:4px;border-radius:0 0 var(--card-r) var(--card-r);}

/* TESTIMONIALS */
.testimonials{padding:7rem 7rem;background:var(--peach);}
.test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:3rem;}
.test-card{
  background:var(--white);border-radius:var(--card-r);padding:2rem;
  animation:floatA 5s ease-in-out infinite;
  transition:transform .4s var(--ease-bounce),box-shadow .4s;
}
.test-card:nth-child(2){animation-delay:.65s;}
.test-card:nth-child(3){animation-delay:1.3s;}
.test-card:hover{transform:translateY(-12px) scale(1.03) !important;box-shadow:0 24px 60px rgba(0,0,0,.13);}
.stars{display:flex;gap:3px;margin-bottom:1rem;}
.star{color:#F4B740;font-size:.85rem;}
.test-q{font-family:'Instrument Serif',serif;font-style:italic;font-size:1rem;line-height:1.75;color:var(--ink2);margin-bottom:1.5rem;}
.test-author{display:flex;align-items:center;gap:.75rem;}
.avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;color:#fff;flex-shrink:0;}
.aname{font-size:.82rem;font-weight:700;color:var(--ink);}
.aloc{font-size:.73rem;color:var(--muted);}

/* CTA */
.cta-sec{
  padding:6rem 7rem;background:var(--green);
  display:flex;align-items:center;justify-content:space-between;gap:3rem;
  position:relative;overflow:hidden;flex-wrap:wrap;
}
.cta-ring{
  position:absolute;border-radius:50%;border:1.5px solid rgba(255,255,255,.12);pointer-events:none;
}
.ring1{width:560px;height:560px;top:-50%;right:-8%;animation:spin 22s linear infinite;}
.ring2{width:380px;height:380px;top:-20%;right:8%;animation:spin 15s linear infinite reverse;}
@keyframes spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}
.cta-left{position:relative;z-index:1;}
.cta-chip{background:rgba(255,255,255,.2);color:#fff;border-radius:100px;padding:.3rem .9rem;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;display:inline-block;margin-bottom:1rem;}
.cta-h{font-family:'Instrument Serif',serif;font-size:clamp(1.9rem,3.8vw,3rem);color:#fff;line-height:1.1;}
.cta-sub{font-size:.88rem;color:rgba(255,255,255,.7);margin-top:.8rem;line-height:1.75;}
.cta-right{display:flex;flex-direction:column;gap:.9rem;position:relative;z-index:1;flex-shrink:0;}
.btn-white{
  background:#fff;color:var(--green);border:none;border-radius:100px;
  padding:1rem 2.2rem;font-family:inherit;font-size:.9rem;font-weight:700;
  cursor:pointer;text-decoration:none;display:inline-block;text-align:center;
  transition:transform .3s var(--ease-bounce),box-shadow .3s;
}
.btn-white:hover{transform:scale(1.08) translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.22);}
.btn-outline-w{
  background:transparent;color:#fff;border:2px solid rgba(255,255,255,.4);
  border-radius:100px;padding:.98rem 2.2rem;font-family:inherit;font-size:.9rem;
  font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;text-align:center;
  transition:border-color .25s,background .25s,transform .3s var(--ease-bounce);
}
.btn-outline-w:hover{border-color:#fff;background:rgba(255,255,255,.1);transform:scale(1.05);}

/* FOOTER */
footer{background:var(--ink);padding:2.5rem 7rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;}
.flogo{font-family:'Instrument Serif',serif;font-size:1.2rem;color:rgba(255,255,255,.7);}
.flogo span{color:var(--mint-mid);}
.fcopy{font-size:.73rem;color:rgba(255,255,255,.28);}
.flinks{display:flex;gap:2rem;list-style:none;}
.flinks a{font-size:.76rem;color:rgba(255,255,255,.32);text-decoration:none;transition:color .2s;}
.flinks a:hover{color:rgba(255,255,255,.8);}

/* SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s var(--ease-out),transform .7s var(--ease-out);}
.reveal.vis{opacity:1;transform:translateY(0);}
.rl{opacity:0;transform:translateX(-40px);transition:opacity .7s var(--ease-out),transform .7s var(--ease-out);}
.rl.vis{opacity:1;transform:translateX(0);}
.rr{opacity:0;transform:translateX(40px);transition:opacity .7s var(--ease-out),transform .7s var(--ease-out);}
.rr.vis{opacity:1;transform:translateX(0);}

@media(max-width:960px){
  .hero{grid-template-columns:1fr;}
  .hero-left{padding:7rem 2rem 3rem;}
  .hero-right{height:75vw;}
  .about{grid-template-columns:1fr;padding:4rem 2rem;}
  .services,.testimonials,.process{padding:4rem 2rem;}
  .svc-grid,.test-grid{grid-template-columns:1fr;}
  .process-grid{grid-template-columns:1fr 1fr;}
  .cta-sec{padding:4rem 2rem;}
  .trust{padding:1.4rem 2rem;}
  .nav{padding:1rem 1.5rem;}
  .nav-links{display:none;}
  footer{padding:2rem;flex-direction:column;text-align:center;}
}
`;

const svcs = [
  {
    name: "Sports Rehabilitation",
    desc: "Elite recovery for athletes — ACL, rotator cuff, stress fractures, and more.",
    bg: "#C8F5DC22",
    icon: "🏃",
  },
  {
    name: "Spine & Back Care",
    desc: "Evidence-based relief for disc problems, sciatica, and postural imbalance.",
    bg: "#FFE8D622",
    icon: "🧘",
  },
  {
    name: "Manual Therapy",
    desc: "Precise hands-on joint mobilisation and deep tissue myofascial release.",
    bg: "#EBE4FF22",
    icon: "🤲",
  },
  {
    name: "Post-Surgical Rehab",
    desc: "Structured protocols after joint replacement and orthopaedic surgery.",
    bg: "#FFF6C222",
    icon: "🩺",
  },
  {
    name: "Dry Needling",
    desc: "Trigger-point needling to dissolve deep chronic muscle tension fast.",
    bg: "#D4EDFF22",
    icon: "✨",
  },
  {
    name: "Ergonomic Wellness",
    desc: "Workstation assessment and WFH injury prevention for desk workers.",
    bg: "#FFE8D622",
    icon: "💻",
  },
];

const steps = [
  {
    n: "01",
    title: "Book & Assess",
    desc: "A 60-min deep-dive session to map your pain, posture, and movement patterns.",
    color: "#22A95B",
  },
  {
    n: "02",
    title: "Personalise Plan",
    desc: "We design a recovery roadmap specific to your body, lifestyle, and goals.",
    color: "#F4B740",
  },
  {
    n: "03",
    title: "Treat & Move",
    desc: "Hands-on sessions combined with guided exercises and lifestyle coaching.",
    color: "#7B61FF",
  },
  {
    n: "04",
    title: "Recover & Thrive",
    desc: "Progress tracking, maintenance care, and prevention to keep you pain-free.",
    color: "#FF6B6B",
  },
];

const reviews = [
  {
    q: "After years of chronic back pain from office work, I was genuinely pain-free within 5 sessions. Dr. Priya listens — she doesn't just treat symptoms.",
    name: "Ananya Sharma",
    loc: "Marketing Director · Cyber City",
    init: "AS",
    bg: "#22A95B",
  },
  {
    q: "ACL recovery in 4 months instead of 6. Incredible program. I'm back on the cricket field thanks to this amazing team.",
    name: "Rahul Mehta",
    loc: "Software Engineer & Cricketer",
    init: "RM",
    bg: "#7B61FF",
  },
  {
    q: "Dry needling resolved my shoulder issue that two other physios couldn't fix. Knowledgeable, warm, and the clinic feels premium.",
    name: "Kavita Joshi",
    loc: "Yoga Instructor · Sector 50",
    init: "KJ",
    bg: "#F4B740",
  },
];

export default function PhysioPage() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal,.rl,.rr")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav${stuck ? " stuck" : ""}`}>
        <a href="#" className="logo">
          <span className="logo-dot" />
          PriyaPhysio
        </a>
        <ul className="nav-links">
          {["About", "Services", "Process", "Reviews"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
        <button className="nav-btn" onClick={() => scrollTo("book")}>
          Book Session ↗
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="b1 blob" />
        <div className="b2 blob" />

        <div className="hero-left">
          <div className="hero-chip">
            <span className="hero-chip-dot" />✦ Gurgaon's Top-Rated Physio
          </div>
          <h1 className="hero-h1">
            Move without
            <br />
            <span className="pill">pain.</span> Live
            <br />
            <em>fully.</em>
          </h1>
          <p className="hero-sub">
            Expert physiotherapy in Sector 56, Gurgaon. Sports rehab, spine
            care, manual therapy — all personalised to you.
          </p>
          <div className="hero-actions">
            <a href="#book" className="btn-big">
              Book Free Consult
            </a>
            <a href="#services" className="btn-ghost">
              Explore Services
            </a>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/physio-2.png"
            alt="Dr. Priya Kapoor, Physiotherapist Gurgaon"
            className="hero-img"
          />
          <div className="hero-overlay" />

          <div className="stat-float sf1">
            <div className="stat-icon" style={{ background: "#C8F5DC" }}>
              🏅
            </div>
            <div>
              <div className="stat-num">1200+</div>
              <div className="stat-label">Patients Recovered</div>
            </div>
          </div>
          <div className="stat-float sf2">
            <div className="stat-icon" style={{ background: "#FFE8D6" }}>
              ⭐
            </div>
            <div>
              <div className="stat-num">4.9 / 5</div>
              <div className="stat-label">Google Rating</div>
            </div>
          </div>
          <div className="stat-float sf3">
            <div className="stat-icon" style={{ background: "#EBE4FF" }}>
              🩺
            </div>
            <div>
              <div className="stat-num">8 Years</div>
              <div className="stat-label">Clinical Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust">
        {[
          { label: "Medanta Medicity", num: "Former Senior Physio" },
          { label: "Fortis Gurgaon", num: "Ex-Consultant" },
          { label: "MIAP Certified", num: "Member" },
          { label: "Recovery Rate", num: "97%" },
          { label: "Home Visits", num: "Available" },
        ].map((t, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            {i > 0 && <div className="tdivider" />}
            <div className="trust-item">
              <div>
                <strong>{t.num}</strong>
                <br />
                {t.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-img-wrap rl">
          <div className="about-img-card">
            <img src="/physio.png" alt="Dr. Priya Kapoor in clinic" />
          </div>
          <div className="about-badge">
            <div className="about-badge-num">8+</div>
            <div className="about-badge-label">
              Years of
              <br />
              Expertise
            </div>
          </div>
          <div className="about-tag">MPT · BPT · MIAP</div>
        </div>

        <div className="rr">
          <div className="sec-chip">About</div>
          <h2 className="sec-h">
            Science, care &<br />
            <em>real results.</em>
          </h2>
          <p className="about-body">
            I'm Dr. Priya Kapoor — trained at Manipal University, formerly
            Senior Physiotherapist at Medanta Medicity and Fortis, now running
            an independent practice in Sector 56, Gurgaon.
          </p>
          <p className="about-body">
            Every session is tailored, every plan evolves. You'll leave each
            visit with clarity on why we're doing what we're doing — and feeling
            genuinely better.
          </p>
          <div className="creds">
            {[
              "Master of Physiotherapy (Sports & Ortho) — Manipal University",
              "Member, Indian Association of Physiotherapists (MIAP)",
              "Certified Dry Needling Practitioner — AADM",
              "Former Senior Physio, Medanta Medicity & Fortis Gurgaon",
            ].map((c, i) => (
              <div
                className="cred"
                key={i}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span className="cred-dot" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="svc-head reveal">
          <div>
            <div className="sec-chip">Services</div>
            <h2 className="sec-h">
              Everything you need
              <br />
              <em>to heal.</em>
            </h2>
          </div>
          <a href="#book" className="svc-link">
            Book any service →
          </a>
        </div>
        <div className="svc-grid reveal">
          {svcs.map((s, i) => (
            <div className="svc-card" key={i}>
              <div className="svc-icon" style={{ background: s.bg }}>
                <span>{s.icon}</span>
              </div>
              <div className="svc-name">{s.name}</div>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="sec-chip">How It Works</div>
          <h2 className="sec-h">
            Your recovery,
            <br />
            <em>step by step.</em>
          </h2>
        </div>
        <div className="process-grid reveal">
          {steps.map((s, i) => (
            <div
              className="step-card"
              key={i}
              style={{ transitionDelay: `${i * 0.09}s` }}
            >
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
              <div className="step-bar" style={{ background: s.color }} />
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="testimonials" id="reviews">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="sec-chip">Stories</div>
          <h2 className="sec-h">
            Real people,
            <br />
            <em>real recovery.</em>
          </h2>
        </div>
        <div className="test-grid reveal">
          {reviews.map((r, i) => (
            <div className="test-card" key={i}>
              <div className="stars">
                {[...Array(5)].map((_, j) => (
                  <span className="star" key={j}>
                    ★
                  </span>
                ))}
              </div>
              <p className="test-q">"{r.q}"</p>
              <div className="test-author">
                <div className="avatar" style={{ background: r.bg }}>
                  {r.init}
                </div>
                <div>
                  <div className="aname">{r.name}</div>
                  <div className="aloc">{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / BOOK */}
      <section className="cta-sec" id="book">
        <div className="cta-ring ring1" />
        <div className="cta-ring ring2" />
        <div className="cta-left">
          <div className="cta-chip">✦ Limited slots available</div>
          <h2 className="cta-h">
            Ready to feel good
            <br />
            in your body again?
          </h2>
          <p className="cta-sub">
            Mon–Sat · 9 AM – 7 PM · Sector 56, Gurgaon — 122011
            <br />
            Home visits for post-surgical patients · Same-week urgent slots
          </p>
        </div>
        <div className="cta-right">
          <a href="tel:+919876543210" className="btn-white">
            📞 Call +91 98765 43210
          </a>
          <a href="https://wa.me/919876543210" className="btn-outline-w">
            💬 WhatsApp Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="flogo">
          Priya<span>Physio</span>
        </div>
        <p className="fcopy">© 2025 Dr. Priya Kapoor · Gurgaon</p>
        <ul className="flinks">
          {["About", "Services", "Process", "Reviews", "Book"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
