'use client';

import React, { useEffect, useRef, useState } from 'react';

const SECTIONS = {
  home: '__top__',
  top: '__top__',
  education: 'education',
  edu: 'education',
  experience: 'experience',
  exp: 'experience',
  projects: 'projects',
  proj: 'projects',
  skills: 'skills',
  extracurriculars: 'extracurriculars',
  contact: 'contact',
};

const SECTION_NAMES = ['home', 'education', 'experience', 'projects', 'skills', 'extracurriculars', 'contact'];

const LINKS = {
  github: 'https://github.com/ObviAvi?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/avi-aggarwal-75275828b/',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com',
  leetcode: 'https://leetcode.com/u/Avi_A/',
  instagram: 'https://www.instagram.com/aviaggarwall/',
};

const COMMANDS = [
  'help',
  'whoami',
  'ls',
  'cd',
  'open',
  'resume',
  'socials',
  'theme',
  'echo',
  'date',
  'clear',
  'sudo',
];

const HELP_LINES = [
  { text: 'available commands:', tone: 'accent' },
  { text: 'help         this list' },
  { text: 'whoami       who is this guy' },
  { text: 'ls           list sections' },
  { text: 'cd <sec>     jump to a section' },
  { text: 'open <site>  open a link' },
  { text: 'socials      list every link' },
  { text: 'resume       get resume.pdf' },
  { text: 'theme        flip dark / light' },
  { text: 'echo <text>  say it back' },
  { text: 'date         today' },
  { text: 'clear        wipe the screen' },
  { text: '↑ ↓ history · tab completes', tone: 'dim' },
];

const WHOAMI_LINES = [
  { text: 'avi aggarwal', tone: 'accent' },
  { text: 'purdue cs · 2024 – present' },
  { text: 'student, software developer,' },
  { text: 'researcher' },
  { text: "run 'ls' to see where to go", tone: 'dim' },
];

const WELCOME_LINES = [
  { text: 'avi.sh — interactive shell', tone: 'accent' },
  { text: "type 'help' to get started", tone: 'dim' },
];

export function SidebarTerminal({ scrollToSection, scrollToTop, toggleTheme, isDarkMode }) {
  const [lines, setLines] = useState(WELCOME_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const print = (newLines) => setLines((current) => [...current, ...newLines]);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Avi_Aggarwal_Resume.pdf';
    link.download = 'Avi_Aggarwal_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const run = (raw) => {
    const trimmed = raw.trim();
    const [command, ...args] = trimmed.split(/\s+/);
    const arg = (args[0] || '').toLowerCase();

    switch (command.toLowerCase()) {
      case 'help':
        return HELP_LINES;

      case 'whoami':
        return WHOAMI_LINES;

      case 'ls':
        return [
          { text: 'home        education' },
          { text: 'experience  projects' },
          { text: 'skills      extracurriculars' },
          { text: 'contact' },
          { text: 'cd <name> to jump', tone: 'dim' },
        ];

      case 'cd':
      case 'goto': {
        if (!arg) return [{ text: 'usage: cd <section>', tone: 'error' }];
        const target = SECTIONS[arg];
        if (!target) return [{ text: `no such section: ${arg}`, tone: 'error' }];
        if (target === '__top__') {
          scrollToTop();
          return [{ text: '→ home' }];
        }
        const moved = scrollToSection(target);
        return moved ? [{ text: `→ ${target}` }] : [{ text: `could not reach ${target}`, tone: 'error' }];
      }

      case 'open': {
        if (!arg) return [{ text: 'usage: open <site>', tone: 'error' }];
        if (arg === 'resume') {
          downloadResume();
          return [{ text: '↓ resume.pdf' }];
        }
        const url = LINKS[arg];
        if (!url) return [{ text: `unknown link: ${arg}`, tone: 'error' }];
        window.open(url, '_blank', 'noopener,noreferrer');
        return [{ text: `opening ${arg}…` }];
      }

      case 'socials':
        return [
          { text: 'github     ObviAvi' },
          { text: 'linkedin   avi-aggarwal' },
          { text: 'leetcode   Avi_A' },
          { text: 'instagram  aviaggarwall' },
          { text: 'email      aggarwal.avi' },
          { text: '           @gmail.com' },
          { text: 'open <name> to launch', tone: 'dim' },
        ];

      case 'resume':
        downloadResume();
        return [{ text: '↓ downloading resume.pdf' }];

      case 'theme':
        toggleTheme();
        return [{ text: `theme → ${isDarkMode ? 'light' : 'dark'}` }];

      case 'echo':
        return [{ text: args.join(' ') || ' ' }];

      case 'date':
        return [{ text: new Date().toString().slice(0, 21) }];

      case 'sudo':
        return [{ text: 'nice try. permission denied.', tone: 'error' }];

      case 'clear':
        return null;

      default:
        return [{ text: `command not found: ${command}`, tone: 'error' }, { text: "try 'help'", tone: 'dim' }];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const raw = input;
    setInput('');
    setHistoryIndex(-1);

    if (!raw.trim()) {
      print([{ text: '', tone: 'prompt' }]);
      return;
    }

    setHistory((current) => [raw, ...current].slice(0, 30));
    const output = run(raw);

    if (output === null) {
      setLines([]);
      return;
    }

    print([{ text: raw, tone: 'prompt' }, ...output]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next < 0 ? '' : history[next]);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const parts = input.split(/\s+/);
      const pool =
        parts.length > 1 && ['cd', 'goto'].includes(parts[0].toLowerCase())
          ? SECTION_NAMES
          : parts.length > 1 && parts[0].toLowerCase() === 'open'
            ? [...Object.keys(LINKS), 'resume']
            : COMMANDS;
      const fragment = (parts[parts.length - 1] || '').toLowerCase();
      const match = pool.find((candidate) => candidate.startsWith(fragment));
      if (!match) return;
      parts[parts.length - 1] = match;
      setInput(parts.join(' '));
    }
  };

  const toneClass = (tone) => {
    if (tone === 'accent') return 'text-[var(--accent)]';
    if (tone === 'error') return 'text-[var(--ink)]';
    if (tone === 'dim') return 'opacity-60';
    return 'text-[var(--ink-soft)]';
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="mono flex min-h-[170px] flex-1 flex-col overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--panel-alt)] text-[11.5px] leading-[1.65]"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--rule-soft)] px-3 py-2 text-[10.5px] text-[var(--muted)]">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] opacity-80" />
        avi.sh
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2" aria-live="polite">
        {lines.map((line, index) => (
          <p key={index} className={`whitespace-pre-wrap break-words ${toneClass(line.tone)}`}>
            {line.tone === 'prompt' && <span className="text-[var(--accent)]">$ </span>}
            {line.text}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-1.5 border-t border-[var(--rule-soft)] px-3 py-2">
        <span className="text-[var(--accent)]">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input — type help for commands"
          placeholder="help"
          className="mono w-full bg-transparent text-[11.5px] text-[var(--ink)] caret-[var(--accent)] outline-none placeholder:text-[var(--muted)] placeholder:opacity-60"
        />
      </form>
    </div>
  );
}

export default SidebarTerminal;
