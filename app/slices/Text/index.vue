<script setup lang="ts">
import type { Content } from "@prismicio/client"
import AppSection from "@/components/AppSection.vue"

defineProps(getSliceComponentProps<Content.TextSlice>())
</script>

<template>
	<AppSection
		:id="index.toString()"
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
	</AppSection>
</template>
