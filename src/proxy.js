import { NextResponse } from 'next/server';

/**
 * Content negotiation by User-Agent (Next.js proxy, formerly middleware).
 *
 * Terminal clients (curl, wget, httpie, ...) are rewritten to /api/tui, which
 * renders the site as ANSI text. Every other client — every browser — falls
 * through untouched and gets the normal Next.js page.
 *
 * The rewrite is internal, so `curl aviaggarwal.org` works without -L.
 */

// Anchored so a browser UA can never match: "curl/8.4.0", "Wget/1.21", etc.
const TERMINAL_UA = /^(curl|wget|httpie|lwp-request|libwww-perl|python-requests|python-urllib|go-http-client|fetch)\b/i;

// PowerShell's Invoke-WebRequest sends a Mozilla-prefixed UA, so it needs a
// substring check rather than an anchored one.
const POWERSHELL_UA = /\bwindowspowershell\b/i;

// Paths the TUI answers on. The value is where a *browser* should go instead,
// since these are not real pages.
const BROWSER_DESTINATIONS = {
  education: '/#education',
  edu: '/#education',
  experience: '/#experience',
  exp: '/#experience',
  projects: '/#projects',
  proj: '/#projects',
  skills: '/#skills',
  extracurriculars: '/#extracurriculars',
  contact: '/#contact',
  socials: '/#contact',
  links: '/#contact',
  resume: '/Avi_Aggarwal_Resume.pdf',
  cv: '/Avi_Aggarwal_Resume.pdf',
  whoami: '/',
  about: '/',
  all: '/',
  help: '/',
  ls: '/',
};

function isTerminalClient(userAgent) {
  return TERMINAL_UA.test(userAgent) || POWERSHELL_UA.test(userAgent);
}

// Exported so the TUI can tell PowerShell's `curl` alias (Invoke-WebRequest)
// apart from a real curl/bash client and recommend `curl.exe` accordingly.
export function isPowerShellUA(userAgent) {
  return POWERSHELL_UA.test(userAgent);
}

export function proxy(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const section = request.nextUrl.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (isTerminalClient(userAgent)) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/tui';

    // Rewrites do not reliably carry proxy-added search params through to the
    // route handler, so the section travels as a request header instead.
    const headers = new Headers(request.headers);
    headers.set('x-tui-section', section || 'home');

    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Browser on a TUI-only path: send it somewhere useful instead of a 404.
  const destination = BROWSER_DESTINATIONS[section];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // Anything else, including genuinely unknown paths, behaves as it always has.
  return NextResponse.next();
}

export const config = {
  // Every path except Next internals, the API itself, and files with an
  // extension — so `curl <site>/anything` still gets a helpful text response.
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
};
