/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                primary: "#607AFB",
                bgDark: "#212121",
                bgLight: "#e7ebee",
                darkHover: "#292929",
                lightHover: "#F0F2F5",
                textLight: "#000000",
                textDark: "#ffffff",
                cardLight: "#ffffff",
                cardDark: "#2E2E2E",
                star: "#f1c40f",
                danger: "#e74c3c",
            },
        },
        fontFamily: {
            spaceGrotesk: ["Space Grotesk", "sans-serif"],
        },
    },
    plugins: [],
    darkMode: "class",
};
