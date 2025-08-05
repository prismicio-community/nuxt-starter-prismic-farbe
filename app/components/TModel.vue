<script lang="ts" setup>
import { Mesh, MeshStandardMaterial, SRGBColorSpace } from "three"

const props = defineProps<{
	model: string
	map: string
	metalnessMap?: string
}>()

const { state, materials } = useGLTF(props.model, { draco: true })
watch(state, (state) => {
	state?.scene.traverse((child) => {
		if (child instanceof Mesh) {
			child.castShadow = true
		}
	})
})

const { state: map, isLoading: isMapLoading } = useTexture(computed(() => props.map))
const { state: metalnessMap, isLoading: isMetalnessMapLoading } = useTexture(computed(() => props.metalnessMap ?? ""))

watch(
	[materials, map, isMapLoading, metalnessMap, isMetalnessMapLoading],
	([materials, map, isMapLoading, metalnessMap, isMetalnessMapLoading]) => {
		if (
			!(materials.main instanceof MeshStandardMaterial) ||
			!map ||
			isMapLoading ||
			isMetalnessMapLoading
		) {
			return
		}

		// Fix textures
		[map, metalnessMap].forEach((texture) => {
			if (texture) {
				texture.flipY = false
				texture.colorSpace = SRGBColorSpace
				texture.anisotropy = 16
			}
		})

		// Apply textures
		materials.main.map = map
		materials.main.metalnessMap = metalnessMap
		materials.main.needsUpdate = true
	},
)
</script>

<template>
	<primitive
		v-if="state?.scene"
		:object="state.scene"
		:scale="100"
		v-bind="$attrs"
	/>
</template>
