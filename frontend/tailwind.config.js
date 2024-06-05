/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.ts.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                russo: ["Russo One", "sans-serif"]
            },
            colors: {
                "my-dark": "#303030",
                "my-blue": "#aaf5ff",
                "my-white": "#fbfbfb",
                "my-copper": "#d28536",
                "my-dark2": "#222222",
                "my-gray2": "#2e2e2e"
            },
            width: {
                1500: "1500px",
                1150: "1150px",
                605: "605px"
            }
        }
    },
    plugins: []
}

