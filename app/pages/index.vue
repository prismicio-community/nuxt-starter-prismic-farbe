<script setup lang="ts">
import { components } from "~/slices"

const prismic = usePrismic()
const { data: page } = await useAsyncData(
	`[page-uid-home]`,
	() => prismic.client.getByUID("page", "home"),
)

useSeoMeta({
	title: page.value?.data.meta_title ?? undefined,
	ogTitle: page.value?.data.meta_title ?? undefined,
	description: page.value?.data.meta_description ?? undefined,
	ogDescription: page.value?.data.meta_description ?? undefined,
	ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image) ?? undefined),
})
</script>

<template>
	<SliceZone
		wrapper="main"
		:slices="page?.data.slices ?? []"
		:components="components"
	/>
</template>
