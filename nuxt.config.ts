import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	app: {
		head: {
			meta: [
				{ name: "apple-mobile-web-app-title", content: "Farbe" },
			],
			link: [
				{ rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
				{ rel: "shortcut icon", href: "/favicon.ico" },
				{ rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
				{ rel: "manifest", href: "/site.webmanifest" },
			],
		},
	},
	css: ["~/assets/css/index.css"],
	modules: ["@tresjs/nuxt", "@nuxt/fonts"],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
})
