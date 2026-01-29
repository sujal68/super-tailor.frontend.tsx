/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            'sm': '800px',
            'md': '1000px',
            'lg': '1200px',
            'xl': '1400px',
        },
        extend: {
            fontFamily: {
                inter: ["Inter", "system-ui", "sans-serif"],
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                }
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite'
            }
        },
    },
    plugins: [],
}
