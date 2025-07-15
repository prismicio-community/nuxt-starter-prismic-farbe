<script lang="ts" setup>
/* eslint-disable vue/attribute-hyphenation */
import type { Group } from "three"

const $canister = shallowRef<Group | null>(null)
const $packaging = shallowRef<Group | null>(null)

const scene = useScene()

watch($canister, (value) => {
	scene.$canister.value = value
})
watch($packaging, (value) => {
	scene.$packaging.value = value
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
	if ($canister.value) {
		$canister.value.rotation.y = Math.PI / 4 - Math.sin(elapsed * 0.25) * Math.PI / 2
	}
})
</script>

<template>
	<TAbsoluteGroup :x="0.33" :distance="20">
		<TresGroup :position="[1.5, 2.5, 0]">
			<Levioso>
				<TresGroup ref="$canister">
					<TFilmCanister
						model="800"
						:rotation="[0, 0, Math.PI / 8]"
					/>
				</TresGroup>
			</Levioso>
		</TresGroup>
		<TresGroup :position="[-1.5, -2.5, 0]">
			<Levioso>
				<TresGroup ref="$packaging">
					<TFilmPackaging
						model="800"
						:rotation="[-Math.PI / 2, 0, Math.PI / 3]"
					/>
				</TresGroup>
			</Levioso>
		</TresGroup>
	</TAbsoluteGroup>

	<TresMesh
		receive-shadow
		:position="[0, 0, -4]"
		:rotation="[0, 0, 0]"
	>
		<TresPlaneGeometry :args="[400, 400, 10, 10]" />
		<TresMeshStandardMaterial
			color="#ffffff"
			:roughness="0.5"
			:metalness="0.5"
		/>
	</TresMesh>

	<TresDirectionalLight
		cast-shadow
		:position="[-8, 6, 20]"
		:intensity=".5"
		:shadow-mapSize-width="512"
		:shadow-mapSize-height="512"
		:shadow-camera-left="-10"
		:shadow-camera-right="10"
		:shadow-camera-top="10"
		:shadow-camera-bottom="-10"
		:color="0xFFFFFF"
	/>

	<SoftShadows :size="50" :samples="10" />

	<Suspense>
		<Environment
			files="/textures/lobby.hdr"
			:environment-intensity="0.25"
		/>
	</Suspense>
</template>
