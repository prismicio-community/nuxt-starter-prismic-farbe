<script setup lang="ts">
import { gsap } from "gsap"

const $this = shallowRef<HTMLElement | null>(null)
const { $canister, $packaging } = useScene()

useGSAP($this, ($this) => {
	gsap.set($this, { opacity: 1 })
	slideInChildren($this)

	if ($this.offsetTop < 20) {
		nextTick(() => {
			gsap.fromTo([$canister.value?.position, $packaging.value?.position], {
				y: -12,
			}, {
				y: 0,
				delay: 0.3,
				duration: 1,
				stagger: 0.2,
				ease: "power2.out",
			})
		})
	}
}, ($this) => {
	gsap.set($this, { opacity: 1 })
})
</script>

<template>
	<main ref="$this" class="min-h-screen w-2/5 ml-auto py-16 px-4 opacity-0 flex flex-col justify-center">
		<h1 class="heading-1">
			Introducing Farbe 800
		</h1>
		<p class="paragraph">
			Embrace night photography with our new emulsion for fine-grained, 800 speed, interior and evening photography.
		</p>
		<div class="mt-16 flex -ml-4">
			<a href="#products" class="cta bg-green">Shop 800</a>
			<a href="#800" class="cta">Discover Farbe</a>
		</div>
	</main>
</template>
