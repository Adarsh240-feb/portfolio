/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--bg-paper)',
        ink: 'var(--ink)',
        muted: 'var(--ink-muted)',
        lime: 'var(--accent-lime)',
        orange: 'var(--accent-orange)',
        cobalt: 'var(--accent-blue)',
        pink: 'var(--accent-pink)',
        purple: 'var(--accent-purple)',
        gunred: 'var(--accent-red)',
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '18px',
        panel: '24px',
      },
      boxShadow: {
        sticker: '0 10px 25px -5px rgba(17, 17, 17, 0.12), 0 4px 10px -4px rgba(17, 17, 17, 0.08)',
        lift: '0 20px 38px -10px rgba(17, 17, 17, 0.18), 0 8px 16px -6px rgba(17, 17, 17, 0.1)',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 34s linear infinite',
        'marquee-right': 'marquee-right 38s linear infinite',
      },
    },
  },
  plugins: [],
};
