tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Costume', 'sans-serif'],
        sans: ['Marseille', 'sans-serif'],
      },
      colors: {
        bg: { main: '#050505', card: '#0a0a0a' },
        accent: { primary: '#7c3aed', secondary: '#4f46e5', glow: '#8b5cf6' }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  }
}