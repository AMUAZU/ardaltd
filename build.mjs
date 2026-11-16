// Builds the static site into ./site from the copy in ./src/content.mjs.
// Run: node build.mjs
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  firm, frameworks, tools, practices, clientGroups, proofPoints, principles, articles, slug,
} from "./src/content.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "site");
const YEAR = 2026;
const logo = JSON.parse(readFileSync(join(ROOT, "src/logo.json"), "utf8")).horizontal;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const serviceCount = practices.reduce((n, p) => n + p.services.length, 0);
const byKey = Object.fromEntries(practices.map((p) => [p.key, p]));

// ---------- Brand and artwork ----------
// Logo lockup: the wordmark's cap height equals the mark's height, on a shared baseline.
const brand = (root) => `<a class="brand" href="${root}index.html" aria-label="Arda Limited, home">
        <svg viewBox="${logo.viewBox}" aria-hidden="true" focusable="false"><path transform="${logo.markT}" d="${logo.mark}"/><path d="${logo.word}"/></svg>
      </a>`;

const arrow = `<svg class="i-arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const chev = `<svg class="i-chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

// Slanted bands and folded ribbon from the brand banner, toned for the dark hero.
const heroArt = (viewBox = "0 0 640 400", ribbon = true) => `
<svg viewBox="${viewBox}" preserveAspectRatio="xMaxYMid meet" aria-hidden="true" focusable="false">
  <polygon fill="#16323a" points="936,-400 1142,-400 461,281 358,178"/>
  <polygon fill="#16323a" points="509,330 909,-70 1400,-70 1400,800 979,800"/>
  <polygon fill="#45595a" points="899,-272 1059,-272 579,208 499,128"/>
  <polygon fill="#45595a" points="615,247 700,162 700,332"/>${ribbon ? `
  <polygon fill="#2a474c" points="621,-400 778,-400 79,299 0,220"/>
  <polygon fill="#2a474c" points="254,200 414,200 276,338 196,258"/>
  <polygon fill="#223c41" points="276,338 196,418 596,818 676,738"/>
  <polygon fill="#e4ebea" points="116,338 196,258 276,338 196,418"/>` : ""}
</svg>`;

// Card artwork: one composition per practice, cut from the same band geometry.
const TILES = {
  dev: { bg: "#45595a", a: "#364a4c", b: "#5c7475", c: "#e4ebea", flip: false, shapes: [[-70, 110, "a"], [150, 54, "b"], [300, 130, "a"]], sq: [262, 150, 34] },
  ent: { bg: "#545454", a: "#444444", b: "#6c6c6c", c: "#ededed", flip: true, shapes: [[-40, 80, "a"], [110, 120, "b"], [330, 60, "a"]], sq: [120, 78, 34] },
  avi: { bg: "#10262a", a: "#1c3a40", b: "#45595a", c: "#e4ebea", flip: false, shapes: [[10, 150, "a"], [230, 44, "b"], [330, 150, "a"]], sq: [340, 96, 34] },
};
function tile(key) {
  const t = TILES[key];
  const band = ([x, w, c]) => `<polygon fill="${t[c]}" points="${x},225 ${x + w},225 ${x + w + 225},0 ${x + 225},0"/>`;
  const [cx, cy, r] = t.sq;
  return `<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="400" height="225" fill="${t.bg}"/>
    <g${t.flip ? ' transform="translate(400 0) scale(-1 1)"' : ""}>${t.shapes.map(band).join("")}
    <polygon fill="${t.c}" points="${cx - r},${cy} ${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r}"/></g>
  </svg>`;
}

// ---------- Placeholders ----------
const phIcon = `<svg viewBox="0 0 44 44" aria-hidden="true" focusable="false"><rect x="5" y="9" width="34" height="26" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 29l10-9 8 7 6-5 10 8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
const phCase = (n, text) => `<article class="ph" data-placeholder="Case study ${n}">
            <div class="ph-art">${phIcon}</div>
            <div class="ph-body">
              <span class="ph-tag">Placeholder</span>
              <h3>Case study ${n}</h3>
              <p>${text}</p>
            </div>
          </article>`;
const phInline = (text) => `<span class="ph-inline" data-placeholder="${esc(text)}">[Placeholder: ${esc(text)}]</span>`;

// ---------- Layout ----------
function layout({ file, title, description, active, body, root = "" }) {
  const fullTitle = file === "index.html" ? `${firm.name} | Advisory firm, Abuja` : `${title} | ${firm.name}`;
  const isPractice = practices.some((p) => p.key === active);
  const cur = (k) => (k === active ? ' aria-current="page"' : "");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#10262a">
  <link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}assets/css/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap">
      ${brand(root)}
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="bars" aria-hidden="true"></span>Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        <ul class="nav-list">
          <li class="has-menu">
            <button class="nav-link${isPractice ? " current" : ""}" type="button" aria-expanded="false" aria-controls="menu-what">What we do ${chev}</button>
            <div class="mega" id="menu-what">
              <div class="wrap">
                <div class="mega-grid">
                  <div class="mega-intro">
                    <p>What we do</p>
                    <p class="muted">Two practices serving governments, development institutions, businesses and aviation organisations.</p>
                  </div>
                  ${practices.map((p) => `<div class="mega-col">
                    <a href="${root}${p.file}"${cur(p.key)}>${p.short}</a>
                    <ul>
                      ${p.services.map((s) => `<li><a href="${root}${p.file}#${slug(s.name)}">${s.name}</a></li>`).join("\n                      ")}
                    </ul>
                  </div>`).join("\n                  ")}
                </div>
              </div>
            </div>
          </li>
          <li><a class="nav-link" href="${root}insights.html"${cur("insights")}>Insights</a></li>
          <li><a class="nav-link" href="${root}about.html"${cur("about")}>About</a></li>
          <li><a class="btn nav-cta" href="${root}contact.html"${cur("contact")}>Contact us</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
${body}
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          ${brand(root)}
          <p>${esc(firm.oneLine)}</p>
        </div>
        <div>
          <h2>What we do</h2>
          <ul>
            ${practices.map((p) => `<li><a href="${root}${p.file}">${p.short}</a></li>`).join("\n            ")}
          </ul>
        </div>
        <div>
          <h2>Firm</h2>
          <ul>
            <li><a href="${root}about.html">About</a></li>
            <li><a href="${root}insights.html">Insights</a></li>
            <li><a href="${root}contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2>Abuja office</h2>
          <ul>
            <li>${phInline("street address")}<br>Abuja, Nigeria</li>
            <li>${phInline("email address")}</li>
            <li>${phInline("phone number")}</li>
          </ul>
        </div>
      </div>
      <div class="footer-base">
        <span>&copy; ${YEAR} ${firm.name}. ${firm.rc}.</span>
        <span>Abuja, Nigeria</span>
      </div>
    </div>
  </footer>
  <script src="${root}assets/js/site.js" defer></script>
</body>
</html>
`;
  const path = join(OUT, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
  console.log("built", file);
}

// ---------- Shared sections ----------
const cta = (root = "", heading = "Talk to us about your assignment.", text = "Send a short outline. We will reply from our Abuja office.") => `
    <section class="cta" aria-labelledby="cta-h">
      <div class="wrap">
        <div>
          <h2 id="cta-h">${heading}</h2>
          <p>${text}</p>
        </div>
        <a class="btn white" href="${root}contact.html">Contact us ${arrow}</a>
      </div>
    </section>`;

const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
  .map(([label, href]) => `<li>${href ? `<a href="${href}">${label}</a>` : `<span aria-current="page">${label}</span>`}</li>`)
  .join("")}</ol></nav>`;

const pageHero = ({ trail, title, deck }) => `
    <section class="page-hero">
      <div class="page-hero-art">${heroArt("340 0 300 400", false)}</div>
      <div class="wrap">
        <div class="page-hero-copy">
          ${crumbs(trail)}
          <h1>${title}</h1>
          ${deck ? `<p class="deck">${deck}</p>` : ""}
        </div>
      </div>
    </section>`;

const insightCard = (a, root = "", cls = "") => `
          <a class="card ${cls}" href="${root}insights/${a.slug}.html">
            <div class="card-art">${tile(a.art)}</div>
            <div class="card-body">
              <p class="meta"><span class="tag">${a.practice}</span><span class="read">${a.read}</span></p>
              <h3>${a.title}</h3>
              <p>${a.summary}</p>
              <span class="link-arrow card-foot"><span>Read the article</span> ${arrow}</span>
            </div>
          </a>`;

const caseSection = (label) => `
    <section class="section grey" aria-labelledby="work-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Our work</p>
            <h2 id="work-h">Case studies</h2>
            <p class="intro">Case studies will appear here once ${label} assignments are cleared for publication.</p>
          </div>
        </div>
        <div class="grid-2">
          ${[1, 2].map((n) => `<article class="ph compact" data-placeholder="Case study ${n}">
            <div class="ph-body">
              <span class="ph-tag">Placeholder</span>
              <h3>Case study ${n}</h3>
              <p>Client type, the challenge, what we did and the result.</p>
            </div>
          </article>`).join("\n          ")}
        </div>
      </div>
    </section>`;

// ---------- Home ----------
const [lead, ...rest] = articles;
layout({
  file: "index.html",
  title: firm.name,
  active: "home",
  description:
    "Arda Limited is an Abuja-based advisory firm. We work with governments, development institutions, businesses and aviation organisations on strategy, delivery, safety and compliance.",
  body: `
    <section class="hero">
      <div class="hero-art">${heroArt()}</div>
      <div class="wrap">
        <div class="hero-copy">
          <h1>Strategy that gets delivered. Safety that stands up to audit.</h1>
          <p class="deck">Arda is an Abuja-based advisory firm. We work with governments, development institutions, businesses and aviation organisations on strategy, delivery, safety and compliance.</p>
          <div class="actions">
            <a class="btn white" href="#what-we-do">Explore what we do ${arrow}</a>
            <a class="link-arrow" href="contact.html"><span>Contact us</span> ${arrow}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="who-h">
      <div class="wrap">
        <div class="two-col">
          <div class="stack">
            <p class="eyebrow" id="who-h">Who we are</p>
            <p class="statement">Arda brings together a development and enterprise practice and an aviation practice. Both are built on experience inside the kinds of organisations we advise.</p>
          </div>
          <div class="stack">
            <p>Our development and enterprise practice serves governments, development institutions and businesses. Our aviation practice serves operators, airports, air navigation service providers and regulators.</p>
            <p><a class="link-arrow" href="about.html"><span>About Arda</span> ${arrow}</a></p>
          </div>
        </div>
      </div>
    </section>

    <section class="section grey" id="what-we-do" aria-labelledby="what-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">What we do</p>
            <h2 id="what-h">How we help clients</h2>
          </div>
        </div>
        <div class="grid-3">
          ${practices.map((p) => `<a class="card p-card" href="${p.file}">
            <div class="card-art">${tile(p.art)}</div>
            <div class="card-body">
              <h3>${p.title}</h3>
              <p>${p.cardText}</p>
              <ul>
                ${p.services.map((s) => `<li>${s.name}</li>`).join("\n                ")}
              </ul>
              <span class="link-arrow card-foot"><span>Explore our services</span> ${arrow}</span>
            </div>
          </a>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="clients-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Our clients</p>
            <h2 id="clients-h">Who we work with</h2>
          </div>
        </div>
        <div class="clients">
          ${clientGroups.map((g) => `<div class="client"><h3>${g.title}</h3><p>${g.body}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section dark" aria-labelledby="why-h">
      <div class="wrap">
        <div class="two-col even">
          <div class="stack on-dark">
            <p class="eyebrow">Why Arda</p>
            <h2 id="why-h">Experience from inside the sectors we advise</h2>
            <p style="color:var(--on-dark-soft)">Our competencies were built in government, regulation, operations and early-stage business.</p>
            <p><a class="link-arrow" href="about.html#competencies"><span>See our competencies</span> ${arrow}</a></p>
          </div>
          <div class="points">
            ${proofPoints.map((p) => `<div class="point"><h4>${p.title}</h4><p>${p.body}</p></div>`).join("\n            ")}
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="ins-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Insights</p>
            <h2 id="ins-h">Featured insights</h2>
          </div>
          <a class="link-arrow" href="insights.html"><span>View all insights</span> ${arrow}</a>
        </div>
        <div class="feature">${insightCard(lead, "", "lead-card")}
          <div class="side-list">
            ${rest.map((a) => `<a class="side-item" href="insights/${a.slug}.html">
              <p class="meta"><span class="tag">${a.practice}</span><span class="read">${a.read}</span></p>
              <h3>${a.title}</h3>
              <p>${a.summary}</p>
              <span class="link-arrow"><span>Read the article</span> ${arrow}</span>
            </a>`).join("\n            ")}
          </div>
        </div>
      </div>
    </section>

    <section class="section grey" aria-labelledby="work-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Our work</p>
            <h2 id="work-h">Case studies</h2>
            <p class="intro">Case studies will appear here once assignments are cleared for publication.</p>
          </div>
        </div>
        <div class="grid-3">
          ${phCase(1, "Development and public sector assignment: client type, the challenge, what we did and the result.")}
          ${phCase(2, "Enterprise advisory assignment: client type, the challenge, what we did and the result.")}
          ${phCase(3, "Aviation assignment: client type, the challenge, what we did and the result.")}
        </div>
        <div class="ph-logos" aria-label="Client and partner logos">
          ${[1, 2, 3, 4, 5].map((n) => `<div class="ph-logo" data-placeholder="Client or partner logo ${n}"><span class="ph-tag">Placeholder</span><span>Client or partner logo ${n}</span></div>`).join("\n          ")}
        </div>
      </div>
    </section>
${cta()}`,
});

// ---------- Practice pages ----------
for (const p of practices) {
  const related = articles.find((a) => a.practiceKey === p.key);
  const c = p.competencies;
  layout({
    file: p.file,
    title: p.title,
    active: p.key,
    description: p.metaDescription,
    body: `${pageHero({ trail: [["Home", "index.html"], ["What we do", "index.html#what-we-do"], [p.short]], title: p.title, deck: p.deck })}

    <section class="section" aria-labelledby="ov-h">
      <div class="wrap">
        <div class="two-col">
          <div class="stack">
            <p class="eyebrow" id="ov-h">${p.parent}</p>
            <p class="statement">${p.statement}</p>
            <p class="deck muted">${p.overview}</p>
          </div>
          <div class="stack lg">
            <div class="stack">
              <p class="eyebrow">Who we work with</p>
              <ul class="rule-list">
                ${p.clients.map((x) => `<li>${x}</li>`).join("\n                ")}
              </ul>
            </div>${p.key === "aviation" ? `
            <div class="stack">
              <p class="eyebrow">Standards we work to</p>
              <ul class="standards">${frameworks.map((f) => `<li>${f}</li>`).join("")}</ul>
            </div>` : ""}
          </div>
        </div>
      </div>
    </section>

    <section class="section grey" aria-labelledby="svc-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Services</p>
            <h2 id="svc-h">How we help clients</h2>
          </div>
        </div>
        <div class="svc-grid n${p.services.length}">
          ${p.services.map((s) => `<article class="svc" id="${slug(s.name)}">
            <h3>${s.name}</h3>
            <p>${s.summary}</p>
            <div>
              <p class="label">What it covers</p>
              <ul class="dot-list">
                ${s.covers.map((x) => `<li>${x}</li>`).join("\n                ")}
              </ul>
            </div>
            <div class="svc-meta">${s.frameworks ? `
              <div><p class="label">Frameworks</p><p>${s.frameworks}</p></div>` : ""}
              <div><p class="label">Typical clients</p><p>${s.clients}</p></div>
            </div>
          </article>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="comp-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Why Arda</p>
            <h2 id="comp-h">What we bring to this work</h2>
          </div>
          <a class="link-arrow" href="about.html#competencies"><span>All competencies</span> ${arrow}</a>
        </div>
        <div class="comp-cols">
          <div><h3>Training</h3><ul>${c.training.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          <div><h3>Experience</h3><ul>${c.experience.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          <div><h3>${c.thirdLabel}</h3><ul>${c.third.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        </div>
      </div>
    </section>
${related ? `
    <section class="section tight-top" aria-labelledby="rel-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Insights</p>
            <h2 id="rel-h">From this practice</h2>
          </div>
        </div>
        <a class="card wide-card" href="insights/${related.slug}.html">
          <div class="card-art">${tile(related.art)}</div>
          <div class="card-body">
            <p class="meta"><span class="tag">${related.practice}</span><span class="read">${related.read}</span></p>
            <h3 style="font-size:clamp(1.5rem,1.2rem + 1.2vw,2rem)">${related.title}</h3>
            <p>${related.summary}</p>
            <span class="link-arrow"><span>Read the article</span> ${arrow}</span>
          </div>
        </a>
      </div>
    </section>` : ""}
${caseSection(p.short.toLowerCase())}
${cta("", p.cta)}`,
  });
}

// ---------- About ----------
const devEnt = {
  training: ["Economics", "Financial data management"],
  experience: [
    "Macroeconomic analysis and national development planning inside federal government",
    "Internal strategy consulting",
    "Founding and scaling early-stage ventures",
    "Go-to-market strategy and operations",
  ],
  thirdLabel: "Tools",
  third: tools,
};
const compCard = (title, c) => `<div class="comp-card">
            <h3>${title}</h3>
            <dl>
              <div><dt>Training</dt><dd><ul class="dot-list">${c.training.map((x) => `<li>${x}</li>`).join("")}</ul></dd></div>
              <div><dt>Experience</dt><dd><ul class="dot-list">${c.experience.map((x) => `<li>${x}</li>`).join("")}</ul></dd></div>
              <div><dt>${c.thirdLabel}</dt><dd>${c.third.join(", ")}</dd></div>
            </dl>
          </div>`;

layout({
  file: "about.html",
  title: "About",
  active: "about",
  description:
    "Arda Limited (RC 1742713) is an Abuja-based advisory firm with a development and enterprise practice and an aviation practice.",
  body: `${pageHero({
    trail: [["Home", "index.html"], ["About"]],
    title: "About Arda",
    deck: "An Abuja-based advisory firm serving governments, development institutions, businesses and the aviation industry.",
  })}

    <section class="section" aria-labelledby="firm-h">
      <div class="wrap">
        <div class="two-col">
          <div class="stack">
            <p class="eyebrow" id="firm-h">The firm</p>
            <p class="statement">Arda Limited advises on strategy, delivery, safety and compliance through two practices: development and enterprise advisory, and aviation advisory.</p>
          </div>
          <div class="stack">
            <p>The development and enterprise practice joins public sector economics and national planning experience to commercial strategy for early-stage companies in fintech, agri-tech and deep-tech. For governments and development institutions it covers policy research, programme design, delivery, and monitoring and evaluation. For businesses it covers go-to-market strategy, financial modelling, investment readiness and impact reporting.</p>
            <p>The aviation practice joins aeronautical engineering training to regulatory inspection experience and hands-on leadership of safety, quality and compliance functions. It supports operators, airports, air navigation service providers and regulators with safety and quality management systems, certification, audits, regulatory development and operational efficiency.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section dark" aria-labelledby="glance-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">At a glance</p>
            <h2 id="glance-h">Arda in brief</h2>
          </div>
        </div>
        <div class="glance">
          <div><span class="fig">2</span><p class="cap">Practices</p><p class="sub">Development and enterprise advisory, and aviation advisory</p></div>
          <div><span class="fig">${serviceCount}</span><p class="cap">Services</p><p class="sub">Across public sector, enterprise and aviation work</p></div>
          <div><span class="fig">${frameworks.length}</span><p class="cap">Aviation frameworks</p><p class="sub">${frameworks.join(", ")}</p></div>
          <div><span class="fig">1</span><p class="cap">Office</p><p class="sub">Abuja, Nigeria. Registered as Arda Limited, RC 1742713</p></div>
        </div>
      </div>
    </section>

    <section class="section grey" id="competencies" aria-labelledby="competencies-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">Competencies</p>
            <h2 id="competencies-h">What each practice brings</h2>
            <p class="intro">The training, experience and tools behind our advice.</p>
          </div>
        </div>
        <div class="comp-pair">
          ${compCard("Development and enterprise", devEnt)}
          ${compCard("Aviation", byKey.aviation.competencies)}
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="how-h">
      <div class="wrap">
        <div class="two-col even">
          <div class="stack">
            <p class="eyebrow">How we work</p>
            <h2 id="how-h">Four commitments on every assignment</h2>
          </div>
          <div class="principles" style="grid-template-columns:minmax(0,1fr)">
            ${principles.map((x) => `<div class="principle"><h3>${x.title}</h3><p>${x.body}</p></div>`).join("\n            ")}
          </div>
        </div>
      </div>
    </section>

    <section class="section grey" aria-labelledby="ex-h">
      <div class="wrap">
        <div class="sec-head">
          <div>
            <p class="eyebrow">What we do</p>
            <h2 id="ex-h">Explore our work by area</h2>
          </div>
        </div>
        <div class="grid-3">
          ${practices.map((p) => `<a class="card" href="${p.file}">
            <div class="card-art">${tile(p.art)}</div>
            <div class="card-body">
              <h3>${p.title}</h3>
              <p>${p.cardText}</p>
              <span class="link-arrow card-foot"><span>Explore our services</span> ${arrow}</span>
            </div>
          </a>`).join("\n          ")}
        </div>
      </div>
    </section>
${cta()}`,
});

// ---------- Insights ----------
layout({
  file: "insights.html",
  title: "Insights",
  active: "insights",
  description: "Short, practical articles from Arda's development, enterprise and aviation work.",
  body: `${pageHero({
    trail: [["Home", "index.html"], ["Insights"]],
    title: "Insights",
    deck: "Short, practical articles from our development, enterprise and aviation work.",
  })}

    <section class="section" aria-label="Articles">
      <div class="wrap">
        <div class="grid-3">${articles.map((a) => insightCard(a)).join("")}
        </div>
      </div>
    </section>
${cta()}`,
});

for (const a of articles) {
  const others = articles.filter((x) => x.slug !== a.slug);
  const p = byKey[a.practiceKey];
  layout({
    file: `insights/${a.slug}.html`,
    root: "../",
    title: a.title,
    active: "insights",
    description: a.summary,
    body: `
    <section class="page-hero light">
      <div class="wrap">
        <div class="page-hero-copy">
          ${crumbs([["Home", "../index.html"], ["Insights", "../insights.html"], [a.practice]])}
          <p class="meta"><span class="tag">${a.practice}</span><span class="read">${a.read}</span></p>
          <h1>${a.title}</h1>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Article">
      <div class="wrap">
        <div class="article">
          <div class="prose">${a.body}
          </div>
          <aside class="aside" aria-label="Related">
            <div class="block">
              <p class="eyebrow">Related practice</p>
              <a class="link-arrow" href="../${p.file}"><span>${p.short}</span> ${arrow}</a>
            </div>
            <div class="block">
              <p class="eyebrow">More insights</p>
              <ul>
                ${others.map((o) => `<li><a href="${o.slug}.html">${o.title}</a></li>`).join("\n                ")}
              </ul>
            </div>
            <p class="note">This article is general guidance. It does not replace advice on a specific assignment.</p>
          </aside>
        </div>
      </div>
    </section>
${cta("../", `Talk to us about ${p.short === "Aviation" ? "aviation" : p.short.toLowerCase()} work.`)}`,
  });
}

// ---------- Contact ----------
layout({
  file: "contact.html",
  title: "Contact",
  active: "contact",
  description: "Contact Arda Limited in Abuja, Nigeria. Send an enquiry about development and public sector, enterprise or aviation advisory.",
  body: `${pageHero({
    trail: [["Home", "index.html"], ["Contact"]],
    title: "Contact us",
    deck: "Tell us about your assignment or question. A few lines are enough to start.",
  })}

    <section class="section" aria-label="Contact details and enquiry form">
      <div class="wrap">
        <div class="contact">
          <div class="details">
            <h2>Abuja office</h2>
            <div class="item">
              <h3>Address</h3>
              <p>${phInline("street address")}<br>Abuja, Federal Capital Territory<br>Nigeria</p>
            </div>
            <div class="item">
              <h3>Email</h3>
              <p>${phInline("email address")}</p>
            </div>
            <div class="item">
              <h3>Phone</h3>
              <p>${phInline("phone number")}</p>
            </div>
            <div class="item">
              <h3>Office hours</h3>
              <p>${phInline("office hours")}</p>
            </div>
            <div class="item">
              <h3>Registration</h3>
              <p>Arda Limited, RC 1742713</p>
            </div>
          </div>

          <!-- PLACEHOLDER: set data-endpoint to the form handler URL. Until it is set, the form shows a notice and sends nothing. -->
          <form class="enquiry" id="enquiry-form" data-endpoint="">
            <h2>Send an enquiry</h2>
            <div class="field-row">
              <div class="field">
                <label for="enq-name">Your name</label>
                <input id="enq-name" name="name" type="text" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="enq-org">Organisation</label>
                <input id="enq-org" name="organisation" type="text" autocomplete="organization" required>
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="enq-email">Email</label>
                <input id="enq-email" name="email" type="email" autocomplete="email" required>
              </div>
              <div class="field">
                <label for="enq-phone">Phone <span class="opt">(optional)</span></label>
                <input id="enq-phone" name="phone" type="tel" autocomplete="tel">
              </div>
            </div>
            <div class="field">
              <label for="enq-area">Area of interest</label>
              <select id="enq-area" name="area" required>
                <option value="">Choose one</option>
                ${practices.map((p) => `<option>${p.short}</option>`).join("\n                ")}
                <option>General enquiry</option>
              </select>
            </div>
            <div class="field">
              <label for="enq-message">How can we help?</label>
              <textarea id="enq-message" name="message" required></textarea>
            </div>
            <div class="actions">
              <button class="btn" type="submit">Send enquiry ${arrow}</button>
            </div>
            <p class="form-status" id="enquiry-status" role="status" tabindex="-1" hidden></p>
            <p class="form-note"><span class="ph-inline" data-placeholder="form endpoint">[Placeholder: this form is not yet connected to an inbox]</span></p>
          </form>
        </div>
      </div>
    </section>`,
});
