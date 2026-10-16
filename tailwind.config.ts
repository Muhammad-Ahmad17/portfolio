import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1100px'
			}
		},
		extend: {
			fontFamily: {
				editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
				sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
				serif: ['"Instrument Serif"', 'Georgia', 'serif'],
				mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				/* Palette colours are CSS variables (r g b) set by src/theme/palettes.ts, so alpha modifiers still work. */
				regal: {
					DEFAULT: 'rgb(var(--c-regal) / <alpha-value>)',
					deep: 'rgb(var(--c-regal-deep) / <alpha-value>)',
					light: 'rgb(var(--c-regal-light) / <alpha-value>)',
					muted: 'rgb(var(--c-regal-muted) / <alpha-value>)',
				},
				chiffon: {
					DEFAULT: 'rgb(var(--c-chiffon) / <alpha-value>)',
					light: 'rgb(var(--c-chiffon-light) / <alpha-value>)',
					warm: 'rgb(var(--c-chiffon-warm) / <alpha-value>)',
					muted: 'rgb(var(--c-chiffon-muted) / <alpha-value>)',
				},
				redmark: 'rgb(var(--c-redmark) / <alpha-value>)',
				/* Fixed inks that the .on-navy / .on-red helpers never remap: for text on paper-coloured buttons and fills. */
				navy: 'rgb(var(--c-ink) / <alpha-value>)',
				crimson: 'rgb(var(--c-redmark) / <alpha-value>)',
				cream: 'rgb(var(--c-chiffon) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'glow': 'var(--shadow-glow)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(12px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.98)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'scale-in': 'scale-in 0.5s ease-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	],
} satisfies Config;
