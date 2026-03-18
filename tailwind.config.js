/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0080A3',
          shade1:  '#19566A',
          shade2:  '#0E3D4D',
          accent:  '#0E98BE',
        },
        wf: {
          bg:       '#F8FAFB',
          bgSecond: '#D9E3E7',
          border:   '#E8EDF0',
          text:     '#161B1F',
          textMid:  '#4E5961',
          textSub:  '#78868E',
          success:  '#2E7D32',
          error:    '#C62828',
          white:    '#FFFFFF',
        },
      },
      fontFamily: {
        sans:  ['Roboto', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      borderRadius: {
        pill: '100px',
        ios:  '30px',
      },
    },
  },
  plugins: [],
}

