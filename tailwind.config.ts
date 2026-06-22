import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;


