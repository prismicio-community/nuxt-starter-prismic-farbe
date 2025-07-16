<script setup lang="ts">
import type { Content } from "@prismicio/client"
import { gsap } from "gsap"

const props = defineProps(getSliceComponentProps<Content.ProductSlice>());

const $this = shallowRef<HTMLElement | null>(null)
const { $canister, $packaging } = useScene()

const product = "100"

useGSAP($this, ($this) => {
	slideInChildren($this)

	positionCenter($this, [$canister, $packaging])

	console.log("product", $this.offsetTop, props.index)

	gsap.to($packaging.value?.rotation, {
		y: `+=${Math.PI}`,
		stagger: 0.05,
		ease: "power2.inOut",
		repeatRefresh: true,
		scrollTrigger: {
			trigger: $this,
			start: "top bottom-=60%",
			toggleActions: "play pause resume reverse",
			invalidateOnRefresh: true,
		},
	})
	gsap.to($canister.value?.rotation, {
		y: `-=${Math.PI * 2}`,
		stagger: 0.05,
		ease: "power2.inOut",
		repeatRefresh: true,
		scrollTrigger: {
			trigger: $this,
			start: "top bottom-=60%",
			toggleActions: "play pause resume reverse",
			invalidateOnRefresh: true,
		},
	})
})
</script>

<template>
	<section
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		:id="product"
		ref="$this"
		class="w-2/5 ml-auto py-16 px-4 rich-text min-h-screen flex flex-col justify-center"
	>
		<h2>Farbe {{ product }}</h2>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam veniam deserunt sapiente amet repudiandae nesciunt voluptatem explicabo assumenda rem, dolore, eius qui nostrum eaque alias inventore itaque laudantium provident iure.
		</p>
	</section>
</template>
