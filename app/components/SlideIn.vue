<script lang="ts" setup>
import gsap from "gsap"

defineProps<{ as?: string }>()

const $this = shallowRef<HTMLElement>()

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
	<component :is="as || 'section'" ref="$this">
		<slot />
	</component>
</template>
