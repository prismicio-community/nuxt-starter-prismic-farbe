<script lang="ts" setup>
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
			preset="realistic"
		>
			<Stats v-if="false" />
			<OrbitControls v-if="false" />
			<TresPerspectiveCamera
				:fov="45"
				:position="[0, 0, 20]"
				:look-at="[0, 0, 0]"
			/>
			<TScene />
		</TresCanvas>
	</figure>
</template>
