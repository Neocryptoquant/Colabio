// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // For Tailwind v4, the 'content' array is still important for shadcn/ui
    // to know where your components are, even if Tailwind itself processes differently.
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      // shadcn/ui will populate this section when you run `init`
      // and add components. For example:
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          // shadcn/ui adds its color palette here based on your choices
          // border: "hsl(var(--border))",
          // input: "hsl(var(--input))",
          // ... and so on
        },
        borderRadius: {
          // lg: `var(--radius)`,
          // md: `calc(var(--radius) - 2px)`,
          // sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          // "accordion-down": { ... },
          // "accordion-up": { ... },
        },
        animation: {
          // "accordion-down": "accordion-down 0.2s ease-out",
          // "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    // For Tailwind v4, if you use shadcn/ui, you might need the typography plugin
    // or the shadcn/ui plugin if it becomes available for v4.
    // For now, `shadcn-ui` will manage this via `components.json` and direct theme modifications.
    // If shadcn/ui relies on its own plugin:
    // plugins: [require("tailwindcss-animate"), /* potentially a shadcn-ui plugin for v4 if it exists */],
    // For now, leave plugins empty or just with tailwindcss-animate if prompted by shadcn
    plugins: [require("tailwindcss-animate")], // shadcn often uses this
  };