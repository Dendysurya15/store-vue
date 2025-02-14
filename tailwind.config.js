/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        rs: { min: '0px', max: '639px' },
        xs: { min: '640px', max: '767px' },
        sm: { min: '768px', max: '1023px' },
        md: { min: '1024px', max: '1279px' },
        lg: { min: '1280px', max: '1535px' },
        xl: { min: '1536px' }
      }
    }
  },
  plugins: []
}
