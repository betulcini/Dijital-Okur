/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0f4ff',
					100: '#e0e9ff',
					200: '#c7d8ff',
					300: '#a4bfff',
					400: '#7da3ff',
					500: '#5a82f5',
					600: '#4059d4',
					700: '#2d3aa8',
					800: '#1f258a',
					900: '#141570'
				},
				secondary: {
					50: '#faf3ff',
					100: '#f3e8ff',
					200: '#e9d5ff',
					300: '#d8b4ff',
					400: '#c084fc',
					500: '#a855f7',
					600: '#9333ea',
					700: '#7e22ce',
					800: '#6b21a8',
					900: '#581c87'
				}
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #5a82f5 0%, #a855f7 100%)',
				'gradient-primary-dark': 'linear-gradient(135deg, #2d3aa8 0%, #7e22ce 100%)',
				'gradient-card': 'linear-gradient(135deg, rgba(90, 130, 245, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
				'bounce-gentle': 'bounceGentle 2s ease-in-out infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				pulseGlow: {
					'0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(90, 130, 245, 0.3)' },
					'50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			boxShadow: {
				'glow': '0 0 20px rgba(90, 130, 245, 0.3)',
				'glow-lg': '0 0 40px rgba(90, 130, 245, 0.4)',
				'card': '0 4px 20px rgba(0, 0, 0, 0.08)'
			}
		}
	},
	plugins: []
};
