import tailwindcss from "@tailwindcss/vite"
import { repositoryName } from "./slicemachine.config.json"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
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
	modules: ["@tresjs/nuxt", "@nuxt/fonts", "@nuxtjs/prismic"],

	vite: {
		plugins: [
			tailwindcss(),
		],
	},

	prismic: {
		endpoint: repositoryName,
		clientConfig: {
			routes: [
				{ uid: "home", type: "page", path: "/" },
				{ type: "page", path: "/:uid" },
			],
		},
	},
})
