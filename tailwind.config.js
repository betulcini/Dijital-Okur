/** @type {import('tailwindcss').Config} */

// Sıcak antrasit nötrler: 950 = ekran zemini (#1A1918), 800 = kart yüzeyi (#262422)
const charcoal = {
	50: '#FAF9F7', 100: '#F2EFEA', 200: '#E3E0DB', 300: '#CFCBC4', 400: '#A8A39B',
	500: '#7F7A72', 600: '#5A5651', 700: '#3A3836', 800: '#262422', 900: '#1F1E1C', 950: '#1A1918'
};

// Terracotta vurgu: 500 = #D97757
const terracotta = {
	50: '#FBF1ED', 100: '#F6E0D7', 200: '#EEC4B3', 300: '#E6A68E', 400: '#E08A6B',
	500: '#D97757', 600: '#C4623F', 700: '#A34E31', 800: '#7E3D27', 900: '#5C2D1C'
};

// İkincil: kum / kil tonu (vurguyu bastırmadan ayrım sağlar)
const clay = {
	50: '#FAF5F0', 100: '#F3E7DC', 200: '#E8D0BB', 300: '#E2C3A8', 400: '#D3A683',
	500: '#BE8A64', 600: '#A06F4C', 700: '#7F5639', 800: '#5F412B', 900: '#422D1E'
};

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				charcoal,
				primary: terracotta,
				secondary: clay,
				// Projede kullanılan eski sınıflar (slate/gray/teal/mavi/mor) yeni palete bağlanır
				slate: charcoal,
				gray: charcoal,
				zinc: charcoal,
				neutral: charcoal,
				teal: terracotta,
				cyan: terracotta,
				sky: terracotta,
				blue: terracotta,
				indigo: terracotta,
				violet: clay,
				purple: clay
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #D97757 0%, #C4623F 100%)',
				'gradient-primary-dark': 'linear-gradient(135deg, #D97757 0%, #A34E31 100%)',
				'gradient-card': 'linear-gradient(135deg, rgba(217, 119, 87, 0.10) 0%, rgba(217, 119, 87, 0.02) 100%)'
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
					'0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(217, 119, 87, 0.28)' },
					'50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(217, 119, 87, 0.36)' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			boxShadow: {
				'glow': '0 0 20px rgba(217, 119, 87, 0.28)',
				'glow-lg': '0 0 40px rgba(217, 119, 87, 0.36)',
				'card': '0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 24px rgba(0, 0, 0, 0.28)'
			}
		}
	},
	plugins: []
};
