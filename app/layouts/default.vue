<script lang="ts" setup>
const route = useRoute()
const prismic = usePrismic()
const { data: settings } = await useAsyncData("settings", () => prismic.client.getSingle("settings"))

useSeoMeta({
	title: settings.value?.data.site_title,
	ogTitle: settings.value?.data.site_title,
	description: settings.value?.data.meta_description,
	ogDescription: settings.value?.data.meta_description,
	ogImage: () => prismic.asImageSrc(settings.value?.data.meta_image),
})

onMounted(() => {
	if (route.query.order === "completed") {
		useCart().clear()
		useRouter().replace({ path: route.path })
	}
})
</script>

<template>
	<div>
		<AppHeader :settings="settings" class="fixed top-0 left-0 right-0 z-10" />
		<slot />
		<AppFooter :settings="settings" />
		<TCanvas>
			<TScene />
		</TCanvas>
	</div>
</template>
