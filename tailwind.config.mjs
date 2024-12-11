/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	theme: {
		extend: {
		  colors: {
			customGray: '#4D4B4B',
		  },

		  animation: {
			wiggle: 'wiggle 1s ease-in-out infinite',
		   }
		  
		
	  	},
	},
	plugins: [],
}
