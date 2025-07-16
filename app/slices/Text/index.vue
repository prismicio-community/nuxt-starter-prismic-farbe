<script setup lang="ts">
import type { Content } from "@prismicio/client"
import { gsap } from "gsap"

const props = defineProps(getSliceComponentProps<Content.TextSlice>())

const $this = shallowRef<HTMLElement | null>(null)
const { $canister, $packaging } = useScene()

useGSAP($this, ($this) => {
	slideInChildren($this)

	console.log("text", $this.offsetTop, props.index)

	if (props.slice.variation === "fullscreen") {
		gsap.set($this, { opacity: 1 })
	}

	if ($this.offsetTop < 20 && window.scrollY < 20) {
		gsap.from([$canister.value?.position, $packaging.value?.position], {
			y: -12,
			delay: 0.3,
			duration: 1,
			stagger: 0.2,
			ease: "power2.out",
			onComplete() {
				positionCenter($this, [$canister, $packaging])
			},
		})
	} else {
		positionCenter($this, [$canister, $packaging])
	}
}, ($this) => {
	if (props.slice.variation === "fullscreen") {
		gsap.set($this, { opacity: 1 })
	}
})
</script>

<template>
	<section
		ref="$this"
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		class="w-2/5 ml-auto py-16 px-4 rich-text"
		:class="{
			'min-h-screen flex flex-col justify-center opacity-0': slice.variation === 'fullscreen',
		}"
	>
		<PrismicRichText :field="slice.primary.title" />
		<PrismicRichText :field="slice.primary.text" />
		<div v-if="slice.primary.ctas.length" class="mt-16 flex -ml-4">
			<PrismicLink
				v-for="link in slice.primary.ctas"
				:key="link.key"
				:field="link"
				class="cta"
				:class="link.variant?.toLowerCase()"
			/>
		</div>
	</section>
</template>
