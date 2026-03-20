/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                fontFamily: {
                        heading: ['Playfair Display', 'serif'],
                        body: ['Manrope', 'sans-serif'],
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: '#E8A598',
                                light: '#F5D5CE',
                                dark: '#D4786A',
                                muted: '#F9EAE7',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: '#B8A9D4',
                                light: '#DDD6EE',
                                dark: '#8E7DBF',
                                muted: '#F0EDF8',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        accent: {
                                DEFAULT: '#9DC4B0',
                                light: '#C8DFD4',
                                dark: '#6BA48E',
                                muted: '#E8F4EF',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        stone: {
                                50: '#FAFAF9',
                                100: '#F5F5F4',
                                200: '#E7E5E4',
                                300: '#D6D3D1',
                                400: '#A8A29E',
                                500: '#78716C',
                                600: '#57534E',
                                700: '#44403C',
                                800: '#292524',
                                900: '#1C1917',
                        },
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-10px)' }
                        },
                        'pulse-soft': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.7 }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-soft': 'pulse-soft 3s ease-in-out infinite'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
