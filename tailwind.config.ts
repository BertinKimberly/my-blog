import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "main":"#333",
        "subMain":"#272727" ,
        dark: "#161b22",
        light: "#fff",
        bl:"#0000ff",
        nav:"#1f2328",
        accent: "#ffffffac",
        accentDark: "#ffffff54",
        gray: "#747474",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    
  ],
}
export default config
