<script lang="ts" setup>
defineProps<{
	model: "100" | "200" | "400" | "800"
}>()
</script>

<template>
	<TModel
		cast-shadow
		model="/packaging/packaging.gltf"
		:textures="[`/textures/${model}-packaging-min.jpg`]"
		v-bind="$attrs"
	/>
</template>
