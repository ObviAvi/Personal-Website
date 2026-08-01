import {
  createStyles,
  rule,
  wrapText,
  indentWrap,
  bullet,
  columns,
} from '@/lib/ansi';

import { flatten, streamOps, line, lines, type, spinner } from '@/lib/stream';

import {
  profile,
  contacts,
  education,
  timelineEvents,
  projects,
  skills,
  extracurriculars,
} from '@/content/resume';

import { banner, projectArt } from '@/content/ansi-art';

export const dynamic = 'force-dynamic';

const SECTIONS = [
  'whoami',
  'education',
  'experience',
  'projects',
  'skills',
  'extracurriculars',
  'contact',
  'socials',
  'resume',
  'all',
  'help',
];

// Applied only in plain mode, where the terminal may not handle UTF-8.
const ASCII_FALLBACKS = [
  [/[·•]/g, '-'],
  [/[–—]/g, '-'],
  [/●/g, '*'],
  [/▸/g, '>'],
  [/↗/g, '->'],
  [/[’‘]/g, "'"],
  [/[“”]/g, '"'],
  [/…/g, '...'],
  [/✓/g, 'ok'],
];

function toAscii(text) {
  return ASCII_FALLBACKS.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text);
}

/** Picks the color or ascii variant of a piece of art and indents it. */
function art(source, ctx, indent = 2) {
  if (!source) return [];
  const rows = ctx.ascii ? source.ascii : source.color;
  if (!rows?.length) return [];
  const pad = ' '.repeat(indent);
  return rows.map((row) => pad + row);
}

/* ------------------------------------------------------------------ */
/* section renderers — each returns a list of stream ops                */
/* ------------------------------------------------------------------ */

function heading(ctx, label) {
  return ['', ctx.styles.heading('  // ' + label.toUpperCase()), ''];
}

/** Animated masthead: the mark unfolds, then the name types itself out. */
function header(ctx) {
  const { styles, width } = ctx;

  return [
    spinner({
      ms: 320,
      render: (frame) => '  ' + styles.accent(frame) + ' ' + styles.dim('unfolding avi.sh'),
      done: '',
    }),
    ...lines(art(banner, ctx)),
    line(''),
    type(profile.name.toLowerCase(), {
      prefix: '  ',
      style: (text) => styles.bold(styles.accent(text)),
      speed: 40,
    }),
    type(profile.tagline, { prefix: '  ', style: styles.dim, speed: 12 }),
    type(profile.roles.map((role) => role.toLowerCase()).join(' · '), {
      prefix: '  ',
      style: styles.dim,
      speed: 8,
    }),
    line(''),
    line(rule(width, styles, ctx)),
  ];
}

function home(ctx) {
  const { styles, width, host } = ctx;
  const body = [''];

  body.push('  ' + styles.dim('$') + ' curl ' + host + '/' + styles.accent('<section>'));
  body.push(
    ...indentWrap(
      styles.dim('(Note: On Windows PowerShell, use curl.exe)'),
      width,
      2,
    ),
  );
  body.push('');
  body.push(...columns(SECTIONS, width, 4));
  body.push('');
  body.push('  ' + styles.dim('full site  ') + profile.site);
  body.push('  ' + styles.dim('resume     ') + profile.site + profile.resumePath);
  body.push('');
  body.push('  ' + styles.dim("options: '?w=100' width · '?plain' no color · '?nostream' no animation"));
  body.push('');

  return [...header(ctx), ...lines(body)];
}

function whoami(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'whoami');

  body.push('  ' + styles.bold(profile.name));
  body.push('  ' + styles.dim(profile.tagline));
  body.push('');
  body.push(...indentWrap(profile.roles.join(' · '), width, 2));
  body.push('');

  return lines(body);
}

function educationSection(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'education');

  education.forEach((school, index) => {
    if (index > 0) body.push('');
    body.push('  ' + styles.bold(school.school));
    body.push('  ' + styles.dim(school.degree + ' · ' + school.dates));
    body.push('');
    body.push('  ' + styles.accent(school.listLabel + ':'));

    if (school.style === 'chips') {
      body.push(...columns(school.items, width, 4));
    } else {
      school.items.forEach((item) => body.push(...bullet(item, width, 4)));
    }
  });

  body.push('');
  return lines(body);
}

function experienceSection(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'experience');

  timelineEvents.forEach((event, index) => {
    if (index > 0) body.push('');

    body.push('  ' + styles.accent('●') + ' ' + styles.bold(event.title));
    if (event.date) body.push('    ' + styles.dim(event.date));
    if (event.url) body.push('    ' + styles.accent(event.url));

    body.push('');
    body.push(...indentWrap(event.description, width, 4));

    if (event.details?.length) {
      body.push('');
      event.details.forEach((detail) => body.push(...bullet(detail, width, 4)));
    }
  });

  body.push('');
  return lines(body);
}

function projectsSection(ctx) {
  const { styles, width } = ctx;
  const ops = lines(heading(ctx, 'projects'));

  projects.forEach((project, index) => {
    if (index > 0) ops.push(line(''));

    // Screenshots reduced to a luminance ramp are unreadable noise, and plain
    // mode exists for piping, so cover art is color-only.
    if (!ctx.ascii) {
      ops.push(...lines(art(projectArt[project.title], ctx, 4)));
      ops.push(line(''));
    }

    const body = [];
    body.push('  ' + styles.accent('▸') + ' ' + styles.bold(project.title));
    body.push('    ' + styles.accent(project.href));
    if (project.repoUrl) body.push('    ' + styles.dim('repo  ') + project.repoUrl);

    body.push('');
    body.push(...indentWrap(project.description, width, 4));
    body.push('');
    wrapText(project.tags.join(' · '), Math.max(20, width - 4)).forEach((text) =>
      body.push('    ' + styles.dim(text)),
    );

    ops.push(...lines(body));
  });

  ops.push(line(''));
  return ops;
}

function skillsSection(ctx) {
  const body = heading(ctx, 'skills');
  body.push(...columns(skills, ctx.width, 2));
  body.push('');
  return lines(body);
}

function extracurricularsSection(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'extracurriculars');

  extracurriculars.forEach((group, index) => {
    if (index > 0) body.push('');
    body.push('  ' + styles.bold(group.title));

    group.entries.forEach((entry) => {
      if (entry.role) {
        body.push('');
        body.push('    ' + styles.accent(entry.role) + (entry.date ? ' ' + styles.dim('· ' + entry.date) : ''));
      }

      if (entry.description) {
        body.push(...indentWrap(entry.description, width, 4));
      }

      entry.items?.forEach((item) => {
        body.push(...bullet(item.text, width, 4));
        if (item.url) body.push('      ' + styles.dim(item.url));
      });
    });
  });

  body.push('');
  return lines(body);
}

function socialLines(ctx) {
  const { styles } = ctx;
  const pad = Math.max(...contacts.map((contact) => contact.name.length)) + 2;
  return contacts.map((contact) => '  ' + styles.accent(contact.name.padEnd(pad, ' ')) + contact.value);
}

function socialsSection(ctx) {
  return lines([...heading(ctx, 'socials'), ...socialLines(ctx), '']);
}

function resumeSection(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'resume');

  body.push('  ' + profile.site + profile.resumePath);
  body.push('');
  body.push(...indentWrap(styles.dim('grab it with: curl -O ' + profile.site + profile.resumePath), width, 2));
  body.push('');

  return lines(body);
}

function contactSection(ctx) {
  const { styles, width } = ctx;
  const body = heading(ctx, 'contact');

  body.push(...indentWrap(profile.blurb, width, 2));
  body.push('');
  body.push(...socialLines(ctx));
  body.push('');
  body.push('  ' + styles.dim('or just reply to this curl. (you cannot. use the email.)'));
  body.push('');

  return lines(body);
}

function helpSection(ctx) {
  const { styles, width, host } = ctx;
  const body = heading(ctx, 'help');

  body.push('  ' + styles.dim('usage:') + ' curl ' + host + '/' + styles.accent('<section>'));
  body.push(
    ...indentWrap(
      styles.dim('(Note: On Windows PowerShell, use curl.exe)'),
      width,
      2,
    ),
  );
  body.push('');
  body.push(...columns(SECTIONS, width, 4));
  body.push('');
  body.push('  ' + styles.accent('?w=<n>') + '     set output width (40-160, default 80)');
  body.push('  ' + styles.accent('?plain') + '     no color, ascii art, no animation');
  body.push('  ' + styles.accent('?nostream') + '  skip the animation, keep the color');
  body.push('');
  body.push('  ' + styles.dim('example: curl "' + host + '/all?w=100"'));
  body.push('');

  return lines(body);
}

function allSection(ctx) {
  return [
    ...header(ctx),
    ...whoami(ctx),
    ...educationSection(ctx),
    ...experienceSection(ctx),
    ...projectsSection(ctx),
    ...skillsSection(ctx),
    ...extracurricularsSection(ctx),
    ...contactSection(ctx),
  ];
}

const RENDERERS = {
  home,
  whoami,
  education: educationSection,
  experience: experienceSection,
  projects: projectsSection,
  skills: skillsSection,
  extracurriculars: extracurricularsSection,
  contact: contactSection,
  socials: socialsSection,
  resume: resumeSection,
  help: helpSection,
  all: allSection,
};

const ALIASES = {
  '': 'home',
  index: 'home',
  edu: 'education',
  exp: 'experience',
  proj: 'projects',
  links: 'socials',
  cv: 'resume',
  about: 'whoami',
  ls: 'help',
};

/* ------------------------------------------------------------------ */
/* handler                                                              */
/* ------------------------------------------------------------------ */

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  // The proxy passes the original path as a header; the query param and the
  // path itself are fallbacks for direct hits on /api/tui.
  const raw =
    request.headers.get('x-tui-section') ||
    params.get('section') ||
    (url.pathname === '/api/tui' ? 'home' : url.pathname);

  const requested = raw.toLowerCase().replace(/^\/+|\/+$/g, '');
  const section = ALIASES[requested] ?? requested;

  const plain = params.has('plain') || params.has('nocolor');
  const widthParam = Number.parseInt(params.get('w') || '', 10);
  const width = Number.isFinite(widthParam) ? Math.min(160, Math.max(40, widthParam)) : 80;

  // Plain output is for piping and redirecting, so it never animates.
  const streaming = !plain && !params.has('nostream');

  const ctx = {
    styles: createStyles(!plain),
    width,
    ascii: plain,
    host: 'https://' + (request.headers.get('host') || 'aviaggarwal.org'),
  };

  const render = RENDERERS[section];
  let ops;
  let status = 200;

  if (render) {
    ops = render(ctx);
  } else {
    status = 404;
    ops = [
      line(''),
      line('  ' + ctx.styles.accent('no such section: ') + requested),
      ...helpSection(ctx),
    ];
  }

  if (!streaming) {
    let body = flatten(ops);
    if (plain) body = toAscii(body);

    return new Response(body, {
      status,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'x-robots-tag': 'noindex',
      },
    });
  }

  return new Response(streamOps(ops), {
    status,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      // Tells proxies not to buffer, which would defeat the animation.
      'x-accel-buffering': 'no',
      'x-robots-tag': 'noindex',
    },
  });
}
