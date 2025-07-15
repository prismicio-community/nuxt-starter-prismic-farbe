<script lang="ts" setup>
const links = ["100", "200", "400", "800", "Community"]
</script>

<template>
	<header class="backdrop-blur">
		<nav>
			<ul class="flex justify-center">
				<li class="w-3/5 pl-4 flex">
					<NuxtLink to="/" class="cta py-px">
						<BrandSignature class="text-lg" />
					</NuxtLink>
				</li>
				<li v-for="link in links" :key="link">
					<NuxtLink :to="`#${link}`" class="cta">
						{{ link }}
					</NuxtLink>
				</li>
				<li class="ml-auto pr-4">
					<NuxtLink to="#cart" class="cta">
						Cart (0)
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
