/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "student-class":
                    "url('../../../../src/images/student-class.jpg')",
            },
        },
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
};
