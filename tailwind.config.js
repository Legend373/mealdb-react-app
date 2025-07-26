/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}', // adjust paths according to your project
    ],
    theme: {
        extend: {
            colors: {
                'custom-brown': '#A0522D',
            },
        },
    },
    plugins: [],
}
