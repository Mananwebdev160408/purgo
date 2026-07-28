/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fluent: {
          blue: '#0078d4',
          blueHover: '#106ebe',
          blueActive: '#005a9e',
          bg: 'var(--fluent-bg)',
          card: 'var(--fluent-card)',
          cardBorder: 'var(--fluent-card-border)',
          hover: 'var(--fluent-hover)',
          text: 'var(--fluent-text)',
          textSecondary: 'var(--fluent-text-secondary)',
          input: 'var(--fluent-input)',
          // Backward compatibility mappings for existing component classes
          bgDark: 'var(--fluent-bg)',
          cardDark: 'var(--fluent-card)',
          cardBorderDark: 'var(--fluent-card-border)',
          hoverDark: 'var(--fluent-hover)',
          textDark: 'var(--fluent-text)',
          textSecondaryDark: 'var(--fluent-text-secondary)',
          bgLight: '#f3f3f6',
          cardLight: '#ffffff',
          cardBorderLight: '#e2e8f0',
          hoverLight: '#f1f5f9',
          textLight: '#0f172a',
          textSecondaryLight: '#64748b',
        },
        safe: {
          bg: 'rgba(16, 185, 129, 0.15)',
          text: '#10b981',
          border: 'rgba(16, 185, 129, 0.3)',
        },
        review: {
          bg: 'rgba(245, 158, 11, 0.15)',
          text: '#f59e0b',
          border: 'rgba(245, 158, 11, 0.3)',
        },
        caution: {
          bg: 'rgba(239, 68, 68, 0.15)',
          text: '#ef4444',
          border: 'rgba(239, 68, 68, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'],
        mono: ['Cascadia Code', 'Consolas', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
