import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B9D', // 宝珠草莓粉
        secondary: '#4CAF50', // 宝珠绿叶绿
        accent: '#FFD700', // 金色
        tech: '#0066FF', // 科技蓝
        dark: '#0A0A0F', // 深色科技背景
        'dark-light': '#12121A',
        'day-1': '#FF6B9D',
        'day-2': '#0066FF',
        'day-3': '#4CAF50',
        'day-4': '#FF9800',
        'day-5': '#9C27B0',
        'day-6': '#00BCD4',
        'day-7': '#FFD700',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        'pop-in': 'pop-in 0.4s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
