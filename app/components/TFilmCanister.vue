<script lang="ts" setup>
defineProps<{
	model: "100" | "200" | "400" | "800"
}>()
</script>

<template>
	<TModel
		model="/canister/canister.gltf"
		:textures="[`/textures/${model}-color-min.jpg`, `/textures/${model}-metallic-min.jpg`]"
		v-bind="$attrs"
	/>
</template>
