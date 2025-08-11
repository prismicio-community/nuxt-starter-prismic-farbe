<script lang="ts" setup>
import type { Content } from "@prismicio/client"

defineProps<{
	settings?: Content.SettingsDocument
}>()
</script>

<template>
	<footer
		class="relative z-10 bg-black text-white"
	>
		<figure class="absolute inset-0 pointer-events-none overflow-hidden">
			<svg class="sticky top-0 left-0 h-screen w-auto" width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_167_1277)">
				<path d="M25.728 13.8727L24.5159 21.1909H2.8358L4.04787 13.8727H25.728ZM3.1331 49L9.42216 11.3342C9.83381 8.78811 10.6723 6.67651 11.9378 4.99943C13.2185 3.32234 14.7964 2.06453 16.6717 1.22599C18.5623 0.387448 20.6053 -0.0318225 22.8007 -0.0318225C24.2948 -0.0318225 25.6441 0.082525 26.8486 0.31122C28.0683 0.539913 28.9526 0.745736 29.5014 0.928691L26.597 8.24687C26.2311 8.1249 25.7813 8.01056 25.2477 7.90383C24.7141 7.79711 24.15 7.74375 23.5554 7.74375C22.1375 7.74375 21.0931 8.07917 20.4223 8.75C19.7667 9.40559 19.3246 10.328 19.0959 11.5172L12.8526 49H3.1331ZM46.339 -0.0318225L31.2452 56.0438H26.3054L41.3992 -0.0318225H46.339Z" fill="currentColor"/>
				</g>
				<defs>
				<clipPath id="clip0_167_1277">
				<rect width="48" height="56" fill="white"/>
				</clipPath>
				</defs>
			</svg>
		</figure>
		<AppSection class="w-2/5 ml-auto py-16 px-4 rich-text min-h-screen flex flex-col mix-blend-difference">
			<h2><BrandSignature /></h2>
			<PrismicRichText :field="settings?.data.footer_text" />
			<hr class="flex-1 border-none">
			<PrismicRichText :field="settings?.data.footer_secondary_text" />
		</AppSection>
	</footer>
</template>
