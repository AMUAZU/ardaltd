# Arda Limited website

Static site for Arda Limited (RC 1742713), Abuja. No server-side code.

Live preview: https://amuazu.github.io/ardaltd/

The `gh-pages` branch holds a copy of `site/` and is what GitHub Pages serves.
After rebuilding, republish by copying `site/` to that branch.

## Layout

- `site/` is the finished website. Upload its contents to any static host.
- `src/content.mjs` holds all copy. `build.mjs` turns it into the pages.
- `src/logo.json` holds the logo lockup as vector outlines.
- `brand-source/` holds the logo files as supplied.

## Preview and rebuild

```bash
cd site && python3 -m http.server 8000
```

```bash
node build.mjs
```

Edit copy in `src/content.mjs` or page structure in `build.mjs`, then rebuild.
Do not edit the HTML in `site/` by hand; the next build overwrites it.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Development and public sector | `development-public-sector.html` |
| Enterprise advisory | `enterprise-advisory.html` |
| Aviation | `aviation.html` |
| Insights (index and three articles) | `insights.html`, `insights/*.html` |
| About | `about.html` |
| Contact | `contact.html` |

Navigation: What we do (menu of the three areas and their services), Insights,
About, Contact us. Government and institutional contracting is not on the site.

## Logo

One lockup is used everywhere: the mark beside the ARDA wordmark, with the
wordmark's cap height equal to the mark's height on a shared baseline. The
lettering is outlined from the supplied Brandink Sans Regular, so the site
loads no brand font file. Headlines use Source Serif 4 and text uses Hanken
Grotesk, both open-licensed and self-hosted in `site/assets/fonts/`.

## Placeholders to fill

Every placeholder is visibly marked on the page and carries a
`data-placeholder` attribute, so `grep -r data-placeholder site/` lists them all.

| Placeholder | Where |
|---|---|
| Street address, email, phone | Footer of every page, Contact |
| Office hours | Contact |
| Enquiry form endpoint (`data-endpoint` on the form) | Contact |
| Case studies | Home (3), each practice page (2) |
| Client and partner logos | Home (5) |

Until the form endpoint is set, the enquiry form sends nothing and tells the
visitor so.

## Content rules followed

- Facts about the firm come only from the website brief.
- No individual, founder, director or employer is named.
- No projects, clients or statistics are claimed. The "Arda in brief" figures
  on About are counts of practices, services, frameworks and offices taken
  from the brief.
- Abuja is the only location shown.

## To confirm before launch

- **Wordmark weight.** The logo files specify Brandink Sans Light. Only the
  Regular weight was supplied, so the wordmark is outlined from Regular.
- **Approach copy.** "Four commitments on every assignment" on About describes
  working methods the brief asks for but does not spell out. Check they match
  practice.
- **Insights articles.** The three articles are general guidance written for
  the build. Have each practice review its article.
