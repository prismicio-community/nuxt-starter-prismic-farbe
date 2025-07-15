<script lang="ts" setup>
defineProps<{
	model: "100" | "200" | "400" | "800"
}>()
</script>

<template>
	<Suspense>
		<TModel
			model="/canister/canister.gltf"
			:texture="{
				map: `/textures/${model}-color-min.jpg`,
				metalnessMap: `/textures/${model}-metallic-min.jpg`,
			}"
			v-bind="$attrs"
		/>
	</Suspense>
</template>
