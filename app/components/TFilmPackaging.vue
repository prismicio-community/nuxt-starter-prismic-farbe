<script lang="ts" setup>
defineProps<{ model: string }>()
</script>

<template>
	<TModel
		cast-shadow
		model="/packaging/packaging.gltf"
		:map="`/textures/${model}-packaging-min.jpg`"
		v-bind="$attrs"
	/>
</template>
