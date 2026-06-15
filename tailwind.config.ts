import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1220",
        surface: "#111A2E",
        surfaceHover: "#1A2742",
        primary: "#4F7CFF",
        border: "#24314D",
        text: {
          primary: "#EAF0FF",
          secondary: "#A9B4CC",
        },
        danger: "#FF5C7A",
        success: "#2ED47A",
      },
    },
  },
  plugins: [],
} satisfies Config;

