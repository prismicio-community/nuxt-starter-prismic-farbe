<script lang="ts" setup>
defineProps<{ model: string }>()
</script>

<template>
	<TModel
		model="/canister/canister.gltf"
		:map="`/textures/${model}-color-min.jpg`"
		:metalness-map="`/textures/${model}-metallic-min.jpg`"
		v-bind="$attrs"
	/>
</template>
