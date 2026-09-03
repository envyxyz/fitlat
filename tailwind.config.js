/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Fluid type scale, interpolated 390px -> 1440px, 16px root.
      // fontSize[token] = [clamp(min, preferred, max), { lineHeight, letterSpacing, fontWeight }]
      fontSize: {
        display: [
          'clamp(3rem, 1.7143rem + 5.7143vw, 7rem)',
          { lineHeight: '0.95', letterSpacing: '-0.05em', fontWeight: '700' },
        ],
        h1: [
          'clamp(2.75rem, 1.9143rem + 3.4286vw, 5rem)',
          { lineHeight: '1', letterSpacing: 'clamp(-0.06em, -0.0394em + -0.0014vw, -0.045em)', fontWeight: '700' },
        ],
        h2: [
          'clamp(2rem, 1.4429rem + 2.2857vw, 3.5rem)',
          { lineHeight: '1.08', letterSpacing: 'clamp(-0.06em, -0.0189em + -0.0029vw, -0.03em)', fontWeight: '700' },
        ],
        h3: [
          'clamp(1.75rem, 1.6571rem + 0.381vw, 2rem)',
          { lineHeight: '1.15', letterSpacing: 'clamp(-0.03em, -0.0231em + -0.0005vw, -0.025em)', fontWeight: '700' },
        ],
        h4: [
          'clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem)',
          { lineHeight: '1.45', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'body-lg': [
          'clamp(1rem, 0.9536rem + 0.1905vw, 1.125rem)',
          { lineHeight: '1.6', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        body: ['1rem', { lineHeight: '1.75', letterSpacing: '-0.02em', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.8', letterSpacing: '-0.02em', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.9', letterSpacing: '-0.02em', fontWeight: '400' }],
      },
      fontWeight: {
        'body-accent': '600',
      },
      // 4px-based spacing scale, keyed to the same tokens (space after each block).
      spacing: {
        'space-caption': '0.25rem', // 4px
        'space-small': '0.5rem', // 8px
        'space-body': '1rem', // 16px
        'space-body-lg': '1.25rem', // 20px
        'space-h4': '1.5rem', // 24px
        'space-h3': '2rem', // 32px
        'space-h2': '2.5rem', // 40px
        'space-h1': '3rem', // 48px
      },
      maxWidth: {
        measure: '60ch', // body copy: 50-60 characters/line
        'measure-display': '30ch', // display headings: 20-30 characters/line
      },
      letterSpacing: {
        caps: '0.01em', // +1% for all-caps text
      },
    },
  },
  plugins: [],
};
