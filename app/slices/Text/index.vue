<script setup lang="ts">
import type { Content } from "@prismicio/client"
import { gsap } from "gsap"

const props = defineProps(getSliceComponentProps<Content.TextSlice>())

const $this = shallowRef<HTMLElement | null>(null)

useGSAP(() => {
	if (!$this.value) {
		return
	}

	slideInChildren($this.value)

	if (props.slice.variation === "fullscreen") {
		gsap.set($this.value, { opacity: 1 })
	}
})
</script>

<template>
	<section
		:id="index.toString()"
		ref="$this"
		:data-slice="`${slice.slice_type}-${index}`"
		class="w-2/5 ml-auto py-16 px-4 rich-text flex flex-col justify-center"
		:class="{
			'min-h-[40vh]': slice.variation !== 'fullscreen',
			'min-h-screen opacity-0': slice.variation === 'fullscreen',
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
