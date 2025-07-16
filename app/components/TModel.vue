<script lang="ts" setup>
import { Mesh, MeshStandardMaterial, SRGBColorSpace } from "three"

const props = defineProps<{
	model: string
	textures: [map: string, metalnessMap?: string]
}>()

const { state, materials } = useGLTF(props.model, { draco: true })
watch(state, (state) => {
	state?.scene.traverse((child) => {
		if (child instanceof Mesh) {
			child.castShadow = true
		}
	})
})

const texturePaths = computed(() => props.textures.filter(Boolean) as string[])
const { textures } = useTextures(texturePaths)
watch(textures, (textures) => {
	textures.forEach((value) => {
		if (value) {
			value.flipY = false
			value.colorSpace = SRGBColorSpace
			value.anisotropy = 16
		}
	})
})

watchEffect(() => {
	if (
		!(materials.value.main instanceof MeshStandardMaterial) ||
		!textures.value[0]
	) {
		return
	}

	materials.value.main.map = textures.value[0]
	if (textures.value[1]) {
		materials.value.main.metalnessMap = textures.value[1]
	}
	materials.value.main.needsUpdate = true
})
</script>

<template>
	<primitive
		v-if="state?.scene"
		:object="state.scene"
		:scale="100"
		v-bind="$attrs"
	/>
</template>
