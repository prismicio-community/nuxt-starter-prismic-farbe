<script lang="ts" setup>
import { ACESFilmicToneMapping, SRGBColorSpace } from "three"

const mounted = ref(false)

onMounted(() => {
	mounted.value = true
})
</script>

<template>
	<figure
		class="relative -z-1 transition-opacity delay-300 duration-1000 ease-in-out"
		:class="{ 'opacity-0': !mounted }"
	>
		<TresCanvas
			window-size
			:shadows="true"
			:output-color-space="SRGBColorSpace"
			:tone-mapping="ACESFilmicToneMapping"
			:tone-mapping-exposure="3"
		>
			<Stats v-if="false" />
			<OrbitControls v-if="false" />
			<TresPerspectiveCamera
				:fov="45"
				:position="[0, 0, 20]"
				:look-at="[0, 0, 0]"
			/>
			<slot />
		</TresCanvas>
	</figure>
</template>
