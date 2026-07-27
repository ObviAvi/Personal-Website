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
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.js      fonts, metadata, favicon
    page.js        all page content and section markup
    globals.css    theme variables, keyframes, base styles
  components/ui/
    sidebar-terminal.jsx   the avi.sh shell
    background-paths.jsx   unused, kept from a previous design
public/            images, logos, Lottie JSON, resume PDF
```

## Editing content

Page content lives in arrays at the top of `src/app/page.js`:

- `timelineEvents` for experience entries, including logo paths and bullet lists
- `projects` for project cards, including cover image, live link, repo link, and tags
- `skills`, `coursework`, `highSchoolAccomplishments`
- `navItems` for the mobile menu links and `socialLinks` for the social entries

Extracurriculars are written inline in the markup because each entry carries its own links.

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
