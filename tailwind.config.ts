import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#8B5CF6',
        secondary: '#F59E0B',
        tertiary: '#ef4444'
      },
      input: {
        "aniverse-input": "py-2 px-4 rounded-button bg-white text-black my-1 focus:outline-none focus:ring-2 focus:ring-primary"
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
    }
    },
  },
  plugins: [],
} satisfies Config;
