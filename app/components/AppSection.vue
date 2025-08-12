<script lang="ts" setup>
import gsap from "gsap"

defineProps<{
	is?: string
	scene?: {
		position?: "top" | "center"
		model?: string
		rotate?: boolean
	}
}>()

const $this = shallowRef<HTMLElement | null>(null)
useGSAP((isReducedMotion) => {
	if (!$this.value) {
		return
	}

	gsap.set($this.value, { opacity: 1 })

	if (isReducedMotion) {
		return
	}

	gsap.from($this.value.children, {
		opacity: 0,
		y: 50,
		delay: 0.3,
		duration: 1,
		ease: "power2.out",
		stagger: 0.2,
		scrollTrigger: {
			trigger: $this.value,
			start: "top bottom-=40%",
		},
	})
})
</script>

<template>
	<component
		:is="is || 'section'"
		ref="$this"
		data-scene
		:data-scene-position="scene?.position"
		:data-scene-rotate="scene?.rotate"
		:data-scene-model="scene?.model"
	>
		<slot />
	</component>
</template>
