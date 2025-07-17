<script lang="ts" setup>
import { PerspectiveCamera } from "three"

const props = defineProps<{
	x?: number
	y?: number
	distance: number
}>()

const { camera, sizes } = useTresContext()

const position = computed<[number, number, number]>(() => {
	const fov = camera.activeCamera.value instanceof PerspectiveCamera
		? camera.activeCamera.value.fov
		: 50

	const height = 2 * Math.tan(fov * Math.PI / 180 / 2) * props.distance
	const width = height * sizes.aspectRatio.value

	const x = props.x ?? 0.5
	const y = props.y ?? 0.5

	return [width * x - width / 2, height * y - height / 2, 0]
})
</script>

<template>
	<TresGroup :position="position">
		<slot />
	</TresGroup>
</template>
