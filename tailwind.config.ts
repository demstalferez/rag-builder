import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos Upgrade Hub
        'upgrade-yellow': {
          DEFAULT: '#D4FF00',
          light: '#DAF800',
        },
        'upgrade-black': '#000000',
        'upgrade-white': '#FFFFFF',
        'upgrade-gray': {
          light: '#FAFAF8',
          DEFAULT: '#484451',
          teal: '#78CFBF',
        },
        'upgrade-blue': '#0077B6',
        // Alias para compatibilidad con componentes existentes
        primary: {
          50: '#f0fcf4',
          100: '#e6fbe9',
          200: '#d4ff00',
          300: '#d4ff00',
          400: '#d4ff00',
          500: '#0077B6',
          600: '#0077B6',
          700: '#005a8c',
          800: '#004468',
          900: '#002d44',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
