<script setup lang="ts">
import { gsap } from "gsap"

const $this = shallowRef<HTMLElement | null>(null)
const { $canister, $packaging } = useScene()

useGSAP($this, ($this) => {
	nextTick(() => {
		gsap.fromTo([$canister.value?.position, $packaging.value?.position], {
			y: 0,
		}, {
			y: 16,
			stagger: 0.05,
			ease: "power2.inOut",
			scrollTrigger: {
				trigger: $this,
				start: "top bottom",
				end: "top bottom-=60%",
				scrub: true,
				markers: true,
			},
		})
	})
})
</script>

<template>
	<figure class="relative z-20">
		<img src="/01.jpg" class="w-full">
		<figcaption class="absolute top-0 bottom-0 left-3/5 backdrop-grayscale-100 text-white">
			<div class="sticky top-0 p-4 inline-block text-shadow-md">
				<p class="paragraph">
					Rouen airfield by <a href="https://www.instagram.com/lihbr.png" class="underline">@lihbr.png</a>. 1/250s, f/2.8, 50mm, with <a href="#400" class="underline">Farbe 400</a>.
				</p>
			</div>
		</figcaption>
	</figure>
	<figure class="relative z-20">
		<img src="/02.jpg" class="w-full">
		<figcaption class="absolute top-0 bottom-0 left-3/5 backdrop-grayscale-100 text-white">
			<div class="sticky top-0 p-4 inline-block backdrop-grayscale-100 text-shadow-md">
				<p class="paragraph">
					La Seine by <a href="https://www.instagram.com/lihbr.png" class="underline">@lihbr.png</a>. 1/500s, f/8.0, 50mm, with <a href="#100" class="underline">Farbe 100</a>.
				</p>
			</div>
		</figcaption>
	</figure>
</template>
