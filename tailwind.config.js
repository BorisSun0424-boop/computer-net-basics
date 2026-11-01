/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#1a1a18',
          700: '#3d3d38',
          500: '#6b6a63',
          300: '#a8a69c',
          100: '#e8e6df',
        },
        paper: {
          DEFAULT: '#ffffff',
          soft: '#fbfaf7',
          sunk: '#f5f3ee',
        },
        accent: {
          50: '#eef4ff',
          100: '#dbe7fe',
          500: '#2f6bdc',
          600: '#2559bd',
          700: '#1d4795',
        },
        jade: {
          50: '#ecf7f3',
          500: '#0e8f74',
          600: '#0b735d',
        },
        clay: {
          50: '#fdf3ee',
          500: '#c2643b',
          600: '#a3502d',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Source Han Sans SC"',
          'sans-serif',
        ],
        serif: [
          '"Songti SC"',
          '"Source Han Serif SC"',
          '"Noto Serif SC"',
          'Georgia',
          'ui-serif',
          'serif',
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      maxWidth: {
        prose: '46rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,26,24,0.04), 0 4px 16px -8px rgba(26,26,24,0.10)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 260ms cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 180ms ease-out both',
      },
    },
  },
  plugins: [],
}
