/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        teal: 'rgb(var(--teal) / <alpha-value>)',
        'teal-lift': 'rgb(var(--teal-lift) / <alpha-value>)',
        mist: 'rgb(var(--mist) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        bronze: 'rgb(var(--bronze) / <alpha-value>)',
        'on-ink': 'rgb(var(--on-ink) / <alpha-value>)',
        'on-ink-mute': 'rgb(var(--on-ink-mute) / <alpha-value>)',
        'on-mist': 'rgb(var(--on-mist) / <alpha-value>)',
        'on-mist-mute': 'rgb(var(--on-mist-mute) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        's-1': 'var(--step--1)',
        s0: 'var(--step-0)',
        s1: 'var(--step-1)',
        s2: 'var(--step-2)',
        s3: 'var(--step-3)',
        s4: 'var(--step-4)',
        s5: 'var(--step-5)',
      },
      transitionDuration: {
        '400': '400ms',
        '450': '450ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '1100': '1100ms',
      },
      transitionTimingFunction: {
        lift: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}