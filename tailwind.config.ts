import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-green': '#2D936C',
      'ocean-teal': '#19647E',
      'base-light': '#FFFFFE',
      'sand-accent': '#CF995F',
      'base-dark': '#30292F',
      'accent-gold': '#FCD385',
      'accent-blue': '#3A86E9',
    },
    extend: {
      fontFamily: {
        serif: ['var(--font-inter-display)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
