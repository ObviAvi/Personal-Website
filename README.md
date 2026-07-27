# Avi Aggarwal's Personal Website

Live at [aviaggarwal.org](https://www.aviaggarwal.org/).

A single-page portfolio built with Next.js. The layout follows a terminal theme: a fixed
sidebar on the left holding an interactive shell, and the resume content itself as a
continuous scroll of monospaced sections on the right.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS v4, with colors driven by CSS custom properties in `globals.css`
- `lottie-react` for the bird animations, `react-icons` for social icons
- `react-intersection-observer` for the scroll-reveal transitions
- Deployed on Vercel

## Layout

The desktop sidebar contains the `avi@aggarwal` header, a light/dark toggle, the `avi.sh`
terminal, social links, and a resume download. Below the `lg` breakpoint the sidebar is
replaced by a sticky top bar with a hamburger menu that carries the section links, social
links, and resume button.

The main column runs: hero, education, experience, projects, skills, extracurriculars,
contact. Experience is a vertical timeline, projects are cards whose descriptions expand
and collapse, and skills and coursework render as chips.

Theme preference is stored in `localStorage` under `theme` and applied as a `data-theme`
attribute on `<html>`. It falls back to the system `prefers-color-scheme` on first visit.

## avi.sh

The sidebar terminal accepts a fixed set of commands:

| Command | Description |
| --- | --- |
| `help` | List the available commands |
| `whoami` | Short bio |
| `ls` | List the sections that can be jumped to |
| `cd <section>` | Scroll to a section (`home`, `education`, `experience`, `projects`, `skills`, `extracurriculars`, `contact`) |
| `open <site>` | Open `github`, `linkedin`, `email`, `leetcode`, or `instagram` in a new tab |
| `socials` | Print every handle |
| `resume` | Download `resume.pdf` |
| `theme` | Switch between dark and light |
| `echo <text>` | Print the argument back |
| `date` | Print the current date |
| `clear` | Clear the screen |

Arrow up and down walk through command history. Tab completes command names, and completes
section or link names once a `cd` or `open` has been typed.

## curl aviaggarwal.org

The site content-negotiates on `User-Agent`. Browsers get the normal page; terminal clients
get the same content rendered as ANSI text.

```bash
curl aviaggarwal.org                  # mark, name, section index, links
curl aviaggarwal.org/projects         # one section, with cover art
curl aviaggarwal.org/all              # the whole resume
curl "aviaggarwal.org/all?w=100"      # wider output
curl "aviaggarwal.org/skills?plain"   # no color, no art, ascii only
curl "aviaggarwal.org/all?nostream"   # keep the color, skip the animation
```

On Windows PowerShell, `curl` is an alias for `Invoke-WebRequest`, which returns an object
instead of printing the body — use `curl.exe`.

Sections: `whoami`, `education`, `experience`, `projects`, `skills`, `extracurriculars`,
`contact`, `socials`, `resume`, `all`, `help`. Short aliases (`edu`, `exp`, `proj`, `cv`,
`links`, `ls`) work too. Unknown sections return the help text with a 404.

### Animation

Responses stream. The mark unfolds behind a spinner, the name types itself out, and the body
paints in. `src/lib/stream.js` turns a list of ops (`line`, `type`, `spinner`, `pause`) into
either a `ReadableStream` with delays or, for `?plain` and `?nostream`, one flat string.

Typed lines redraw with `\r` and reapply their style to the partial text each frame, so ANSI
escapes are never typed out one byte at a time. Line output is emitted in batches sized to
land the whole body inside a fixed time budget — Node's timer resolution is ~15 ms on
Windows, so a sleep per line would stretch `/all` to ten seconds.

### Terminal art

Images render with the half-block technique: each cell is `▀`, whose foreground paints the
top pixel and background the bottom, giving two square pixels per cell. `npm run art` runs
`scripts/generate-ansi-art.mjs`, which uses sharp to precompute every image into
`src/content/ansi-art.js` (committed, so neither the build nor a request needs sharp).
Re-run it after changing any source image.

The banner is `public/A-Icon.png` recolored to the accent, with brightness as opacity so it
sits on the terminal's own background. Project covers are composited onto the dark theme's
panel color at full resolution before downscaling — a huge, mostly transparent PNG otherwise
averages its alpha away to nothing. Colors are quantized to multiples of 8 and emitted only
when they change, which keeps the generated file around 65 KB. Cover art is color-only:
a screenshot reduced to a luminance ramp is unreadable, and plain mode is for piping.

`src/proxy.js` does the User-Agent check and rewrites terminal requests to `/api/tui`. The
rewrite is internal, so `curl` works without `-L`, and the section travels to the handler in
an `x-tui-section` header. Browsers that land on a TUI-only path are redirected to the
matching anchor on the page (`/projects` → `/#projects`), so nothing 404s that did not
before.

Output is built in `src/app/api/tui/route.js` from the same `src/content/resume.js` the page
uses, with layout helpers (wrap, columns, box, ANSI styling) in `src/lib/ansi.js`. Accent
color is the dark theme's `--accent` as truecolor, so it matches the site.

## Running locally

```bash
git clone https://github.com/ObviAvi/Personal-Website.git
cd Personal-Website
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run art     # regenerate terminal art from public/ images
```

## Project structure

```
src/
  app/
    layout.js      fonts, metadata, favicon
    page.js        section markup, renders from src/content/resume.js
    globals.css    theme variables, keyframes, base styles
    api/tui/
      route.js     ANSI renderer for curl clients
  components/ui/
    sidebar-terminal.jsx   the avi.sh shell
    background-paths.jsx   unused, kept from a previous design
  content/
    resume.js      all resume data, shared by the page and the curl output
    ansi-art.js    generated terminal art — do not edit by hand
  lib/
    ansi.js        wrap / columns / box / ANSI style helpers
    stream.js      ops -> delayed ReadableStream, or one flat string
  proxy.js         User-Agent content negotiation
scripts/
  generate-ansi-art.mjs   images -> half-block ANSI (npm run art)
public/            images, logos, Lottie JSON, resume PDF
```

## Editing content

Page content lives in `src/content/resume.js`, which both the web page and the curl output
read from:

- `timelineEvents` for experience entries, including logo paths and bullet lists
- `projects` for project cards, including cover image, live link, repo link, and tags
- `skills`, `education` (with `coursework` and `highSchoolAccomplishments` derived from it)
- `profile` for the name, tagline, roles, and contact blurb
- `links` for social URLs and `contacts` for the plain handles the terminal prints
- `extracurriculars` for the terminal output

`navItems` and `socialLinks` stay in `src/app/page.js` because they carry React icon
components; their URLs come from `links`. Extracurriculars are still written inline in the
page markup because each entry carries its own links, so that copy lives in two places —
edit both if it changes.

Terminal commands and their output are defined in `src/components/ui/sidebar-terminal.jsx`.
Colors for both themes are the `:root` and `:root[data-theme='dark']` blocks in
`src/app/globals.css`. The resume is `public/Avi_Aggarwal_Resume.pdf`, and the page title
and favicon are set in `src/app/layout.js`.

## Contact

- GitHub: [ObviAvi](https://github.com/ObviAvi)
- LinkedIn: [avi-aggarwal](https://www.linkedin.com/in/avi-aggarwal-75275828b/)
- Email: aggarwal.avi@gmail.com
- LeetCode: [Avi_A](https://leetcode.com/u/Avi_A/)
- Instagram: [aviaggarwall](https://www.instagram.com/aviaggarwall/)
