/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            primary: ['Nunito Sans', 'sans-serif'],
        },
        container: {
            padding: {
                DEFAULT: '15px',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '960px',
            xl: '1200px',
        },
        extend: {
            colors: {
                'dark-mode-elements': 'hsl(209, 23%, 22%)',
                'light-mode-elements': 'hsl(0, 0%, 100%)',
                'light-mode-bg': 'hsl(0, 0%, 98%)',
                'dark-mode-bg': 'hsl(207, 26%, 17%)',
                'light-mode-text': 'hsl(200, 15%, 8%)',
                'dark-mode-text': 'hsl(0, 0%, 100%)',
                'light-mode-input': 'hsl(0, 0%, 52%)',
            },
        },
    },
    plugins: [],
};
