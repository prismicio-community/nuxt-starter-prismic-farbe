<script lang="ts" setup async>
import { MeshStandardMaterial, SRGBColorSpace } from "three"

const props = defineProps<{
	model: string
	texture: {
		map: string
		metalnessMap?: string
	}
}>()

const { scene: model, materials } = await useGLTF(props.model, { draco: true })

watch(() => props.texture, async () => {
	const texture = await useTexture(props.texture)

	Object.values(texture).forEach((value) => {
		if (value) {
			value.flipY = false
			value.colorSpace = SRGBColorSpace
			value.anisotropy = 16
		}
	})

	if (materials.main instanceof MeshStandardMaterial) {
		materials.main.map = texture.map
		materials.main.metalnessMap = texture.metalnessMap
		materials.main.needsUpdate = true
	}
}, { immediate: true })

model.traverse((child: TresObject) => {
	if (child.isMesh) {
		child.castShadow = true
	}
})
</script>

<template>
	<primitive
		:object="model"
		:scale="100"
		v-bind="$attrs"
	/>
</template>
