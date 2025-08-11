<script lang="ts" setup>
import type { Content } from "@prismicio/client"

defineProps<{
	settings?: Content.SettingsDocument
}>()

const { totalItems } = useCart()
</script>

<template>
	<header class="backdrop-blur">
		<nav>
			<ul class="flex items-center">
				<li class="w-3/5 pl-4 flex">
					<NuxtLink to="/" class="cta py-px">
						<BrandSignature class="text-lg" />
					</NuxtLink>
				</li>
				<li v-for="link in settings?.data.navigation" :key="link.key">
					<PrismicLink :field="link" class="cta" />
				</li>
				<li class="ml-auto pr-4">
					<NuxtLink to="/#cart" class="cta">
							Cart (<ClientOnly fallback="~">{{ totalItems }}</ClientOnly>)
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
