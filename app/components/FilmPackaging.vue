<script lang="ts" setup>
defineProps<{
	model: "100" | "200" | "400" | "800"
}>()
</script>

<template>
	<Suspense>
		<GltfModel
			cast-shadow
			model="/packaging/packaging.gltf"
			:texture="{
				map: `/textures/${model}-packaging-min.jpg`,
			}"
			v-bind="$attrs"
		/>
	</Suspense>
</template>
