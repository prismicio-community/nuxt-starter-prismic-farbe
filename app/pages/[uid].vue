<script setup lang="ts">
import { components } from "~/slices"

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(
	`[page-uid-${route.params.uid}]`,
	() => prismic.client.getByUID("page", route.params.uid as string),
)
const { data: stripeProducts } = await useFetch("/api/products")

useSeoMeta({
	title: page.value?.data.meta_title ?? undefined,
	ogTitle: page.value?.data.meta_title ?? undefined,
	description: page.value?.data.meta_description ?? undefined,
	ogDescription: page.value?.data.meta_description ?? undefined,
	ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image) ?? undefined),
})
</script>

<template>
	<main>
		<SliceZone
			:slices="page?.data.slices ?? []"
			:components="components"
			:context="{ stripeProducts }"
		/>
	</main>
</template>
