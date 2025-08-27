<script lang="ts" setup>
import type { Content } from "@prismicio/client"

defineProps<{
	settings?: Content.SettingsDocument
}>()

const { totalItems } = useCart()
</script>

<template>
	<header>
		<nav class="flex justify-between">
			<NuxtLink to="/" class="cta py-px ml-4">
				<BrandSignature class="text-lg" />
			</NuxtLink>
			<ul class="xl:w-[calc(40%+2rem)] flex items-center pl-8 pr-4 backdrop-blur">
				<li v-for="link in settings?.data.navigation" :key="link.key" class="hidden xl:block">
					<PrismicLink :field="link" class="cta" />
				</li>
				<li class="ml-auto">
					<NuxtLink to="/#cart" class="cta">
						Cart (<ClientOnly fallback="~">
							{{ totalItems }}
						</ClientOnly>)
					</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
@reference "~/assets/css/index.css";

a {
	@apply transition-opacity duration-300 ease-in-out;
}

header:has(a:hover) a:not(:hover) {
	@apply opacity-25;
}
</style>
