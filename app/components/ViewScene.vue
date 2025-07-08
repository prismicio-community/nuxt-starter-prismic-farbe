<script lang="ts" setup>
/* eslint-disable vue/attribute-hyphenation */
import type { DirectionalLight, Group } from "three"

const canister = ref<Group | null>(null)
const packaging = ref<Group | null>(null)
const light = ref<DirectionalLight | null>(null)

const { onBeforeRender } = useLoop()

let threshold = 4

onBeforeRender(({ delta, elapsed }) => {
	if (canister.value) {
		canister.value.rotation.y += delta * 0.5
	}

	if (packaging.value) {
		packaging.value.rotation.y -= delta * 0.5
	}

	// Cycle the model every 4 seconds
	if (elapsed > threshold) {
		threshold += 4
		cycleModel()
	}
})

const MODELS = ["100", "200", "400", "800"] as const

const model = ref<typeof MODELS[number]>("100")

function cycleModel() {
	const currentIndex = MODELS.indexOf(model.value)
	model.value = MODELS[(currentIndex + 1) % MODELS.length]!
}
</script>

<template>
	<TresMesh
		receive-shadow
		:position="[0, 0, -4]"
		:rotation="[0, 0, 0]"
	>
		<TresPlaneGeometry :args="[40, 40, 10, 10]" />
		<TresMeshStandardMaterial
			color="#ffffff"
			:roughness="0.5"
			:metalness="0.5"
		/>
	</TresMesh>

	<TresDirectionalLight
		ref="light"
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

	<TresGroup :position="[0, 3.5, 0]">
		<Levioso @click="cycleModel">
			<TresGroup ref="canister">
				<FilmCanister :model="model" />
			</TresGroup>
		</Levioso>
	</TresGroup>

	<TresGroup :position="[0, -3.5, 0]">
		<Levioso>
			<TresGroup ref="packaging">
				<FilmPackaging
					:model="model"
					:rotation="[0, 0, Math.PI / 2]"
				/>
			</TresGroup>
		</Levioso>
	</TresGroup>

	<Suspense>
		<Environment
			preset="city"
			:environment-intensity=".5"
		/>
	</Suspense>
</template>
