<script setup lang="ts">
import type { Content } from "@prismicio/client"

const props = defineProps(getSliceComponentProps<Content.PictureSlice>())

const $this = shallowRef<HTMLElement | null>(null)
const { $canister, $packaging } = useScene()

useGSAP($this, ($this) => {
	console.log("picture", $this.offsetTop, props.index)
	positionTop($this, [$canister, $packaging])
})
</script>

<template>
	<figure
		ref="$this"
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		class="relative z-20"
	>
		<PrismicImage :field="slice.primary.picture" class="w-full" />
		<figcaption class="absolute top-0 bottom-0 left-3/5 backdrop-grayscale-100 text-white">
			<div class="sticky top-0 p-4 inline-block text-shadow-md rich-text">
				<PrismicRichText :field="slice.primary.caption" />
			</div>
		</figcaption>
	</figure>
</template>
